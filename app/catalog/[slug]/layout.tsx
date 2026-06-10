import type { Metadata } from 'next'
import { products } from '@/data/products'

// app/catalog/[slug]/page.tsx is a client component, so per-product
// metadata, static params, and structured data live here in the
// (server) segment layout.

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return { title: 'Product not found' }

  // Trim long catalogue descriptions to a meta-friendly length.
  const description =
    product.description.length > 160
      ? `${product.description.slice(0, 157).trimEnd()}…`
      : product.description

  return {
    title: product.name,
    description,
    alternates: { canonical: `/catalog/${product.slug}` },
    openGraph: {
      title: `${product.name} | Kingsport Investments`,
      description,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default function ProductLayout({ params, children }: Props) {
  const product = products.find((p) => p.slug === params.slug)

  const jsonLd = product
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          sku: product.id.toUpperCase(),
          description: product.description,
          image: [product.image, ...(product.additionalImages ?? [])].map(
            (src) => `https://kingsport.co.zw${src}`,
          ),
          material: product.materials.join(', '),
          brand: {
            '@type': 'Brand',
            name: 'Kingsport Investments',
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'Kingsport Investments (Pvt) Ltd',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Catalogue',
              item: 'https://kingsport.co.zw/catalog',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: product.name,
              item: `https://kingsport.co.zw/catalog/${product.slug}`,
            },
          ],
        },
      ]
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Static catalogue data only — no user input flows in here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
