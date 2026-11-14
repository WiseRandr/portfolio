// A simplified, conceptual view of where live driver locations go. Only the
// relationships described in the COMIN case study are drawn: no transport,
// protocol, database product or infrastructure details.

type Tone = "default" | "live" | "durable";
type Box = { x: number; y: number; w: number; h: number; title: string; subtitle: string; tone?: Tone };

const TONES: Record<Tone, string> = {
  default: "fill-bg stroke-ink-faint",
  live: "fill-brand-violet-soft stroke-brand-violet",
  durable: "fill-surface stroke-ink",
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

function Arrow({ d, marker, dashed }: { d: string; marker: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1.75}
      strokeDasharray={dashed ? "5 4" : undefined}
      className="stroke-ink-muted"
      markerEnd={`url(#${marker})`}
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

function ArrowHead({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 Z" className="fill-ink-muted" />
    </marker>
  );
}

const NODES = {
  driver: { title: "Driver app", subtitle: "React Native" },
  api: { title: "API", subtitle: "NestJS" },
  redis: { title: "Redis", subtitle: "fast live locations", tone: "live" as const },
  database: { title: "Database", subtitle: "durable snapshots", tone: "durable" as const },
  rider: { title: "Rider app", subtitle: "React Native" },
};

export function LocationFlowDiagram() {
  return (
    <figure className="my-8" aria-labelledby="location-flow-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        {/* Wide layout: driver app → API → rider app, with Redis and the database below. */}
        <svg viewBox="0 0 680 280" className="hidden w-full sm:block" aria-hidden="true">
          <defs>
            <ArrowHead id="location-flow-arrow-wide" />
          </defs>
          <Node x={10} y={30} w={150} h={60} {...NODES.driver} />
          <Node x={265} y={30} w={150} h={60} {...NODES.api} />
          <Node x={520} y={30} w={150} h={60} {...NODES.rider} />
          <Node x={200} y={200} w={150} h={64} {...NODES.redis} />
          <Node x={500} y={200} w={170} h={64} {...NODES.database} />

          <Arrow d="M162 60 H261" marker="location-flow-arrow-wide" />
          <Label x={212} y={36} lines={["location", "updates"]} />
          <Arrow d="M417 52 H516" marker="location-flow-arrow-wide" />
          <Label x={467} y={28} lines={["location", "updates"]} />

          <Arrow d="M290 92 V196" marker="location-flow-arrow-wide" />
          <Label x={280} y={130} lines={["frequent writes:", "latest location"]} anchor="end" />
          <Arrow d="M330 198 V94" marker="location-flow-arrow-wide" />
          <Label x={340} y={130} lines={["reads latest", "location"]} anchor="start" />

          <Arrow d="M405 92 V108 H585 V196" marker="location-flow-arrow-wide" dashed />
          <Label x={575} y={134} lines={["periodic/coalesced", "snapshots"]} anchor="end" />
        </svg>

        {/* Narrow layout: the same relationships stacked vertically. */}
        <svg viewBox="0 0 340 500" className="mx-auto block w-full max-w-sm sm:hidden" aria-hidden="true">
          <defs>
            <ArrowHead id="location-flow-arrow-narrow" />
          </defs>
          <Node x={10} y={10} w={150} h={56} {...NODES.driver} />
          <Node x={10} y={187} w={150} h={56} {...NODES.api} />
          <Node x={10} y={434} w={150} h={56} {...NODES.rider} />
          <Node x={214} y={160} w={120} h={66} {...NODES.redis} />
          <Node x={214} y={300} w={120} h={66} {...NODES.database} />

          <Arrow d="M85 68 V183" marker="location-flow-arrow-narrow" />
          <Label x={97} y={122} lines={["location", "updates"]} anchor="start" />

          <Arrow d="M162 198 H210" marker="location-flow-arrow-narrow" />
          <Label x={187} y={192} lines={["writes"]} />
          <Arrow d="M212 216 H164" marker="location-flow-arrow-narrow" />
          <Label x={187} y={236} lines={["reads"]} />

          <Arrow d="M130 245 V333 H210" marker="location-flow-arrow-narrow" dashed />
          <Label x={172} y={352} lines={["periodic/", "coalesced", "snapshots"]} />

          <Arrow d="M60 245 V430" marker="location-flow-arrow-narrow" />
          <Label x={70} y={392} lines={["location", "updates"]} anchor="start" />
        </svg>

        <ol className="sr-only">
          <li>The driver app sends location updates to the API.</li>
          <li>The API frequently writes each driver&apos;s latest location to Redis, for fast access.</li>
          <li>The API reads the latest location back from Redis.</li>
          <li>The API supplies location updates to the rider app.</li>
          <li>
            Separately, location snapshots are persisted to the database at a lower frequency (periodic/coalesced
            persistence), as durable storage.
          </li>
          <li>Neither app accesses Redis or the database directly.</li>
        </ol>
      </div>
      <figcaption id="location-flow-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Simplified conceptual flow based on the implementation described here. Transport and infrastructure details
        are omitted.
      </figcaption>
    </figure>
  );
}
