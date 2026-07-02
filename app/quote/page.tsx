'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowRight, Check, ShoppingBag, X, AlertCircle } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'
import { products } from '@/data/products'

export default function QuotePage() {
  const { items, removeItem, updateItem, clearCart } = useQuoteCart()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    deliveryDate: '',
    additionalNotes: '',
  })

  const getProduct = (id: string) => products.find(p => p.id === id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    // Build a clean text email body for the sales team
    const itemsBlock = items
      .map((item, i) => {
        const product = getProduct(item.productId)
        return [
          `${i + 1}. ${item.productName}`,
          `   ID: ${item.productId}`,
          product?.slug && `   Slug: ${product.slug}`,
          `   Quantity: ${item.quantity} units`,
          item.color && `   Colour: ${item.color}`,
          item.size && `   Size: ${item.size}`,
          item.notes && `   Notes: ${item.notes}`,
        ]
          .filter(Boolean)
          .join('\n')
      })
      .join('\n\n')

    const bodyLines = [
      'New quote request — submitted via kingsport.co.zw',
      '====================================================',
      '',
      '— Contact —',
      `Company:     ${form.companyName}`,
      `Contact:     ${form.contactName}`,
      `Email:       ${form.email}`,
      `Phone:       ${form.phone}`,
      form.deliveryDate && `Required by: ${form.deliveryDate}`,
      '',
      `— Products (${items.length} item${items.length === 1 ? '' : 's'}) —`,
      '',
      itemsBlock,
      '',
      form.additionalNotes && '— Additional Notes —',
      form.additionalNotes && form.additionalNotes,
    ].filter(Boolean).join('\n')

    const subject = `Quote Request — ${form.companyName} (${items.length} item${items.length === 1 ? '' : 's'})`

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, text: bodyLines, replyTo: form.email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send — please try again.')
      }
      setSubmitted(true)
      clearCart()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const updateQty = (productId: string, delta: number) => {
    const item = items.find(i => i.productId === productId)
    if (!item) return
    // Floor at the product's MOQ so a quote can't be sent below minimum.
    const moq = getProduct(productId)?.moq ?? 1
    const newQty = Math.max(moq, item.quantity + delta)
    updateItem(productId, { quantity: newQty })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6 pt-24">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-oxblood-900 flex items-center justify-center mx-auto mb-8">
            <Check size={28} className="text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mb-4">
            Quote Request <span className="italic text-oxblood-800">Sent</span>
          </h1>
          <p className="text-charcoal-600/70 font-sans leading-relaxed mb-8">
            Your request has been sent to our sales team. We&apos;ll get back to you with a detailed quotation within 1–2 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog"
              className="btn-glass-primary inline-flex items-center gap-2 px-7 py-3 font-sans font-medium text-sm tracking-wide"
            >
              Continue Browsing
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/"
              className="btn-glass inline-flex items-center gap-2 text-charcoal-700 px-7 py-3 font-sans font-medium text-sm tracking-wide"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-charcoal-900 pt-32 pb-16 grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-3">
            Request a <span className="italic text-oxblood-400">Quote</span>
          </h1>
          <p className="text-white/50 font-sans text-sm max-w-xl">
            Review your selected products, specify quantities, and submit your enquiry. We&apos;ll respond within 1–2 business days.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto text-charcoal-700/20 mb-6" />
            <h2 className="font-display text-3xl font-light text-charcoal-700 mb-3">Your quote list is empty</h2>
            <p className="text-charcoal-600/60 font-sans text-sm mb-8">
              Browse the catalog and add products to get started.
            </p>
            <Link
              href="/catalog"
              className="btn-glass-primary inline-flex items-center gap-2 px-7 py-3 font-sans font-medium text-sm tracking-wide"
            >
              Browse Catalog
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Items list */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-light text-charcoal-800">
                  Selected Products
                  <span className="text-oxblood-700 ml-2 text-lg">({items.length})</span>
                </h2>
                <button
                  onClick={clearCart}
                  className="text-xs text-charcoal-600/50 hover:text-oxblood-700 font-sans tracking-wide uppercase transition-colors flex items-center gap-1"
                >
                  <X size={12} />
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => {
                  const product = getProduct(item.productId)
                  return (
                    <div
                      key={item.productId}
                      className="bg-white border border-charcoal-800/8 p-5 flex gap-4 group"
                    >
                      {/* Color swatch / placeholder */}
                      <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900 flex items-center justify-center">
                        <span className="text-white/30 font-display text-xs font-light tracking-widest">KP</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-sans font-medium text-charcoal-800 text-sm leading-tight">
                              {item.productName}
                            </h3>
                            {item.color && (
                              <span className="text-xs text-charcoal-600/50 font-sans">{item.color}</span>
                            )}
                            {product && (
                              <Link
                                href={`/catalog/${product.slug}`}
                                className="block text-[10px] text-oxblood-700/70 hover:text-oxblood-700 font-sans mt-0.5 tracking-wide uppercase transition-colors"
                              >
                                View Details →
                              </Link>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-charcoal-600/30 hover:text-oxblood-700 transition-colors flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-0 mt-3">
                          <button
                            onClick={() => updateQty(item.productId, -1)}
                            className="w-8 h-8 border border-charcoal-800/15 flex items-center justify-center hover:bg-oxblood-900 hover:border-oxblood-900 hover:text-white transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-12 text-center text-sm font-sans font-medium text-charcoal-800 border-y border-charcoal-800/15 h-8 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.productId, 1)}
                            className="w-8 h-8 border border-charcoal-800/15 flex items-center justify-center hover:bg-oxblood-900 hover:border-oxblood-900 hover:text-white transition-all"
                          >
                            <Plus size={12} />
                          </button>
                          <span className="ml-3 text-xs text-charcoal-600/50 font-sans">units</span>
                        </div>

                        {/* Per-item notes */}
                        <input
                          type="text"
                          placeholder="Item notes (size, print, colour spec...)"
                          value={item.notes || ''}
                          onChange={(e) => updateItem(item.productId, { notes: e.target.value })}
                          className="mt-2 w-full text-xs font-sans px-3 py-2 border border-charcoal-800/10 bg-cream-50 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Add more */}
              <Link
                href="/catalog"
                className="mt-4 flex items-center gap-2 text-xs text-oxblood-700 hover:text-oxblood-900 font-sans tracking-wide uppercase transition-colors py-3"
              >
                <Plus size={12} />
                Add More Products
              </Link>
            </div>

            {/* Right: Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-charcoal-800/8 p-8 sticky top-32">
                <h2 className="font-display text-2xl font-light text-charcoal-800 mb-1">
                  Your Details
                </h2>
                <p className="text-charcoal-600/50 text-xs font-sans mb-7">All fields are required</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                      Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.companyName}
                      onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                      className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                      placeholder="e.g. Acme Mining Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.contactName}
                      onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
                      className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                        Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                        placeholder="+263 77..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                      Required By (optional)
                    </label>
                    <input
                      type="date"
                      value={form.deliveryDate}
                      onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-oxblood-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      value={form.additionalNotes}
                      onChange={e => setForm(f => ({ ...f, additionalNotes: e.target.value }))}
                      className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors resize-none"
                      placeholder="Branding details, delivery address, urgency..."
                    />
                  </div>

                  {submitError && (
                    <div role="alert" className="flex items-start gap-2.5 bg-oxblood-50 border border-oxblood-200 px-4 py-3 text-xs text-oxblood-800 font-sans leading-relaxed">
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>
                        {submitError} You can also email{' '}
                        <a className="underline hover:no-underline" href="mailto:sales@kingsport.co.zw">
                          sales@kingsport.co.zw
                        </a>{' '}
                        or call <b>+263 24 277 0712</b> directly.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-glass-primary w-full disabled:opacity-60 py-4 font-sans font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-charcoal-600/40 font-sans leading-relaxed text-center">
                    By submitting, you agree to be contacted by our sales team regarding your enquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
