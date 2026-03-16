'use client'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react'

// Image paths use the actual .png files in /public/images/products/
const slides = [
  {
    id: 'ppe',
    category: 'PPE & Safety Wear',
    headline: ['Dressed for the', 'Work Ahead'],
    accent: 'Engineered for protection. Built for durability.',
    cta: { label: 'View PPE Range', href: '/catalog?category=ppe-safety' },
    images: [
      { src: '/images/products/conti-suit.png',      alt: 'Heavy Duty Conti Suit' },
      { src: '/images/products/safety-boots.png',    alt: 'S5 Safety Boots' },
      { src: '/images/products/reflective-vest.png', alt: 'High-Vis Reflective Vest' },
    ],
  },
  {
    id: 'corporate',
    category: 'Corporate & Uniform Wear',
    headline: ['Your Brand,', 'Perfectly Worn'],
    accent: 'From the boardroom to the shop floor — tailored uniforms that speak for your brand.',
    cta: { label: 'Explore Corporate Wear', href: '/catalog?category=corporate-wear' },
    images: [
      { src: '/images/products/cotton-tshirt.png', alt: 'Branded 180g Cotton T-Shirt' },
    ],
  },
  {
    id: 'events',
    category: 'Event Branding & Promo',
    headline: ['Events That', 'Leave a Mark'],
    accent: 'Gazebos, flags, pull-up banners and branded merchandise — fully customised.',
    cta: { label: 'See Event Range', href: '/catalog?category=event-branding' },
    images: [
      { src: '/images/products/event-gazebo.png',   alt: 'Event Gazebo 3×3m' },
      { src: '/images/products/pull-up-banner.png', alt: 'Pull-Up Banner' },
      { src: '/images/products/sharkfin-flag.png',  alt: 'Sharkfin Flag' },
    ],
  },
]

const SLIDE_DURATION = 6000
const TRANSITION_MS = 350

// ── Image panel: single full or 3-image collage ──────────────────────────────
function ImagePanel({ images, category }: { images: typeof slides[0]['images']; category: string }) {
  if (images.length === 1) {
    return (
      <div className="absolute inset-0">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover object-center"
          sizes="50vw"
          onError={() => {}}
        />
      </div>
    )
  }

  if (images.length >= 3) {
    // One tall image left, two stacked right
    return (
      <div className="absolute inset-0 grid grid-cols-2 gap-1">
        <div className="relative h-full">
          <Image src={images[0].src} alt={images[0].alt} fill className="object-cover object-center" sizes="25vw" />
        </div>
        <div className="grid grid-rows-2 gap-1 h-full">
          <div className="relative">
            <Image src={images[1].src} alt={images[1].alt} fill className="object-cover object-center" sizes="25vw" />
          </div>
          <div className="relative">
            <Image src={images[2].src} alt={images[2].alt} fill className="object-cover object-center" sizes="25vw" />
          </div>
        </div>
      </div>
    )
  }

  // 2 images — top/bottom split
  return (
    <div className="absolute inset-0 grid grid-rows-2 gap-1">
      {images.map((img) => (
        <div key={img.src} className="relative">
          <Image src={img.src} alt={img.alt} fill className="object-cover object-center" sizes="50vw" />
        </div>
      ))}
    </div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const goTo = useCallback((index: number) => {
    if (transitioning) return
    setTransitioning(true)
    setTextVisible(false)
    setTimeout(() => {
      setCurrent(index)
      setTextVisible(true)
      setTransitioning(false)
    }, TRANSITION_MS)
  }, [transitioning])

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [current, goTo])

  const slide = slides[current]
  const slideNum = String(current + 1).padStart(2, '0')

  return (
    <section className="relative min-h-screen flex overflow-hidden bg-charcoal-900">

      {/* ── LEFT PANEL ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-14 pt-32 pb-24">

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Watermark */}
        <div className="absolute bottom-0 left-0 text-white/[0.03] font-display text-[10vw] font-bold leading-none select-none pointer-events-none">
          1998
        </div>

        <div className="relative max-w-xl">

          {/* Category label */}
          <div
            className="flex items-center gap-3 mb-8 transition-all duration-300"
            style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(-8px)', transitionDelay: textVisible ? '0ms' : '0ms' }}
          >
            <span className="block w-10 h-px bg-oxblood-400" />
            <span className="text-oxblood-400 text-[10px] tracking-[0.35em] uppercase font-sans font-medium">
              {slide.category}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-6xl md:text-7xl font-light text-white leading-[1.05] mb-6 transition-all duration-300"
            style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(18px)', transitionDelay: textVisible ? '50ms' : '0ms' }}
          >
            {slide.headline[0]}
            <br />
            <span className="italic text-oxblood-400">{slide.headline[1]}</span>
          </h1>

          {/* Body */}
          <p
            className="text-white/50 font-sans text-sm leading-relaxed max-w-sm mb-10 transition-all duration-300"
            style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: textVisible ? '100ms' : '0ms' }}
          >
            {slide.accent}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 transition-all duration-300"
            style={{ opacity: textVisible ? 1 : 0, transitionDelay: textVisible ? '150ms' : '0ms' }}
          >
            <Link
              href={slide.cta.href}
              className="group inline-flex items-center gap-3 bg-oxblood-900 hover:bg-oxblood-700 text-white px-7 py-3.5 font-sans font-medium text-sm tracking-wide transition-all duration-200"
            >
              {slide.cta.label}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-oxblood-700 text-white/80 hover:text-white px-7 py-3.5 font-sans font-medium text-sm tracking-wide transition-all duration-200 hover:bg-oxblood-900/20"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Controls bar */}
        <div className="relative flex items-center gap-5 mt-16">
          <button
            onClick={prev}
            disabled={transitioning}
            aria-label="Previous slide"
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200 disabled:opacity-30"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={next}
            disabled={transitioning}
            aria-label="Next slide"
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200 disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                disabled={transitioning}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-6 h-1.5 bg-oxblood-500' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <span className="ml-auto text-white/20 text-[11px] tracking-widest font-sans">
            {slideNum} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL — Desktop only ────────────────────────────────────── */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full overflow-hidden">

        {/* Diagonal left edge blending into left panel */}
        <div
          className="absolute left-0 top-0 w-24 h-full bg-charcoal-900 z-20"
          style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }}
        />

        {/* Slides — cross-fade */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[600ms]"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {/* Gradient fallback behind images (shows if images fail/pending) */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex items-center justify-center">
              <span className="text-white/20 font-display text-2xl">{s.category}</span>
            </div>
            <ImagePanel images={s.images} category={s.category} />
          </div>
        ))}

        {/* Tint overlay */}
        <div className="absolute inset-0 bg-oxblood-950/30 z-10" />

        {/* Progress bar — key forces remount on slide change */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
          <div
            key={current}
            className="h-full bg-oxblood-500"
            style={{ animation: `slideProgress ${SLIDE_DURATION}ms linear forwards` }}
          />
        </div>

        {/* Category caption */}
        <div className="absolute bottom-5 right-6 z-20 text-white/30 text-[10px] tracking-widest uppercase font-sans">
          {slide.category}
        </div>
      </div>

      {/* ── Mobile background image (faint) ──────────────────────────────── */}
      <div className="absolute inset-0 lg:hidden opacity-20 pointer-events-none">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[600ms]"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={s.images[0].src}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 lg:left-1/4 -translate-x-1/2 text-white/25 flex flex-col items-center gap-1.5 z-20">
        <span className="text-[10px] tracking-widest uppercase font-sans">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  )
}
