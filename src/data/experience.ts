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
      "Led a team of 5 engineers delivering a multi-platform application used by 50,000+ users",
      "Integrated the Google Maps Navigation SDK to improve route accuracy and user experience",
    ],
    caseStudy: "comin-multi-platform-app",
  },
  {
    company: "Marlow Navigation",
    title: "Frontend Engineer (Contract)",
    period: "2022 – 2026",
    location: "Cyprus · Remote",
    highlights: [
      "Built an offline-capable mobile application that improved operational efficiency for seafarers",
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
    title: "Frontend Engineer",
    period: "2020 – 2021",
    location: "France · Remote",
    highlights: [
      "Led the migration of the business platform from a legacy PHP site to Next.js",
      "Led frontend development of an e-commerce platform delivered within 6 months",
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
