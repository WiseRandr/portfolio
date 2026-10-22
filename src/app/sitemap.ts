import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = caseStudies.filter((study) => study.status === "published");
  return [
    { url: `${profile.siteUrl}/` },
    ...published.map((study) => ({ url: `${profile.siteUrl}/work/${study.slug}/` })),
  ];
}
