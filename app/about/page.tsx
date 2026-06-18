import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ArrowRight } from 'lucide-react'
import StatsBand from '@/components/about/StatsBand'
import ChronicleTimeline from '@/components/about/ChronicleTimeline'
import HeroVideoCarousel from '@/components/about/HeroVideoCarousel'

export const metadata: Metadata = {
  title: 'About Us — Manufacturing in Zimbabwe Since 1998',
  description:
    'Family-owned and 100% locally produced. The Kingsport Investments story: 26 years of protective clothing, corporate uniforms, and promotional wear manufactured in Harare, Zimbabwe.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1 — Magazine Cover Opener ─────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-charcoal-900">

        {/* Background — crossfading factory-footage carousel (5 clips) */}
        <div className="absolute inset-0">
          {/* Charcoal base shows behind the video before it loads */}
          <div className="absolute inset-0 bg-charcoal-900" />
          <HeroVideoCarousel />
          {/* Dark scrim so the floating cover text stays legible over the footage */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/55 to-charcoal-900/70" />
          {/* Grain texture */}
          <div className="absolute inset-0 grain-overlay opacity-40" />
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

              {/* Sewing floor — Harare factory */}
              <div className="mt-12 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
                <Image
                  src="/images/about/sewing-floor.jpg"
                  alt="Kingsport sewing floor — industrial machines, thread spools, and folded denim stock in the Harare factory"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Subtle bottom gradient + caption stamp */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent p-5">
                  <p className="text-white/85 text-[10px] font-sans tracking-widest uppercase">
                    Sewing floor · Harare
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

          {/* 5-panel production-flow grid (2 + 3 asymmetric editorial layout):
              Cutting → Sewing → Embroidery → Printing → Finishing.
              On desktop the foundation steps (Cutting, Sewing) get larger top
              panels; the branding & QC steps tile across the bottom. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* 1. Cutting — top left */}
            <div className="lg:col-span-6 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
              <Image
                src="/images/about/cutting-department.jpg"
                alt="Kingsport cutting department — worker rolling out fabric on the cutting table, colour-coded stock shelves behind"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-xl font-light text-white italic">Cutting</p>
                <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Pattern &amp; fabric preparation
                </p>
              </div>
            </div>

            {/* 2. Sewing — top right */}
            <div className="lg:col-span-6 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
              <Image
                src="/images/about/sewing-department.jpg"
                alt="Kingsport sewing department — rows of industrial sewing machines on the Harare factory floor"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-xl font-light text-white italic">Sewing</p>
                <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Assembly &amp; seaming
                </p>
              </div>
            </div>

            {/* 3. Embroidery — bottom left */}
            <div className="lg:col-span-4 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
              <Image
                src="/images/about/embroidery-department.jpg"
                alt="Kingsport embroidery department — industrial multi-head embroidery machines"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-xl font-light text-white italic">Embroidery</p>
                <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Branded application
                </p>
              </div>
            </div>

            {/* 4. Printing — bottom centre */}
            <div className="lg:col-span-4 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
              <Image
                src="/images/about/printing-department.jpg"
                alt="Kingsport printing department — screen printing carousel"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-xl font-light text-white italic">Printing</p>
                <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Screen print &amp; sublimation
                </p>
              </div>
            </div>

            {/* 5. Finishing — bottom right */}
            <div className="lg:col-span-4 relative aspect-[4/3] bg-charcoal-800 overflow-hidden group">
              <Image
                src="/images/about/finishing-department.jpg"
                alt="Kingsport finishing department — folded garments staged for QC and packaging, batch shelves behind"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-xl font-light text-white italic">Finishing</p>
                <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mt-1">
                  Quality, packing &amp; dispatch
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Section 6 — Chronicle (scroll-animated timeline) ──────── */}
      <ChronicleTimeline />

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
