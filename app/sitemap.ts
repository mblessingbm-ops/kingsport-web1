import type { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { journalPosts } from '@/data/journal'

const BASE = 'https://kingsport.co.zw'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/catalog`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/fabric-glossary`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/journal`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/imported-gifts`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    // /quote intentionally omitted — disallowed in robots.ts (cart-style page)
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/catalog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${BASE}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...productRoutes, ...journalRoutes]
}
