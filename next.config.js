/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimize for production
  poweredByHeader: false,

  // Optimize images if any are added later
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
