import Link from 'next/link'
import { Tag } from 'lucide-react'
import type { Product } from '@/types'
import { categories } from '@/data/products'

interface Props {
  product: Product
}

const categoryColors: Record<string, string> = {
  'ppe-safety': 'bg-slate-100 text-slate-700',
  'corporate-wear': 'bg-zinc-100 text-zinc-700',
  'promotional': 'bg-oxblood-50 text-oxblood-800',
  'event-branding': 'bg-neutral-100 text-neutral-700',
  'sports-wear': 'bg-stone-100 text-stone-700',
  'school-wear': 'bg-slate-100 text-slate-700',
}

const placeholderGradients: Record<string, string> = {
  'ppe-safety': 'from-slate-700 to-slate-900',
  'corporate-wear': 'from-zinc-600 to-zinc-900',
  'promotional': 'from-oxblood-800 to-oxblood-950',
  'event-branding': 'from-neutral-600 to-neutral-900',
  'sports-wear': 'from-stone-600 to-stone-900',
  'school-wear': 'from-slate-500 to-slate-800',
}

export default function ProductCardStatic({ product }: Props) {
  const catMeta = categories.find(c => c.id === product.category)
  const gradClass = placeholderGradients[product.category] || 'from-gray-700 to-gray-900'
  const labelClass = categoryColors[product.category] || 'bg-gray-100 text-gray-700'

  return (
    <Link href={`/catalog/${product.slug}`} className="group block product-card bg-white border border-gray-100">
      {/* Image */}
      <div className={`relative h-52 bg-gradient-to-br ${gradClass} overflow-hidden`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl mb-2">{catMeta?.icon}</span>
            <span className="text-white/30 font-sans text-xs tracking-widest uppercase">{catMeta?.label}</span>
          </div>
        )}
        {/* Hover overlay with quick-view */}
        <div className="quick-view-overlay absolute inset-0 bg-oxblood-950/70 flex items-center justify-center">
          <span className="text-white font-sans text-sm font-medium border border-white/40 px-5 py-2 hover:bg-white/10 transition-colors">
            View Details
          </span>
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3 bg-oxblood-900 text-white text-[10px] tracking-widest uppercase px-2 py-1 font-sans">
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

        {/* Colors preview */}
        {product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-4">
            {product.availableColors.slice(0, 6).map(color => (
              <div
                key={color.hex}
                className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
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
          <span className="text-oxblood-900 text-xs font-sans font-medium tracking-wide">
            View Specifications →
          </span>
        </div>
      </div>
    </Link>
  )
}
