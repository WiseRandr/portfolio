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
    title: "Lead Frontend Engineer (part-time)",
    period: "2024 – 2026",
    location: "France · Remote",
    highlights: [
      "Led a team of 5 engineers building a ride-hailing platform (rider and driver apps, NestJS API, ops dashboard) with ~2,000 rider and driver accounts",
      "Reworked live-ride handling with Redis for driver locations and job queues for ride requests, driver acceptance and payments; within two months, alongside marketing outreach, completed rides rose from 4–5 to 20–30 a day",
      "Helped integrate the Google Maps Navigation SDK so drivers navigate in-app, with route drawing and rerouting handled by the SDK",
    ],
    caseStudy: "comin-multi-platform-app",
  },
  {
    company: "Marlow Navigation",
    title: "Frontend Engineer (contract)",
    period: "2022 – 2026",
    location: "Cyprus · Remote",
    highlights: [
      "Built features for a React Native app used by seafarers and captains (sailing documents, payslips, voyage agendas, allotments), including offline access to downloaded documents and allotment requests held on the device until the app reopens online",
      "Proposed a middleware API, built and adopted by the team, giving the app one consistent entry point to Marlow's many services",
    ],
    caseStudy: "marlow-offline-first-app",
  },
  {
    company: "FLYDESK",
    title: "Frontend Engineer (full-time)",
    period: "2021 – 2022",
    location: "Hong Kong · Remote",
    highlights: [
      "Contributed to a hybrid-work scheduler (React Native app, React configuration dashboard, NestJS API) where each company sets its own scheduling policies",
      "Helped set up queued bulk imports through Kafka and a Neo4j graph representation, synchronized from PostgreSQL, for per-user relationship reads",
    ],
    caseStudy: "flydesk-hybrid-work-scheduler",
  },
  {
    company: "Opcadia",
    title: "Frontend Engineer (contract)",
    period: "2020 – 2021",
    location: "France · Remote",
    highlights: [
      "Led the rebuild of a legacy PHP study-plan store as a self-service Next.js platform with instant course previews and live enrolment status, delivered within 6 months",
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
