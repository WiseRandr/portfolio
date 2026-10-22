import { proofPoints } from "@/data/profile";
import { Container } from "../Container";

export function ProofBar() {
  return (
    <section aria-label="Highlights">
      <Container>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="flex flex-col-reverse justify-end rounded-2xl bg-surface px-5 py-4">
              <dt className="mt-1 text-sm text-ink-muted">{point.label}</dt>
              <dd className="whitespace-nowrap font-serif text-2xl">{point.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
