import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import QuoteWidget from '@/components/ui/QuoteWidget'
import ImageProtection from '@/components/ui/ImageProtection'

export const metadata: Metadata = {
  metadataBase: new URL('https://kingsport.co.zw'),
  title: {
    default: 'Kingsport Investments | Corporate & Promotional Wear Since 1998',
    template: '%s | Kingsport Investments',
  },
  description:
    'Zimbabwe\'s trusted manufacturer of protective clothing, corporate uniforms, promotional merchandise, and event branding materials. Manufacturing excellence since 1998.',
  keywords: ['corporate wear Zimbabwe', 'PPE Zimbabwe', 'promotional clothing', 'event branding Harare', 'school uniforms Zimbabwe'],
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: 'https://kingsport.co.zw',
    siteName: 'Kingsport Investments',
    title: 'Kingsport Investments | Corporate & Promotional Wear',
    description: 'Zimbabwe\'s trusted manufacturer of protective clothing, corporate uniforms and promotional merchandise since 1998.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Kingsport Investments sewing floor in Harare, Zimbabwe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kingsport Investments | Corporate & Promotional Wear',
    description: 'Zimbabwe\'s trusted manufacturer of protective clothing, corporate uniforms and promotional merchandise since 1998.',
    images: ['/og-image.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kingsport Investments (Pvt) Ltd',
  url: 'https://kingsport.co.zw',
  logo: 'https://kingsport.co.zw/og-image.jpg',
  foundingDate: '1998',
  description:
    'Zimbabwean manufacturer of protective clothing, corporate uniforms, promotional merchandise, and event branding materials since 1998.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Harare',
    addressCountry: 'ZW',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'sales@kingsport.co.zw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // Static, build-time JSON — no user input flows in here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ImageProtection />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <QuoteWidget />
        {/* Traffic + Core Web Vitals — collected by Vercel, no cookies */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
