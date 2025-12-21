/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // ESLint configuration - ignore during builds to avoid config conflicts
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Do NOT set output: 'standalone' - Vercel handles Next.js natively
  // Setting output causes file tracing errors on Vercel
  // Only use output: 'standalone' for Docker deployments
  
  images: {
    // Allow images from backend API (uploads)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',
        pathname: '/uploads/**',
      },
      // Add your production backend domain here
      // {
      //   protocol: 'https',
      //   hostname: 'your-backend-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
    // Optimize images in production
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers (handled by hosting provider in production)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
      },
    ],
  },
    ]
  },
}

module.exports = nextConfig
