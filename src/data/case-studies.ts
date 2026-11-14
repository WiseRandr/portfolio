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
    title: "Leading the apps and real-time backend of a ride-hailing platform",
    company: "COMIN",
    period: "2024 – 2026",
    role: "Lead Frontend Engineer (part-time)",
    summary:
      "Led a team of five engineers on a ride-hailing platform with ~2,000 rider and driver accounts: rider and driver apps, a NestJS API and an ops dashboard. Rebuilt live driver tracking and request handling as operational load changed.",
    stack: ["React Native", "TypeScript", "Redux", "NestJS", "Redis", "Stripe", "Google Navigation SDK"],
    outcome: "Completed rides: 4–5 → 20–30 a day",
    status: "published",
  },
  {
    slug: "marlow-offline-first-app",
    title: "A crew app that keeps working at sea",
    company: "Marlow Navigation",
    period: "2022 – 2026",
    role: "Frontend Engineer (contract)",
    summary:
      "Built features for Marlow's mobile app for seafarers and captains, including offline access to downloaded voyage documents and allotment requests held until the app is reopened online. Proposed the middleware API the team adopted.",
    stack: ["React Native", "TypeScript", "Redux-Saga", "React Native Keychain"],
    outcome: "Downloaded documents open offline",
    status: "published",
  },
  {
    slug: "flydesk-hybrid-work-scheduler",
    title: "Scheduling who works where, company by company",
    company: "FLYDESK",
    period: "2021 – 2022",
    role: "Frontend Engineer",
    summary:
      "Helped build a hybrid-work scheduler: a React Native app, a React configuration dashboard and a NestJS API, with queued bulk imports and a Neo4j replica for faster per-user queries.",
    stack: ["React Native", "React", "NestJS", "PostgreSQL", "Neo4j", "Kafka"],
    outcome: "Rules per company",
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
