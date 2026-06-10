import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-cream-50 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[11px] font-sans tracking-[3px] uppercase text-oxblood-700 mb-4">
          Page not found
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-charcoal-800 mb-6">
          This page has gone <span className="italic text-oxblood-800">missing</span>
        </h1>
        <p className="font-sans text-sm text-charcoal-600/70 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Try the catalogue — everything we manufacture lives there.
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-oxblood-800 text-white font-sans text-xs tracking-[1.5px] uppercase px-7 py-3.5 hover:bg-oxblood-900 transition-colors"
          >
            Browse the catalogue
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/"
            className="font-sans text-xs tracking-[1.5px] uppercase text-charcoal-600/60 hover:text-oxblood-700 transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}
