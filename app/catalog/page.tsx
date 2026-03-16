'use client'
import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '@/data/products'
import type { ProductCategory } from '@/types'
import ProductCard from '@/components/catalog/ProductCard'
import QuickViewModal from '@/components/catalog/QuickViewModal'
import type { Product } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('category') as ProductCategory | null

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCat || 'all')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchesCat && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-charcoal-900 pt-32 pb-16 grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
            Product <span className="italic text-oxblood-400">Catalog</span>
          </h1>
          <p className="text-white/50 font-sans max-w-xl">
            {products.length} products across 6 categories — all manufactured locally in Zimbabwe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-charcoal-800 font-sans text-sm placeholder-gray-400 focus:outline-none focus:border-oxblood-700 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="flex items-center text-charcoal-600/60 text-sm font-sans">
            <SlidersHorizontal size={14} className="mr-2" />
            {filtered.length} products
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-oxblood-900 text-white'
                : 'bg-white border border-gray-200 text-charcoal-600 hover:border-oxblood-700 hover:text-oxblood-800'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-oxblood-900 text-white'
                  : 'bg-white border border-gray-200 text-charcoal-600 hover:border-oxblood-700 hover:text-oxblood-800'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-charcoal-600/40 mb-4">No products found</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="text-oxblood-800 font-sans text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-display text-2xl text-charcoal-600/40">Loading catalog...</p></div>}>
      <CatalogContent />
    </Suspense>
  )
}
