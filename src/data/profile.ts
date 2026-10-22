// Single source of truth for profile facts shown on the site.
// Keep in sync with CLAUDE.md §4 at the workspace root, the resume and LinkedIn.
export const profile = {
  name: "Wise Randriamialison",
  shortName: "Wise R.",
  title: "Senior Frontend Engineer",
  tagline: "React · Next.js · TypeScript · Full-stack delivery",
  yearsOfExperience: "8+",
  email: "randriamialisonwise@gmail.com",
  location: "Toronto, Canada",
  links: {
    github: "https://github.com/wiserandr",
    linkedin: "https://www.linkedin.com/in/wise-randriamialison-a95a24181/",
  },
  resumePath: "./WiseRandriamialisonResume.pdf",
} as const;

export const sections = [
  "about",
  "experience",
  "skills",
  "achievements",
  "contact",
] as const;
