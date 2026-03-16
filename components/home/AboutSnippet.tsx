import Link from 'next/link'
import { ArrowRight, Shield, Award, Factory, Users } from 'lucide-react'

const pillars = [
  { icon: Factory, label: '100% Local Production', desc: 'Every item manufactured in Zimbabwe' },
  { icon: Shield, label: 'Compliance Certified', desc: 'EN ISO & ANSI compliant materials' },
  { icon: Award, label: '26+ Years Experience', desc: 'Incorporated 1998, still family-owned' },
  { icon: Users, label: 'B2B Specialists', desc: 'Built for corporate and institutional clients' },
]

export default function AboutSnippet() {
  return (
    <section className="py-24 bg-charcoal-900 grain-overlay text-white overflow-hidden relative">
      {/* Background element */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
        <div className="font-display text-[30vw] font-bold text-white leading-none absolute right-0 top-1/2 -translate-y-1/2 select-none">
          K
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="block w-10 h-px bg-oxblood-700 mb-4" />
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Built in Zimbabwe.
              <br />
              <span className="italic text-oxblood-400">Built to Last.</span>
            </h2>
            <p className="text-white/60 font-sans leading-relaxed mb-6 text-sm md:text-base max-w-lg">
              Since 1998, Kingsport Investments has been the quiet backbone behind the uniforms of Zimbabwe&apos;s leading corporations, institutions, and public services. We don&apos;t just print on garments — we engineer clothing that performs.
            </p>
            <p className="text-white/60 font-sans leading-relaxed mb-10 text-sm md:text-base max-w-lg">
              Our factory gives us the scale to handle national accounts while maintaining the precision of a specialist house — from cutting and stitching to embroidery, sublimation, and large-format printing, all under one roof.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border border-white/20 hover:border-oxblood-700 text-white px-8 py-4 font-sans text-sm font-medium transition-all duration-200 hover:bg-oxblood-900/20"
            >
              Our Story
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="border border-white/10 p-6 hover:border-oxblood-900/60 hover:bg-oxblood-950/20 transition-all duration-200 group"
              >
                <Icon size={20} className="text-oxblood-500 mb-4 group-hover:text-oxblood-400 transition-colors" />
                <h4 className="font-display text-lg font-semibold text-white mb-1">{label}</h4>
                <p className="text-white/40 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
