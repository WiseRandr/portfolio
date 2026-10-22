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
      "Led a team of 5 engineers building a ride-hailing platform (rider and driver apps, NestJS API, ops dashboard) used by 50,000+ riders and drivers",
      "Stabilised live rides with Redis for driver locations and a queue for payments and ride requests; ride completion rate reached 55%",
      "Integrated the Google Maps Navigation SDK so drivers navigate in-app, with rerouting handled by the SDK at no extra cost",
    ],
    caseStudy: "comin-multi-platform-app",
  },
  {
    company: "Marlow Navigation",
    title: "Frontend Engineer (Contract)",
    period: "2022 – 2026",
    location: "Cyprus · Remote",
    highlights: [
      "Built features for a mobile app used by seafarers and captains to manage sailing documents, payslips, voyage agendas and allotments, with offline support",
      "Proposed a middleware API, built and adopted by the team, giving the app one secure entry point to Marlow's many services",
    ],
    caseStudy: "marlow-offline-first-app",
  },
  {
    company: "FLYDESK",
    title: "Frontend Engineer",
    period: "2021 – 2022",
    location: "Hong Kong · Remote",
    highlights: [
      "Delivered and maintained applications for international clients with distributed teams",
    ],
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
