import type { Metadata } from 'next'

// app/catalog/page.tsx is a client component ('use client' — interactive
// filtering, drawers, quote cart), so its metadata lives here in the
// segment layout. The [slug] child segment overrides this per product.
export const metadata: Metadata = {
  // default = this segment's own title; template = re-declared so child
  // product pages keep the brand suffix (an intermediate segment's plain
  // title would otherwise break the root template chain).
  title: {
    default: 'Catalogue — PPE, Corporate Wear & Promotional Merchandise',
    template: '%s | Kingsport Investments',
  },
  description:
    'Browse the full Kingsport catalogue: protective clothing, corporate uniforms, school wear, sports kits, promotional gifts, and event branding — all manufactured in Zimbabwe with custom branding available.',
  alternates: { canonical: '/catalog' },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
