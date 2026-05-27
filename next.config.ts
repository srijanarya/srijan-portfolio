import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project so the stray /Users/srijan/package-lock.json
  // doesn't trigger the "multiple lockfiles" inferred-workspace-root warning.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
