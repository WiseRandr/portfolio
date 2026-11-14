import type { ReactNode } from "react";

// A conceptual, retrospective comparison: how the COMIN API was deployed, and
// how I'd isolate ride workloads if profiling confirmed shared runtime
// contention. The load scenario is hypothetical. No gateway, broker, database layout or
// replica counts are drawn, because none of them are part of the proposal.

type Rect = { x: number; y: number; w: number; h: number };

function Box({ x, y, w, h, label, load }: Rect & { label: string; load?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        strokeWidth={load ? 2 : 1.5}
        className={load ? "fill-brand-violet-soft stroke-brand-pink" : "fill-bg stroke-ink-faint"}
      />
      <text x={x + w / 2} y={y + h / 2 + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={600} className="fill-ink">
        {label}
      </text>
    </g>
  );
}

function Boundary({ x, y, w, h, label }: Rect & { label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="none" strokeWidth={1.5} strokeDasharray="6 4" className="stroke-ink-muted" />
      <text x={x + 12} y={y + 21} fontSize={12} fontWeight={600} className="fill-ink">
        {label}
      </text>
    </g>
  );
}

function Capacity({ x, y, w, title, used, other = 0 }: { x: number; y: number; w: number; title: string; used: number; other?: number }) {
  return (
    <g>
      <text x={x} y={y} fontSize={11.5} className="fill-ink-muted">
        {title}
      </text>
      <rect x={x} y={y + 8} width={w} height={12} rx={6} className="fill-line" />
      {used > 0 && <rect x={x} y={y + 8} width={w * used} height={12} rx={6} className="fill-brand-pink" />}
      {other > 0 && <rect x={x + w * used + 2} y={y + 8} width={w * other} height={12} rx={6} className="fill-ink-faint" />}
    </g>
  );
}

function Down({ x }: { x: number }) {
  return (
    <path d={`M${x} 52 V86 M${x - 4} 80 L${x} 86 L${x + 4} 80`} fill="none" strokeWidth={1.5} className="stroke-ink-muted" />
  );
}

function Clients({ dashboardStrained }: { dashboardStrained?: boolean }) {
  return (
    <>
      <Box x={10} y={10} w={170} h={40} label="Rider & driver apps" />
      <rect
        x={190}
        y={10}
        width={100}
        height={40}
        rx={9}
        strokeWidth={dashboardStrained ? 2 : 1.5}
        strokeDasharray={dashboardStrained ? "4 3" : undefined}
        className={dashboardStrained ? "fill-bg stroke-brand-pink" : "fill-bg stroke-ink-faint"}
      />
      <text x={240} y={34.5} textAnchor="middle" fontSize={12.5} fontWeight={600} className="fill-ink">
        Ops dashboard
      </text>
    </>
  );
}

function Panel({ title, points, children }: { title: string; points: string[]; children: ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium text-ink">{title}</div>
      <svg viewBox="0 0 300 300" className="mt-3 block w-full max-w-sm" aria-hidden="true">
        {children}
      </svg>
      <ul className="mt-3 space-y-1.5" role="list">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
            <span aria-hidden="true">–</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchitectureComparison() {
  return (
    <figure className="my-8" aria-labelledby="architecture-comparison-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div className="text-sm text-ink-muted">
          <span className="font-medium text-ink">Conceptual comparison if profiling confirms shared runtime contention.</span>{" "}
          Both sides show the same hypothetical spike in ride traffic. Pink marks the ride workload; capacity bars are
          schematic, not measured utilization.
        </div>
        <div className="mt-5 grid gap-10 sm:grid-cols-2 sm:gap-6">
          <Panel
            title="Implemented: modules in a shared API deployment"
            points={[
              "Implemented: rides, payments and users are separate modules, deployed and scaled together.",
              "Observed: the API and the ops dashboard slowed down when ride traffic was high.",
              "Hypothesis to profile: if ride processing saturates shared runtime capacity, other API workloads compete for the same resources.",
            ]}
          >
            <Clients dashboardStrained />
            <text x={262} y={68} textAnchor="middle" fontSize={11} className="fill-brand-pink">
              slower
            </text>
            <Down x={95} />
            <Down x={215} />
            <Boundary x={10} y={90} w={280} h={198} label="Shared API deployment" />
            <Box x={24} y={124} w={80} h={36} label="Rides" load />
            <Box x={110} y={124} w={86} h={36} label="Payments" />
            <Box x={202} y={124} w={74} h={36} label="Users" />
            <Capacity x={24} y={210} w={252} title="Shared runtime capacity" used={0.78} other={0.16} />
            <text x={24} y={262} fontSize={11.5} className="fill-ink-muted">
              <tspan x={24}>If rides saturate it, other</tspan>
              <tspan x={24} dy={16}>modules compete for it.</tspan>
            </text>
          </Panel>

          <Panel
            title="Proposed, not deployed: independently deployed services"
            points={[
              "Ride processing would run in its own deployment, with its own resource allocation and scaling.",
              "If runtime contention is confirmed, a ride spike would draw mainly on the ride service's capacity, leaving other workloads more headroom.",
              "Shared dependencies, such as a database or synchronous calls, can still spread load, so separation doesn't guarantee isolation.",
              "Costs: more deployments to operate, monitoring and tracing across services, and network calls that can fail.",
            ]}
          >
            <Clients />
            <Down x={75} />
            <Down x={168} />
            <Down x={240} />
            <Boundary x={10} y={90} w={136} h={198} label="Ride service" />
            <Box x={22} y={124} w={112} h={36} label="Rides" load />
            <Capacity x={22} y={210} w={112} title="Own capacity" used={0.78} />
            <text x={22} y={262} fontSize={11.5} className="fill-ink-muted">
              <tspan x={22}>Can scale on its</tspan>
              <tspan x={22} dy={16}>own with rides.</tspan>
            </text>

            <Boundary x={156} y={90} w={134} h={198} label="Other workloads" />
            <Box x={168} y={124} w={110} h={32} label="Payments" />
            <Box x={168} y={162} w={110} h={32} label="Users" />
            <Capacity x={168} y={210} w={110} title="Own capacity" used={0} other={0.3} />
            <text x={168} y={262} fontSize={11.5} className="fill-ink-muted">
              <tspan x={168}>Less contention,</tspan>
              <tspan x={168} dy={16}>if confirmed.</tspan>
            </text>
          </Panel>
        </div>
      </div>
      <figcaption id="architecture-comparison-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Retrospective architecture proposal—not the deployed system. Independent deployments can reduce shared
        runtime contention if profiling confirms it; shared dependencies still require protection.
      </figcaption>
    </figure>
  );
}
