'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/data/products'

const categoryImages: Record<string, string> = {
  'ppe-safety':     '/images/products/conti-suit.png',
  'corporate-wear': '/images/products/pique-polo.png',
  'promotional':    '/images/products/coffee-mug.png',
  'event-branding': '/images/products/event-gazebo.png',
  'sports-wear':    '/images/products/full-sports-tracksuit.png',
  'school-wear':    '/images/products/school-uniform-set.png',
}

export default function CategoryGrid() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="block w-10 h-px bg-oxblood-900 mb-4" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-charcoal-800 leading-tight">
              Product
              <br />
              <span className="italic text-oxblood-800">Categories</span>
            </h2>
          </div>
          <p className="text-charcoal-600 font-sans max-w-sm leading-relaxed text-sm md:text-base">
            From industrial PPE to executive corporate wear — six complete categories manufactured under one roof in Zimbabwe.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className={`group relative overflow-hidden cursor-pointer ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1 min-h-[280px]' : 'min-h-[240px]'
              }`}
            >
              {/* Background product image (or fallback gradient) */}
              {imgErrors[cat.id] ? (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900" />
              ) : (
                <Image
                  src={categoryImages[cat.id]}
                  alt={cat.label}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={() => setImgErrors(prev => ({ ...prev, [cat.id]: true }))}
                />
              )}

              {/* Permanent dark scrim — keeps text readable */}
              <div className="absolute inset-0 bg-charcoal-900/55" />

              {/* Oxblood hover tint */}
              <div className="absolute inset-0 bg-oxblood-900/0 group-hover:bg-oxblood-900/30 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="text-4xl">{cat.icon}</div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{cat.label}</h3>
                  <p className="text-white/60 text-sm font-sans leading-relaxed mb-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-2 text-oxblood-400 text-sm font-sans font-medium">
                    <span>Explore Range</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-200" />
                  </div>
                </div>
              </div>

              {/* Bottom rule */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-oxblood-700 transition-all duration-300 z-10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
