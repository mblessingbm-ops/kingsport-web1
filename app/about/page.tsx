import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import StatsBand from '@/components/about/StatsBand'

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1 — Magazine Cover Opener ─────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-charcoal-900">

        {/* Placeholder image panel — replace with real factory/people photography */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-oxblood-950/40" />
          {/* When photography is ready: <Image src="/images/about/factory-hero.jpg" alt="Kingsport factory floor" fill className="object-cover object-center opacity-40" /> */}
          {/* Grain texture */}
          <div className="absolute inset-0 grain-overlay opacity-60" />
        </div>

        {/* Founding year — large watermark top-right */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white/[0.06] font-display text-[120px] md:text-[180px] font-bold leading-none select-none pointer-events-none">
          1998
        </div>

        {/* Content pinned to bottom-left */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">

          {/* Issue-style label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-oxblood-700" />
            <span className="text-oxblood-400 text-[10px] tracking-[0.35em] uppercase font-sans">
              Harare, Zimbabwe · Est. 1998
            </span>
          </div>

          {/* Cover headline */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-[108px] font-light text-white leading-[0.95] mb-8 max-w-4xl">
            Making things<br />
            <span className="italic text-oxblood-400">in Harare</span><br />
            since 1998.
          </h1>

          {/* Standfirst */}
          <p className="text-white/40 font-sans font-light text-base md:text-lg max-w-xl leading-relaxed">
            Protective clothing, corporate uniforms, promotional merchandise,
            and event branding — all made locally, all made properly.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-1.5 z-10">
          <span className="text-[9px] tracking-widest uppercase font-sans">Read on</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ── Section 2 — Opening Statement ─────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-charcoal-800 leading-[1.2]">
            Kingsport Investments was incorporated in Harare in 1998.
            We manufacture clothing — protective, corporate, promotional,
            and everything in between.{' '}
            <span className="italic text-oxblood-800">We have never stopped.</span>
          </p>
        </div>
      </section>

      {/* ── Section 3 — Heritage Narrative ────────────────────────── */}
      <section className="bg-cream-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Prose — 3 columns */}
            <div className="lg:col-span-3 space-y-6">

              <div className="flex items-center gap-4 mb-10">
                <span className="block w-10 h-px bg-oxblood-900" />
                <span className="text-oxblood-700 text-[10px] tracking-[0.35em] uppercase font-sans">
                  Our Story
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 leading-tight mb-8">
                Built here.<br />
                <span className="italic text-oxblood-800">Still here.</span>
              </h2>

              <p className="font-sans text-charcoal-700/80 text-base leading-[1.8]">
                In 1998, Kingsport Investments opened its doors in Harare with a single
                purpose: to manufacture quality clothing for Zimbabwean businesses. The
                market was different then. The economy was different. But the demand for
                well-made, locally produced workwear and uniforms was real, and we were
                built to meet it.
              </p>

              <p className="font-sans text-charcoal-700/80 text-base leading-[1.8]">
                What followed were years that tested every manufacturer operating in
                Zimbabwe. We stayed. We adapted our processes, rationalised our range, and
                kept the factory floor running. Not through luck — through the discipline of
                doing one thing consistently well. The companies that weathered those years
                alongside us are still our clients today.
              </p>

              <p className="font-sans text-charcoal-700/80 text-base leading-[1.8]">
                Today Kingsport supplies across six product categories — PPE and safety
                wear, corporate uniforms, promotional merchandise, event branding materials,
                sports wear, and school wear. We work with government departments,
                banks, construction firms, retailers, NGOs, and schools across Zimbabwe.
                The range has grown significantly. The approach has not changed.
              </p>

              <p className="font-sans text-charcoal-700/80 text-base leading-[1.8]">
                Every garment is cut, stitched, and finished locally. Every order is
                managed by the same team that takes the brief. There is no outsourcing,
                no intermediary, no hidden chain between what a client asks for and what
                they receive. That directness — from brief to delivery — is what
                twenty-six years of operation is built on.
              </p>

            </div>

            {/* Pull quote — 2 columns */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="border-l-2 border-oxblood-700 pl-8 py-4">
                <blockquote className="font-display text-3xl md:text-4xl font-light text-charcoal-800 leading-tight italic mb-6">
                  &ldquo;Twenty-six years of operation is built on directness — from brief to delivery.&rdquo;
                </blockquote>
                <span className="block w-8 h-px bg-oxblood-700 mb-4" />
                <p className="font-sans text-[10px] tracking-widest uppercase text-charcoal-600/50">
                  Kingsport Investments, Harare
                </p>
              </div>

              {/* Placeholder image below pull quote */}
              <div className="mt-12 relative aspect-[4/3] bg-charcoal-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900 flex items-end p-6">
                  {/* Replace with: <Image src="/images/about/factory-detail.jpg" fill className="object-cover opacity-60" alt="Factory detail" /> */}
                  <p className="text-white/20 text-[10px] font-sans tracking-widest uppercase">
                    Factory photography — coming soon
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 4 — By the Numbers (scroll-animated) ──────────── */}
      <StatsBand />

      {/* ── Section 5 — How We Make Things (Photo Editorial Grid) ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="block w-10 h-px bg-oxblood-900" />
                <span className="text-oxblood-700 text-[10px] tracking-[0.35em] uppercase font-sans">
                  Production
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800">
                How we<br />
                <span className="italic text-oxblood-800">make things.</span>
              </h2>
            </div>
            <p className="hidden lg:block text-charcoal-600/50 font-sans text-sm max-w-xs text-right leading-relaxed">
              Every product is cut, stitched, and finished in our Harare facility.
              Nothing leaves the factory until it meets the brief.
            </p>
          </div>

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Panel 1 — large, left, tall */}
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-charcoal-800 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900">
                {/* Replace with: <Image src="/images/about/cutting.jpg" fill className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-700" alt="Fabric cutting" /> */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-2xl font-light text-white italic">Cutting</p>
                <p className="text-white/30 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Fabric preparation
                </p>
              </div>
            </div>

            {/* Panels 2 + 3 — stacked right */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-4">

              <div className="relative aspect-[4/3] lg:aspect-auto bg-charcoal-700 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-600 to-charcoal-800">
                  {/* Replace with: <Image src="/images/about/stitching.jpg" fill className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-700" alt="Stitching" /> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-xl font-light text-white italic">Stitching</p>
                  <p className="text-white/30 text-[10px] font-sans tracking-widest uppercase mt-1">
                    Assembly &amp; seaming
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/3] lg:aspect-auto bg-oxblood-950 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-oxblood-900 to-charcoal-900">
                  {/* Replace with: <Image src="/images/about/finishing.jpg" fill className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-700" alt="Finishing" /> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-xl font-light text-white italic">Finishing</p>
                  <p className="text-white/30 text-[10px] font-sans tracking-widest uppercase mt-1">
                    Quality &amp; dispatch
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Production note */}
          <p className="text-charcoal-600/40 font-sans text-xs tracking-wide mt-6 text-right italic">
            Photography coming soon — production documentation in progress.
          </p>

        </div>
      </section>

      {/* ── Section 6 — Timeline ──────────────────────────────────── */}
      <section className="bg-cream-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex items-center gap-4 mb-16">
            <span className="block w-10 h-px bg-oxblood-900" />
            <span className="text-oxblood-700 text-[10px] tracking-[0.35em] uppercase font-sans">
              Chronicle
            </span>
          </div>

          <div className="max-w-3xl">
            {[
              { year: '1998', fact: 'Kingsport Investments (Pvt) Ltd incorporated in Harare, Zimbabwe.' },
              { year: '2001', fact: 'First major institutional supply contract signed with a Harare-based government department.' },
              { year: '2005', fact: 'PPE and industrial safety wear range formalised as a dedicated product category.' },
              { year: '2010', fact: 'Expanded into event branding and large-format display materials.' },
              { year: '2015', fact: 'In-house sublimation and embroidery capabilities established.' },
              { year: '2019', fact: 'School wear and sports kit range launched in response to institutional demand.' },
              { year: '2024', fact: 'Twenty-six years in operation. Still 100% locally produced. Still family-owned.' },
            ].map((entry, i) => (
              <div
                key={entry.year}
                className={`grid grid-cols-5 gap-8 py-8 ${
                  i < 6 ? 'border-b border-charcoal-800/8' : ''
                }`}
              >
                <div className="col-span-1">
                  <p className="font-display text-4xl md:text-5xl font-light text-oxblood-700 leading-none">
                    {entry.year}
                  </p>
                </div>
                <div className="col-span-4 flex items-center">
                  <p className="font-sans text-charcoal-700/80 text-base leading-relaxed">
                    {entry.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 7 — What We Believe ───────────────────────────── */}
      <section className="bg-charcoal-900 py-24 md:py-32 grain-overlay">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex items-center gap-4 mb-16">
            <span className="block w-10 h-px bg-oxblood-700" />
            <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-sans">
              What We Believe
            </span>
          </div>

          <div className="space-y-0">
            {[
              {
                statement: 'We don’t outsource.',
                detail: 'Every order is produced in our Harare facility by our own team. There is no third party between your brief and your delivery.',
              },
              {
                statement: 'Local production is a choice.',
                detail: 'We could source cheaper. We choose not to. Manufacturing locally means accountability — and accountability means quality.',
              },
              {
                statement: 'Quality is a habit, not a position.',
                detail: 'We have been doing this for twenty-six years. The standard on the first order and the thousandth order is the same.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 py-12 ${
                  i < 2 ? 'border-b border-white/8' : ''
                }`}
              >
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white italic leading-tight">
                  {item.statement}
                </h3>
                <div className="flex items-center">
                  <p className="font-sans text-white/50 text-base leading-[1.8] max-w-lg">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 8 — Close ─────────────────────────────────────── */}
      <section className="bg-cream-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="block w-10 h-px bg-oxblood-900 mx-auto mb-8" />

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-charcoal-800 leading-tight mb-6">
            We make things.<br />
            <span className="italic text-oxblood-800">Let&apos;s make something for you.</span>
          </h2>

          <p className="text-charcoal-600/60 font-sans text-sm leading-relaxed max-w-md mx-auto mb-12">
            Whether you need ten polo shirts or a thousand full PPE kits,
            we&apos;ll turn your brief into a quote within one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="btn-glass-primary inline-flex items-center gap-2 px-8 py-4 font-sans font-medium text-sm tracking-wide"
            >
              Request a Quote
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/catalog"
              className="btn-glass inline-flex items-center gap-2 text-charcoal-700 hover:text-oxblood-700 px-8 py-4 font-sans font-medium text-sm tracking-wide"
            >
              Browse the Catalog
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
