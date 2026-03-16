"use client";

import { useState } from "react";

const PALETTE = [
  { name: "Oxblood",     hex: "#800020" },
  { name: "Navy",        hex: "#1B3A6B" },
  { name: "Forest",      hex: "#2D5016" },
  { name: "Charcoal",    hex: "#2d2d2d" },
  { name: "Royal Blue",  hex: "#4169E1" },
  { name: "Sky Blue",    hex: "#5B8DB8" },
  { name: "Amber",       hex: "#D97706" },
  { name: "Bottle Green",hex: "#006400" },
  { name: "Burgundy",    hex: "#722F37" },
  { name: "White",       hex: "#F5F0EB" },
  { name: "Silver",      hex: "#9CA3AF" },
  { name: "Black",       hex: "#1a1a1a" },
];

const GARMENTS = [
  { id: "polo",     label: "Polo Shirt",    parts: ["body", "collar", "sleeve"] },
  { id: "dustcoat", label: "Dustcoat",      parts: ["body", "collar"] },
  { id: "conti",    label: "Conti Suit",    parts: ["body", "collar", "piping"] },
];

type GarmentPart = "body" | "collar" | "sleeve" | "piping";

export default function ColorSwitcher() {
  const [selectedGarment, setSelectedGarment] = useState(GARMENTS[0]);
  const [activePart, setActivePart] = useState<GarmentPart>("body");
  const [colors, setColors] = useState<Record<GarmentPart, string>>({
    body:    "#1B3A6B",
    collar:  "#F5F0EB",
    sleeve:  "#F5F0EB",
    piping:  "#800020",
  });

  const setColor = (hex: string) => {
    setColors((prev) => ({ ...prev, [activePart]: hex }));
  };

  const bodyColor   = colors.body;
  const collarColor = colors.collar;
  const sleeveColor = colors.sleeve;

  return (
    <section className="py-20 md:py-28 bg-[#0a0508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#800020] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Interactive Tool
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Uniform Colour Builder
            </h2>
            <p className="text-[#7a6568] text-sm mt-2 max-w-md">
              Select a garment, choose a part, and pick your brand colours to visualise your uniform before ordering.
            </p>
          </div>
        </div>

        <hr className="ox-divider mb-12" />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Preview pane */}
          <div className="flex flex-col items-center justify-center min-h-80 bg-[#130810] border border-[#800020]/15 rounded-sm p-8">
            {/* SVG garment illustration */}
            <div className="relative w-56">
              {selectedGarment.id === "polo" && (
                <svg viewBox="0 0 200 220" className="w-full drop-shadow-2xl">
                  {/* Body */}
                  <path
                    d="M60,60 L40,200 L160,200 L140,60 Z"
                    fill={bodyColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Left sleeve */}
                  <path
                    d="M60,60 L20,110 L40,120 L70,80 Z"
                    fill={sleeveColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Right sleeve */}
                  <path
                    d="M140,60 L180,110 L160,120 L130,80 Z"
                    fill={sleeveColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Collar */}
                  <path
                    d="M80,60 Q100,45 120,60 L115,75 Q100,65 85,75 Z"
                    fill={collarColor}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  {/* Placket */}
                  <rect x="97" y="60" width="6" height="40" fill={collarColor} opacity="0.6" />
                  {/* Highlight */}
                  <path
                    d="M70,65 Q100,55 130,65 L128,80 Q100,70 72,80 Z"
                    fill="rgba(255,255,255,0.04)"
                  />
                </svg>
              )}

              {selectedGarment.id === "dustcoat" && (
                <svg viewBox="0 0 200 260" className="w-full drop-shadow-2xl">
                  {/* Body */}
                  <path
                    d="M55,60 L35,250 L165,250 L145,60 Z"
                    fill={bodyColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Left sleeve */}
                  <path
                    d="M55,60 L10,130 L28,138 L65,85 Z"
                    fill={bodyColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Right sleeve */}
                  <path
                    d="M145,60 L190,130 L172,138 L135,85 Z"
                    fill={bodyColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Collar */}
                  <path
                    d="M80,60 Q100,40 120,60 L118,80 Q100,68 82,80 Z"
                    fill={collarColor}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  {/* Button placket */}
                  <rect x="96" y="58" width="8" height="100" fill="rgba(0,0,0,0.15)" />
                  {[80, 100, 120, 140].map((y) => (
                    <circle key={y} cx="100" cy={y} r="3" fill={collarColor} opacity="0.8" />
                  ))}
                </svg>
              )}

              {selectedGarment.id === "conti" && (
                <svg viewBox="0 0 200 280" className="w-full drop-shadow-2xl">
                  {/* Jacket body */}
                  <path
                    d="M60,55 L40,155 L160,155 L140,55 Z"
                    fill={bodyColor}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  {/* Jacket sleeves */}
                  <path d="M60,55 L15,120 L32,128 L68,75 Z" fill={bodyColor} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <path d="M140,55 L185,120 L168,128 L132,75 Z" fill={bodyColor} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  {/* Jacket collar */}
                  <path d="M82,55 Q100,42 118,55 L115,70 Q100,60 85,70 Z" fill={collarColor} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Trousers */}
                  <path d="M48,155 L38,280 L95,280 L100,165 L105,280 L162,280 L152,155 Z" fill={bodyColor} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  {/* Piping accent */}
                  <line x1="60" y1="55" x2="40" y2="155" stroke={colors.piping} strokeWidth="2.5" opacity="0.7" />
                  <line x1="140" y1="55" x2="160" y2="155" stroke={colors.piping} strokeWidth="2.5" opacity="0.7" />
                </svg>
              )}
            </div>

            <p className="text-[#5a4548] text-xs mt-4 text-center">
              {selectedGarment.label} Preview
            </p>
          </div>

          {/* Controls pane */}
          <div>
            {/* Garment selector */}
            <div className="mb-6">
              <p className="text-[#6a5558] text-[10px] uppercase tracking-widest font-medium mb-3">
                1. Choose Garment
              </p>
              <div className="flex flex-wrap gap-2">
                {GARMENTS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setSelectedGarment(g); setActivePart("body"); }}
                    className={`px-4 py-2 text-sm font-medium rounded-sm border transition-all ${
                      selectedGarment.id === g.id
                        ? "bg-[#800020] border-[#800020] text-white"
                        : "border-[#800020]/25 text-[#8a7578] hover:border-[#800020]/50 hover:text-[#c8b8bb]"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Part selector */}
            <div className="mb-6">
              <p className="text-[#6a5558] text-[10px] uppercase tracking-widest font-medium mb-3">
                2. Select Part to Colour
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedGarment.parts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setActivePart(part as GarmentPart)}
                    className={`px-4 py-2 text-sm font-medium rounded-sm border transition-all flex items-center gap-2 capitalize ${
                      activePart === part
                        ? "bg-[#800020]/15 border-[#800020]/50 text-white"
                        : "border-[#800020]/15 text-[#7a6568] hover:border-[#800020]/30 hover:text-[#c8b8bb]"
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-white/15"
                      style={{ backgroundColor: colors[part as GarmentPart] }}
                    />
                    {part}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div className="mb-8">
              <p className="text-[#6a5558] text-[10px] uppercase tracking-widest font-medium mb-3">
                3. Pick Your Colour
              </p>
              <div className="grid grid-cols-6 gap-2">
                {PALETTE.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => setColor(swatch.hex)}
                    title={swatch.name}
                    className={`group flex flex-col items-center gap-1.5 p-1.5 rounded-sm border transition-all ${
                      colors[activePart] === swatch.hex
                        ? "border-[#800020] bg-[#800020]/10"
                        : "border-transparent hover:border-[#800020]/30"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-sm border border-white/10 shadow-inner"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[9px] text-[#5a4548] group-hover:text-[#8a7578] text-center leading-tight">
                      {swatch.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current selection summary */}
            <div className="p-4 bg-[#130810] border border-[#800020]/15 rounded-sm mb-6">
              <p className="text-[#6a5558] text-[10px] uppercase tracking-widest font-medium mb-3">
                Your Colour Scheme
              </p>
              <div className="flex gap-3">
                {selectedGarment.parts.map((part) => {
                  const hex = colors[part as GarmentPart];
                  const match = PALETTE.find((p) => p.hex === hex);
                  return (
                    <div key={part} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-sm border border-white/10" style={{ backgroundColor: hex }} />
                      <div>
                        <p className="text-[#5a4548] text-[9px] capitalize">{part}</p>
                        <p className="text-[#c8b8bb] text-xs">{match?.name || hex}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href={`/contact?product=executive-pique-polo&note=Preferred colours: ${selectedGarment.parts.map((p) => `${p}: ${colors[p as GarmentPart]}`).join(", ")}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#800020] text-white text-sm font-medium rounded-sm hover:bg-[#a0002a] transition-colors"
            >
              Request Quote with These Colours
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
