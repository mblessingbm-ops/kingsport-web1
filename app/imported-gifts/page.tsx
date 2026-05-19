import Link from 'next/link'
import Image from 'next/image'
import { Info, ExternalLink, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { importedCatalogues } from '@/data/catalogues'

export const metadata: Metadata = {
  title: 'Imported Gifts & Merchandise',
  description:
    'Browse curated catalogues from trusted international suppliers, available to order through Kingsport Investments in Harare, Zimbabwe.',
}

export default function ImportedGiftsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-charcoal-900 pt-32 pb-16 grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-3">
            Imported Gifts &amp;{' '}
            <span className="italic text-oxblood-400">Merchandise</span>
          </h1>
          <p className="text-white/50 font-sans text-sm max-w-xl leading-relaxed">
            Curated catalogues from trusted international suppliers — available
            to order through Kingsport. Browse below and enquire for pricing and
            lead times.
          </p>
        </div>
      </div>

      {/* Positioning notice */}
      <div className="bg-amber-50 border-y border-amber-200/60 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-start gap-3">
          <Info size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 font-sans text-xs leading-relaxed">
            Products in this section are sourced from international suppliers and
            are separate from Kingsport&apos;s locally manufactured range. Pricing,
            availability, and lead times differ from standard orders.{' '}
            <a href="/contact" className="underline hover:text-amber-900 transition-colors">
              Contact us
            </a>{' '}
            to discuss your requirements before placing an enquiry.
          </p>
        </div>
      </div>

      {/* Catalogue grid */}
      <section className="bg-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="block w-10 h-px bg-oxblood-900" />
              <span className="text-charcoal-600/50 text-[10px] tracking-[0.35em] uppercase font-sans">
                {importedCatalogues.length}{' '}
                {importedCatalogues.length === 1 ? 'Catalogue' : 'Catalogues'} Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {importedCatalogues.map(catalogue => (
              <div
                key={catalogue.id}
                className="bg-white border border-charcoal-800/8 flex flex-col"
              >
                {/* Cover image — uses real screenshot when hasCover is true, gradient placeholder otherwise */}
                <div className="relative aspect-[16/10] bg-charcoal-800 overflow-hidden">
                  {catalogue.hasCover ? (
                    <>
                      <Image
                        src={catalogue.coverImage}
                        alt={`${catalogue.title} — cover`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Dark gradient overlay so badge + page count stay legible */}
                      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-transparent to-charcoal-900/70 pointer-events-none" />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <span className="self-start bg-oxblood-900/90 text-white text-[9px] font-sans tracking-widest uppercase px-2.5 py-1">
                          {catalogue.supplier}
                        </span>
                        {catalogue.pages > 0 && (
                          <span className="self-end text-white/80 font-sans text-[10px] tracking-wide drop-shadow">
                            {catalogue.pages} pages
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900 flex flex-col justify-between p-5">
                      <span className="self-start bg-oxblood-900/80 text-white text-[9px] font-sans tracking-widest uppercase px-2.5 py-1">
                        {catalogue.supplier}
                      </span>
                      {catalogue.pages > 0 && (
                        <span className="self-end text-white/20 font-sans text-[10px] tracking-wide">
                          {catalogue.pages} pages
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-[9px] font-sans tracking-widest uppercase text-oxblood-700 border border-oxblood-700/30 px-2 py-0.5">
                      {catalogue.year}
                    </span>
                    {catalogue.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] font-sans tracking-wide uppercase text-charcoal-600/40 border border-charcoal-800/10 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-2xl font-light text-charcoal-800 leading-tight mb-3">
                    {catalogue.title}
                  </h2>

                  <p className="font-sans text-charcoal-600/70 text-sm leading-relaxed mb-6 flex-1">
                    {catalogue.description}
                  </p>

                  <a
                    href={catalogue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-oxblood-900 hover:bg-oxblood-700 text-white px-5 py-3 font-sans font-medium text-sm tracking-wide transition-all duration-200 self-start"
                  >
                    Browse Catalogue
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom enquiry strip */}
      <div className="bg-white border-t border-charcoal-800/8 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-light text-charcoal-800 mb-1">
              See something you&apos;d like to order?
            </h3>
            <p className="font-sans text-charcoal-600/60 text-sm">
              Send us the product name, code, and quantity — we&apos;ll come back with pricing and lead time.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-charcoal-800/20 hover:border-oxblood-700 text-charcoal-700 hover:text-oxblood-700 px-5 py-3 font-sans font-medium text-sm tracking-wide transition-all duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-oxblood-900 hover:bg-oxblood-700 text-white px-5 py-3 font-sans font-medium text-sm tracking-wide transition-all duration-200"
            >
              Send an Enquiry
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
