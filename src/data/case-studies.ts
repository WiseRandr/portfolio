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
    title: "Leading a ride-hailing platform to 50,000+ users",
    company: "COMIN",
    period: "2024 – 2026",
    role: "Lead Frontend Engineer",
    summary:
      "Led a team of five engineers across rider and driver apps, a NestJS API and an ops dashboard, and fixed the real-time problems that came with growth.",
    stack: ["React Native", "TypeScript", "Redux", "NestJS", "Redis", "Stripe", "Google Navigation SDK"],
    outcome: "50,000+ users",
    status: "published",
  },
  {
    slug: "marlow-offline-first-app",
    title: "A crew app that keeps working at sea",
    company: "Marlow Navigation",
    period: "2022 – 2026",
    role: "Frontend Engineer (contract)",
    summary:
      "Built features for Marlow's mobile app for seafarers and captains: sailing documents, payslips, voyage agendas and allotments, plus a crew-admin workspace, all usable offline.",
    stack: ["React Native", "TypeScript", "Offline caching"],
    outcome: "Works offline at sea",
    status: "published",
  },
  {
    slug: "opcadia-php-to-nextjs",
    title: "Rebuilding a legacy PHP store in Next.js",
    company: "Opcadia",
    period: "2020 – 2021",
    role: "Frontend Engineer (project lead)",
    summary:
      "Replaced a manual, PHP-based study-plan store with a self-service Next.js e-commerce app: instant course previews, live enrolment status, and better SEO.",
    stack: ["Next.js", "React", "API routes", "MongoDB", "Vercel"],
    outcome: "PHP → Next.js",
    status: "published",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
