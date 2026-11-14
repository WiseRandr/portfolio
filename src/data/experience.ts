// Confirmed with Wise (CLAUDE.md §4). Only approved claims go here.
export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  highlights: string[];
  caseStudy?: string;
};

export const experience: Role[] = [
  {
    company: "COMIN",
    title: "Lead Frontend Engineer (Part-time)",
    period: "2024 – 2026",
    location: "France · Remote",
    highlights: [
      "Led a team of 5 engineers building a ride-hailing platform (rider and driver apps, NestJS API, ops dashboard) with ~2,000 rider and driver accounts",
      "Reworked live-ride handling with Redis for driver locations and job queues for ride requests, driver acceptance and payments; within two months, alongside marketing outreach, completed rides rose from 4–5 to 20–30 a day",
      "Helped integrate the Google Maps Navigation SDK so drivers navigate in-app, with rerouting at no extra cost under COMIN's per-ride billing",
    ],
    caseStudy: "comin-multi-platform-app",
  },
  {
    company: "Marlow Navigation",
    title: "Frontend Engineer (Contract)",
    period: "2022 – 2026",
    location: "Cyprus · Remote",
    highlights: [
      "Built features for a mobile app used by seafarers and captains to manage sailing documents, payslips, voyage agendas and allotments, with offline access to downloaded documents and allotment requests held until the app is reopened online",
      "Proposed a middleware API, built and adopted by the team, giving the app one consistent entry point to Marlow's many services",
    ],
    caseStudy: "marlow-offline-first-app",
  },
  {
    company: "FLYDESK",
    title: "Frontend Engineer",
    period: "2021 – 2022",
    location: "Hong Kong · Remote",
    highlights: [
      "Helped build a hybrid-work scheduler (React Native app, React configuration dashboard, NestJS API) where each company sets its own location and time-slot rules",
      "Helped set up queued bulk imports through Kafka and a Neo4j replica of PostgreSQL that sped up per-user queries",
    ],
    caseStudy: "flydesk-hybrid-work-scheduler",
  },
  {
    company: "Opcadia",
    title: "Frontend Engineer (Contract)",
    period: "2020 – 2021",
    location: "France · Remote",
    highlights: [
      "Led the rebuild of a legacy PHP store as a self-service Next.js e-commerce platform, delivered within 6 months",
    ],
    caseStudy: "opcadia-php-to-nextjs",
  },
  {
    company: "Santosha Consulting",
    title: "Frontend Engineer",
    period: "2018 – 2020",
    location: "Madagascar",
    highlights: ["Delivered multiple frontend projects with React and Angular"],
  },
  {
    company: "ETech Consulting",
    title: "Software Engineer",
    period: "2017 – 2018",
    location: "Madagascar",
    highlights: ["Built frontend features with React and Angular, and web apps with Symfony and WordPress"],
  },
];
