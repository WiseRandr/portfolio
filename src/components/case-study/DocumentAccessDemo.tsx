"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

// An original, schematic reconstruction of the Marlow document list with
// fictional documents. Online and offline views share one set of "downloaded"
// documents, so the two stay consistent. Nothing here touches the network or
// the device: downloading and sharing are simulated.

type Mode = "online" | "offline";
type Doc = { id: string; title: string; date: string };

const DOCS: Doc[] = [
  { id: "crew-list", title: "Crew list · MV Example Tern", date: "Issued 3 Feb" },
  { id: "briefing", title: "Voyage briefing · Leg 2", date: "Issued 9 Feb" },
  { id: "port-guide", title: "Port arrival guide · Port Example", date: "Issued 11 Feb" },
  { id: "checklist", title: "Safety familiarisation checklist", date: "Issued 14 Feb" },
];

const SWIPE_PX = 30;
const TOAST_MS = 4500;

const pill =
  "rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-medium text-ink hover:border-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function SavedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 flex-none text-brand-violet" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.2 L9 12.6 L13.6 7.6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NotSavedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 flex-none text-ink-faint" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2.5" />
      <path d="M10 6 V13 M7 10.5 L10 13.5 L13 10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentRow({
  doc,
  mode,
  saved,
  trayOpen,
  setTrayOpen,
  onOpen,
  onDownload,
  onShare,
}: {
  doc: Doc;
  mode: Mode;
  saved: boolean;
  trayOpen: boolean;
  setTrayOpen: (open: boolean) => void;
  onOpen: () => void;
  onDownload: () => void;
  onShare: () => void;
}) {
  const startX = useRef<number | null>(null);
  const trayId = useId();
  const status = saved ? "Saved on this device" : mode === "offline" ? "Not available offline" : "Not downloaded";

  // Swiping right to left reveals the actions; left to right hides them. The
  // release is handled on the whole row, since it can land on the tray.
  function onPointerDown(event: PointerEvent) {
    startX.current = event.clientX;
  }
  function onPointerUp(event: PointerEvent) {
    if (startX.current === null) return;
    const dx = event.clientX - startX.current;
    startX.current = null;
    if (dx < -SWIPE_PX) setTrayOpen(true);
    else if (dx > SWIPE_PX) setTrayOpen(false);
  }

  return (
    <div
      role="listitem"
      onPointerUp={onPointerUp}
      className="relative overflow-hidden border-b border-line last:border-b-0"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerCancel={() => (startX.current = null)}
        style={{ touchAction: "pan-y", transform: trayOpen ? "translateX(-9rem)" : undefined }}
        className="relative z-10 flex items-center gap-2.5 bg-bg px-3 py-2.5 motion-safe:transition-transform motion-safe:duration-200"
      >
        {saved ? <SavedIcon /> : <NotSavedIcon />}
        <div className="min-w-0 flex-1">
          {saved ? (
            <button
              type="button"
              data-doc={doc.id}
              onClick={onOpen}
              className="block max-w-full truncate text-left text-sm font-medium text-ink underline decoration-line underline-offset-2 hover:decoration-ink-faint focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            >
              {doc.title}
            </button>
          ) : (
            <div className={`truncate text-sm font-medium ${mode === "offline" ? "text-ink-muted" : "text-ink"}`}>{doc.title}</div>
          )}
          <div className="mt-0.5 text-xs text-ink-muted">
            {doc.date} · <span className={saved ? "font-medium text-ink" : undefined}>{status}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setTrayOpen(!trayOpen)}
          aria-expanded={trayOpen}
          aria-controls={trayOpen ? trayId : undefined}
          aria-label={`Actions for ${doc.title}`}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-ink-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <circle cx="4.5" cy="10" r="1.6" fill="currentColor" />
            <circle cx="10" cy="10" r="1.6" fill="currentColor" />
            <circle cx="15.5" cy="10" r="1.6" fill="currentColor" />
          </svg>
        </button>
      </div>
      {trayOpen && (
        <div id={trayId} className="absolute inset-y-0 right-0 z-0 flex w-36 items-stretch bg-surface">
          <button
            type="button"
            onClick={onDownload}
            className="flex-1 border-l border-line px-1 text-xs font-medium text-ink hover:bg-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            {saved ? "Remove download" : "Download"}
          </button>
          <button
            type="button"
            onClick={onShare}
            className="flex-1 border-l border-line px-1 text-xs font-medium text-ink hover:bg-bg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentScreen({
  mode,
  saved,
  setSaved,
  initialTray,
  hidden,
}: {
  mode: Mode;
  saved: Set<string>;
  setSaved: (update: (prev: Set<string>) => Set<string>) => void;
  initialTray: string | null;
  hidden: boolean;
}) {
  const offline = mode === "offline";
  const titleId = useId();
  const [tray, setTray] = useState<string | null>(initialTray);
  const [preview, setPreview] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; key: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastCount = useRef(0);
  const previewHeading = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastOpened = useRef<string | null>(null);

  // A preview only exists for a document that is still saved on the device.
  const previewDoc = preview && saved.has(preview) ? DOCS.find((d) => d.id === preview) : undefined;

  useEffect(() => {
    if (previewDoc) previewHeading.current?.focus();
  }, [previewDoc]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function notify(text: string) {
    if (timer.current) clearTimeout(timer.current);
    toastCount.current += 1;
    setToast({ text, key: toastCount.current });
    timer.current = setTimeout(() => setToast(null), TOAST_MS);
  }

  function download(doc: Doc) {
    if (saved.has(doc.id)) {
      setSaved((prev) => {
        const next = new Set(prev);
        next.delete(doc.id);
        return next;
      });
      notify(offline ? "Download removed. It can't be downloaded again until you're online." : "Download removed from this device.");
    } else if (offline) {
      notify("You're offline. Connect to the internet to download this document.");
    } else {
      setSaved((prev) => new Set(prev).add(doc.id));
      notify("Saved on this device (simulated). It stays available offline until you remove it.");
    }
  }

  function share() {
    notify(offline ? "You're offline. Sharing needs a connection, even for downloaded documents." : "Simulated share: a share sheet would open here. Nothing was sent.");
  }

  // Back to the list, with focus on the document that was open.
  function close() {
    setPreview(null);
    requestAnimationFrame(() =>
      listRef.current?.querySelector<HTMLElement>(`[data-doc="${lastOpened.current}"]`)?.focus(),
    );
  }

  return (
    <section aria-labelledby={titleId} className={`min-w-0 ${hidden ? "hidden sm:block" : ""}`}>
      <h3 id={titleId} style={{ margin: "0 0 0.75rem" }} className="text-sm font-medium text-ink">
        {offline ? "Offline" : "Online"}
      </h3>
      <div className="mx-auto w-full max-w-80 rounded-[2rem] border border-line bg-bg p-2 shadow-sm">
        <div className="relative flex min-h-[28rem] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-bg">
          <div className="border-b border-line bg-surface px-4 py-3">
            <div className="text-sm font-semibold text-ink">Voyage documents</div>
            {offline ? (
              <div className="mt-1.5 rounded-md border border-dashed border-ink-faint bg-bg px-2 py-1.5 text-xs text-ink">
                <span className="font-medium">Offline · Showing saved information</span>
                <span className="block text-ink-muted">Last updated 08:40 (fictional). The list may not be current.</span>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-brand-violet" aria-hidden="true" />
                Online · Current information
              </div>
            )}
          </div>

          {previewDoc ? (
            <div className="flex flex-1 flex-col px-4 py-3">
              <button type="button" onClick={close} className={`${pill} self-start`}>
                ← Documents
              </button>
              <div ref={previewHeading} tabIndex={-1} className="mt-3 text-sm font-semibold text-ink focus:outline-none">
                {previewDoc.title}
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">
                {previewDoc.date} · Opened from the copy saved on this device
              </div>
              <div className="mt-3 flex-1 rounded-lg border border-line bg-surface p-3" aria-hidden="true">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Fictional document</div>
                {[92, 78, 85, 60, 88, 70, 45].map((w, i) => (
                  <div key={i} className="mt-2 h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ) : (
            <div ref={listRef} role="list" aria-label={`${offline ? "Offline" : "Online"} document list`} className="flex-1">
              {DOCS.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  doc={doc}
                  mode={mode}
                  saved={saved.has(doc.id)}
                  trayOpen={tray === doc.id}
                  setTrayOpen={(open) => setTray(open ? doc.id : null)}
                  onOpen={() => {
                    lastOpened.current = doc.id;
                    setPreview(doc.id);
                  }}
                  onDownload={() => download(doc)}
                  onShare={share}
                />
              ))}
            </div>
          )}

          <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-3 bottom-3">
            {toast && (
              <div key={toast.key} className="rounded-lg bg-ink px-3 py-2 text-xs leading-snug text-bg shadow-md">
                {toast.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DocumentAccessDemo() {
  const id = useId();
  const [saved, setSaved] = useState<Set<string>>(() => new Set(["crew-list"]));
  const [view, setView] = useState<Mode>("offline");

  const toggle = (mode: Mode) =>
    `rounded-full px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      view === mode ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"
    }`;

  return (
    <figure className="my-8" aria-labelledby={`${id}-caption`}>
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div className="text-sm leading-relaxed text-ink-muted">
          The same fictional list, online and offline. Swipe a row from right to left, or use its{" "}
          <span className="font-medium text-ink">⋯</span> button, to show Download and Share. Open a saved document by
          its title. Sharing is simulated and sends nothing.
        </div>
        <div role="group" aria-label="Connection shown" className="mt-4 inline-flex rounded-full border border-line bg-bg p-1 sm:hidden">
          <button type="button" aria-pressed={view === "online"} onClick={() => setView("online")} className={toggle("online")}>
            Online
          </button>
          <button type="button" aria-pressed={view === "offline"} onClick={() => setView("offline")} className={toggle("offline")}>
            Offline
          </button>
        </div>
        <div className="mt-5 grid gap-8 sm:grid-cols-2 sm:gap-5">
          <DocumentScreen mode="online" saved={saved} setSaved={setSaved} initialTray="briefing" hidden={view !== "online"} />
          <DocumentScreen mode="offline" saved={saved} setSaved={setSaved} initialTray={null} hidden={view !== "offline"} />
        </div>
      </div>
      <figcaption id={`${id}-caption`} className="mt-3 text-sm leading-relaxed text-ink-faint">
        Illustrative reconstruction—not the production interface. Fictional data demonstrates the workflows described in
        this case study.
      </figcaption>
    </figure>
  );
}
