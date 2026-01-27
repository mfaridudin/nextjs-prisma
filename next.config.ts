import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: [
      'http://127.0.0.1:3000',
      'http://localhost:3000'
    ] as any,
  },
}

export default nextConfig;
