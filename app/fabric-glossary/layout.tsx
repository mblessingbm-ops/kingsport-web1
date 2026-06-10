import type { Metadata } from 'next'

// app/fabric-glossary/page.tsx is a client component (accordion state +
// URL-hash sync), so its metadata lives here in the segment layout.
export const metadata: Metadata = {
  title: 'Fabric Glossary — Materials We Manufacture With',
  description:
    'Every fabric in the Kingsport range explained: weights, compositions, colour availability, and which garments each material suits — from poly-cotton twill workwear to moisture-wicking sports knits.',
  alternates: { canonical: '/fabric-glossary' },
}

export default function FabricGlossaryLayout({ children }: { children: React.ReactNode }) {
  return children
}
