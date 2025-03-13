import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    turbo: {
      sourceMaps: true,
      minify: true,
      treeShaking: true,
    },
    serverActions: {
      allowedOrigins: ["http://localhost:3000", "https://www.elevisio.online/"],
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
