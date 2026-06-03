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
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'
import { fabricGroups, fabrics } from '@/data/fabrics'

const navLinks: { label: string; href: string; badge?: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Gifts', href: '/imported-gifts' },
  { label: 'Fabric Glossary', href: '/fabric-glossary' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

function slugifyFabricGroup(g: string): string {
  return g.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

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
    label: 'Corporate & Promotional Wear',
    description: 'Polos, shirts, t-shirts, caps and outerwear for uniformed teams and promo runs',
    icon: Briefcase,
    href: '/catalog?category=corporate-wear',
  },
  {
    id: 'promotional',
    label: 'Promotional Gifts',
    description: 'Lanyards, bags, water bottles, pens, mugs, diaries and umbrellas',
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
  const [fabricsOpen, setFabricsOpen] = useState(false)
  const { count } = useQuoteCart()
  const countLabel = String(count).padStart(2, '0')

  // Close dropdowns on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCatalogOpen(false)
        setFabricsOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header className="fixed top-[18px] inset-x-0 z-50 pointer-events-none">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="topbar-pill pointer-events-auto flex items-center justify-between pl-4 pr-2 py-2 sm:pl-5 sm:pr-2.5">
          {/* Brand */}
          <Link href="/" className="relative flex items-center gap-3 group">
            <div
              className="w-8 h-8 flex items-center justify-center text-white text-[20px] italic font-semibold rounded-[10px]"
              style={{
                background: '#800020',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(128,0,32,0.3)',
              }}
            >
              K
            </div>
            <div className="leading-[1.05] hidden sm:block">
              <div
                className="text-charcoal-800 text-[18px] font-semibold tracking-[1.2px]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                KINGSPORT
              </div>
              <div className="text-[9px] text-charcoal-600/70 tracking-[1.4px] uppercase font-medium mt-px">
                Investments · Est. 1998
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="relative hidden lg:flex gap-[22px] text-[13px] font-medium items-center">
            {navLinks.map((link) =>
              link.label === 'Fabric Glossary' ? (
                <div
                  key="fabrics-dropdown"
                  className="relative"
                  onMouseEnter={() => setFabricsOpen(true)}
                  onMouseLeave={() => setFabricsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setFabricsOpen(prev => !prev)}
                    aria-expanded={fabricsOpen}
                    aria-haspopup="true"
                    className={`py-1 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                      fabricsOpen ? 'text-oxblood-800' : 'text-charcoal-700 hover:text-oxblood-800'
                    }`}
                  >
                    Fabric Glossary
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${fabricsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      fabricsOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="absolute -top-3 left-0 right-0 h-3" />
                    <div className="bg-white border border-charcoal-800/10 shadow-2xl shadow-charcoal-900/20 w-[560px] p-2 rounded-xl">
                      <div className="grid grid-cols-2 gap-1">
                        {fabricGroups.map((group) => {
                          const sample = fabrics.filter(f => f.group === group).slice(0, 2)
                          const total = fabrics.filter(f => f.group === group).length
                          return (
                            <Link
                              key={group}
                              href={`/fabric-glossary#group-${slugifyFabricGroup(group)}`}
                              onClick={() => setFabricsOpen(false)}
                              className="group flex items-start gap-3 px-4 py-3 hover:bg-cream-50 rounded-lg transition-colors duration-150"
                            >
                              <div className="w-8 h-8 flex-shrink-0 bg-oxblood-900/[0.08] flex items-center justify-center mt-0.5 rounded-lg group-hover:bg-oxblood-900 transition-colors duration-150">
                                <Layers
                                  size={14}
                                  className="text-oxblood-700 group-hover:text-white transition-colors duration-150"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-sans font-medium text-charcoal-800 text-sm leading-none mb-1 group-hover:text-oxblood-800 transition-colors">
                                  {group}
                                </p>
                                <p className="font-sans text-charcoal-600/50 text-[11px] leading-snug">
                                  {sample.map(f => f.name).join(' · ')}
                                  {total > 2 ? ' · …' : ''}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                      <div className="border-t border-charcoal-800/8 mt-1 px-4 py-3 flex items-center justify-between gap-3">
                        <Link
                          href="/fabric-glossary"
                          onClick={() => setFabricsOpen(false)}
                          className="btn-glass-primary inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[11px] font-medium tracking-widest uppercase"
                        >
                          Open full glossary
                          <ArrowRight size={11} />
                        </Link>
                        <span className="font-sans text-[11px] text-charcoal-600/40 tracking-wide text-right">
                          {fabrics.length} fabrics · {fabricGroups.length} groups
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.label === 'Catalog' ? (
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
                    className={`py-1 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                      catalogOpen ? 'text-oxblood-800' : 'text-charcoal-700 hover:text-oxblood-800'
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
                    <div className="absolute -top-3 left-0 right-0 h-3" />
                    <div className="bg-white border border-charcoal-800/10 shadow-2xl shadow-charcoal-900/20 w-[520px] p-2 rounded-xl">
                      <div className="grid grid-cols-2 gap-1">
                        {catalogCategories.map((cat) => {
                          const Icon = cat.icon
                          return (
                            <Link
                              key={cat.id}
                              href={cat.href}
                              onClick={() => setCatalogOpen(false)}
                              className="group flex items-start gap-3 px-4 py-3.5 hover:bg-cream-50 rounded-lg transition-colors duration-150"
                            >
                              <div className="w-8 h-8 flex-shrink-0 bg-oxblood-900/[0.08] flex items-center justify-center mt-0.5 rounded-lg group-hover:bg-oxblood-900 transition-colors duration-150">
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
                      <div className="border-t border-charcoal-800/8 mt-1 px-4 py-3 flex items-center justify-between gap-3">
                        <Link
                          href="/catalog"
                          onClick={() => setCatalogOpen(false)}
                          className="btn-glass-primary inline-flex items-center gap-1.5 px-4 py-2 font-sans text-[11px] font-medium tracking-widest uppercase"
                        >
                          View full catalog
                          <ArrowRight size={11} />
                        </Link>
                        <Link
                          href="/catalog"
                          onClick={() => setCatalogOpen(false)}
                          className="font-sans text-[11px] text-charcoal-600/40 hover:text-oxblood-700 tracking-wide transition-colors text-right"
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
                  className="text-charcoal-700 hover:text-oxblood-800 py-1 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors"
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-oxblood-900 text-white tracking-[0.8px] uppercase font-semibold rounded-md">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="relative flex items-center gap-2">
            {/* Quote pill (glass) */}
            <Link
              href="/quote"
              className="glass-pill hidden md:inline-flex items-center gap-2 text-[11px] text-charcoal-700/80 tracking-[1px] uppercase px-3 py-2 font-medium whitespace-nowrap hover:text-charcoal-800 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h13l-2 9H8z" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
                <path d="M3 4h2l1 3" />
              </svg>
              Quote · <b className="text-charcoal-800 font-semibold">{countLabel} items</b>
            </Link>

            {/* Primary CTA (glass gradient) */}
            <Link
              href="/quote"
              className="btn-glass-primary hidden sm:inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 tracking-[0.3px] whitespace-nowrap"
            >
              Request quote →
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-charcoal-800 p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu drops below the pill as its own glass panel */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 topbar-pill pointer-events-auto !rounded-[22px] px-5 py-5 animate-fade-in">
            <nav className="relative flex flex-col gap-3">
              {navLinks.map((link) =>
                link.label === 'Fabric Glossary' ? (
                  <div key="fabrics-mobile" className="border-b border-charcoal-800/10 pb-2">
                    <button
                      onClick={() => setFabricsOpen(prev => !prev)}
                      aria-expanded={fabricsOpen}
                      className="flex items-center justify-between w-full py-1 font-sans text-base font-medium text-charcoal-800"
                    >
                      Fabric Glossary
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${fabricsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        fabricsOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-3 pt-2 pb-2 space-y-1 border-l border-oxblood-700/30 ml-1">
                        {fabricGroups.map((group) => (
                          <Link
                            key={group}
                            href={`/fabric-glossary#group-${slugifyFabricGroup(group)}`}
                            onClick={() => {
                              setFabricsOpen(false)
                              setMobileOpen(false)
                            }}
                            className="flex items-center gap-3 py-2 text-charcoal-700 hover:text-oxblood-800 transition-colors"
                          >
                            <Layers size={13} className="text-oxblood-700 flex-shrink-0" />
                            <span className="font-sans text-sm">{group}</span>
                          </Link>
                        ))}
                        <Link
                          href="/fabric-glossary"
                          onClick={() => {
                            setFabricsOpen(false)
                            setMobileOpen(false)
                          }}
                          className="flex items-center gap-1.5 py-2 text-oxblood-800 hover:text-oxblood-900 font-sans text-xs tracking-wide transition-colors"
                        >
                          Open full glossary <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : link.label === 'Catalog' ? (
                  <div key="catalog-mobile" className="border-b border-charcoal-800/10 pb-2">
                    <button
                      onClick={() => setCatalogOpen(prev => !prev)}
                      aria-expanded={catalogOpen}
                      className="flex items-center justify-between w-full py-1 font-sans text-base font-medium text-charcoal-800"
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
                      <div className="pl-3 pt-2 pb-2 space-y-1 border-l border-oxblood-700/30 ml-1">
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
                              className="flex items-center gap-3 py-2 text-charcoal-700 hover:text-oxblood-800 transition-colors"
                            >
                              <Icon size={13} className="text-oxblood-700 flex-shrink-0" />
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
                          className="flex items-center gap-1.5 py-2 text-oxblood-800 hover:text-oxblood-900 font-sans text-xs tracking-wide transition-colors"
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
                    className="text-charcoal-800 hover:text-oxblood-800 text-base font-medium border-b border-charcoal-800/10 pb-3 inline-flex items-center gap-2"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-oxblood-900 text-white tracking-[0.8px] uppercase font-semibold rounded-md">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              )}
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="btn-glass-primary text-sm font-medium px-4 py-3 tracking-[0.3px] inline-flex items-center justify-center gap-2 mt-1"
              >
                Request quote →
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
