import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dcjgjjbi3/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Add timeout and retry configuration
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
    // Reduce timeout for faster failures
    unoptimized: false,
  },
  // Add experimental features for better error handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
    reactCompiler: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
