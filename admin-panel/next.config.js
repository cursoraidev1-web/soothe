/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
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
  
  // Environment variables (already available via process.env)
  // No need to duplicate in env object for Next.js 13+
  
  // Output configuration
  // Note: 'standalone' is only for Docker/self-hosting
  // Vercel/Netlify handle Next.js natively, so we don't set it here
  // If deploying to Docker, uncomment the line below:
  // output: 'standalone',
  
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
