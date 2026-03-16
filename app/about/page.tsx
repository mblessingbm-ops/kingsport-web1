import { Shield, Award, Factory, Users, Layers, Globe } from 'lucide-react'
import Link from 'next/link'

const milestones = [
  { year: '1998', event: 'Kingsport Investments incorporated in Harare, Zimbabwe' },
  { year: '2003', event: 'Expanded into full PPE and industrial safety wear production' },
  { year: '2014', event: 'Expanded into large-volume institutional and government supply contracts' },
  { year: '2018', event: 'Achieved full sublimation and large-format printing in-house' },
  { year: '2024', event: '26 years — still 100% locally operated, still family-owned' },
]

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We produce what we promise — no substitutions, no surprises.' },
  { icon: Factory, title: 'Local First', desc: 'Every garment made in Zimbabwe. Every job created here.' },
  { icon: Award, title: 'Quality', desc: 'Internationally certified materials. No shortcuts.' },
  { icon: Users, title: 'Partnership', desc: 'We think of our clients as long-term partners, not orders.' },
  { icon: Layers, title: 'Range', desc: 'One supplier for PPE, uniforms, promo, and events.' },
  { icon: Globe, title: 'Compliance', desc: 'EN ISO and ANSI standards built into every product.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal-900 pt-32 pb-24 grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="font-display text-[30vw] font-bold text-white leading-none absolute right-0 top-0 select-none">
            K
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-6" />
          <h1 className="font-display text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
            About
            <br />
            <span className="italic text-oxblood-400">Kingsport</span>
          </h1>
          <p className="text-white/50 font-sans max-w-xl text-base leading-relaxed">
            Over two decades of manufacturing precision, local production, and unwavering commitment to Zimbabwean industry.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="block w-10 h-px bg-oxblood-900 mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mb-8 leading-tight">
              The Kingsport
              <br />
              <span className="italic text-oxblood-800">Story</span>
            </h2>
            <div className="space-y-5 text-charcoal-600/80 font-sans text-sm md:text-base leading-relaxed">
              <p>
                Kingsport Investments was founded in Harare in 1998 with a single purpose: to supply Zimbabwe&apos;s corporate sector with clothing and branded merchandise of a standard they could be proud of. Starting with a small production floor and a handful of corporate clients, we built a reputation for delivering exactly what we promised, when we promised it.
              </p>
              <p>
                Over 26 years, that reputation has grown into one of Zimbabwe&apos;s most trusted manufacturing operations. From industrial PPE and corporate uniforms to promotional merchandise, event branding, and school wear — every product is designed, cut, and finished locally, giving our clients consistent quality and reliable turnaround times.
              </p>
              <p>
                Every item in our catalog is produced locally — from the cutting floor to the embroidery machines to the final packing bay. This isn&apos;t just a point of pride; it&apos;s a deliberate choice that gives our clients faster turnaround, direct quality control, and the assurance that their order is in Zimbabwean hands from start to finish.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <span className="block w-10 h-px bg-oxblood-900 mb-4" />
            <h3 className="font-display text-2xl font-semibold text-charcoal-800 mb-8">Our Timeline</h3>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-oxblood-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-display font-bold text-xs">{m.year.slice(2)}</span>
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-gray-200 min-h-[40px]" />}
                  </div>
                  <div className="pb-8">
                    <div className="text-oxblood-800 font-display text-lg font-semibold">{m.year}</div>
                    <p className="text-charcoal-600/70 text-sm font-sans mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block w-10 h-px bg-oxblood-900 mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800">
              What We <span className="italic text-oxblood-800">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 border border-gray-100 hover:border-oxblood-200 hover:shadow-md transition-all duration-200 group">
                <Icon size={22} className="text-oxblood-700 mb-5 group-hover:text-oxblood-600" />
                <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">{title}</h3>
                <p className="text-charcoal-600/70 text-sm font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Company Statement */}
      <section className="py-24 bg-charcoal-900 text-white grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-cream-100 py-10 px-8">
            <p className="font-display text-2xl font-light text-charcoal-800 italic text-center">
              Everything under one roof. One team. One standard of quality.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-light text-charcoal-800 mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-charcoal-600/70 font-sans mb-8">
            Whether you need 10 polo shirts or 1,000 full PPE kits, we&apos;re ready to quote.
          </p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-oxblood-900 text-white px-10 py-4 font-sans font-medium text-sm hover:bg-oxblood-700 transition-colors">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}
