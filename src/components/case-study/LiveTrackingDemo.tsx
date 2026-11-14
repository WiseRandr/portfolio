"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

// An original, schematic rider-app screen with fictional data. Two views of the
// same simulated pickup run on one shared timeline: one where a location update
// goes missing and the car jumps, one where every update arrives and the app
// animates between them. It is not a replay of production behaviour.

type Kind = "delayed" | "smooth";
type Point = { x: number; y: number };

const TRIP_MS = 14000;
// Shown before animation starts, and as the resting state for reduced motion:
// late enough that the missed update and the jump are both visible.
const STATIC_PROGRESS = 0.75;

// Street centre lines on a 280 × 400 map.
const STREETS_X = [60, 140, 220];
const STREETS_Y = [64, 160, 250, 336];
const STREET_WIDTH = 16;
// From the driver's position (bottom left) to the pickup point (top right).
const ROUTE: Point[] = [
  { x: 60, y: 336 },
  { x: 60, y: 250 },
  { x: 140, y: 250 },
  { x: 140, y: 160 },
  { x: 220, y: 160 },
  { x: 220, y: 64 },
];

const SEGMENT_LENGTHS = ROUTE.slice(1).map((p, i) => Math.hypot(p.x - ROUTE[i].x, p.y - ROUTE[i].y));
const ROUTE_LENGTH = SEGMENT_LENGTHS.reduce((a, b) => a + b, 0);

// Simulated location updates, as distances along the route. Both views share
// them; the delayed view never receives the one at MISSING.
const SAMPLES = [0, 60, 126, 206, 296, 384, ROUTE_LENGTH].map((d) => d / ROUTE_LENGTH);
const MISSING = 3;

/** Where the car is, which way it faces, and the route travelled so far. */
function locate(progress: number) {
  let remaining = Math.min(Math.max(progress, 0), 1) * ROUTE_LENGTH;
  const travelled: Point[] = [ROUTE[0]];
  for (let i = 0; i < SEGMENT_LENGTHS.length; i++) {
    const from = ROUTE[i];
    const to = ROUTE[i + 1];
    const length = SEGMENT_LENGTHS[i];
    const heading = (Math.atan2(to.x - from.x, from.y - to.y) * 180) / Math.PI;
    if (remaining <= length || i === SEGMENT_LENGTHS.length - 1) {
      const t = Math.min(remaining / length, 1);
      const point = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
      travelled.push(point);
      return { point, heading, travelled };
    }
    remaining -= length;
    travelled.push(to);
  }
  return { point: ROUTE[0], heading: 0, travelled };
}

/** The latest update the delayed view has received at this point in the timeline. */
function lastReceived(progress: number) {
  let shown = 0;
  SAMPLES.forEach((sample, i) => {
    if (i !== MISSING && sample <= progress) shown = sample;
  });
  return shown;
}

const toPoints = (points: Point[]) => points.map((p) => `${p.x},${p.y}`).join(" ");

const MISSING_POINT = locate(SAMPLES[MISSING]).point;
const JUMP_FROM = locate(SAMPLES[MISSING - 1]).point;
const JUMP_TO = locate(SAMPLES[MISSING + 1]).point;

const BLOCKS_X = [-10, ...STREETS_X.map((x) => x + STREET_WIDTH / 2)].map((start, i) => ({
  start,
  end: (STREETS_X[i] ?? 290) - (i < STREETS_X.length ? STREET_WIDTH / 2 : 0),
}));
const BLOCKS_Y = [-10, ...STREETS_Y.map((y) => y + STREET_WIDTH / 2)].map((start, i) => ({
  start,
  end: (STREETS_Y[i] ?? 410) - (i < STREETS_Y.length ? STREET_WIDTH / 2 : 0),
}));

const PANELS: Record<Kind, { title: string; description: string; map: string }> = {
  delayed: {
    title: "Delayed updates",
    description:
      "The car stays at its last received location. Here one update never arrives, so the car then jumps ahead and skips that point. The missing update is illustrative, not a confirmed cause from production.",
    map: "Delayed updates. The car waits at its last received location, one location update is not received, and the car then jumps ahead along the route toward the pickup point.",
  },
  smooth: {
    title: "Smooth display",
    description:
      "Every simulated update arrives on time, and the app animates the car between them. The motion between updates is an estimate along the route, not the driver's exact position.",
    map: "Smooth display. The car moves continuously along the same route from the driver's position to the pickup point.",
  },
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function TrackingPanel({ kind, progress, titleId }: { kind: Kind; progress: number; titleId: string }) {
  const delayed = kind === "delayed";
  const shown = delayed ? lastReceived(progress) : progress;
  const { point, heading, travelled } = locate(shown);
  const arrived = progress >= 1;
  const missed = delayed && progress >= SAMPLES[MISSING];
  const jumped = delayed && shown >= SAMPLES[MISSING + 1];
  // Updates already passed: for the delayed view, only those it received and
  // has moved on from.
  const passed = SAMPLES.map((sample, i) => ({ sample, i })).filter(
    ({ sample, i }) =>
      i > 0 && i < SAMPLES.length - 1 && (delayed ? i !== MISSING && sample < shown : sample <= progress),
  );
  const panel = PANELS[kind];

  return (
    <div>
      <div id={titleId} className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
        <span
          className={`h-2.5 w-2.5 rounded-full ${delayed ? "bg-brand-pink" : "bg-brand-violet"}`}
          aria-hidden="true"
        />
        {panel.title}
      </div>
      <div className="mx-auto w-full max-w-64 rounded-[2.25rem] border border-line bg-bg p-2 shadow-sm">
        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-map-street">
          <div className="flex items-center justify-between gap-2 bg-bg px-4 py-2 text-xs">
            <span className="font-medium text-ink">Waiting for your driver</span>
            <span className={arrived ? "text-ok" : "text-brand-violet"}>{arrived ? "Arrived" : "Live"}</span>
          </div>
          <svg viewBox="0 0 280 400" className="block w-full" role="img" aria-label={panel.map}>
            {BLOCKS_Y.map((row, r) =>
              BLOCKS_X.map((col, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={col.start}
                  y={row.start}
                  width={col.end - col.start}
                  height={row.end - row.start}
                  rx={6}
                  className={r === 1 && c === 0 ? "fill-map-park" : "fill-map-block"}
                />
              )),
            )}
            <polyline
              points={toPoints(ROUTE)}
              fill="none"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-brand-violet"
              opacity={0.25}
            />
            <polyline
              points={toPoints(travelled)}
              fill="none"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-brand-violet"
            />

            {/* Driver's starting position and the pickup point. */}
            <circle cx={ROUTE[0].x} cy={ROUTE[0].y} r={7} strokeWidth={3} className="fill-ink-faint stroke-bg" />
            <text x={ROUTE[0].x + 2} y={ROUTE[0].y + 28} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-ink">
              Driver position
            </text>
            <circle cx={ROUTE.at(-1)!.x} cy={ROUTE.at(-1)!.y} r={9} strokeWidth={3} className="fill-brand-pink stroke-bg" />
            <text x={ROUTE.at(-1)!.x - 4} y={ROUTE.at(-1)!.y - 20} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-ink">
              Pickup
            </text>

            {passed.map(({ i }) => {
              const p = locate(SAMPLES[i]).point;
              return <circle key={i} cx={p.x} cy={p.y} r={4.5} strokeWidth={2} className="fill-brand-violet stroke-bg" />;
            })}

            {missed && (
              <g>
                <circle
                  cx={MISSING_POINT.x}
                  cy={MISSING_POINT.y}
                  r={7}
                  fill="none"
                  strokeWidth={2.5}
                  strokeDasharray="3 2.5"
                  className="stroke-brand-pink"
                />
                <rect x={150} y={194} width={110} height={36} rx={5} className="fill-bg" opacity={0.94} />
                <text x={157} y={209} fontSize={11.5} className="fill-ink">
                  <tspan x={157}>Location update</tspan>
                  <tspan x={157} dy={14}>
                    not received
                  </tspan>
                </text>
              </g>
            )}

            {jumped && (
              <g className="stroke-brand-pink" fill="none" strokeWidth={2} strokeLinecap="round">
                <path
                  d={`M${JUMP_FROM.x} ${JUMP_FROM.y} Q${JUMP_FROM.x} ${JUMP_TO.y} ${JUMP_TO.x - 16} ${JUMP_TO.y}`}
                  strokeDasharray="4 4"
                />
                <path
                  d={`M${JUMP_TO.x - 22} ${JUMP_TO.y - 5} L${JUMP_TO.x - 15} ${JUMP_TO.y} L${JUMP_TO.x - 22} ${JUMP_TO.y + 5}`}
                />
              </g>
            )}

            <g transform={`translate(${point.x} ${point.y})`}>
              <circle r={13} strokeWidth={3} className="fill-brand-violet stroke-bg" />
              <path d="M0 -6 L5 5 L0 2 L-5 5 Z" transform={`rotate(${heading})`} className="fill-bg" />
            </g>
          </svg>
          <div className="space-y-3 bg-bg px-4 py-3 text-xs">
            <div className="h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-violet" style={{ width: `${Math.round(shown * 100)}%` }} />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-violet-soft font-semibold text-brand-violet"
                aria-hidden="true"
              >
                SR
              </span>
              <div className="min-w-0">
                <div className="font-medium text-ink">Sam R. · your driver</div>
                <div className="text-ink-muted">Grey hatchback</div>
              </div>
            </div>
            <div className="text-ink-muted">
              {arrived ? "Your driver has arrived." : "Your driver is on the way to pick you up."}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm leading-relaxed text-ink-muted">{panel.description}</div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 12 12" className="h-3 w-3">
            <circle cx={6} cy={6} r={4.5} className="fill-brand-violet" />
          </svg>
          {delayed ? "Location shown earlier" : "Update received"}
        </span>
        {delayed && (
          <>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5">
                <circle cx={7} cy={7} r={5} fill="none" strokeWidth={2} strokeDasharray="3 2" className="stroke-brand-pink" />
              </svg>
              Update not received
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 20 10" className="h-2.5 w-5">
                <path d="M1 5 H17 M13 1.5 L17 5 L13 8.5" fill="none" strokeWidth={1.75} strokeDasharray="3 2" className="stroke-brand-pink" />
              </svg>
              Jump
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function LiveTrackingDemo() {
  const id = useId();
  const startRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(STATIC_PROGRESS);
  const interacted = useRef(false);
  const [progress, setProgress] = useState(STATIC_PROGRESS);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  // Start once, the first time the first view scrolls into sight, unless the
  // visitor prefers reduced motion or has already used the controls.
  useEffect(() => {
    const target = startRef.current;
    if (!target || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interacted.current) return;
        interacted.current = true;
        progressRef.current = 0;
        setProgress(0);
        setPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // One clock drives both views, and stops at pickup.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = Math.min(1, progressRef.current + (now - last) / TRIP_MS);
      last = now;
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const togglePlay = () => {
    interacted.current = true;
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      setProgress(0);
    }
    setPlaying((value) => !value);
  };

  const replay = () => {
    interacted.current = true;
    progressRef.current = 0;
    setProgress(0);
    setPlaying(true);
  };

  const arrived = progress >= 1;
  const buttonClass =
    "rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-ink hover:border-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <figure className="my-10" aria-labelledby={`${id}-caption`}>
      <div className="rounded-2xl border border-line bg-surface/50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Simulation controls for both views">
          <button type="button" onClick={togglePlay} className={buttonClass}>
            {playing ? "Pause" : arrived ? "Play again" : "Play"}
          </button>
          <button type="button" onClick={replay} className={buttonClass}>
            Replay approach
          </button>
          <span className="text-sm text-ink-muted">Both views follow the same simulated timeline.</span>
        </div>
        {reducedMotion && !playing && (
          <div className="mt-3 text-sm text-ink-faint">
            Motion is paused because your device prefers reduced motion. Both views show the same moment; press Play
            to run the comparison.
          </div>
        )}
        <div aria-live="polite" className="sr-only">
          {arrived ? "Both views: your driver has arrived." : ""}
        </div>

        <div className="mt-6 grid gap-10 sm:grid-cols-2 sm:gap-6">
          <div ref={startRef}>
            <TrackingPanel kind="delayed" progress={progress} titleId={`${id}-delayed`} />
          </div>
          <TrackingPanel kind="smooth" progress={progress} titleId={`${id}-smooth`} />
        </div>
      </div>
      <figcaption id={`${id}-caption`} className="mt-3 text-sm leading-relaxed text-ink-faint">
        Illustrative reconstruction—not the production interface or measured performance. Fictional data and
        simulated motion explain the tracking problem described in this case study.
      </figcaption>
    </figure>
  );
}
