// A simplified, conceptual data flow for FLYDESK, drawn from recollection.
// Deliberately leaves out schemas, event mechanisms (no CDC, outbox, triggers
// or connectors are claimed) and deployment topology. Static on purpose.

type Tone = "plain" | "store" | "queue" | "read";

const TONE: Record<Tone, string> = {
  plain: "border-line bg-bg",
  store: "border-brand-violet bg-brand-violet-soft",
  queue: "border-dashed border-ink-faint bg-bg",
  read: "border-brand-violet bg-bg",
};

type Node = { title: string; detail?: string; tone?: Tone };

function DownArrow() {
  return (
    <svg viewBox="0 0 12 20" className="mx-auto block h-5 w-3 text-ink-muted" aria-hidden="true">
      <path d="M6 1 V16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M1.5 13 L6 18.5 L10.5 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function Flow({ label, title, nodes, note }: { label: string; title: string; nodes: Node[]; note: string }) {
  return (
    <div className="min-w-0">
      <h3 style={{ margin: 0 }} className="text-sm font-semibold text-ink">
        <span className="text-ink-muted">{label}.</span> {title}
      </h3>
      <div role="list" aria-label={`${title}, in order`} className="mt-3">
        {nodes.map((node, i) => (
          <div key={node.title} role="listitem">
            {i > 0 && <DownArrow />}
            <div className={`rounded-lg border px-3 py-2 text-center ${TONE[node.tone ?? "plain"]}`}>
              <div className="text-sm font-medium text-ink">{node.title}</div>
              {node.detail && <div className="text-xs text-ink-muted">{node.detail}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm leading-relaxed text-ink-muted">{note}</div>
    </div>
  );
}

export function FlydeskDataFlowDiagram() {
  return (
    <figure className="my-8" aria-labelledby="flydesk-data-flow-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div className="rounded-lg border border-line bg-bg px-3 py-2.5 text-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-ink">
            <span className="font-medium">Mobile app</span>
            <span className="text-ink-muted">and</span>
            <span className="font-medium">Dashboard</span>
            <span aria-hidden="true" className="text-ink-muted">
              →
            </span>
            <span className="sr-only">talk to the</span>
            <span className="font-medium">NestJS API</span>
          </div>
          <div className="mt-1 text-center text-xs text-ink-muted">
            The clients only talk to the API; they never reach the data stores directly.
          </div>
        </div>

        <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-6">
          <Flow
            label="A"
            title="Bulk import"
            nodes={[
              { title: "Company import", detail: "Many people at once" },
              { title: "Kafka", detail: "Queued records", tone: "queue" },
              { title: "Import processing", detail: "Individual record processing" },
              { title: "PostgreSQL", detail: "Primary store", tone: "store" },
            ]}
            note="The queue separates receiving an import from processing it. How much load reaches the database depends on processing concurrency and capacity, not on the queue alone."
          />
          <Flow
            label="B"
            title="Relationship reads"
            nodes={[
              { title: "PostgreSQL", detail: "Primary store", tone: "store" },
              { title: "Synchronization process", detail: "Kafka-backed", tone: "queue" },
              { title: "Neo4j", detail: "Secondary graph representation", tone: "read" },
              { title: "NestJS API", detail: "Reads per-user relationships" },
            ]}
            note="PostgreSQL stays the source of truth; Neo4j is a graph read model synchronized from it."
          />
        </div>

        <div className="mt-6 border-t border-line pt-4 text-sm leading-relaxed">
          <span className="font-medium text-ink">Trade-off:</span>{" "}
          <span className="text-ink-muted">
            The graph representation supported the relationship-heavy reads, but introduced another store to
            synchronize and operate.
          </span>
        </div>
      </div>
      <figcaption id="flydesk-data-flow-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Simplified conceptual data flow based on my recollection of the project. Detailed schemas, event mechanisms,
        and deployment topology are omitted.
      </figcaption>
    </figure>
  );
}
