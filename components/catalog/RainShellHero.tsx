'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './RainShellHero.module.css'

interface Props {
  /**
   * Whether the parent PDP drawer currently has the raincoat product
   * loaded. The card only renders when this is true. The internal
   * `isOpen` flag is set true on a short delay (280ms) so the main
   * drawer's right-slide finishes before the card starts its own
   * slide-out from behind it.
   */
  active: boolean
}

/* Deterministic seeded random — taken directly from the design handoff
   so the rain layout matches the comp exactly (seed = 3, n = 60). */
function buildDrops(seed: number, count: number) {
  let s = seed * 9301 + 49297
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const drops: Array<{
    left: number
    len: number
    dur: number
    delay: number
    opacity: number
    thick: number
  }> = []
  for (let i = 0; i < count; i++) {
    const len = 38 + rnd() * 60
    drops.push({
      left: rnd() * 100,
      len,
      dur: 0.55 + rnd() * 0.7,
      delay: -rnd() * 2,
      opacity: (0.25 + rnd() * 0.75) * 0.5,
      thick: rnd() > 0.78 ? 2 : 1,
    })
  }
  return drops
}

export default function RainShellHero({ active }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const drops = useMemo(() => buildDrops(3, 60), [])

  useEffect(() => {
    if (!active) {
      setIsOpen(false)
      return
    }
    const t = window.setTimeout(() => setIsOpen(true), 280)
    return () => window.clearTimeout(t)
  }, [active])

  if (!active) return null

  return (
    <div
      className={`${styles.card} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-label="Stormline Rain Shell launch card"
      aria-hidden={!isOpen}
    >
      {/* Animated rain layer — seeded so it matches the design comp */}
      <div className={styles.rain} aria-hidden="true">
        {drops.map((d, i) => (
          <span
            key={i}
            className={styles.drop}
            style={{
              left: `${d.left}%`,
              width: d.thick,
              height: d.len,
              opacity: d.opacity,
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header — STORMLINE / NEW · AW26 / dismiss */}
      <div className={styles.header}>
        <div className={styles.wordmark}>STORMLINE</div>
        <div className={styles.headerRight}>
          <span className={styles.newBadge}>NEW · AW26</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={styles.dismiss}
            aria-label="Close launch card"
            title="Close"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero photo — marigold raincoat on a hanger, sun-lit cream wall */}
      <div className={styles.photoFrame}>
        <Image
          src="/images/products/rain-shell-hero.webp"
          alt="Marigold rain shell"
          fill
          sizes="(max-width: 1280px) 100vw, 640px"
          className={styles.photo}
          priority
        />
        <div className={styles.styleBadge}>STYLE 01 · MARIGOLD</div>
      </div>

      {/* Headline + tagline */}
      <div className={styles.headlineRow}>
        <div className={styles.headline}>
          RAIN
          <br />
          <span className={styles.headlineAccent}>SHELL</span>
        </div>
        <div className={styles.tagline}>Rain, handled.</div>
      </div>

      {/* Spec row + wholesale line */}
      <div className={styles.footerRow}>
        <div className={styles.specs}>
          <span className={styles.spec}>10K Waterproof</span>
          <span className={styles.specDot} aria-hidden="true" />
          <span className={styles.spec}>Taped Seams</span>
          <span className={styles.specDot} aria-hidden="true" />
          <span className={styles.spec}>Packable</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={styles.wholesaleBtn}
          aria-label="Close launch card"
        >
          Now taking wholesale
        </button>
      </div>
    </div>
  )
}
