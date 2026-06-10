import type { Metadata } from 'next'

// app/quote/page.tsx is a client component (quote cart state), so its
// metadata lives here. The page is disallowed in robots.ts — the robots
// meta below reinforces that for crawlers that reach it via links.
export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Review your selected items and send a quote request to the Kingsport sales team.',
  robots: { index: false, follow: true },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children
}
