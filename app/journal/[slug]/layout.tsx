import type { Metadata } from 'next'
import { journalPosts } from '@/data/journal'

// app/journal/[slug]/page.tsx is a client component, so per-post
// metadata, static params, and Article structured data live here.

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = journalPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  }
}

export default function JournalPostLayout({ params, children }: Props) {
  const post = journalPosts.find((p) => p.slug === params.slug)

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: `https://kingsport.co.zw${post.coverImage}`,
        author: {
          '@type': 'Organization',
          name: 'Kingsport Investments (Pvt) Ltd',
          url: 'https://kingsport.co.zw',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Kingsport Investments (Pvt) Ltd',
        },
        mainEntityOfPage: `https://kingsport.co.zw/journal/${post.slug}`,
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Static journal data only — no user input flows in here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
