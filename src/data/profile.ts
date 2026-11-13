// Single source of truth for profile facts shown on the site.
// Keep in sync with CLAUDE.md §4 at the workspace root, the resume and LinkedIn.
export const profile = {
  name: "Wise Randriamialison",
  shortName: "Wise R.",
  title: "Senior Frontend Engineer",
  headline: "I build frontends that hold up at scale.",
  summary:
    "Senior frontend engineer with 8+ years shipping web and mobile products with React, Next.js, and TypeScript. Experienced working remotely with teams across North America and Europe.",
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

export const proofPoints = [
  { value: "50,000+", label: "users on a product I helped lead" },
  { value: "5", label: "engineers led" },
  { value: "8+ yrs", label: "building production software" },
  { value: "PHP → Next.js", label: "platform migration led" },
] as const;

// Confirmed with Wise 2026-10-22. Each principle is backed by a case study.
export const principles = [
  {
    title: "Own the whole problem",
    body: "I learn the system end to end, from the apps to the API, and stay with a problem until it's solved, so my decisions hold up across the stack.",
  },
  {
    title: "Fix the cause, not the symptom",
    body: "When apps freeze or data lags, I look at the architecture behind it, not just the screen. That's how live driver locations ended up in Redis.",
  },
  {
    title: "Readable over clever",
    body: "Code is read far more often than it's written. I choose the clear solution over the complex one, so the whole team can work on it.",
  },
  {
    title: "Integrity and security before speed",
    body: "Correct data and a safe system come before shipping fast: one secure API in front of many services, and payments that go through a queue.",
  },
  {
    title: "Write it down",
    body: "Across teams, chat and calls stop being enough. Documentation becomes the source of truth, so I make it part of the work.",
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
    "Expo",
    "Google Maps Navigation SDK",
  ],
} as const;
