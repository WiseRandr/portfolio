"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

// An original, schematic reconstruction of allotment requests with fictional
// beneficiaries and amounts, played as one timeline: a request made online,
// the connection dropping, three requests kept as pending actions, then the
// app reopened online, which is what submits them. A returning connection on
// its own submits nothing. No network requests are made.

type Status = "submitting" | "submitted" | "pending";
type Item = { who: string; amount: string; status: Status };

const BENEFICIARIES = [
  { name: "Ana Reyes", relation: "Spouse" },
  { name: "Leo Reyes", relation: "Brother" },
  { name: "Mira Santos", relation: "Mother" },
];

// Each request: who, how much, and when its on-screen actions start (ms).
const REQUESTS = [
  { who: 0, amount: "150", at: 600 },
  { who: 1, amount: "200", at: 7900 },
  { who: 2, amount: "100", at: 11300 },
  { who: 0, amount: "75", at: 14700 },
];
const SELECT = 300;
const TYPE_FROM = 700;
const TYPE_TO = 1500;
const PRESS_FROM = 1900;
const OUTCOME = 2300;
const SUBMIT_MS = 400;

const OFFLINE_AT = 5800;
const RECONNECT_AT = 18900;
const REOPEN_AT = 20600;
const PASSCODE_FROM = 20900;
const PASSCODE_TO = 22100;
const VERIFIED_AT = 22200;
const REOPENED_AT = 23000;
const FLUSH_AT = 23200;
const FLUSH_GAP = 500;

const STEPS = [
  {
    short: "Online request",
    title: "A request while online",
    body: "The crew member picks a beneficiary, enters an amount and requests a transfer. Online, the request is submitted to Marlow's service straight away.",
    start: 0,
    end: 5200,
  },
  {
    short: "Connection lost",
    title: "The connection drops",
    body: "The ship loses connectivity. The app shows that it's offline, and the screen stays usable.",
    start: 5200,
    end: 7600,
  },
  {
    short: "Offline requests",
    title: "Three requests while offline",
    body: "Each request is kept on the device under Pending actions instead of failing, even if the app is fully closed. Nothing is sent yet.",
    start: 7600,
    end: 18400,
  },
  {
    short: "Reopen online",
    title: "Back online, then the app is reopened",
    body: "The connection returning doesn't submit anything on its own. When the crew member next opens the app online and verifies their passcode, an app event triggers Redux-Saga to submit the pending requests.",
    start: 18400,
    end: 25400,
  },
  {
    short: "Submitted",
    title: "Submitted to Marlow",
    body: "Marlow's service has confirmed it received all four requests, so the app clears them from the device. This confirmation does not mean the bank transfers have completed.",
    start: 25400,
    end: 29000,
  },
];
const TOTAL = STEPS[STEPS.length - 1].end;
// The resting frame before the animation runs: the end of step 1.
const STATIC_T = STEPS[0].end - 1;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function stepAt(t: number) {
  const index = STEPS.findIndex((s) => t < s.end);
  return index === -1 ? STEPS.length - 1 : index;
}

/** Everything the phone shows at time t. A pure function of the timeline. */
function sceneAt(t: number) {
  const online = t < OFFLINE_AT || t >= RECONNECT_AT;
  const items: Item[] = [];
  let selected: number | null = null;
  let amount = "";
  let pressing = false;

  REQUESTS.forEach((r, i) => {
    const local = t - r.at;
    if (local < 0) return;
    if (local < OUTCOME) {
      // Filling in the form for this request.
      if (local >= SELECT) selected = r.who;
      if (local >= TYPE_FROM) {
        const share = Math.min(1, (local - TYPE_FROM) / (TYPE_TO - TYPE_FROM));
        amount = r.amount.slice(0, Math.ceil(share * r.amount.length));
      }
      pressing = local >= PRESS_FROM;
      return;
    }
    const who = BENEFICIARIES[r.who].name;
    if (i === 0) {
      items.push({ who, amount: r.amount, status: local < OUTCOME + SUBMIT_MS ? "submitting" : "submitted" });
      return;
    }
    // Offline requests wait until the app is reopened online, then go one by one.
    const flushStart = FLUSH_AT + (i - 1) * FLUSH_GAP;
    const status: Status = t < flushStart ? "pending" : t < flushStart + SUBMIT_MS ? "submitting" : "submitted";
    items.push({ who, amount: r.amount, status });
  });

  const overlay =
    t >= REOPEN_AT && t < REOPENED_AT
      ? {
          dots: t < PASSCODE_FROM ? 0 : Math.min(4, Math.ceil(((t - PASSCODE_FROM) / (PASSCODE_TO - PASSCODE_FROM)) * 4)),
          verified: t >= VERIFIED_AT,
        }
      : null;

  const pendingCount = items.filter((i) => i.status === "pending").length;
  const note = !online
    ? "Offline · New requests are kept as pending actions"
    : t >= RECONNECT_AT && t < REOPEN_AT && pendingCount
      ? "Back online · Pending requests wait until the app is reopened"
      : null;

  return { online, items, selected, amount, pressing, overlay, note };
}

const STATUS_TEXT: Record<Status, string> = {
  pending: "Pending · until the app reopens online",
  submitting: "Submitting…",
  submitted: "Request submitted to Marlow",
};

function Phone({ t }: { t: number }) {
  const s = sceneAt(t);
  return (
    <div className="mx-auto w-full max-w-72 rounded-[2rem] border border-line bg-bg p-2 shadow-sm" aria-hidden="true">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-bg">
        <div className="flex items-center justify-between gap-2 border-b border-line bg-surface px-4 py-3">
          <span className="text-sm font-semibold text-ink">Allotments</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink">
            <span
              className={`h-2 w-2 rounded-full ${s.online ? "bg-brand-violet" : "border border-dashed border-ink-faint"}`}
            />
            {s.online ? "Online" : "Offline"}
          </span>
        </div>
        <div className="min-h-9 border-b border-line px-4 py-2 text-[11px] leading-snug text-ink-muted">
          {s.note ?? "Request a transfer to a beneficiary"}
        </div>

        <div className="space-y-3 px-4 py-3">
          <div>
            <div className="text-[11px] font-medium text-ink">Beneficiary (fictional)</div>
            <div className="mt-1.5 space-y-1">
              {BENEFICIARIES.map((b, i) => (
                <div
                  key={b.name}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs motion-safe:transition-colors ${
                    s.selected === i ? "border-ink bg-surface" : "border-line"
                  }`}
                >
                  <span
                    className={`flex h-3 w-3 flex-none items-center justify-center rounded-full border ${
                      s.selected === i ? "border-brand-violet" : "border-ink-faint"
                    }`}
                  >
                    {s.selected === i && <span className="h-1.5 w-1.5 rounded-full bg-brand-violet" />}
                  </span>
                  <span className="text-ink">{b.name}</span>
                  <span className="text-ink-muted">{b.relation}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-ink">Amount in USD (fictional)</div>
            <div className="mt-1.5 flex h-8 items-center rounded-lg border border-line px-2.5 text-xs text-ink">
              {s.amount}
              {s.selected !== null && !s.pressing && <span className="ml-px h-3.5 w-px bg-ink" />}
            </div>
          </div>
          <div
            className={`rounded-full border py-2 text-center text-xs font-medium motion-safe:transition-transform ${
              s.pressing ? "scale-[0.97] border-ink bg-ink text-bg" : "border-line text-ink"
            }`}
          >
            Request transfer
          </div>
        </div>

        <div className="min-h-[13.5rem] border-t border-line px-4 py-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Your requests</div>
          {s.items.length === 0 ? (
            <div className="mt-2 text-xs text-ink-muted">None yet</div>
          ) : (
            <div className="mt-2 space-y-1.5">
              {s.items.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                    item.status === "pending"
                      ? "border-dashed border-ink-faint"
                      : item.status === "submitted"
                        ? "border-ink"
                        : "border-line"
                  }`}
                >
                  <span className="font-medium text-ink">
                    {item.who} · USD {item.amount}
                  </span>
                  <span className="block text-[11px] text-ink-muted">{STATUS_TEXT[item.status]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {s.overlay && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
            <div className="text-xs text-ink-muted">App reopened online</div>
            <div className="text-sm font-semibold text-ink">{s.overlay.verified ? "Passcode verified" : "Enter passcode"}</div>
            <div className="flex gap-2.5">
              {[0, 1, 2, 3].map((d) => (
                <span key={d} className={`h-3 w-3 rounded-full border border-ink ${d < s.overlay!.dots ? "bg-ink" : ""}`} />
              ))}
            </div>
            {s.overlay.verified && <div className="text-xs text-ink-muted">Submitting pending actions…</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export function AllotmentRequestDemo() {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(STATIC_T);
  const interacted = useRef(false);
  const [t, setT] = useState(STATIC_T);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  const seek = (next: number) => {
    tRef.current = next;
    setT(next);
  };

  // Start once, the first time the illustration scrolls into view, unless the
  // visitor prefers reduced motion or has already used the controls.
  useEffect(() => {
    const target = rootRef.current;
    if (!target || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interacted.current) return;
        interacted.current = true;
        tRef.current = 0;
        setT(0);
        setStarted(true);
        setPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = Math.min(TOTAL, tRef.current + (now - last));
      last = now;
      tRef.current = next;
      setT(next);
      if (next >= TOTAL) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const ended = t >= TOTAL;
  const togglePlay = () => {
    interacted.current = true;
    setStarted(true);
    if (!started || ended) {
      seek(0);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  };

  // Jumping to a step: while playing, start the step from its beginning;
  // while paused, show how the step ends, so the frame explains itself.
  const goTo = (index: number) => {
    interacted.current = true;
    setStarted(true);
    const target = STEPS[Math.min(Math.max(index, 0), STEPS.length - 1)];
    seek(playing ? target.start : target.end - 1);
  };

  const current = stepAt(t);
  const step = STEPS[current];
  const button =
    "rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink hover:border-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <figure className="my-8" aria-labelledby={`${id}-caption`}>
      <div ref={rootRef} className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        {/* Step explainer: where the sequence is, and what is happening. */}
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-medium uppercase tracking-wider text-ink-faint">
              Step {current + 1} of {STEPS.length}
            </div>
            <div className="flex gap-2" role="group" aria-label="Animation controls">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className={button}
                aria-label="Previous step"
              >
                ←
              </button>
              <button type="button" onClick={togglePlay} className={`${button} min-w-[5.5rem]`}>
                {playing ? "Pause" : ended ? "Replay" : started ? "Resume" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === STEPS.length - 1}
                className={button}
                aria-label="Next step"
              >
                →
              </button>
            </div>
          </div>
          <div className="mt-3 min-h-[8.5rem] sm:min-h-[5.5rem]">
            <div className="text-base font-semibold text-ink">{step.title}</div>
            <div className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</div>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-1.5">
            {STEPS.map((s, i) => {
              const fill = t >= s.end ? 1 : t <= s.start ? 0 : (t - s.start) / (s.end - s.start);
              return (
                <button
                  key={s.short}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={i === current ? "step" : undefined}
                  className="group rounded py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                    <span className="block h-full rounded-full bg-brand-violet" style={{ width: `${fill * 100}%` }} />
                  </span>
                  <span
                    className={`mt-1.5 hidden text-[11px] leading-tight sm:block ${
                      i === current ? "font-medium text-ink" : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {reducedMotion && !started && (
          <div className="mt-3 text-sm text-ink-faint">
            Motion is off because your device prefers reduced motion. Use the arrows to step through, or press Play.
          </div>
        )}
        <div aria-live="polite" className="sr-only">
          {started ? `Step ${current + 1} of ${STEPS.length}: ${step.title}. ${step.body}` : ""}
        </div>

        <div className="mt-6">
          <Phone t={t} />
        </div>

        <ol className="sr-only">
          {STEPS.map((s) => (
            <li key={s.short}>
              {s.title}: {s.body}
            </li>
          ))}
        </ol>
      </div>
      <figcaption id={`${id}-caption`} className="mt-3 text-sm leading-relaxed text-ink-faint">
        Illustrative reconstruction—not the production interface. Fictional data demonstrates the workflows described in
        this case study.
      </figcaption>
    </figure>
  );
}
