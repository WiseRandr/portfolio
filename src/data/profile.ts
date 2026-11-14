// Single source of truth for profile facts shown on the site.
// Keep in sync with CLAUDE.md §4 at the workspace root, the resume and LinkedIn.
export const profile = {
  name: "Wise Randriamialison",
  shortName: "Wise R.",
  title: "Senior Frontend Engineer",
  headline: "I build reliable web and mobile products with React and TypeScript.",
  summary:
    "Senior Frontend Engineer with 8+ years building web and mobile products with React, Next.js, React Native and TypeScript, and hands-on full-stack work with NestJS, Redis and job queues.",
  // Future openness, not a statement about residence, work authorization or working hours.
  availability: "Open to fully remote, full-time or contract roles with teams in Europe and elsewhere.",
  openTo: "Open to senior frontend and full-stack roles",
  yearsOfExperience: "8+",
  email: "randriamialisonwise@gmail.com",
  // Current location is deliberately not published (CLAUDE.md §4).
  location: "Remote",
  siteUrl: "https://wiserandr.github.io/portfolio",
  links: {
    github: "https://github.com/wiserandr",
    linkedin: "https://www.linkedin.com/in/wise-randriamialison-a95a24181/",
  },
  resumeFile: "/WiseRandriamialisonResume.pdf",
} as const;

// Verified contributions first; account counts are operating context, not a highlight.
export const proofPoints = [
  { value: "8+ yrs", label: "building web and mobile products" },
  { value: "5", label: "engineers led on a ride-hailing platform" },
  { value: "6 months", label: "to deliver a PHP → Next.js rebuild I led" },
  { value: "Offline", label: "voyage documents and requests for crews at sea" },
] as const;

// Each principle is a concrete example from a case study (revised 2026-11-14).
export const principles = [
  {
    title: "Work across the stack",
    body: "At COMIN I worked on both mobile apps, the NestJS API, Stripe payments and the ops dashboard, and took the product live with the owner.",
  },
  {
    title: "Fix the cause, not the symptom",
    body: "When apps froze and driver positions jumped, I looked at where live locations were stored, not just at the map. They moved to Redis.",
  },
  {
    title: "Control how work is processed",
    body: "Ride requests and payments arrived in bursts, so I moved them onto job queues and serialized driver acceptance instead of handling everything at once.",
  },
  {
    title: "Code the whole team can work in",
    body: "A shared module for both COMIN apps and one Redux pattern meant anyone on the team could work in any part of the code.",
  },
  {
    title: "Write it down",
    body: "On Marlow, as work spread across teams, I made documentation a team practice: API expectations, decisions and owners.",
  },
] as const;

export const skills = {
  core: ["React", "Next.js", "TypeScript", "React Native", "JavaScript", "UI performance", "Responsive design"],
  alsoWith: [
    "Node.js",
    "NestJS",
    "REST APIs",
    "Redis",
    "Stripe",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Redux",
    "Redux-Saga",
    "Expo",
    "Google Maps Navigation SDK",
  ],
} as const;
