/** @type {import('next').NextConfig} */
const nextConfig = {
  // All imagery is served from /public — no remote image hosts needed.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // 'unsafe-inline'/'unsafe-eval' in script-src are required by
            // Next.js dev + hydration runtime; styles need 'unsafe-inline'
            // for Tailwind's critical CSS and component style props.
            // No third-party JS runs on the site.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // va.vercel-scripts.com serves Vercel Analytics + Speed Insights
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              // analytics beacons post same-origin to /_vercel/*; allow the
              // script host too for completeness
              "connect-src 'self' https://va.vercel-scripts.com",
              // Allow the Google Maps embed on the contact page. Without this
              // an iframe falls back to default-src 'self' and is blocked.
              "frame-src https://www.google.com https://maps.google.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
