import { profile } from "@/data/profile";
import { Container } from "./Container";

export function ContactCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <div className="rounded-3xl bg-surface px-6 py-12 sm:px-12 sm:py-16">
          <h2 id="contact-title" className="max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            Hiring for a senior frontend or full-stack role?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">
            I&apos;m available now for fully remote, full-time or contract roles with teams across North America and Europe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 dark:text-bg"
            >
              {profile.email}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-medium hover:border-ink-faint"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-medium hover:border-ink-faint"
            >
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
