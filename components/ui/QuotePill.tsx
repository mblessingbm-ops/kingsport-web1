'use client'

import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

interface Props {
  onOpen: () => void
}

export default function QuotePill({ onOpen }: Props) {
  const { count } = useQuoteCart()
  const prevCountRef = useRef(count)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (count > prevCountRef.current) {
      setIsPulsing(true)
      const t = setTimeout(() => setIsPulsing(false), 600)
      prevCountRef.current = count
      return () => clearTimeout(t)
    }
    prevCountRef.current = count
  }, [count])

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        count > 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={onOpen}
        aria-label={`Open quote — ${count} item${count === 1 ? '' : 's'}`}
        className={`flex items-center gap-3 bg-oxblood-900 hover:bg-oxblood-700 text-white pl-4 pr-5 py-3.5 shadow-2xl shadow-oxblood-950/40 transition-all duration-200 ${
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
