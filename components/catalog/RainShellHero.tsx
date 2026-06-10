'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './RainShellHero.module.css'

interface Props {
  /**
   * Whether the parent PDP drawer currently has the raincoat product loaded.
   * The hero only renders when this is true. The internal `isOpen` flag
   * controls the slide-up animation and is set true on a short delay so the
   * main drawer's right-slide finishes before the hero starts its entrance.
   */
  active: boolean
}

export default function RainShellHero({ active }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!active) {
      setIsOpen(false)
      return
    }
    // Wait for the main PDP drawer's right-slide to settle (~280ms),
    // then start the hero's bottom-slide entrance.
    const t = window.setTimeout(() => setIsOpen(true), 280)
    return () => window.clearTimeout(t)
  }, [active])

  if (!active) return null

  return (
    <div
      className={`${styles.heroWrap} ${isOpen ? styles.open : ''}`}
      aria-hidden={!isOpen}
    >
      {/* Animated rain streaks — pure CSS, no JS frame cost */}
      <div className={styles.rainField} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={styles.rainDrop}
            style={
              {
                ['--col' as string]: i,
                ['--delay' as string]: `${(i * 173) % 2200}ms`,
                ['--dur' as string]: `${1800 + ((i * 211) % 900)}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Top bar — wordmark + NEW badge + dismiss chevron */}
      <div className={styles.topRow}>
        <div className={styles.wordmark}>STORMLINE</div>
        <div className={styles.topRight}>
          <span className={styles.newBadge}>NEW · AW26</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={styles.dismiss}
            aria-label="Dismiss promotional view"
            title="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

      {/* Hero image frame — cream backdrop + slatted sun-light, raincoat on top */}
      <div className={styles.imageFrame}>
        <div className={styles.sunSlats} aria-hidden="true" />
        <div className={styles.branch} aria-hidden="true">
          <span className={styles.ropeL} />
          <span className={styles.ropeR} />
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/products/long-hooded-raincoat-yellow.png"
            alt="Marigold rain shell"
            fill
            sizes="(max-width: 900px) 100vw, 460px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className={styles.styleBadge}>STYLE 01 · MARIGOLD</div>
      </div>

      {/* Title block — RAIN white / SHELL marigold, tagline right */}
      <div className={styles.titleRow}>
        <div className={styles.title}>
          <span className={styles.titleLine}>RAIN</span>
          <span className={`${styles.titleLine} ${styles.titleAccent}`}>SHELL</span>
        </div>
        <div className={styles.tagline}>Rain, handled.</div>
      </div>

      {/* Feature pills + wholesale CTA — CTA dismisses hero to reveal the PDP */}
      <div className={styles.bottomRow}>
        <div className={styles.features}>
          <span>10K WATERPROOF</span>
          <span className={styles.dot}>·</span>
          <span>TAPED SEAMS</span>
          <span className={styles.dot}>·</span>
          <span>PACKABLE</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={styles.wholesaleBtn}
        >
          NOW TAKING WHOLESALE
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  )
}
