import { principles, skills } from "@/data/profile";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title="Frontend depth, full-stack reach" />
          <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              I&apos;ve spent more than eight years building web and mobile products, the last six with remote teams
              based in France, Cyprus and Hong Kong. Most recently I led five engineers on a ride-hailing platform:
              rider and driver apps, a NestJS API and an ops dashboard.
            </p>
            <p>
              My depth is the frontend: React, Next.js, React Native and TypeScript. My work also reaches behind it. I
              led a legacy PHP store&apos;s rebuild in Next.js, built offline workflows for a crew app, and designed the
              live-location store and job queues behind COMIN&apos;s rides.
            </p>
          </div>
          <div className="mt-10 space-y-5">
            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-ink-faint">Core</h3>
              <p className="mt-2">{skills.core.join(" · ")}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.14em] text-ink-faint">Also work with</h3>
              <p className="mt-2 text-ink-muted">{skills.alsoWith.join(" · ")}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-6 text-sm uppercase tracking-[0.14em] text-ink-faint lg:mt-[4.75rem]">How I work</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <li key={item.title} className="rounded-2xl bg-surface p-5 sm:odd:last:col-span-2">
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
