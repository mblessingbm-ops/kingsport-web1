'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Check, AlertCircle, ShoppingBag, RotateCcw } from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

const garmentTypes = [
  { id: 'polo',   label: 'Polo Shirt',       image: '/images/products/executive-pique-polo.jpg' },
  { id: 'tshirt', label: 'T-Shirt',          image: '/images/products/180g-cotton-t-shirt.jpg' },
  { id: 'jacket', label: 'Softshell Jacket', image: '/images/products/softshell-jacket.jpg' },
  { id: 'conti',  label: 'Conti Suit',       image: '/images/products/heavy-duty-conti-suit.jpg' },
]

const brandingZones = [
  { id: 'chest-left',  label: 'Left Chest',  top: '28%', left: '32%' },
  { id: 'chest-right', label: 'Right Chest', top: '28%', left: '58%' },
  { id: 'back',        label: 'Back',        top: '28%', left: '80%' },
  { id: 'sleeve',      label: 'Sleeve',      top: '45%', left: '18%' },
]

const colourSwatches = [
  { name: 'Navy Blue',     hex: '#1a3a5c' },
  { name: 'Royal Blue',    hex: '#2563EB' },
  { name: 'Sky Blue',      hex: '#7dd3fc' },
  { name: 'Black',         hex: '#1a1a1a' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Light Grey',    hex: '#9ca3af' },
  { name: 'Forest Green',  hex: '#166534' },
  { name: 'Lime Green',    hex: '#65a30d' },
  { name: 'Oxblood Red',   hex: '#800020' },
  { name: 'Crimson',       hex: '#dc2626' },
  { name: 'Orange',        hex: '#f97316' },
  { name: 'Khaki',         hex: '#b5a16e' },
  { name: 'Sand',          hex: '#d4b896' },
  { name: 'White',         hex: '#f5f5f5' },
  { name: 'Cream',         hex: '#faf6ef' },
  { name: 'Purple',        hex: '#7c3aed' },
  { name: 'Maroon',        hex: '#7f1d1d' },
  { name: 'Teal',          hex: '#0d9488' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const MOQ = 25

// Garments shot on a white background — use multiply blend so the body colour overlay
// reads correctly. Everything else uses 'hue'.
const whiteBackgroundGarments = new Set(['polo', 'tshirt'])

export default function UniformBuilderPanel() {
  const { addItem } = useQuoteCart()

  const [selectedGarment, setSelectedGarment] = useState('polo')
  const [bodyColour, setBodyColour] = useState({ name: 'Navy Blue', hex: '#1a3a5c' })
  const [activeZone, setActiveZone] = useState<string | null>(null)
  const [sizeBreakdown, setSizeBreakdown] = useState<Record<string, number>>({})
  const [imgError, setImgError] = useState(false)
  const [addedToQuote, setAddedToQuote] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [selectedGarment])

  const currentGarment = garmentTypes.find(g => g.id === selectedGarment) || garmentTypes[0]
  const blendMode = whiteBackgroundGarments.has(selectedGarment) ? 'multiply' : 'hue'

  const totalQty = Object.values(sizeBreakdown).reduce((a, b) => a + b, 0)
  const meetsMinimum = totalQty >= MOQ
  const remaining = MOQ - totalQty

  const reset = () => {
    setSelectedGarment('polo')
    setBodyColour({ name: 'Navy Blue', hex: '#1a3a5c' })
    setActiveZone(null)
    setSizeBreakdown({})
  }

  const onAddToQuote = () => {
    if (!meetsMinimum) return
    const activeZoneLabel = activeZone ? brandingZones.find(z => z.id === activeZone)?.label : null
    addItem({
      productId: currentGarment.id,
      productName: `${currentGarment.label} — ${bodyColour.name}`,
      quantity: totalQty,
      color: bodyColour.name,
      notes: `Branding: ${activeZoneLabel ?? 'TBC'}. Sizes: ${sizes.map(s => `${s}:${sizeBreakdown[s] || 0}`).join(', ')}`,
    })
    setAddedToQuote(true)
    setTimeout(() => setAddedToQuote(false), 2500)
  }

  return (
    <div className="bg-white border border-charcoal-800/10 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Left column: preview ──────────────────────────────── */}
        <div>
          {/* Garment tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {garmentTypes.map(g => {
              const active = selectedGarment === g.id
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGarment(g.id)
                    setActiveZone(null)
                  }}
                  className={`px-4 py-2 text-xs font-sans font-medium tracking-wide transition-colors ${
                    active
                      ? 'bg-oxblood-900 text-white'
                      : 'bg-white border border-charcoal-800/15 text-charcoal-600 hover:border-oxblood-700'
                  }`}
                >
                  {g.label}
                </button>
              )
            })}
          </div>

          {/* Preview */}
          <div className="relative aspect-[3/4] max-w-xs mx-auto bg-cream-50">
            {imgError ? (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: bodyColour.hex }}
              >
                <span className="text-white/40 font-display text-sm">{currentGarment.label}</span>
              </div>
            ) : (
              <>
                <Image
                  src={currentGarment.image}
                  alt={currentGarment.label}
                  fill
                  className="object-contain"
                  onError={() => setImgError(true)}
                  sizes="(max-width: 1024px) 320px, 320px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: bodyColour.hex,
                    mixBlendMode: blendMode,
                    opacity: 0.72,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}

            {/* Branding hotspots */}
            {brandingZones.map(zone => {
              const active = activeZone === zone.id
              return (
                <div
                  key={zone.id}
                  className="absolute"
                  style={{ top: zone.top, left: zone.left, transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={() => setActiveZone(active ? null : zone.id)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      active
                        ? 'bg-oxblood-900 border-oxblood-700 text-white scale-110'
                        : 'bg-white/80 border-charcoal-800/30 text-charcoal-800 hover:border-oxblood-700'
                    }`}
                    title={zone.label}
                  >
                    <Plus size={12} />
                  </button>
                  {active && (
                    <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-charcoal-900 text-white text-[10px] font-sans px-2 py-1 whitespace-nowrap">
                      {zone.label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-charcoal-600/50 text-[10px] font-sans text-center mt-3">
            Tap a zone to mark a branding position
          </p>
        </div>

        {/* ── Right column: controls ────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Garment Colour */}
          <div>
            <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
              Garment Colour
            </div>
            <div className="flex flex-wrap gap-2">
              {colourSwatches.map(c => {
                const selected = c.hex === bodyColour.hex
                return (
                  <button
                    key={c.name}
                    onClick={() => setBodyColour(c)}
                    title={c.name}
                    className={`w-7 h-7 rounded-full border border-charcoal-800/15 transition-all ${
                      selected ? 'ring-2 ring-offset-1 ring-oxblood-700' : ''
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                )
              })}
            </div>
            <div className="mt-3 text-xs font-sans text-charcoal-600">
              <span className="text-charcoal-800 font-medium">{bodyColour.name}</span>
              <span className="text-charcoal-600/50 ml-2">{bodyColour.hex.toUpperCase()}</span>
            </div>
          </div>

          {/* Branding Positions */}
          <div>
            <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
              Branding Positions
            </div>
            {activeZone ? (
              <span className="bg-oxblood-900/10 border border-oxblood-700/30 text-oxblood-800 text-[10px] px-2.5 py-1 uppercase tracking-wide inline-block">
                {brandingZones.find(z => z.id === activeZone)?.label}
              </span>
            ) : (
              <p className="text-charcoal-600/40 text-xs italic">
                Tap the hotspots on the garment to mark branding positions
              </p>
            )}
          </div>

          {/* Size Breakdown */}
          <div>
            <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
              Size Breakdown
            </div>
            <div className="grid grid-cols-6 gap-2">
              {sizes.map(s => (
                <div key={s}>
                  <label className="block text-[10px] text-charcoal-600/60 font-sans uppercase text-center mb-1">
                    {s}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={sizeBreakdown[s] ?? ''}
                    onChange={e => {
                      const v = parseInt(e.target.value, 10)
                      setSizeBreakdown(prev => ({ ...prev, [s]: isNaN(v) || v < 0 ? 0 : v }))
                    }}
                    className="w-full text-center text-xs border border-charcoal-800/15 bg-cream-50 py-1.5 focus:outline-none focus:border-oxblood-700"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-sans">
              <span className="text-charcoal-600/50 uppercase tracking-wide text-[10px]">Total</span>
              <span className="text-charcoal-800 font-medium">{totalQty} units</span>
            </div>

            {/* MOQ Gate */}
            <div className="mt-2 flex items-center gap-1.5 text-xs font-sans">
              {meetsMinimum ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700">
                  <Check size={12} />
                  Minimum met — ready to quote
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-700">
                  <AlertCircle size={12} />
                  Minimum order is 25 units ({remaining} more needed)
                </span>
              )}
            </div>
          </div>

          {/* Add to Quote */}
          <button
            type="button"
            onClick={onAddToQuote}
            disabled={!meetsMinimum}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-sans font-medium tracking-wide transition-colors ${
              meetsMinimum
                ? 'bg-oxblood-900 hover:bg-oxblood-700 text-white'
                : 'bg-charcoal-800/10 text-charcoal-600/40 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={14} />
            {addedToQuote ? 'Added to Quote ✓' : 'Add to Quote'}
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-charcoal-600/50 hover:text-oxblood-700 transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>

          {/* Disclaimer */}
          <p className="text-[10px] text-charcoal-600/30 font-sans text-center mt-3">
            Colour rendering is indicative only. Final colours subject to fabric dye availability at sampling stage.
          </p>
        </div>
      </div>
    </div>
  )
}
