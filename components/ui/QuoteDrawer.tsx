'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateItem, clearCart, count } = useQuoteCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal-900/60 z-40 transition-opacity duration-350 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-label="Quote drawer"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-350 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-800/8">
          <div>
            <h2 className="font-display text-2xl font-light text-charcoal-800">
              My <span className="italic text-oxblood-800">Quote</span>
            </h2>
            <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mt-0.5">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote"
            className="w-8 h-8 flex items-center justify-center border border-charcoal-800/15 hover:border-oxblood-700 text-charcoal-600/50 hover:text-oxblood-700 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable item list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={32} className="text-charcoal-800/15 mb-4" />
              <p className="font-display text-xl font-light text-charcoal-700">
                Your quote list is empty
              </p>
              <p className="text-xs font-sans text-charcoal-600/40 mt-2">
                Add products from the catalog to get started.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.productId} className="flex gap-3 bg-cream-50 border border-charcoal-800/8 p-4">
                {/* Colour swatch placeholder */}
                <div className="w-10 h-10 flex-shrink-0 bg-charcoal-800 flex items-center justify-center">
                  <span className="text-white/20 font-display text-[10px]">KP</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans font-medium text-charcoal-800 text-xs leading-snug line-clamp-2">
                      {item.productName}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.productName}`}
                      className="text-charcoal-600/25 hover:text-oxblood-700 transition-colors flex-shrink-0 mt-0.5"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  {item.color && (
                    <p className="text-[10px] text-charcoal-600/40 font-sans mt-0.5">{item.color}</p>
                  )}
                  {/* Quantity controls */}
                  <div className="flex items-center gap-0 mt-2">
                    <button
                      onClick={() => updateItem(item.productId, { quantity: Math.max(1, item.quantity - 1) })}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 border border-charcoal-800/15 flex items-center justify-center hover:bg-oxblood-900 hover:border-oxblood-900 hover:text-white transition-all text-charcoal-700"
                    >
                      <Minus size={9} />
                    </button>
                    <span className="w-8 text-center text-xs font-sans font-medium text-charcoal-800 border-y border-charcoal-800/15 h-6 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(item.productId, { quantity: item.quantity + 1 })}
                      aria-label="Increase quantity"
                      className="w-6 h-6 border border-charcoal-800/15 flex items-center justify-center hover:bg-oxblood-900 hover:border-oxblood-900 hover:text-white transition-all text-charcoal-700"
                    >
                      <Plus size={9} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-charcoal-800/8 space-y-3">
            <Link
              href="/quote"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-oxblood-900 hover:bg-oxblood-700 text-white py-3.5 font-sans font-medium text-sm tracking-wide transition-all duration-200"
            >
              Proceed to Full Quote
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full border border-charcoal-800/15 hover:border-charcoal-800/30 text-charcoal-600/60 hover:text-charcoal-700 py-2.5 font-sans text-xs tracking-wide transition-all duration-200"
            >
              Continue Browsing
            </button>
            <button
              onClick={() => {
                clearCart()
                onClose()
              }}
              className="flex items-center justify-center w-full text-[10px] font-sans text-charcoal-600/30 hover:text-oxblood-700 tracking-widest uppercase transition-colors pt-1"
            >
              Clear All Items
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
