import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
