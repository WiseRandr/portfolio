import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}/`}
      className="group flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-ink-faint"
    >
      <div className="flex items-center justify-between text-sm text-ink-faint">
        <span>{study.company}</span>
        <span>{study.period}</span>
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-snug tracking-tight">{study.title}</h3>
      <p className="mt-3 flex-1 text-ink-muted">{study.summary}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">{study.outcome}</span>
        <span className="text-sm font-medium text-ink group-hover:text-accent">
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
