import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  // /en/ and /ghid/name/ are exported as folders with index.html, which plain hosting serves as is.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: isGitHubPages,
  },
};

export default nextConfig;
