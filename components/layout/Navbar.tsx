'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Uniform Builder', href: '/uniform-builder' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useQuoteCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal-900/98 backdrop-blur-sm shadow-lg shadow-black/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image
              src="/images/kingsport-logo.png"
              alt="Kingsport Investments"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-display text-lg font-semibold tracking-wide leading-none">
              KINGSPORT
            </div>
            <div className="text-oxblood-400 text-[10px] tracking-[0.2em] uppercase font-sans font-medium">
              Investments
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-oxblood-400 text-sm font-medium tracking-wide transition-colors duration-200 font-sans"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="relative flex items-center gap-2 bg-oxblood-900 hover:bg-oxblood-700 text-white px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 font-sans"
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">Quote Request</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-oxblood-900 rounded-full text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-charcoal-900 border-t border-white/10 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-oxblood-400 text-base font-medium transition-colors font-sans border-b border-white/5 pb-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
