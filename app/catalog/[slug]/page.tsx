'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Download, Check, ArrowLeft, ChevronRight, Link2, Paintbrush } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, categories } from '@/data/products'
import { useQuoteCart } from '@/hooks/useQuoteCart'
import ProductCardStatic from '@/components/catalog/ProductCardStatic'

interface Props {
  params: { slug: string }
}

const placeholderGradients: Record<string, string> = {
  'ppe-safety': 'from-slate-700 to-slate-900',
  'corporate-wear': 'from-zinc-600 to-zinc-900',
  'promotional': 'from-oxblood-800 to-oxblood-950',
  'event-branding': 'from-neutral-600 to-neutral-900',
  'sports-wear': 'from-stone-600 to-stone-900',
  'school-wear': 'from-slate-500 to-slate-800',
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.id)
  const catMeta = categories.find(c => c.id === product.category)
  const { addItem } = useQuoteCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0]?.name || '')
  const [copied, setCopied] = useState(false)
  const galleryImages = [product.image, ...(product.additionalImages ?? [])]
  const [selectedImage, setSelectedImage] = useState<string>(product.image)
  const gradClass = placeholderGradients[product.category] || 'from-gray-700 to-gray-900'

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAdd = () => {
    addItem({ productId: product.id, productName: product.name, quantity: qty, color: selectedColor })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const handleDownloadSpec = () => {
    // Generate a simple spec sheet as a text blob
    const content = `
KINGSPORT INVESTMENTS - PRODUCT SPECIFICATION SHEET
====================================================
Product: ${product.name}
Category: ${catMeta?.label}
Date: ${new Date().toLocaleDateString('en-ZW')}

DESCRIPTION
-----------
${product.description}

SPECIFICATIONS
--------------
${product.specs.map(s => `${s.label}: ${s.value}`).join('\n')}

MATERIALS
---------
${product.materials.join(', ')}

AVAILABLE COLOURS
-----------------
${product.availableColors.map(c => c.name).join(', ')}

${product.sizes ? `AVAILABLE SIZES\n---------------\n${product.sizes.join(', ')}` : ''}

---
For enquiries: info@kingsport.co.zw | 024 277 0712 / 0607 / 0922
Kingsport Investments (Pvt) Ltd, Harare, Zimbabwe
Incorporated 1998
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Kingsport-SpecSheet-${product.name.replace(/\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-charcoal-900 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-white/40 text-xs font-sans">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
            <ChevronRight size={12} />
            <Link href={`/catalog?category=${product.category}`} className="hover:text-white transition-colors">
              {catMeta?.label}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-charcoal-600/60 hover:text-charcoal-800 text-sm font-sans mb-8 transition-colors">
          <ArrowLeft size={14} />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image */}
          <div>
            <div className={`relative h-96 lg:h-[500px] bg-gradient-to-br ${gradClass} overflow-hidden`}>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-8xl mb-4">{catMeta?.icon}</span>
                  <span className="text-white/30 font-sans text-sm tracking-widest uppercase">{catMeta?.label}</span>
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 left-4 bg-oxblood-900 text-white text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans z-10">
                  Featured Product
                </div>
              )}
            </div>

            {/* Thumbnail strip — only shows when there's more than one image */}
            {galleryImages.length > 1 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {galleryImages.map((src) => {
                  const active = src === selectedImage
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelectedImage(src)}
                      aria-label={`View image ${src.split('/').pop()}`}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden border transition-all ${
                        active
                          ? 'border-oxblood-700 ring-1 ring-oxblood-700/40'
                          : 'border-charcoal-800/10 hover:border-oxblood-700/60'
                      } bg-cream-50`}
                    >
                      <img
                        src={src}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain object-center"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            <div className="text-[10px] tracking-widest uppercase text-oxblood-700 font-sans font-medium mb-3">
              {catMeta?.label}
            </div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal-800">
                {product.name}
              </h1>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 border border-charcoal-800/15 hover:border-oxblood-700 text-charcoal-600/50 hover:text-oxblood-700 px-3 py-1.5 text-[10px] font-sans tracking-widest uppercase transition-all duration-200 flex-shrink-0 mt-2"
              >
                {copied ? <Check size={11} /> : <Link2 size={11} />}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] tracking-widest uppercase bg-gray-100 text-gray-600 px-3 py-1 font-sans">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-charcoal-600/80 font-sans leading-relaxed mb-6 text-sm md:text-base">
              {product.description}
            </p>

            {/* MOQ + Lead Time strip */}
            <div className="grid grid-cols-2 gap-3 py-5 border-y border-charcoal-800/8 mb-8">
              <div>
                <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-1">
                  Min. Order Qty
                </p>
                <p className="font-sans font-semibold text-charcoal-800 text-sm">
                  {product.moq} units
                </p>
              </div>
              <div>
                <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-1">
                  Lead Time
                </p>
                <p className="font-sans font-semibold text-charcoal-800 text-sm">
                  {product.leadTime}
                </p>
              </div>
            </div>

            {/* Colour selector */}
            {product.availableColors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-charcoal-600/50 font-sans mb-3">
                  Available Colours
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.availableColors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-2 border text-xs font-sans transition-all ${
                        selectedColor === color.name
                          ? 'border-oxblood-700 bg-oxblood-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full block border border-gray-200" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-charcoal-600/50 font-sans mb-3">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <span key={size} className="px-3 py-1.5 border border-gray-200 text-xs font-sans text-charcoal-600 bg-white">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest uppercase text-charcoal-600/50 font-sans">Quantity:</span>
              <div className="flex items-center border border-gray-200 bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg">−</button>
                <span className="px-6 py-2 text-sm font-sans font-medium border-x border-gray-200 min-w-[60px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-lg">+</button>
              </div>
            </div>

            {/* Customisation Methods */}
            <div className="mt-6 mb-6">
              <p className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40 mb-3">
                Customisation Methods
              </p>
              <div className="flex flex-wrap gap-2">
                {product.customisationMethods.map(method => (
                  <span
                    key={method}
                    className="inline-flex items-center gap-1.5 border border-charcoal-800/10 bg-cream-50 text-charcoal-700 text-[10px] font-sans tracking-wide uppercase px-3 py-1.5"
                  >
                    <Paintbrush size={10} className="text-oxblood-700" />
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-sans font-medium text-sm ${
                  added ? 'bg-green-600 text-white rounded-full transition-all duration-200' : 'btn-glass-primary'
                }`}
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? 'Added to Quote' : 'Add to Quote'}
              </button>
              <button
                onClick={handleDownloadSpec}
                className="btn-glass flex items-center justify-center gap-2 py-4 px-6 text-charcoal-700 font-sans font-medium text-sm"
              >
                <Download size={16} />
                Spec Sheet
              </button>
            </div>

            <div className="text-xs text-charcoal-600/40 font-sans">
              All prices are quoted on request. Minimum order quantities apply per product.
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-oxblood-900" />
            <h2 className="font-display text-3xl font-light text-charcoal-800">
              Specifications
            </h2>
          </div>
          <div className="bg-white border border-gray-100">
            <table className="w-full">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-sans font-medium text-charcoal-700 w-1/3 border-b border-gray-100">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-sm font-sans text-charcoal-600/80 border-b border-gray-100">
                      {spec.value}
                    </td>
                  </tr>
                ))}
                <tr className={product.specs.length % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-sm font-sans font-medium text-charcoal-700">Materials</td>
                  <td className="px-6 py-4 text-sm font-sans text-charcoal-600/80">
                    {product.materials.join(' · ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-10 h-px bg-oxblood-900" />
              <h2 className="font-display text-3xl font-light text-charcoal-800">
                Commonly Ordered <span className="italic text-oxblood-800">Together</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {related.slice(0, 4).map(rel => (
                <ProductCardStatic key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
