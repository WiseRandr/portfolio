// What happens each time the Marlow app is opened or reopened. Plain HTML, so
// the text is the diagram: no separate text equivalent is needed. The online
// branch lists its two steps without an order, because none is confirmed.

import type { ReactNode } from "react";

function Step({ children }: { children: ReactNode }) {
  return (
    <div role="listitem" className="rounded-xl border border-line bg-bg px-4 py-2.5 text-center text-sm font-medium text-ink">
      {children}
    </div>
  );
}

function Down() {
  return (
    <svg viewBox="0 0 12 24" className="mx-auto h-6 w-3 text-ink-muted" aria-hidden="true">
      <path d="M6 1 V21 M2 17 L6 22 L10 17" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Branch({ label, tone, items, note }: { label: string; tone: "online" | "offline"; items: string[]; note?: string }) {
  return (
    <div
      className={`rounded-xl border-2 bg-bg px-4 py-3 ${
        tone === "online" ? "border-brand-violet" : "border-dashed border-ink-faint"
      }`}
    >
      <div className="text-sm font-semibold text-ink">{label}</div>
      <div role="list" className="mt-2 space-y-1.5 text-sm leading-snug text-ink-muted">
        {items.map((item) => (
          <div key={item} role="listitem" className="flex gap-2">
            <span aria-hidden="true">–</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      {note && <div className="mt-2 text-xs leading-relaxed text-ink-faint">{note}</div>}
    </div>
  );
}

export function PasscodeFlowDiagram() {
  return (
    <figure className="my-8" aria-labelledby="passcode-flow-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div role="list" aria-label="Every time the app opens" className="mx-auto max-w-xs">
          <Step>Open or reopen the app</Step>
          <Down />
          <Step>Verify passcode</Step>
          <Down />
          <Step>Check connectivity</Step>
        </div>
        <Down />
        <div className="mt-1 grid gap-4 sm:grid-cols-2">
          <Branch
            label="If online"
            tone="online"
            items={["Fetch current information", "Submit pending actions; clear each once the service confirms it"]}
            note="Fetching and submitting both start once the app is online; no fixed order between them is implied."
          />
          <Branch
            label="If offline"
            tone="offline"
            items={[
              "Show saved information",
              "Keep downloaded documents available",
              "Show the offline indicator",
              "Keep pending actions for the next online reopening",
            ]}
          />
        </div>
      </div>
      <figcaption id="passcode-flow-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Simplified flow of the behaviour described in this case study. Storage and security details are omitted.
      </figcaption>
    </figure>
  );
}
