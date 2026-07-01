'use client'

import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

interface Props {
  onOpen: () => void
}

// Matches the pill's resting distance from the viewport bottom (the old
// bottom-8 = 2rem) — reused as the gap kept above the footer's divider
// line once the pill docks there near the end of the page.
const GAP = 32

export default function QuotePill({ onOpen }: Props) {
  const { count } = useQuoteCart()
  const prevCountRef = useRef(count)
  const [isPulsing, setIsPulsing] = useState(false)
  const [bottom, setBottom] = useState(GAP)

  useEffect(() => {
    if (count > prevCountRef.current) {
      setIsPulsing(true)
      const t = setTimeout(() => setIsPulsing(false), 600)
      prevCountRef.current = count
      return () => clearTimeout(t)
    }
    prevCountRef.current = count
  }, [count])

  // Dock the pill's bottom edge just above the footer's divider line
  // (see Footer.tsx's [data-footer-divider]) as the page scrolls toward
  // the end, instead of letting the fixed pill float over the footer
  // content. Continuous by construction: Math.max picks whichever value
  // is larger, and the two formulas agree exactly at the crossover point,
  // so there's no jump when docking kicks in.
  useEffect(() => {
    const divider = document.querySelector<HTMLElement>('[data-footer-divider]')
    if (!divider) return

    let ticking = false
    const update = () => {
      ticking = false
      const dividerTop = divider.getBoundingClientRect().top
      const docked = window.innerHeight - dividerTop + GAP
      setBottom(Math.max(GAP, docked))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className={`fixed right-8 z-50 transition-[opacity,transform] duration-300 ${
        count > 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      style={{ bottom }}
    >
      <button
        onClick={onOpen}
        aria-label={`Open quote — ${count} item${count === 1 ? '' : 's'}`}
        className={`flex items-center gap-3 bg-oxblood-900 hover:bg-oxblood-700 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-oxblood-950/40 transition-all duration-200 ${
          isPulsing ? 'animate-quote-pulse' : ''
        }`}
      >
        <div className="relative">
          <ShoppingBag size={17} />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-oxblood-900 text-[9px] font-sans font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        </div>
        <span className="font-sans text-sm font-medium tracking-wide">My Quote</span>
        <ChevronRight size={13} className="text-white/50" />
      </button>
    </div>
  )
}
