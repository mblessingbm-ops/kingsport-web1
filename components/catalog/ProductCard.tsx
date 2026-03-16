'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, Tag } from 'lucide-react'
import type { Product } from '@/types'
import { categories } from '@/data/products'

interface Props {
  product: Product
  onQuickView: (product: Product) => void
}

const placeholderGradients: Record<string, string> = {
  'ppe-safety': 'from-slate-700 to-slate-900',
  'corporate-wear': 'from-zinc-600 to-zinc-900',
  'promotional': 'from-oxblood-800 to-oxblood-950',
  'event-branding': 'from-neutral-600 to-neutral-900',
  'sports-wear': 'from-stone-600 to-stone-900',
  'school-wear': 'from-slate-500 to-slate-800',
}

const categoryColors: Record<string, string> = {
  'ppe-safety': 'bg-slate-100 text-slate-700',
  'corporate-wear': 'bg-zinc-100 text-zinc-700',
  'promotional': 'bg-rose-50 text-oxblood-800',
  'event-branding': 'bg-neutral-100 text-neutral-700',
  'sports-wear': 'bg-stone-100 text-stone-700',
  'school-wear': 'bg-blue-50 text-blue-700',
}

export default function ProductCard({ product, onQuickView }: Props) {
  const [imgError, setImgError] = useState(false)
  const catMeta = categories.find(c => c.id === product.category)
  const gradClass = placeholderGradients[product.category] || 'from-gray-700 to-gray-900'
  const labelClass = categoryColors[product.category] || 'bg-gray-100 text-gray-700'

  return (
    <div className="group product-card bg-white border border-gray-100">
      {/* Image */}
      <div className={`relative h-52 bg-gradient-to-br ${gradClass} overflow-hidden`}>
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl mb-2">{catMeta?.icon}</span>
            <span className="text-white/30 font-sans text-xs tracking-widest uppercase">{catMeta?.label}</span>
          </div>
        )}

        {/* Quick view overlay */}
        <div className="quick-view-overlay absolute inset-0 bg-charcoal-900/80 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-2 bg-white text-charcoal-800 text-xs font-sans font-medium px-4 py-2.5 hover:bg-oxblood-900 hover:text-white transition-colors duration-200"
          >
            <Eye size={13} />
            Quick View
          </button>
          <Link
            href={`/catalog/${product.slug}`}
            className="text-white text-xs font-sans font-medium border border-white/40 px-4 py-2.5 hover:bg-white/10 transition-colors"
          >
            Full Details
          </Link>
        </div>

        {product.featured && (
          <div className="absolute top-3 left-3 bg-oxblood-900 text-white text-[10px] tracking-widest uppercase px-2 py-1 font-sans z-10">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className={`inline-flex items-center gap-1 text-[10px] tracking-widest uppercase px-2 py-1 mb-3 font-sans ${labelClass}`}>
          <Tag size={9} />
          {catMeta?.label}
        </div>
        <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2 group-hover:text-oxblood-800 transition-colors">
          {product.name}
        </h3>
        <p className="text-charcoal-600/70 text-sm font-sans leading-relaxed line-clamp-2">
          {product.description.substring(0, 90)}...
        </p>

        {/* Colors */}
        {product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-4">
            {product.availableColors.slice(0, 6).map(color => (
              <div
                key={color.hex}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.availableColors.length > 6 && (
              <span className="text-[10px] text-gray-400 font-sans">+{product.availableColors.length - 6}</span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={`/catalog/${product.slug}`}
            className="text-oxblood-900 text-xs font-sans font-medium tracking-wide hover:text-oxblood-700 transition-colors"
          >
            View Specifications →
          </Link>
          <button
            onClick={() => onQuickView(product)}
            className="text-gray-400 hover:text-oxblood-700 transition-colors"
            title="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
