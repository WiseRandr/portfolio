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

// ⚠️ Draft wording: Wise to confirm these reflect how they actually work.
export const principles = [
  {
    title: "Measure before optimizing",
    body: "Performance work starts with a profile and ends with a number, not a hunch.",
  },
  {
    title: "Ship small, ship often",
    body: "Small, reviewable changes keep releases predictable and teams unblocked.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard, screen reader, and contrast checks are part of done, not a later pass.",
  },
  {
    title: "Unblock the team first",
    body: "As a lead, my best work is often the decision or review that lets five people move.",
  },
] as const;

export const skills = {
  core: ["React", "Next.js", "TypeScript", "React Native", "JavaScript", "UI performance", "Responsive design"],
  alsoWith: ["Node.js", "REST APIs", "PostgreSQL", "Docker", "Google Maps SDK", "Angular"],
} as const;
