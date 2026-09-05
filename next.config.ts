import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.toronto.ca" },
      { protocol: "https", hostname: "imadsyed333.github.io" },
      { protocol: "https", hostname: "dynamic.indigoimages.ca" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
};

export default nextConfig;
