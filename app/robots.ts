import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The quote page is a cart/checkout-style page — no SEO value.
      disallow: '/quote',
    },
    sitemap: 'https://kingsport.co.zw/sitemap.xml',
  }
}
