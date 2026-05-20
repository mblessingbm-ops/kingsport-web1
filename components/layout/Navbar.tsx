'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  HardHat,
  Briefcase,
  Gift,
  Flag,
  Trophy,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

const navLinks: { label: string; href: string; badge?: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Gifts', href: '/imported-gifts' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

interface CatalogCategory {
  id: string
  label: string
  description: string
  icon: LucideIcon
  href: string
}

const catalogCategories: CatalogCategory[] = [
  {
    id: 'ppe-safety',
    label: 'PPE & Safety',
    description: 'Conti suits, safety boots, hi-vis vests, hard hats and more',
    icon: HardHat,
    href: '/catalog?category=ppe-safety',
  },
  {
    id: 'corporate-wear',
    label: 'Corporate Wear',
    description: 'Polos, shirts, blazers and full uniform packs for your team',
    icon: Briefcase,
    href: '/catalog?category=corporate-wear',
  },
  {
    id: 'promotional',
    label: 'Promotional',
    description: 'Branded t-shirts, caps, bags, pens, mugs and gifting items',
    icon: Gift,
    href: '/catalog?category=promotional',
  },
  {
    id: 'event-branding',
    label: 'Event Branding',
    description: 'Gazebos, flags, pull-up banners and large-format displays',
    icon: Flag,
    href: '/catalog?category=event-branding',
  },
  {
    id: 'sports-wear',
    label: 'Sports Wear',
    description: 'Tracksuits, soccer kits, netball and volleyball sets',
    icon: Trophy,
    href: '/catalog?category=sports-wear',
  },
  {
    id: 'school-wear',
    label: 'School Wear',
    description: 'Uniform sets, backpacks and kids cotton t-shirts',
    icon: GraduationCap,
    href: '/catalog?category=school-wear',
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const { count } = useQuoteCart()
  const countLabel = String(count).padStart(2, '0')

  // Close catalog dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCatalogOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] text-[#fdfbf7]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-9 flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 flex items-center justify-center text-[#fdfbf7] text-[22px] italic font-semibold"
            style={{ background: '#800020', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            K
          </div>
          <div className="leading-[1.05]">
            <div
              className="text-[#fdfbf7] text-[20px] font-semibold tracking-[1.4px]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              KINGSPORT
            </div>
            <div className="text-[9.5px] text-[#fdfbf7]/55 tracking-[1.5px] uppercase font-medium mt-px">
              Investments · Est. 1998
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-7 text-[13.5px] font-medium items-center">
          {navLinks.map((link) =>
            link.label === 'Catalog' ? (
              // ── Catalog with dropdown ────────────────────────────
              <div
                key="catalog-dropdown"
                className="relative"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCatalogOpen(prev => !prev)}
                  aria-expanded={catalogOpen}
                  aria-haspopup="true"
                  className={`pb-1 border-b-2 border-transparent inline-flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                    catalogOpen ? 'text-[#ec7490]' : 'text-[#fdfbf7]/70 hover:text-[#fdfbf7]'
                  }`}
                >
                  Catalog
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    catalogOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {/* Invisible hover bridge — prevents the dropdown closing
                      when the cursor crosses the gap between trigger and panel */}
                  <div className="absolute -top-3 left-0 right-0 h-3" />

                  <div className="bg-white border border-charcoal-800/10 shadow-2xl shadow-charcoal-900/20 w-[520px] p-2">
                    {/* Category grid */}
                    <div className="grid grid-cols-2 gap-1">
                      {catalogCategories.map((cat) => {
                        const Icon = cat.icon
                        return (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => setCatalogOpen(false)}
                            className="group flex items-start gap-3 px-4 py-3.5 hover:bg-cream-50 transition-colors duration-150"
                          >
                            <div className="w-8 h-8 flex-shrink-0 bg-oxblood-900/[0.08] flex items-center justify-center mt-0.5 group-hover:bg-oxblood-900 transition-colors duration-150">
                              <Icon
                                size={14}
                                className="text-oxblood-700 group-hover:text-white transition-colors duration-150"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-sans font-medium text-charcoal-800 text-sm leading-none mb-1 group-hover:text-oxblood-800 transition-colors">
                                {cat.label}
                              </p>
                              <p className="font-sans text-charcoal-600/50 text-[11px] leading-snug">
                                {cat.description}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* Footer strip */}
                    <div className="border-t border-charcoal-800/8 mt-1 px-4 py-3 flex items-center justify-between">
                      <Link
                        href="/catalog"
                        onClick={() => setCatalogOpen(false)}
                        className="font-sans text-[11px] text-charcoal-600/50 hover:text-oxblood-700 tracking-wide transition-colors flex items-center gap-1.5"
                      >
                        View full catalog
                        <ArrowRight size={10} />
                      </Link>
                      <Link
                        href="/catalog"
                        onClick={() => setCatalogOpen(false)}
                        className="font-sans text-[11px] text-charcoal-600/40 hover:text-oxblood-700 tracking-wide transition-colors"
                      >
                        {catalogCategories.length} categories · 60+ products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#fdfbf7]/70 hover:text-[#fdfbf7] pb-1 border-b-2 border-transparent inline-flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-[#800020] text-white tracking-[0.8px] uppercase font-semibold">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quote pill */}
          <Link
            href="/quote"
            className="hidden md:inline-flex items-center gap-2 text-[11px] text-[#fdfbf7]/70 tracking-[1px] uppercase bg-[#fdfbf7]/[0.06] border border-[#fdfbf7]/[0.12] px-3 py-2 font-medium whitespace-nowrap hover:text-[#fdfbf7] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 7h13l-2 9H8z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
              <path d="M3 4h2l1 3" />
            </svg>
            Quote · <b className="text-[#fdfbf7] font-semibold">{countLabel} items</b>
          </Link>

          {/* Primary CTA */}
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center gap-2 bg-[#800020] hover:bg-[#ac1840] text-white text-[13.5px] font-medium px-4 py-2.5 tracking-[0.3px] transition-colors whitespace-nowrap"
          >
            Request quote →
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-[#fdfbf7] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-t border-white/10 animate-fade-in">
          <nav className="max-w-[1320px] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.label === 'Catalog' ? (
                // ── Mobile catalog accordion ─────────────────────
                <div key="catalog-mobile" className="border-b border-white/5 pb-2">
                  <button
                    onClick={() => setCatalogOpen(prev => !prev)}
                    aria-expanded={catalogOpen}
                    className="flex items-center justify-between w-full py-1 font-sans text-base font-medium text-[#fdfbf7]/80 hover:text-[#fdfbf7] transition-colors"
                  >
                    Catalog
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      catalogOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-3 pt-2 pb-2 space-y-1 border-l border-[#ac1840]/30 ml-1">
                      {catalogCategories.map((cat) => {
                        const Icon = cat.icon
                        return (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => {
                              setCatalogOpen(false)
                              setMobileOpen(false)
                            }}
                            className="flex items-center gap-3 py-2.5 text-[#fdfbf7]/70 hover:text-[#fdfbf7] transition-colors"
                          >
                            <Icon size={13} className="text-[#ec7490] flex-shrink-0" />
                            <span className="font-sans text-sm">{cat.label}</span>
                          </Link>
                        )
                      })}
                      <Link
                        href="/catalog"
                        onClick={() => {
                          setCatalogOpen(false)
                          setMobileOpen(false)
                        }}
                        className="flex items-center gap-1.5 py-2.5 text-[#ec7490] hover:text-[#f4a8b8] font-sans text-xs tracking-wide transition-colors"
                      >
                        View full catalog <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#fdfbf7]/80 hover:text-[#fdfbf7] text-base font-medium border-b border-white/5 pb-4 inline-flex items-center gap-2"
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#800020] text-white tracking-[0.8px] uppercase font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            )}
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="bg-[#800020] hover:bg-[#ac1840] text-white text-sm font-medium px-4 py-3 tracking-[0.3px] inline-flex items-center gap-2 mt-2"
            >
              Request quote →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
