'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

const navLinks: { label: string; href: string; badge?: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useQuoteCart()
  const countLabel = String(count).padStart(2, '0')

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
        <nav className="hidden lg:flex gap-7 text-[13.5px] font-medium">
          {navLinks.map((link) => (
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
          ))}
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
            {navLinks.map((link) => (
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
            ))}
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
