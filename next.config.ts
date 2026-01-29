import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: [
      'http://127.0.0.1:3000',
      'http://localhost:3000'
    ] as any,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}



export default nextConfig;
