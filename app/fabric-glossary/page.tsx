'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Droplets, Layers, ArrowRight } from 'lucide-react'
import { fabrics, fabricGroups, type FabricEntry } from '@/data/fabrics'

export default function FabricGlossaryPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // Auto-expand a fabric if the URL hash points to its slug
  useEffect(() => {
    if (typeof window === 'undefined') return
    const sync = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (hash) {
        setOpenSlug(hash)
        // Slight delay so the panel has rendered before we scroll
        setTimeout(() => {
          const el = document.getElementById(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const toggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug))
    // Update the URL hash without triggering a navigation/scroll
    if (typeof window !== 'undefined') {
      const newUrl = openSlug === slug
        ? window.location.pathname
        : `${window.location.pathname}#${slug}`
      window.history.replaceState(null, '', newUrl)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-charcoal-900 text-cream-50 pt-32 pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-9">
          <div className="flex items-center gap-3 mb-5 text-oxblood-500/90">
            <Layers size={14} />
            <span className="text-[10px] font-sans tracking-[1.8px] uppercase">
              Material Library
            </span>
          </div>
          <h1
            className="text-[clamp(48px,7vw,96px)] leading-[0.96] tracking-[-2.4px] font-medium text-cream-50"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Fabric <em className="italic text-oxblood-500">Glossary</em>
          </h1>
          <p className="mt-7 text-cream-50/65 text-[16px] leading-[1.65] max-w-[640px] font-sans">
            Every fabric and material we manufacture with — what it&rsquo;s made of, how it
            performs, how to care for it, and which Kingsport products are cut from it.
            A reference for procurement teams, quality officers, and anyone choosing the
            right cloth for the job.
          </p>

          {/* Category jump nav */}
          <div className="mt-10 flex flex-wrap gap-2">
            {fabricGroups.map((g) => (
              <a
                key={g}
                href={`#group-${slugifyGroup(g)}`}
                className="inline-flex items-center gap-1.5 border border-cream-50/15 hover:border-oxblood-500/60 hover:bg-oxblood-500/10 text-cream-50/80 hover:text-cream-50 text-[11px] font-sans tracking-wider uppercase px-3.5 py-2 rounded-full transition-colors"
              >
                {g}
                <ArrowRight size={11} className="opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary body */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-9 py-20">
        {fabricGroups.map((group) => {
          const groupFabrics = fabrics.filter((f) => f.group === group)
          if (groupFabrics.length === 0) return null
          return (
            <div
              key={group}
              id={`group-${slugifyGroup(group)}`}
              className="mb-20 scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="block w-10 h-px bg-oxblood-900" />
                <h2 className="font-display text-3xl md:text-[40px] font-medium text-charcoal-800 tracking-[-0.8px]">
                  {group}
                </h2>
                <span className="text-[11px] font-sans tracking-widest uppercase text-charcoal-600/40">
                  {groupFabrics.length} fabric{groupFabrics.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="border-t border-charcoal-800/8">
                {groupFabrics.map((fabric) => {
                  const isOpen = openSlug === fabric.slug
                  return (
                    <FabricRow
                      key={fabric.slug}
                      fabric={fabric}
                      isOpen={isOpen}
                      onToggle={() => toggle(fabric.slug)}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      {/* Bottom CTA */}
      <section className="bg-cream-100 border-t border-charcoal-800/8 py-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-9 text-center">
          <p className="text-[11px] font-sans tracking-[1.8px] uppercase text-oxblood-700 mb-4">
            Don&rsquo;t see your fabric?
          </p>
          <h2
            className="text-[clamp(36px,5vw,56px)] leading-[0.98] tracking-[-1.2px] font-medium text-charcoal-800 max-w-[680px] mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            We custom-source <em className="italic text-oxblood-800">for the brief.</em>
          </h2>
          <p className="mt-5 text-charcoal-600/80 text-[15px] leading-[1.7] max-w-[540px] mx-auto font-sans">
            If your spec requires a fabric outside this list — fire-retardant cotton,
            antistatic poly, GSM you don&rsquo;t see here — talk to us. We import and
            mill-source on a project basis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="btn-glass-primary inline-flex items-center gap-2 px-5 py-3 text-[13px] font-sans font-medium tracking-[0.3px]"
            >
              Contact our fabric team
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/catalog"
              className="btn-glass inline-flex items-center gap-2 px-5 py-3 text-[13px] font-sans font-medium tracking-[0.3px]"
            >
              Browse the catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Row component (accordion) ──────────────────────────────────────────── */
function FabricRow({
  fabric,
  isOpen,
  onToggle,
}: {
  fabric: FabricEntry
  isOpen: boolean
  onToggle: () => void
}) {
  const specs = [
    { label: 'Weight',      value: fabric.weight },
    { label: 'Composition', value: fabric.composition },
    { label: 'Weave',       value: fabric.weave },
    { label: 'Finish',      value: fabric.finish },
  ].filter((s) => s.value && s.value !== '—' && s.value !== 'N/A')

  return (
    <div
      id={fabric.slug}
      className="border-b border-charcoal-800/8 scroll-mt-32 group"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors hover:bg-cream-100/60 px-2 -mx-2"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Swatch thumbnail */}
          <SwatchThumb fabric={fabric} size={56} />

          <ChevronRight
            size={14}
            className={`text-oxblood-700 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[22px] md:text-[26px] font-medium text-charcoal-800 leading-[1.15] tracking-[-0.4px]">
              {fabric.name}
            </h3>
            {!isOpen && (
              <p className="mt-1 font-sans text-[13px] text-charcoal-600/60 leading-[1.5] line-clamp-1">
                {fabric.composition} · {fabric.weave}
              </p>
            )}
          </div>
        </div>
        {fabric.weight !== '—' && (
          <div className="hidden sm:block flex-shrink-0 text-right">
            <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-0.5">
              Weight
            </p>
            <p className="font-display italic text-[18px] text-charcoal-800">
              {fabric.weight}
            </p>
          </div>
        )}
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <div className="pb-10 pl-9 pr-2 -mt-1 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 mb-8">
            {/* Large swatch */}
            <div>
              <SwatchHero fabric={fabric} />
              <p className="text-[9px] font-sans text-charcoal-600/30 tracking-wide mt-2 text-center uppercase">
                Fabric swatch — actual texture may vary slightly
              </p>
            </div>

            {/* Specs + suited-for */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                {specs.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-1">
                      {s.label}
                    </p>
                    <p className="font-sans text-[14px] text-charcoal-800 leading-snug">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Best suited for */}
              <div className="bg-cream-100/70 border border-charcoal-800/8 px-5 py-4">
                <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-1.5">
                  Best Suited For
                </p>
                <p className="font-sans text-[14px] text-charcoal-700/85 leading-[1.65]">
                  {fabric.suitedFor}
                </p>
              </div>
            </div>
          </div>

          {/* Care */}
          {fabric.care.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-3">
                Care Instructions
              </p>
              <div className="flex flex-wrap gap-2">
                {fabric.care.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 border border-charcoal-800/10 bg-white text-charcoal-700 text-[11px] font-sans px-3 py-1.5 leading-none"
                  >
                    <Droplets size={10} className="text-oxblood-700 flex-shrink-0" />
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Used in */}
          {fabric.usedIn.length > 0 && (
            <div>
              <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-3">
                Used in Kingsport products
              </p>
              <div className="flex flex-wrap gap-2">
                {fabric.usedIn.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center text-[11px] font-sans text-charcoal-700/80 border border-charcoal-800/10 bg-cream-50 px-3 py-1.5"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <Link
                href="/catalog"
                className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-sans tracking-[1.4px] uppercase text-oxblood-700 hover:text-oxblood-900 transition-colors"
              >
                Browse products using this fabric
                <ArrowRight size={11} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Swatch image components ────────────────────────────────────────────── */

function SwatchThumb({ fabric, size }: { fabric: FabricEntry; size: number }) {
  const [errored, setErrored] = useState(false)
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-charcoal-700 to-charcoal-900"
      style={{ width: size, height: size, borderRadius: 6 }}
    >
      {fabric.swatchImage && !errored && (
        <Image
          src={fabric.swatchImage}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setErrored(true)}
        />
      )}
      {(errored || !fabric.swatchImage) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Layers size={Math.round(size * 0.32)} className="text-white/20" />
        </div>
      )}
    </div>
  )
}

function SwatchHero({ fabric }: { fabric: FabricEntry }) {
  const [errored, setErrored] = useState(false)
  return (
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-charcoal-700 to-charcoal-900 group">
      {fabric.swatchImage && !errored && (
        <Image
          src={fabric.swatchImage}
          alt={`${fabric.name} fabric swatch close-up`}
          fill
          sizes="(max-width: 768px) 100vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      )}
      {(errored || !fabric.swatchImage) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <Layers size={32} className="text-white/15" />
          <span className="text-white/20 font-display text-sm italic">swatch · pending</span>
        </div>
      )}
    </div>
  )
}

function slugifyGroup(g: string): string {
  return g.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
