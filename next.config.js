/** @type {import('next').NextConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avantika-immigration.com'

// Content Security Policy — tighten as third-party scripts are added
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https: http:",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net",
  "frame-src 'self' https://www.google.com https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

const nextConfig = {
  // ── Azure App Service deployment ───────────────────────────────────────────
  // Standalone mode packages everything needed to run the server into
  // .next/standalone/ — no separate `npm install` is required at runtime.
  // Azure's Oryx build system (and most CI/CD pipelines) set NODE_ENV=production
  // and never install node_modules on the host; standalone solves that cleanly.
  output: 'standalone',

  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for remote images
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',            value: 'nosniff' },
          { key: 'X-Frame-Options',                    value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',                   value: '1; mode=block' },
          { key: 'Referrer-Policy',                    value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',                 value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security',          value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Permitted-Cross-Domain-Policies',  value: 'none' },
          { key: 'Content-Security-Policy',            value: CSP },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Do not cache API routes
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Access-Control-Allow-Origin',  value: SITE_URL },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, X-Requested-With' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Legacy / common typo redirects
      { source: '/home',         destination: '/',                           permanent: true },
      { source: '/index',        destination: '/',                           permanent: true },
      { source: '/canada',       destination: '/destinations/canada',        permanent: true },
      { source: '/germany',      destination: '/destinations/germany',       permanent: true },
      { source: '/australia',    destination: '/destinations/australia',     permanent: true },
      { source: '/ielts',        destination: '/coaching/ielts',             permanent: true },
      { source: '/work-visa',    destination: '/services/work-visa',         permanent: true },
      { source: '/student-visa', destination: '/services/student-visa',      permanent: true },
      { source: '/check',        destination: '/eligibility',                permanent: true },
      { source: '/free-check',   destination: '/eligibility',                permanent: true },
    ]
  },

  // Silence known non-critical warnings in dev
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    }
    return config
  },
}

module.exports = nextConfig
