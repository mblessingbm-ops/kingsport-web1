
"use client"
import { useState } from "react"
import Image from "next/image"
import { Palette, RotateCcw, ShoppingBag } from "lucide-react"
import Link from "next/link"

const garmentTypes = [
  { id: "polo",    label: "Polo Shirt",       image: "/images/products/pique-polo.png",        alt: "Executive Pique Polo" },
  { id: "tshirt",  label: "T-Shirt",           image: "/images/products/cotton-tshirt.png",     alt: "180g Cotton T-Shirt" },
  { id: "jacket",  label: "Softshell Jacket",  image: "/images/products/softshell-jacket.png", alt: "Softshell Jacket" },
  { id: "conti",   label: "Conti Suit",        image: "/images/products/conti-suit.png",        alt: "Heavy Duty Conti Suit" },
]

const colourSwatches = [
  { name: "Navy Blue", hex: "#1a3a5c" },
  { name: "Royal Blue", hex: "#2563EB" },
  { name: "Sky Blue", hex: "#7dd3fc" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Charcoal Grey", hex: "#374151" },
  { name: "Light Grey", hex: "#9ca3af" },
  { name: "Oxblood", hex: "#800020" },
  { name: "Red", hex: "#dc2626" },
  { name: "Burgundy", hex: "#7f1d1d" },
  { name: "Forest Green", hex: "#166534" },
  { name: "Bottle Green", hex: "#1a4731" },
  { name: "Olive", hex: "#6b7151" },
  { name: "Khaki", hex: "#b5a16e" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#ca8a04" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Teal", hex: "#0d9488" },
]

const brandingPositions = [
  { id: "left-chest", label: "Left Chest (Standard)" },
  { id: "right-chest", label: "Right Chest" },
  { id: "full-back", label: "Full Back Print" },
  { id: "sleeve", label: "Sleeve (Left or Right)" },
  { id: "collar", label: "Collar Tipping" },
]

const brandingMethods = [
  { id: "embroidery", label: "Embroidery" },
  { id: "screen-print", label: "Screen Print" },
  { id: "dtf", label: "DTF Transfer" },
  { id: "sublimation", label: "Full Sublimation" },
]

function GarmentPreview({ image, alt, bodyColor }: { image: string; alt: string; bodyColor: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative w-64 h-80 mx-auto">
      {imgError || !image ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded"
          style={{ backgroundColor: bodyColor, opacity: 0.85 }}
        >
          <span className="text-white/40 font-display text-lg">{alt}</span>
          <span className="text-white/20 font-sans text-xs mt-1">Image coming soon</span>
        </div>
      ) : (
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain object-center"
          onError={() => setImgError(true)}
        />
      )}

      {/* Colour overlay — mix-blend-mode: hue tints the garment with the selected body colour */}
      {!imgError && image && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: bodyColor,
            mixBlendMode: 'hue',
            opacity: 0.75,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Logo placeholder badge — left chest */}
      <div className="absolute" style={{ top: '28%', left: '30%' }}>
        <div className="w-10 h-10 rounded-full border border-dashed border-white/50 bg-white/10 flex items-center justify-center">
          <span className="text-white/50 text-[8px] font-sans tracking-wider uppercase">Logo</span>
        </div>
      </div>
    </div>
  )
}

export default function UniformBuilderPage() {
  const [selectedGarment, setSelectedGarment] = useState("polo")
  const [bodyColor, setBodyColor] = useState("#1a3a5c")
  const [accentColor, setAccentColor] = useState("#800020")
  const [activeTarget, setActiveTarget] = useState<"body" | "accent">("body")
  const [selectedBranding, setSelectedBranding] = useState<string[]>(["left-chest"])
  const [selectedMethod, setSelectedMethod] = useState("embroidery")

  const bodySwatch = colourSwatches.find(c => c.hex === bodyColor)
  const accentSwatch = colourSwatches.find(c => c.hex === accentColor)

  const toggleBranding = (id: string) => {
    setSelectedBranding(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id])
  }

  const garmentLabel = garmentTypes.find(g => g.id === selectedGarment)?.label || ""
  const brandingLabels = selectedBranding.map(id => brandingPositions.find(p => p.id === id)?.label).filter(Boolean).join(", ")

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-charcoal-900 pt-32 pb-16 grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
            Uniform <span className="italic text-oxblood-400">Builder</span>
          </h1>
          <p className="text-white/50 font-sans max-w-xl">
            Visualise your brand colours on our garments before requesting a quote.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white border border-gray-100 p-6">
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">Garment Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {garmentTypes.map(g => (
                  <button key={g.id} onClick={() => setSelectedGarment(g.id)}
                    className={"p-3 text-xs font-sans font-medium border transition-all text-center " + (selectedGarment === g.id ? "bg-oxblood-900 border-oxblood-900 text-white" : "border-gray-200 text-charcoal-600 hover:border-oxblood-400")}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6">
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">Colours</h3>
              <div className="flex gap-2 mb-4">
                {(["body", "accent"] as const).map(target => {
                  const swatch = target === "body" ? bodySwatch : accentSwatch
                  const color = target === "body" ? bodyColor : accentColor
                  return (
                    <button key={target} onClick={() => setActiveTarget(target)}
                      className={"flex items-center gap-2 px-3 py-2 text-xs font-sans font-medium border transition-all flex-1 " + (activeTarget === target ? "border-oxblood-700 bg-oxblood-50" : "border-gray-200")}>
                      <span className="w-4 h-4 rounded-sm border border-gray-300 flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="truncate">{swatch?.name || color} ({target})</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {colourSwatches.map(swatch => {
                  const active = activeTarget === "body" ? bodyColor === swatch.hex : accentColor === swatch.hex
                  return (
                    <button key={swatch.hex} title={swatch.name}
                      onClick={() => activeTarget === "body" ? setBodyColor(swatch.hex) : setAccentColor(swatch.hex)}
                      className={"w-8 h-8 rounded transition-all duration-150 " + (active ? "ring-2 ring-offset-1 ring-oxblood-700 scale-110" : "hover:scale-105")}
                      style={{ backgroundColor: swatch.hex, border: swatch.hex === "#f5f5f5" ? "1px solid #e5e7eb" : "none" }} />
                  )
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6">
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">Branding Position</h3>
              <div className="space-y-2">
                {brandingPositions.map(pos => (
                  <label key={pos.id} className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleBranding(pos.id)}
                      className={"w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all cursor-pointer " + (selectedBranding.includes(pos.id) ? "bg-oxblood-900 border-oxblood-900" : "border-gray-300 group-hover:border-oxblood-400")}>
                      {selectedBranding.includes(pos.id) && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className="text-xs font-sans text-charcoal-600">{pos.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6">
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-4">Branding Method</h3>
              <div className="space-y-2">
                {brandingMethods.map(m => (
                  <label key={m.id} className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => setSelectedMethod(m.id)}
                      className={"w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all cursor-pointer " + (selectedMethod === m.id ? "bg-oxblood-900 border-oxblood-900" : "border-gray-300 group-hover:border-oxblood-400")}>
                      {selectedMethod === m.id && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                    </div>
                    <span className="text-xs font-sans text-charcoal-600">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-gray-100 p-10 flex flex-col items-center">
              <div className="text-xs tracking-widest uppercase text-charcoal-600/40 font-sans mb-6 flex items-center gap-3">
                <Palette size={12} />Live Preview
              </div>
              <div className="w-64 h-80 mb-6" style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))" }}>
                <GarmentPreview
                  image={garmentTypes.find(g => g.id === selectedGarment)?.image || ''}
                  alt={garmentTypes.find(g => g.id === selectedGarment)?.alt || ''}
                  bodyColor={bodyColor}
                />
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-semibold text-charcoal-800">{garmentLabel}</div>
                <div className="text-sm font-sans text-charcoal-600/50 mt-1">
                  {bodySwatch?.name || bodyColor} · {accentSwatch?.name || accentColor} accent
                </div>
              </div>
              <button onClick={() => { setBodyColor("#1a3a5c"); setAccentColor("#800020") }}
                className="mt-5 flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors font-sans">
                <RotateCcw size={11} />Reset colours
              </button>
            </div>

            <div className="bg-charcoal-900 text-white p-8">
              <h3 className="font-display text-2xl font-light mb-6">Your Configuration</h3>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Garment", value: garmentLabel },
                  { label: "Body Colour", value: bodySwatch?.name || bodyColor },
                  { label: "Accent Colour", value: accentSwatch?.name || accentColor },
                  { label: "Branding", value: brandingLabels || "None selected" },
                  { label: "Method", value: brandingMethods.find(m => m.id === selectedMethod)?.label || "" },
                ].map(item => (
                  <div key={item.label} className="flex gap-6 text-sm border-b border-white/5 pb-3">
                    <span className="font-sans text-white/40 w-32 flex-shrink-0">{item.label}</span>
                    <span className="font-sans text-white/80">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs font-sans mb-6">
                This is a visualisation tool. Colour rendering varies by fabric type and dye batch. Final colours are subject to confirmation at sampling stage.
              </p>
              <Link href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-oxblood-900 hover:bg-oxblood-700 text-white px-8 py-4 font-sans font-medium text-sm transition-colors duration-200 w-full">
                <ShoppingBag size={15} />
                Request Quote for This Configuration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
