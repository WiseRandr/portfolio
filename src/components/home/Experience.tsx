import Link from "next/link";
import { experience } from "@/data/experience";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading id="experience-title" eyebrow="Experience" title="Eight years, six teams, three continents" />
        <ol className="divide-y divide-line border-y border-line">
          {experience.map((role) => (
            <li key={role.company} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <p className="text-sm text-ink-faint">{role.period}</p>
              <div>
                <h3 className="font-medium">
                  {role.title} · <span className="text-ink-muted">{role.company}</span>
                </h3>
                <p className="text-sm text-ink-faint">{role.location}</p>
                <ul className="mt-3 space-y-1.5 text-ink-muted">
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {role.caseStudy && (
                  <Link
                    href={`/work/${role.caseStudy}/`}
                    className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    Read the case study <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
