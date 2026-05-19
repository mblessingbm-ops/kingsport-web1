import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import QuoteWidget from '@/components/ui/QuoteWidget'

export const metadata: Metadata = {
  title: {
    default: 'Kingsport Investments | Corporate & Promotional Wear Since 1998',
    template: '%s | Kingsport Investments',
  },
  description:
    'Zimbabwe\'s trusted manufacturer of protective clothing, corporate uniforms, promotional merchandise, and event branding materials. Manufacturing excellence since 1998.',
  keywords: ['corporate wear Zimbabwe', 'PPE Zimbabwe', 'promotional clothing', 'event branding Harare', 'school uniforms Zimbabwe'],
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: 'https://kingsport.co.zw',
    siteName: 'Kingsport Investments',
    title: 'Kingsport Investments | Corporate & Promotional Wear',
    description: 'Zimbabwe\'s trusted manufacturer of protective clothing, corporate uniforms and promotional merchandise since 1998.',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <QuoteWidget />
      </body>
    </html>
  )
}
