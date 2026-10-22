// Card and header data for each case study. The long-form body lives in
// src/content/case-studies/<slug>.mdx. A study stays "draft" until Wise has
// replaced every placeholder with real, confirmed material.
export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  stack: string[];
  outcome: string;
  status: "draft" | "published";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "comin-multi-platform-app",
    title: "Leading a multi-platform app to 50,000+ users",
    company: "COMIN",
    period: "2024 – 2026",
    role: "Lead Frontend Engineer",
    summary:
      "Led a team of five engineers delivering a web and mobile application, including turn-by-turn routing with the Google Maps Navigation SDK.",
    stack: ["React", "React Native", "TypeScript", "Google Maps SDK"],
    outcome: "50,000+ users",
    status: "draft",
  },
  {
    slug: "marlow-offline-first-app",
    title: "An offline-first app for crews at sea",
    company: "Marlow Navigation",
    period: "2022 – 2026",
    role: "Frontend Engineer",
    summary:
      "Built a mobile application that keeps working without connectivity, replacing manual processes for seafarers.",
    stack: ["React Native", "TypeScript", "Offline sync"],
    outcome: "Works fully offline",
    status: "draft",
  },
  {
    slug: "opcadia-php-to-nextjs",
    title: "Migrating a legacy PHP platform to Next.js",
    company: "Opcadia",
    period: "2020 – 2021",
    role: "Frontend Engineer",
    summary:
      "Led the move from a basic PHP site to a modern Next.js application, giving the business a maintainable, SEO-friendly foundation.",
    stack: ["Next.js", "React", "SEO"],
    outcome: "PHP → Next.js",
    status: "draft",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
