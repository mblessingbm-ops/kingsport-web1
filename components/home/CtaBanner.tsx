import Link from 'next/link'
import { ArrowRight, Palette } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="py-24 bg-oxblood-900 relative overflow-hidden grain-overlay">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/10" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-white/10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          Ready to Dress
          <br />
          <span className="italic">Your Team?</span>
        </h2>
        <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Get a detailed quote for your full uniform or promotional merchandise order in 24 hours. Minimum order quantities apply.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center gap-3 bg-white text-oxblood-900 px-10 py-4 font-sans font-semibold text-sm tracking-wide hover:bg-cream-100 transition-colors duration-200"
          >
            Request a Quote
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/uniform-builder"
            className="group inline-flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 font-sans font-medium text-sm tracking-wide hover:bg-white/10 transition-colors duration-200"
          >
            <Palette size={15} />
            Try Uniform Builder
          </Link>
        </div>
      </div>
    </section>
  )
}
