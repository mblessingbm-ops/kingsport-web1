import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import ProductCardStatic from '@/components/catalog/ProductCardStatic'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 6)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="block w-10 h-px bg-oxblood-900 mb-4" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-charcoal-800">
              Featured
              <br />
              <span className="italic text-oxblood-800">Products</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 text-oxblood-900 font-sans text-sm font-medium hover:text-oxblood-700 transition-colors"
          >
            View Full Catalog
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(product => (
            <ProductCardStatic key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
