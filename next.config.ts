import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Served from /portfolio on GitHub Pages until the custom domain is live.
// Set NEXT_PUBLIC_BASE_PATH="" at build time once it is.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default createMDX()(nextConfig);
