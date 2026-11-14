// A simplified, conceptual view of where live driver locations go. Only the
// relationships described in the COMIN case study are drawn: no transport,
// protocol, infrastructure or recovery details.

type Tone = "default" | "live" | "durable";
type Box = { x: number; y: number; w: number; h: number; title: string; subtitle: string; tone?: Tone };
type Path = "normal" | "scheduled" | "fallback";

const TONES: Record<Tone, string> = {
  default: "fill-bg stroke-ink-faint",
  live: "fill-brand-violet-soft stroke-brand-violet",
  durable: "fill-surface stroke-ink",
};

// Each path type differs in colour and in line pattern, so it never relies on
// colour alone.
const PATHS: Record<Path, { stroke: string; fill: string; dash?: string; label: string }> = {
  normal: { stroke: "stroke-ink-muted", fill: "fill-ink-muted", label: "Normal operation" },
  scheduled: { stroke: "stroke-brand-violet", fill: "fill-brand-violet", dash: "2 4", label: "Scheduled persistence, every 15 minutes" },
  fallback: { stroke: "stroke-brand-pink", fill: "fill-brand-pink", dash: "7 4", label: "Fallback while Redis is unavailable" },
};

function Node({ x, y, w, h, title, subtitle, tone = "default" }: Box) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} strokeWidth={tone === "default" ? 1.5 : 2} className={TONES[tone]} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" fontSize={15} fontWeight={600} className="fill-ink">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={12} className="fill-ink-muted">
        {subtitle}
      </text>
    </g>
  );
}

function Arrow({ d, id, kind = "normal" }: { d: string; id: string; kind?: Path }) {
  const style = PATHS[kind];
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={kind === "normal" ? 1.75 : 2}
      strokeLinecap={kind === "scheduled" ? "round" : undefined}
      strokeDasharray={style.dash}
      className={style.stroke}
      markerEnd={`url(#${id}-${kind})`}
    />
  );
}

function Label({ x, y, lines, anchor = "middle" }: { x: number; y: number; lines: string[]; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={12.5} className="fill-ink-muted">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 15}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function ArrowHeads({ id }: { id: string }) {
  return (
    <defs>
      {(Object.keys(PATHS) as Path[]).map((kind) => (
        <marker
          key={kind}
          id={`${id}-${kind}`}
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 Z" className={PATHS[kind].fill} />
        </marker>
      ))}
    </defs>
  );
}

function Legend() {
  return (
    <div className="mt-5 flex flex-col gap-2 text-sm leading-snug text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
      {(Object.keys(PATHS) as Path[]).map((kind) => (
        <div key={kind} className="flex items-center gap-2">
          <svg viewBox="0 0 32 8" className="h-2 w-8 shrink-0" aria-hidden="true">
            <path
              d="M1 4 H31"
              strokeWidth={kind === "normal" ? 1.75 : 2}
              strokeLinecap={kind === "scheduled" ? "round" : undefined}
              strokeDasharray={PATHS[kind].dash}
              className={PATHS[kind].stroke}
            />
          </svg>
          <span>{PATHS[kind].label}</span>
        </div>
      ))}
    </div>
  );
}

const NODES = {
  driver: { title: "Driver app", subtitle: "React Native" },
  api: { title: "API", subtitle: "NestJS" },
  redis: { title: "Redis", subtitle: "live locations", tone: "live" as const },
  job: { title: "Scheduled job", subtitle: "every 15 minutes" },
  database: { title: "Database", subtitle: "saved locations", tone: "durable" as const },
  rider: { title: "Rider app", subtitle: "React Native" },
};

export function LocationFlowDiagram() {
  const wide = "location-flow-wide";
  const narrow = "location-flow-narrow";
  return (
    <figure className="my-8" aria-labelledby="location-flow-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        {/* Wide layout: driver app → API → rider app along the top; Redis, the
            scheduled job and the database below. */}
        <svg viewBox="0 0 680 395" className="hidden w-full sm:block" aria-hidden="true">
          <ArrowHeads id={wide} />
          <Node x={10} y={30} w={150} h={60} {...NODES.driver} />
          <Node x={265} y={30} w={150} h={60} {...NODES.api} />
          <Node x={520} y={30} w={150} h={60} {...NODES.rider} />
          <Node x={265} y={190} w={150} h={60} {...NODES.redis} />
          <Node x={520} y={190} w={150} h={60} {...NODES.job} />
          <Node x={265} y={320} w={150} h={60} {...NODES.database} />

          <Arrow d="M162 56 H261" id={wide} />
          <Label x={212} y={34} lines={["location", "updates"]} />
          <Arrow d="M417 60 H516" id={wide} />
          <Label x={467} y={36} lines={["location", "updates"]} />

          <Arrow d="M320 92 V186" id={wide} />
          <Label x={310} y={135} lines={["writes latest", "location"]} anchor="end" />
          <Arrow d="M360 188 V94" id={wide} />
          <Label x={370} y={135} lines={["reads latest", "location"]} anchor="start" />

          <Arrow d="M417 220 H516" id={wide} kind="scheduled" />
          <Label x={467} y={210} lines={["reads"]} />
          <Arrow d="M595 252 V350 H419" id={wide} kind="scheduled" />
          <Label x={507} y={340} lines={["writes"]} />

          {/* Fallback: the API writes to and reads from the database directly. */}
          <Arrow d="M263 82 H232 V340 H261" id={wide} kind="fallback" />
          <Arrow d="M263 362 H206 V72 H261" id={wide} kind="fallback" />
          <Label x={196} y={196} lines={["If Redis is", "unavailable, the", "API writes to and", "reads from the", "database directly"]} anchor="end" />
        </svg>

        {/* Narrow layout: the same relationships, with the stores in a second column. */}
        <svg viewBox="0 0 340 600" className="mx-auto block w-full max-w-sm sm:hidden" aria-hidden="true">
          <ArrowHeads id={narrow} />
          <Node x={10} y={10} w={150} h={56} {...NODES.driver} />
          <Node x={10} y={160} w={150} h={56} {...NODES.api} />
          <Node x={10} y={534} w={150} h={56} {...NODES.rider} />
          <Node x={206} y={160} w={128} h={56} {...NODES.redis} />
          <Node x={206} y={300} w={128} h={56} {...NODES.job} />
          <Node x={206} y={440} w={128} h={56} {...NODES.database} />

          <Arrow d="M85 68 V156" id={narrow} />
          <Label x={97} y={108} lines={["location", "updates"]} anchor="start" />

          <Arrow d="M162 178 H202" id={narrow} />
          <Label x={183} y={170} lines={["writes"]} />
          <Arrow d="M204 200 H164" id={narrow} />
          <Label x={183} y={230} lines={["reads"]} />

          <Arrow d="M270 218 V296" id={narrow} kind="scheduled" />
          <Label x={280} y={262} lines={["reads"]} anchor="start" />
          <Arrow d="M270 358 V436" id={narrow} kind="scheduled" />
          <Label x={280} y={402} lines={["writes"]} anchor="start" />

          {/* Fallback: write down to the database, read back up to the API. */}
          <Arrow d="M140 218 V458 H202" id={narrow} kind="fallback" />
          <Arrow d="M204 478 H115 V222" id={narrow} kind="fallback" />
          <Label x={148} y={312} lines={["fallback", "writes &", "reads"]} anchor="start" />

          <Arrow d="M50 218 V530" id={narrow} />
          <Label x={58} y={300} lines={["location", "updates"]} anchor="start" />
        </svg>

        <Legend />

        <ol className="sr-only">
          <li>Normal operation: the driver app sends location updates to the API.</li>
          <li>Normal operation: the API writes each driver&apos;s latest location to Redis and reads it back from Redis.</li>
          <li>Normal operation: the API supplies location updates to the rider app.</li>
          <li>Scheduled persistence: every 15 minutes, a job reads the latest locations from Redis and writes them to the database.</li>
          <li>Fallback: if Redis is unavailable, the API writes incoming location updates directly to the database and reads locations from the database.</li>
          <li>Neither app accesses Redis or the database directly.</li>
        </ol>
      </div>
      <figcaption id="location-flow-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Simplified conceptual flow based on the implementation described here. Transport, infrastructure and recovery
        details are omitted.
      </figcaption>
    </figure>
  );
}
