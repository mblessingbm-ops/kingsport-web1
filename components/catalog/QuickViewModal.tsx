'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ShoppingBag, FileText, Check } from 'lucide-react'
import type { Product } from '@/types'
import { useQuoteCart } from '@/hooks/useQuoteCart'
import { categories } from '@/data/products'

interface Props {
  product: Product | null
  onClose: () => void
}

const placeholderGradients: Record<string, string> = {
  'ppe-safety': 'from-slate-700 to-slate-900',
  'corporate-wear': 'from-zinc-600 to-zinc-900',
  'promotional': 'from-oxblood-800 to-oxblood-950',
  'event-branding': 'from-neutral-600 to-neutral-900',
  'sports-wear': 'from-stone-600 to-stone-900',
  'school-wear': 'from-slate-500 to-slate-800',
}

export default function QuickViewModal({ product, onClose }: Props) {
  const { addItem } = useQuoteCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    if (product) {
      setAdded(false)
      setQty(1)
      setSelectedColor(product.availableColors[0]?.name || null)
    }
  }, [product])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const catMeta = categories.find(c => c.id === product.category)
  const gradClass = placeholderGradients[product.category] || 'from-gray-700 to-gray-900'

  const handleAddToQuote = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      color: selectedColor || undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/60 animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-up shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className={`relative h-64 md:h-auto bg-gradient-to-br ${gradClass} flex flex-col items-center justify-center min-h-[260px] overflow-hidden`}>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <>
                <span className="text-6xl mb-3">{catMeta?.icon}</span>
                <span className="text-white/30 font-sans text-xs tracking-widest uppercase">{catMeta?.label}</span>
              </>
            )}
          </div>

          {/* Right: Details */}
          <div className="p-7 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-[10px] tracking-widest uppercase text-oxblood-700 font-sans font-medium mb-3">
              {catMeta?.label}
            </div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-800 mb-3">
              {product.name}
            </h2>
            <p className="text-charcoal-600/70 text-sm font-sans leading-relaxed mb-5">
              {product.description.substring(0, 160)}...
            </p>

            {/* Key specs */}
            <div className="space-y-2 mb-5 bg-cream-50 p-4">
              {product.specs.slice(0, 3).map(spec => (
                <div key={spec.label} className="flex gap-4 text-sm">
                  <span className="font-sans font-medium text-charcoal-700 w-28 flex-shrink-0">{spec.label}</span>
                  <span className="text-charcoal-600/70 font-sans">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Color selector */}
            {product.availableColors.length > 0 && (
              <div className="mb-5">
                <p className="text-xs tracking-widest uppercase text-charcoal-600/50 font-sans mb-2">
                  Colour: <span className="text-charcoal-700">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-oxblood-700 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-xs tracking-widest uppercase text-charcoal-600/50 font-sans">Qty:</p>
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50">-</button>
                <span className="px-4 py-2 text-sm font-sans font-medium border-x border-gray-200">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 text-gray-500 hover:bg-gray-50">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToQuote}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-sans font-medium transition-all duration-200 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-oxblood-900 text-white hover:bg-oxblood-700'
                }`}
              >
                {added ? <Check size={14} /> : <ShoppingBag size={14} />}
                {added ? 'Added to Quote' : 'Add to Quote'}
              </button>
              <Link
                href={`/catalog/${product.slug}`}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-sans font-medium border border-charcoal-700 text-charcoal-700 hover:bg-charcoal-700 hover:text-white transition-all duration-200"
              >
                <FileText size={14} />
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
