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
    title: "Reliable live tracking and ride handling for a ride-hailing platform",
    company: "COMIN",
    period: "2024 – 2026",
    role: "Lead Frontend Engineer (part-time)",
    summary:
      "Led five engineers across rider and driver apps, a NestJS API and an ops dashboard. Moved live driver locations to Redis and ride requests, driver acceptance and payments onto job queues.",
    stack: ["React Native", "TypeScript", "Redux", "NestJS", "Redis", "Stripe", "Google Navigation SDK"],
    outcome: "Completed rides: 4–5 → 20–30 a day, alongside marketing outreach",
    status: "published",
  },
  {
    slug: "marlow-offline-first-app",
    title: "Voyage documents and requests under unreliable connectivity",
    company: "Marlow Navigation",
    period: "2022 – 2026",
    role: "Frontend Engineer (contract)",
    summary:
      "Built offline features for a React Native crew app: downloaded voyage documents open at sea, and allotment requests made offline wait on the device until the app reopens online. Proposed the middleware API the team adopted.",
    stack: ["React Native", "TypeScript", "Redux-Saga", "React Native Keychain"],
    outcome: "Downloaded documents open offline",
    status: "published",
  },
  {
    slug: "flydesk-hybrid-work-scheduler",
    title: "Company-specific scheduling policies for hybrid teams",
    company: "FLYDESK",
    period: "2021 – 2022",
    role: "Frontend Engineer",
    summary:
      "Contributed to a hybrid-work scheduler (React Native app, React dashboard, NestJS API) where schedules follow each company's policies and group visibility. Helped set up Kafka-queued imports and a Neo4j read model.",
    stack: ["React Native", "React", "NestJS", "PostgreSQL", "Neo4j", "Kafka"],
    outcome: "Configurable policies, not hard-coded rules",
    status: "published",
  },
  {
    slug: "opcadia-php-to-nextjs",
    title: "Replacing a manual course-request process with self-service previews",
    company: "Opcadia",
    period: "2020 – 2021",
    role: "Frontend Engineer (contract), project lead",
    summary:
      "Led the rebuild of a legacy PHP study-plan store in Next.js: customers configure a course, preview their plan immediately and follow their enrolment status.",
    stack: ["Next.js", "React", "API routes", "MongoDB", "Vercel"],
    outcome: "Delivered within 6 months",
    status: "published",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
