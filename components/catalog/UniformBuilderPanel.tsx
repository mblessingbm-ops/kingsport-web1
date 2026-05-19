'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import jsPDF from 'jspdf'
import {
  Plus,
  X,
  Check,
  AlertTriangle,
  Upload,
  FileDown,
  Link2,
  ShoppingBag,
  RotateCcw,
  AlertCircle,
} from 'lucide-react'
import { useQuoteCart } from '@/hooks/useQuoteCart'

// ── Types ─────────────────────────────────────────────────────────────
type BrandingMethod = 'Embroidery' | 'Screen Print' | 'Heat Transfer' | 'Sublimation'

interface BrandingZoneConfig {
  zoneId: string
  method: BrandingMethod | null
  logoDataUrl: string | null
}

interface GarmentConfig {
  id: string
  garmentTypeId: string
  fabricWeight: string | null
  bodyColour: { name: string; hex: string }
  activeZoneId: string | null
  brandingZones: BrandingZoneConfig[]
  sizeBreakdown: Record<string, number>
}

interface UniformSet {
  garments: GarmentConfig[]
  setName: string
}

interface ZoneMeta {
  id: string
  label: string
  top: string
  left: string
  maxMethods: BrandingMethod[]
}

interface GarmentTypeMeta {
  id: string
  label: string
  image: string
  supportsFabricWeight: boolean
  fabricWeights: string[]
  brandingZones: ZoneMeta[]
}

// ── Data ──────────────────────────────────────────────────────────────
const garmentTypes: GarmentTypeMeta[] = [
  {
    id: 'polo',
    label: 'Polo Shirt',
    image: '/images/products/executive-pique-polo.jpg',
    supportsFabricWeight: true,
    fabricWeights: ['160g', '180g', '200g'],
    brandingZones: [
      { id: 'chest-left',  label: 'Left Chest',  top: '28%', left: '32%', maxMethods: ['Embroidery', 'Screen Print', 'Heat Transfer'] },
      { id: 'chest-right', label: 'Right Chest', top: '28%', left: '58%', maxMethods: ['Embroidery', 'Screen Print', 'Heat Transfer'] },
      { id: 'back',        label: 'Back',        top: '30%', left: '78%', maxMethods: ['Screen Print', 'Heat Transfer', 'Sublimation'] },
      { id: 'sleeve',      label: 'Sleeve',      top: '45%', left: '18%', maxMethods: ['Embroidery', 'Screen Print', 'Heat Transfer'] },
    ],
  },
  {
    id: 'tshirt',
    label: 'T-Shirt',
    image: '/images/products/180g-cotton-t-shirt.jpg',
    supportsFabricWeight: true,
    fabricWeights: ['160g', '180g'],
    brandingZones: [
      { id: 'chest-left',  label: 'Left Chest',  top: '28%', left: '32%', maxMethods: ['Screen Print', 'Heat Transfer', 'Sublimation'] },
      { id: 'chest-right', label: 'Right Chest', top: '28%', left: '58%', maxMethods: ['Screen Print', 'Heat Transfer'] },
      { id: 'back',        label: 'Back',        top: '30%', left: '78%', maxMethods: ['Screen Print', 'Heat Transfer', 'Sublimation'] },
      { id: 'sleeve',      label: 'Sleeve',      top: '45%', left: '18%', maxMethods: ['Screen Print', 'Heat Transfer'] },
    ],
  },
  {
    id: 'jacket',
    label: 'Softshell Jacket',
    image: '/images/products/softshell-jacket.jpg',
    supportsFabricWeight: false,
    fabricWeights: [],
    brandingZones: [
      { id: 'chest-left',  label: 'Left Chest',  top: '30%', left: '32%', maxMethods: ['Embroidery', 'Heat Transfer'] },
      { id: 'chest-right', label: 'Right Chest', top: '30%', left: '58%', maxMethods: ['Embroidery', 'Heat Transfer'] },
      { id: 'back',        label: 'Back',        top: '32%', left: '78%', maxMethods: ['Embroidery', 'Heat Transfer', 'Screen Print'] },
      { id: 'sleeve',      label: 'Sleeve',      top: '48%', left: '16%', maxMethods: ['Embroidery'] },
    ],
  },
  {
    id: 'conti',
    label: 'Conti Suit',
    image: '/images/products/heavy-duty-conti-suit.jpg',
    supportsFabricWeight: false,
    fabricWeights: [],
    brandingZones: [
      { id: 'chest-left', label: 'Left Chest', top: '28%', left: '30%', maxMethods: ['Embroidery', 'Screen Print', 'Heat Transfer'] },
      { id: 'back',       label: 'Back',       top: '30%', left: '78%', maxMethods: ['Screen Print', 'Heat Transfer'] },
      { id: 'sleeve',     label: 'Sleeve',     top: '45%', left: '16%', maxMethods: ['Embroidery', 'Heat Transfer'] },
    ],
  },
  {
    id: 'cap',
    label: 'Cap',
    image: '/images/products/baseball-cap-6-panel.jpg',
    supportsFabricWeight: false,
    fabricWeights: [],
    brandingZones: [
      { id: 'front-panel', label: 'Front Panel', top: '38%', left: '50%', maxMethods: ['Embroidery', 'Screen Print', 'Heat Transfer'] },
      { id: 'side-panel',  label: 'Side Panel',  top: '42%', left: '20%', maxMethods: ['Embroidery'] },
    ],
  },
  {
    id: 'chino',
    label: 'Chino Trousers',
    image: '/images/products/chino-trousers.jpg',
    supportsFabricWeight: false,
    fabricWeights: [],
    brandingZones: [
      { id: 'left-leg',  label: 'Left Leg',  top: '60%', left: '30%', maxMethods: ['Embroidery', 'Heat Transfer'] },
      { id: 'right-leg', label: 'Right Leg', top: '60%', left: '60%', maxMethods: ['Embroidery', 'Heat Transfer'] },
    ],
  },
]

const fabricWeightGuide: Record<string, string> = {
  '160g': 'Lightweight — best for events, promotions, and warmer climates.',
  '180g': 'Standard weight — suitable for everyday corporate and office wear.',
  '200g': 'Heavy weight — recommended for workwear and high-wear environments.',
}

const brandingMethodGuide: Record<BrandingMethod, string> = {
  Embroidery:      'Thread-stitched. Durable and premium. Best for logos under 100mm.',
  'Screen Print':  'Ink pressed through mesh. Cost-effective for large runs and bold designs.',
  'Heat Transfer': 'Vinyl or film applied with heat. Good for full-colour and small quantities.',
  Sublimation:     'Dye infused into fabric. Best for all-over prints on synthetic fabrics only.',
}

const allMethods: BrandingMethod[] = ['Embroidery', 'Screen Print', 'Heat Transfer', 'Sublimation']

const colourSwatches: { name: string; hex: string }[] = [
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
const STORAGE_KEY = 'kingsport_uniform_build'

// Garments shot on a white background → use multiply blend for colour overlay.
const whiteBackgroundGarments = new Set(['polo', 'tshirt'])

// SSR-safe deterministic id for the seeded slot; subsequent slots use timestamp.
const FIRST_SLOT_ID = 'slot-0'
const newSlotId = () => `slot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

const defaultGarment = (id: string = FIRST_SLOT_ID): GarmentConfig => ({
  id,
  garmentTypeId: 'polo',
  fabricWeight: '180g',
  bodyColour: { name: 'Navy Blue', hex: '#1a3a5c' },
  activeZoneId: null,
  brandingZones: [],
  sizeBreakdown: {},
})

// Strip logo data URLs from a UniformSet before encoding to URL (keeps URL small + private).
const stripLogosForUrl = (set: UniformSet): UniformSet => ({
  ...set,
  garments: set.garments.map(g => ({
    ...g,
    brandingZones: g.brandingZones.map(z => ({ ...z, logoDataUrl: null })),
  })),
})

// ── Component ─────────────────────────────────────────────────────────
export default function UniformBuilderPanel() {
  const { addItem } = useQuoteCart()

  const [uniformSet, setUniformSet] = useState<UniformSet>(() => ({
    garments: [defaultGarment(FIRST_SLOT_ID)],
    setName: '',
  }))
  const [activeSlot, setActiveSlot] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [logoWarning, setLogoWarning] = useState<string | null>(null)
  const [addedToQuote, setAddedToQuote] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // ── Restore from URL > localStorage on mount (one-shot) ─────────────
  useEffect(() => {
    let restored = false
    try {
      const params = new URLSearchParams(window.location.search)
      const encoded = params.get('build')
      if (encoded) {
        const decoded = JSON.parse(atob(encoded)) as UniformSet
        if (decoded && Array.isArray(decoded.garments) && decoded.garments.length > 0) {
          setUniformSet(decoded)
          restored = true
        }
      }
    } catch {
      /* malformed param — ignore */
    }
    if (!restored) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved) as UniformSet
          if (parsed && Array.isArray(parsed.garments) && parsed.garments.length > 0) {
            setUniformSet(parsed)
          }
        }
      } catch {
        /* ignore */
      }
    }
    setIsReady(true)
  }, [])

  // ── Persist to URL (logos stripped) + localStorage (logos kept) ─────
  useEffect(() => {
    if (!isReady) return
    try {
      const urlSafe = stripLogosForUrl(uniformSet)
      const encoded = btoa(JSON.stringify(urlSafe))
      const url = new URL(window.location.href)
      url.searchParams.set('build', encoded)
      window.history.replaceState({}, '', url.toString())
    } catch {
      /* URL encoding can fail on enormous states — skip silently */
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uniformSet))
    } catch {
      /* localStorage quota exceeded — skip silently */
    }
  }, [uniformSet, isReady])

  // ── Derived selectors ───────────────────────────────────────────────
  const activeGarment = uniformSet.garments[activeSlot] ?? uniformSet.garments[0]
  const currentGarmentType = useMemo(
    () => garmentTypes.find(g => g.id === activeGarment.garmentTypeId) || garmentTypes[0],
    [activeGarment.garmentTypeId]
  )
  const activeZoneId = activeGarment.activeZoneId
  const currentZoneConfig = activeZoneId
    ? currentGarmentType.brandingZones.find(z => z.id === activeZoneId)
    : null
  const activeZoneLabel = currentZoneConfig?.label ?? ''
  const activeZoneBranding = activeZoneId
    ? activeGarment.brandingZones.find(z => z.zoneId === activeZoneId)
    : null
  const existingLogo = activeZoneBranding?.logoDataUrl ?? null

  const blendMode = whiteBackgroundGarments.has(currentGarmentType.id) ? 'multiply' : 'hue'

  const totalQty = Object.values(activeGarment.sizeBreakdown).reduce((a, b) => a + b, 0)
  const meetsMinimum = totalQty >= MOQ
  const remaining = MOQ - totalQty

  // ── Mutators ────────────────────────────────────────────────────────
  const updateActiveGarment = (updates: Partial<GarmentConfig>) => {
    setUniformSet(prev => ({
      ...prev,
      garments: prev.garments.map((g, i) => (i === activeSlot ? { ...g, ...updates } : g)),
    }))
  }

  const changeGarmentType = (newType: string) => {
    const type = garmentTypes.find(g => g.id === newType)
    if (!type) return
    // Reset zone-related state when switching since zones differ between garments
    updateActiveGarment({
      garmentTypeId: newType,
      fabricWeight: type.supportsFabricWeight ? (type.fabricWeights[0] ?? null) : null,
      activeZoneId: null,
      brandingZones: [],
    })
    setImgError(false)
    setLogoWarning(null)
  }

  const toggleZone = (zoneId: string) => {
    updateActiveGarment({ activeZoneId: activeZoneId === zoneId ? null : zoneId })
  }

  const setZoneMethod = (zoneId: string, method: BrandingMethod) => {
    const existing = activeGarment.brandingZones.find(z => z.zoneId === zoneId)
    if (existing) {
      updateActiveGarment({
        brandingZones: activeGarment.brandingZones.map(z =>
          z.zoneId === zoneId ? { ...z, method } : z
        ),
      })
    } else {
      updateActiveGarment({
        brandingZones: [...activeGarment.brandingZones, { zoneId, method, logoDataUrl: null }],
      })
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, zoneId: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type === 'image/jpeg') {
      setLogoWarning(
        "JPG files don't support transparency. Your logo may appear with a white background on the garment. PNG or SVG recommended."
      )
    } else {
      setLogoWarning(null)
    }

    const reader = new FileReader()
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string
      const existing = activeGarment.brandingZones.find(z => z.zoneId === zoneId)
      if (existing) {
        updateActiveGarment({
          brandingZones: activeGarment.brandingZones.map(z =>
            z.zoneId === zoneId ? { ...z, logoDataUrl: dataUrl } : z
          ),
        })
      } else {
        updateActiveGarment({
          brandingZones: [
            ...activeGarment.brandingZones,
            { zoneId, method: null, logoDataUrl: dataUrl },
          ],
        })
      }
    }
    reader.readAsDataURL(file)
    // reset input value so re-uploading the same file fires the event again
    e.target.value = ''
  }

  const removeLogo = (zoneId: string) => {
    updateActiveGarment({
      brandingZones: activeGarment.brandingZones.map(z =>
        z.zoneId === zoneId ? { ...z, logoDataUrl: null } : z
      ),
    })
    setLogoWarning(null)
  }

  // ── Slot management ────────────────────────────────────────────────
  const addGarmentSlot = () => {
    if (uniformSet.garments.length >= 4) return
    const newGarment = defaultGarment(newSlotId())
    setUniformSet(prev => ({ ...prev, garments: [...prev.garments, newGarment] }))
    setActiveSlot(uniformSet.garments.length)
    setImgError(false)
    setLogoWarning(null)
  }

  const removeGarmentSlot = (index: number) => {
    if (uniformSet.garments.length <= 1) return
    setUniformSet(prev => ({
      ...prev,
      garments: prev.garments.filter((_, i) => i !== index),
    }))
    setActiveSlot(prev => Math.max(0, prev > index ? prev - 1 : prev === index ? Math.max(0, prev - 1) : prev))
    setImgError(false)
  }

  // ── Share + reset ──────────────────────────────────────────────────
  const copyShareLink = () => {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(window.location.href)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2500)
  }

  const handleReset = () => {
    const fresh: UniformSet = { garments: [defaultGarment(FIRST_SLOT_ID)], setName: '' }
    setUniformSet(fresh)
    setActiveSlot(0)
    setLogoWarning(null)
    setImgError(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    try {
      const url = new URL(window.location.href)
      url.searchParams.delete('build')
      window.history.replaceState({}, '', url.toString())
    } catch {}
  }

  // ── Add to quote ───────────────────────────────────────────────────
  const onAddToQuote = () => {
    if (!meetsMinimum) return
    const zoneSummary = activeGarment.brandingZones
      .map(z => {
        const meta = currentGarmentType.brandingZones.find(b => b.id === z.zoneId)
        return `${meta?.label || z.zoneId}: ${z.method || 'TBC'}`
      })
      .join(' / ')
    addItem({
      productId: `${currentGarmentType.id}-${activeGarment.id}`,
      productName: `${currentGarmentType.label} — ${activeGarment.bodyColour.name}${
        uniformSet.setName ? ` (${uniformSet.setName})` : ''
      }`,
      quantity: totalQty,
      color: activeGarment.bodyColour.name,
      notes: `Branding: ${zoneSummary || 'TBC'}. Sizes: ${sizes
        .map(s => `${s}:${activeGarment.sizeBreakdown[s] || 0}`)
        .join(', ')}.${activeGarment.fabricWeight ? ` Fabric: ${activeGarment.fabricWeight}.` : ''}`,
    })
    setAddedToQuote(true)
    setTimeout(() => setAddedToQuote(false), 2500)
  }

  // ── PDF download ───────────────────────────────────────────────────
  const downloadBrief = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const margin = 20
    let y = margin

    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('KINGSPORT INVESTMENTS', margin, y)
    y += 8
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150)
    doc.text('Uniform Configuration Brief', margin, y)
    y += 5
    doc.setDrawColor(128, 0, 32)
    doc.setLineWidth(0.5)
    doc.line(margin, y, 210 - margin, y)
    y += 8

    doc.setTextColor(0)
    doc.setFontSize(10)
    doc.text(`Set Name: ${uniformSet.setName || 'Unnamed Set'}`, margin, y)
    y += 5
    doc.text(
      `Generated: ${new Date().toLocaleDateString('en-ZW', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`,
      margin,
      y
    )
    y += 10

    uniformSet.garments.forEach((garment, index) => {
      const type = garmentTypes.find(g => g.id === garment.garmentTypeId)
      if (!type) return

      // Page break if we're near the bottom
      if (y > 250) {
        doc.addPage()
        y = margin
      }

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(128, 0, 32)
      doc.text(`Garment ${index + 1}: ${type.label}`, margin, y)
      y += 6

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0)
      doc.setFontSize(9)

      if (garment.fabricWeight) {
        doc.text(`Fabric Weight: ${garment.fabricWeight}`, margin + 3, y)
        y += 5
      }
      doc.text(`Body Colour: ${garment.bodyColour.name} (${garment.bodyColour.hex})`, margin + 3, y)
      y += 5

      if (garment.brandingZones.length > 0) {
        doc.text('Branding:', margin + 3, y)
        y += 4
        garment.brandingZones.forEach(zone => {
          const zoneMeta = type.brandingZones.find(z => z.id === zone.zoneId)
          doc.text(
            `  - ${zoneMeta?.label || zone.zoneId}: ${zone.method || 'Method TBC'}${
              zone.logoDataUrl ? ' (logo uploaded)' : ''
            }`,
            margin + 3,
            y
          )
          y += 4
        })
      } else {
        doc.text('Branding: Not yet configured', margin + 3, y)
        y += 5
      }

      const totalForGarment = Object.values(garment.sizeBreakdown).reduce((a, b) => a + b, 0)
      if (totalForGarment > 0) {
        const sizeStr = sizes
          .filter(s => (garment.sizeBreakdown[s] || 0) > 0)
          .map(s => `${s}: ${garment.sizeBreakdown[s]}`)
          .join('  |  ')
        doc.text(`Sizes: ${sizeStr}`, margin + 3, y)
        y += 5
        doc.text(`Total Units: ${totalForGarment}`, margin + 3, y)
        y += 5
      } else {
        doc.text('Sizes: Not yet specified', margin + 3, y)
        y += 5
      }

      y += 4
      doc.setDrawColor(220)
      doc.setLineWidth(0.2)
      doc.line(margin, y, 210 - margin, y)
      y += 6
    })

    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(
      'Kingsport Investments (Pvt) Ltd  ·  Harare, Zimbabwe  ·  kingsport.co.zw',
      margin,
      287
    )
    doc.text(
      'This document is a preliminary specification brief only. Final pricing subject to formal quotation.',
      margin,
      291
    )

    const filename = `Kingsport_Uniform_Brief_${(uniformSet.setName || 'Set').replace(
      /\s+/g,
      '_'
    )}_${Date.now()}.pdf`
    doc.save(filename)
  }

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-charcoal-800/10 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ─── LEFT COLUMN ───────────────────────────────────────── */}
        <div className="flex flex-col">

          {/* Set name */}
          <input
            type="text"
            placeholder="Name this set — e.g. Front Office Uniform"
            value={uniformSet.setName}
            onChange={e => setUniformSet(prev => ({ ...prev, setName: e.target.value }))}
            className="w-full px-4 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors mb-6"
          />

          {/* Garment slot tabs */}
          <div className="flex items-center gap-0 mb-6 border-b border-charcoal-800/10 flex-wrap">
            {uniformSet.garments.map((garment, index) => {
              const type = garmentTypes.find(g => g.id === garment.garmentTypeId)
              const isActive = activeSlot === index
              return (
                <button
                  key={garment.id}
                  onClick={() => setActiveSlot(index)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-xs font-sans font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-oxblood-800'
                      : 'text-charcoal-600/50 hover:text-charcoal-700'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20 flex-shrink-0"
                    style={{ backgroundColor: garment.bodyColour.hex }}
                  />
                  {type?.label ?? 'Garment'}
                  {uniformSet.garments.length > 1 && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={e => {
                        e.stopPropagation()
                        removeGarmentSlot(index)
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation()
                          removeGarmentSlot(index)
                        }
                      }}
                      className="ml-1 text-charcoal-600/25 hover:text-oxblood-700 transition-colors cursor-pointer inline-flex"
                      aria-label="Remove garment"
                    >
                      <X size={10} />
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-oxblood-700" />
                  )}
                </button>
              )
            })}

            {uniformSet.garments.length < 4 && (
              <button
                onClick={addGarmentSlot}
                className="flex items-center gap-1.5 px-4 py-3 text-xs font-sans text-charcoal-600/40 hover:text-oxblood-700 transition-colors"
              >
                <Plus size={11} />
                Add Garment
              </button>
            )}
          </div>

          {/* Garment selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {garmentTypes.map(g => {
              const active = activeGarment.garmentTypeId === g.id
              return (
                <button
                  key={g.id}
                  onClick={() => changeGarmentType(g.id)}
                  className={`px-3 py-2 text-xs font-sans font-medium tracking-wide transition-colors ${
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

          {/* Mannequin preview */}
          <div className="relative aspect-[3/4] max-w-xs mx-auto bg-cream-50">
            {imgError ? (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: activeGarment.bodyColour.hex }}
              >
                <span className="text-white/40 font-display text-sm">{currentGarmentType.label}</span>
              </div>
            ) : (
              <>
                <Image
                  src={currentGarmentType.image}
                  alt={currentGarmentType.label}
                  fill
                  className="object-contain"
                  onError={() => setImgError(true)}
                  sizes="320px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: activeGarment.bodyColour.hex,
                    mixBlendMode: blendMode,
                    opacity: 0.72,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}

            {/* Logo overlays */}
            {activeGarment.brandingZones
              .filter(z => z.logoDataUrl)
              .map(z => {
                const zoneConfig = currentGarmentType.brandingZones.find(bz => bz.id === z.zoneId)
                if (!zoneConfig) return null
                return (
                  <div
                    key={z.zoneId}
                    className="absolute z-30 pointer-events-none"
                    style={{
                      top: zoneConfig.top,
                      left: zoneConfig.left,
                      transform: 'translate(-50%, -50%)',
                      width: '22%',
                      height: '22%',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={z.logoDataUrl!}
                      alt="Brand logo"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                )
              })}

            {/* Hotspots */}
            {currentGarmentType.brandingZones.map(zone => {
              const isActive = activeZoneId === zone.id
              const isConfigured = activeGarment.brandingZones.some(
                z => z.zoneId === zone.id && (z.method || z.logoDataUrl)
              )
              return (
                <div
                  key={zone.id}
                  className="absolute z-20"
                  style={{ top: zone.top, left: zone.left, transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={() => toggleZone(zone.id)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-oxblood-900 border-oxblood-700 text-white scale-110'
                        : isConfigured
                        ? 'bg-oxblood-900/80 border-oxblood-700 text-white'
                        : 'bg-white/80 border-charcoal-800/30 text-charcoal-800 hover:border-oxblood-700'
                    }`}
                    title={zone.label}
                  >
                    {isConfigured && !isActive ? <Check size={11} /> : <Plus size={12} />}
                  </button>
                  {isActive && (
                    <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-charcoal-900 text-white text-[10px] font-sans px-2 py-1 whitespace-nowrap z-40">
                      {zone.label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-charcoal-600/50 text-[10px] font-sans text-center mt-3">
            Tap a zone to configure branding for that position
          </p>

          {/* Fabric weight selector */}
          {currentGarmentType.supportsFabricWeight && (
            <div className="mt-6">
              <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
                Fabric Weight
              </div>
              <div className="flex gap-2 flex-wrap">
                {currentGarmentType.fabricWeights.map(w => {
                  const active = activeGarment.fabricWeight === w
                  return (
                    <button
                      key={w}
                      onClick={() => updateActiveGarment({ fabricWeight: w })}
                      className={`px-3 py-1.5 text-xs font-sans font-medium transition-colors ${
                        active
                          ? 'bg-charcoal-800 text-white'
                          : 'border border-charcoal-800/15 text-charcoal-700 hover:border-oxblood-700'
                      }`}
                    >
                      {w}
                    </button>
                  )
                })}
              </div>
              {activeGarment.fabricWeight && fabricWeightGuide[activeGarment.fabricWeight] && (
                <p className="text-charcoal-600/50 text-[11px] font-sans leading-relaxed mt-2">
                  {fabricWeightGuide[activeGarment.fabricWeight]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN ──────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Garment Colour */}
          <div>
            <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
              Garment Colour
            </div>
            <div className="flex flex-wrap gap-2">
              {colourSwatches.map(c => {
                const selected = c.hex === activeGarment.bodyColour.hex
                return (
                  <button
                    key={c.name}
                    onClick={() => updateActiveGarment({ bodyColour: c })}
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
              <span className="text-charcoal-800 font-medium">{activeGarment.bodyColour.name}</span>
              <span className="text-charcoal-600/50 ml-2">{activeGarment.bodyColour.hex.toUpperCase()}</span>
            </div>
          </div>

          {/* Active zone controls — branding method + logo */}
          <div>
            <div className="text-[10px] tracking-widest uppercase font-sans text-charcoal-600/50 mb-3">
              Branding Configuration
            </div>

            {!activeZoneId || !currentZoneConfig ? (
              <p className="text-charcoal-600/40 text-xs italic font-sans">
                Tap a hotspot on the garment to configure branding for that position.
              </p>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-oxblood-900/10 border border-oxblood-700/30 text-oxblood-800 text-[10px] px-2.5 py-1 uppercase tracking-wide">
                  Configuring: {activeZoneLabel}
                </div>

                {/* Method grid */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {allMethods.map(method => {
                    const isCompatible = currentZoneConfig.maxMethods.includes(method)
                    const isSelected = activeZoneBranding?.method === method
                    return (
                      <button
                        key={method}
                        disabled={!isCompatible}
                        onClick={() => setZoneMethod(activeZoneId!, method)}
                        title={
                          !isCompatible
                            ? `Not suitable for this zone on ${currentGarmentType.label}`
                            : brandingMethodGuide[method]
                        }
                        className={`text-left px-3 py-2.5 border text-xs font-sans transition-all duration-200 ${
                          isSelected
                            ? 'bg-oxblood-900 border-oxblood-900 text-white'
                            : isCompatible
                            ? 'border-charcoal-800/15 text-charcoal-700 hover:border-oxblood-700'
                            : 'border-charcoal-800/8 text-charcoal-600/25 cursor-not-allowed bg-charcoal-800/[0.03]'
                        }`}
                      >
                        <span className="block font-medium">{method}</span>
                        {isCompatible && (
                          <span className="block text-[9px] mt-0.5 opacity-60 leading-tight">
                            {brandingMethodGuide[method].split('.')[0]}
                          </span>
                        )}
                        {!isCompatible && (
                          <span className="block text-[9px] mt-0.5 opacity-40 leading-tight">
                            Not suitable for this zone
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Logo upload */}
                <div className="mt-4">
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-charcoal-600/50 mb-2">
                    Upload Logo for {activeZoneLabel}
                  </label>
                  <label className="flex items-center gap-2 border border-dashed border-charcoal-800/20 hover:border-oxblood-700 px-4 py-3 cursor-pointer transition-colors group">
                    <Upload size={13} className="text-charcoal-600/40 group-hover:text-oxblood-700" />
                    <span className="text-xs font-sans text-charcoal-600/50 group-hover:text-oxblood-700">
                      {existingLogo ? 'Replace logo — PNG, SVG, JPG' : 'Upload logo — PNG, SVG, JPG'}
                    </span>
                    <input
                      type="file"
                      accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
                      className="hidden"
                      onChange={e => handleLogoUpload(e, activeZoneId!)}
                    />
                  </label>
                  {existingLogo && (
                    <button
                      onClick={() => removeLogo(activeZoneId!)}
                      className="mt-1.5 text-[10px] font-sans text-charcoal-600/30 hover:text-oxblood-700 transition-colors"
                    >
                      Remove logo from this zone
                    </button>
                  )}
                  {logoWarning && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 px-3 py-2 mt-2">
                      <AlertTriangle size={12} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-700 text-[10px] font-sans leading-relaxed">{logoWarning}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Size breakdown */}
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
                    value={activeGarment.sizeBreakdown[s] ?? ''}
                    onChange={e => {
                      const v = parseInt(e.target.value, 10)
                      updateActiveGarment({
                        sizeBreakdown: {
                          ...activeGarment.sizeBreakdown,
                          [s]: isNaN(v) || v < 0 ? 0 : v,
                        },
                      })
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

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-2">
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

            <button
              type="button"
              onClick={downloadBrief}
              className="w-full flex items-center justify-center gap-2 border border-charcoal-800/15 hover:border-oxblood-700 text-charcoal-700 hover:text-oxblood-700 py-3 font-sans text-sm font-medium tracking-wide transition-all duration-200"
            >
              <FileDown size={14} />
              Download Brief PDF
            </button>

            <button
              type="button"
              onClick={copyShareLink}
              className="w-full flex items-center justify-center gap-2 border border-charcoal-800/15 hover:border-oxblood-700 text-charcoal-700 hover:text-oxblood-700 py-3 font-sans text-sm font-medium tracking-wide transition-all duration-200"
            >
              {linkCopied ? <Check size={14} /> : <Link2 size={14} />}
              {linkCopied ? 'Link Copied' : 'Copy Share Link'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-charcoal-600/50 hover:text-oxblood-700 transition-colors mt-1"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>

          <p className="text-[10px] text-charcoal-600/30 font-sans text-center mt-3">
            Colour rendering is indicative only. Final colours subject to fabric dye availability at sampling stage.
          </p>
        </div>
      </div>
    </div>
  )
}
