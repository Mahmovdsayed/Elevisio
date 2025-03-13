import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: process.env.NODE_ENV !== "production",
  productionBrowserSourceMaps: process.env.NODE_ENV !== "production",
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    turbo: {
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
