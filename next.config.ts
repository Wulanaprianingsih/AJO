import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    domains: ['yethwydowkwysidpwrog.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
