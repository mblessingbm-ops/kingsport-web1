import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // The quote page is a cart/checkout-style page — no SEO value.
        '/quote',
        // Server-only form-submission endpoint — nothing to crawl.
        '/api/',
      ],
    },
    sitemap: 'https://kingsport.co.zw/sitemap.xml',
  }
}
