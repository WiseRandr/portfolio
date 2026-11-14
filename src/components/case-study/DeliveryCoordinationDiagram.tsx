// A general, retrospective comparison of two ways teams can coordinate
// delivery. It is not a reconstruction of Marlow's process: no timings,
// team sizes or results are drawn. Static on purpose.

import type { ReactNode } from "react";

const LANES = ["Frontend", "API / backend", "QA"];

function Arrow({ d, dashed, id }: { d: string; dashed?: boolean; id: string }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1.5}
      strokeDasharray={dashed ? "4 3" : undefined}
      className="stroke-ink-muted"
      markerEnd={`url(#${id})`}
    />
  );
}

function Head({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 Z" className="fill-ink-muted" />
    </marker>
  );
}

type Tone = "plain" | "blocked" | "agreed" | "issue";
const TONE: Record<Tone, string> = {
  plain: "fill-bg stroke-ink-faint",
  blocked: "fill-bg stroke-brand-pink",
  agreed: "fill-brand-violet-soft stroke-brand-violet",
  issue: "fill-bg stroke-brand-pink",
};

function Bar({ x, y, w, h = 28, label, tone = "plain" }: { x: number; y: number; w: number; h?: number; label: string; tone?: Tone }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={7}
        strokeWidth={1.5}
        strokeDasharray={tone === "blocked" ? "4 3" : undefined}
        className={TONE[tone]}
      />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={11} className="fill-ink">
        {label}
      </text>
    </g>
  );
}

function LaneLabels({ ys }: { ys: number[] }) {
  return (
    <>
      {LANES.map((lane, i) => (
        <text key={lane} x={0} y={ys[i] + 18} fontSize={11} fontWeight={600} className="fill-ink-muted">
          {lane}
        </text>
      ))}
    </>
  );
}

function Panel({ title, points, children }: { title: string; points: string[]; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 style={{ margin: 0 }} className="text-sm font-semibold text-ink">
        {title}
      </h3>
      {children}
      <div role="list" className="mt-3 space-y-1 text-sm leading-relaxed text-ink-muted">
        {points.map((point) => (
          <div key={point} role="listitem" className="flex gap-2">
            <span aria-hidden="true">–</span>
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DeliveryCoordinationDiagram() {
  return (
    <figure className="my-8" aria-labelledby="delivery-coordination-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
          <Panel
            title="Unclear dependencies"
            points={[
              "Work starts on unverified assumptions about the interface.",
              "A missing or changed interface surfaces at integration.",
              "Clarification and rework flow back, and some work waits.",
            ]}
          >
            <svg viewBox="0 0 300 214" className="mt-3 block w-full max-w-sm" aria-hidden="true">
              <defs>
                <Head id="coordination-unclear" />
              </defs>
              <LaneLabels ys={[8, 50, 92]} />
              <rect x={82} y={2} width={202} height={124} rx={10} fill="none" strokeWidth={1} className="stroke-ink-faint" />
              <Bar x={88} y={8} w={190} label="Builds on assumptions" />
              <Bar x={88} y={50} w={190} label="Changes the interface" />
              <Bar x={88} y={92} w={190} label="Waiting for clarification" tone="blocked" />
              <Arrow d="M183 127 V142" id="coordination-unclear" />
              <Bar x={88} y={146} w={190} label="Mismatch found at integration" tone="issue" />
              <Arrow d="M280 160 H292 V22 H282" id="coordination-unclear" dashed />
              <text x={183} y={198} textAnchor="middle" fontSize={11} className="fill-ink-muted">
                Feedback: clarify, then rework
              </text>
            </svg>
          </Panel>

          <Panel
            title="Explicit dependencies and early integration"
            points={[
              "Starts from agreed behaviour, an API contract, owners and acceptance criteria.",
              "Frontend, backend and QA work in parallel; QA validates throughout.",
              "An early check against the real API feeds back before release readiness.",
            ]}
          >
            <svg viewBox="0 0 300 268" className="mt-3 block w-full max-w-sm" aria-hidden="true">
              <defs>
                <Head id="coordination-explicit" />
              </defs>
              <rect x={0} y={0} width={300} height={40} rx={8} strokeWidth={1.5} className={TONE.agreed} />
              <text x={150} y={16} textAnchor="middle" fontSize={11} fontWeight={600} className="fill-ink">
                Agreed behaviour and API contract
              </text>
              <text x={150} y={31} textAnchor="middle" fontSize={11} className="fill-ink">
                Owners · acceptance criteria
              </text>
              <Arrow d="M183 42 V50" id="coordination-explicit" />
              <LaneLabels ys={[58, 94, 130]} />
              <rect x={82} y={52} width={202} height={114} rx={10} fill="none" strokeWidth={1} className="stroke-ink-faint" />
              <Bar x={88} y={58} w={190} label="Builds on contract + fixtures" />
              <Bar x={88} y={94} w={190} label="Implements agreed interface" />
              <Bar x={88} y={130} w={190} label="Defines scenarios, validates early" />
              <Arrow d="M183 167 V176" id="coordination-explicit" />
              <Bar x={88} y={180} w={190} label="Early check with the real API" tone="agreed" />
              <Arrow d="M280 194 H292 V72 H282" id="coordination-explicit" dashed />
              <Arrow d="M183 210 V226" id="coordination-explicit" />
              <Bar x={88} y={230} w={190} label="Ready after agreed checks" />
            </svg>
          </Panel>
        </div>

        <div className="mt-6 grid gap-4 border-t border-line pt-4 text-sm leading-relaxed sm:grid-cols-[2fr_1fr]">
          <div>
            <div className="font-medium text-ink">Potential benefits</div>
            <div role="list" className="mt-1 space-y-1 text-ink-muted">
              {[
                "Dependencies and owners are visible before work becomes blocked.",
                "Parallel implementation has a shared contract.",
                "Integration mismatches can be found earlier.",
              ].map((benefit) => (
                <div key={benefit} role="listitem" className="flex gap-2">
                  <span aria-hidden="true">–</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-medium text-ink">Trade-off</div>
            <div className="mt-1 text-ink-muted">Contracts and fixtures need maintenance as requirements change.</div>
          </div>
        </div>
      </div>
      <figcaption id="delivery-coordination-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        General retrospective illustration—not Marlow&apos;s delivery process. It shows how explicit dependencies and
        early integration can reduce avoidable waiting and rework.
      </figcaption>
    </figure>
  );
}
