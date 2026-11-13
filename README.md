# Wise Randriamialison: Portfolio

Personal portfolio of Wise Randriamialison, Senior Frontend Engineer.

Built with **Next.js 16** (App Router, static export), **React 19**, **TypeScript**, **Tailwind CSS 4** and **MDX**. Deployed to GitHub Pages by GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/portfolio/

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Export the static site to `out/` |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run lint` | Run ESLint (Next.js core web vitals and TypeScript rules) |

## Project structure

```
src/
├── app/                    Routes: homepage, /work/[slug], sitemap, robots
├── components/             UI components (homepage sections under home/)
├── content/case-studies/   Long-form case studies, one MDX file per slug
├── data/                   Profile facts, experience, case study metadata
└── assets/                 Images imported by components
public/                     Files served as-is (resume PDF, favicon, OG image)
```

## Editing content

- **Profile facts** (title, summary, links, proof points): `src/data/profile.ts`
- **Experience**: `src/data/experience.ts`
- **Case studies**:
  1. Write the body in `src/content/case-studies/<slug>.mdx`, replacing every `<Placeholder>` block.
  2. Set `status: "published"` for that slug in `src/data/case-studies.ts`.

  Draft studies show a "Draft" banner, are hidden from search engines and are left out of the sitemap.

## Base path and custom domain

The site is served from `/portfolio` on GitHub Pages. When the custom domain is live, build with `NEXT_PUBLIC_BASE_PATH=""` and update `siteUrl` in `src/data/profile.ts`.
