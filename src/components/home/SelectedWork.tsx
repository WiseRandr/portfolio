import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "../CaseStudyCard";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading id="work-title" eyebrow="Selected work" title="Problems I've owned end to end" />
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
