import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/ContactCTA";
import { Container } from "@/components/Container";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    // Drafts are reachable for review but kept out of search results.
    robots: study.status === "draft" ? { index: false, follow: true } : undefined,
    openGraph: { title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  return (
    <>
      <article className="pb-8 pt-12 sm:pt-16">
        <Container className="max-w-3xl">
          <Link href="/#work" className="text-sm text-ink-muted hover:text-ink">
            <span aria-hidden="true">←</span> All work
          </Link>

          {study.status === "draft" && (
            <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
              Draft: this case study is still being written.
            </p>
          )}

          <header className="mt-8 border-b border-line pb-10">
            <p className="text-sm uppercase tracking-[0.14em] text-ink-faint">
              {study.company} · {study.period}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">{study.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{study.summary}</p>
            <dl className="mt-8 grid gap-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-ink-faint">Role</dt>
                <dd className="mt-1">{study.role}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Stack</dt>
                <dd className="mt-1">{study.stack.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">Outcome</dt>
                <dd className="mt-1">{study.outcome}</dd>
              </div>
            </dl>
          </header>

          <div className="prose-case">
            <Body />
          </div>
        </Container>
      </article>
      <ContactCTA />
    </>
  );
}
