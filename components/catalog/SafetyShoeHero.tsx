'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './SafetyShoeHero.module.css'

interface Props {
  /**
   * Whether the parent PDP drawer currently has the low-cut safety
   * shoe loaded. The card only renders when this is true. The
   * internal `isOpen` flag is staggered 280ms behind so the main
   * drawer's right-slide finishes BEFORE this card starts its own
   * slide-out from behind the drawer.
   */
  active: boolean
}

export default function SafetyShoeHero({ active }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!active) {
      setIsOpen(false)
      // Pause + rewind when card hides, so the next open starts fresh
      const v = videoRef.current
      if (v) {
        v.pause()
        try { v.currentTime = 0 } catch {}
      }
      return
    }
    const t = window.setTimeout(() => setIsOpen(true), 280)
    return () => window.clearTimeout(t)
  }, [active])

  // Kick off autoplay once the card is open AND the video is decoded enough to play.
  useEffect(() => {
    if (!isOpen) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [isOpen, videoReady])

  if (!active) return null

  return (
    <div
      className={`${styles.card} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-label="Stormline Safety Shoe launch card"
      aria-hidden={!isOpen}
    >
      {/* Header — STORMLINE / Pro Workwear / New · SS26 / dismiss × */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.wordmark}>STORMLINE</div>
          <span className={styles.subwordmark}>Pro Workwear</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.newBadge}>New · SS26</span>
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

      {/* Technical crosshair row — steel-blue dot · hairline · "Fig. 01 — Low-Cut" */}
      <div className={styles.crosshair}>
        <span className={styles.crosshairDot} aria-hidden="true" />
        <span className={styles.crosshairRule} aria-hidden="true" />
        <span className={styles.crosshairLabel}>Fig. 01 — Low-Cut</span>
      </div>

      {/* Video hero — autoplay, muted, loops; falls back to a striped
          placeholder if the video fails to load. */}
      <div className={styles.videoFrame}>
        {!videoReady && (
          <div className={styles.videoPlaceholder} aria-hidden="true">
            <div className={styles.videoPlayCircle}>
              <span className={styles.videoPlayTri} />
            </div>
            <span className={styles.videoPlaceholderLabel}>Product clip · loops</span>
          </div>
        )}
        <video
          ref={videoRef}
          src="/videos/safety-shoe.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.video}
          style={{ opacity: videoReady ? 1 : 0 }}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
        />
        <div className={styles.styleBadge}>Style 02 · Graphite</div>
      </div>

      {/* Headline + tagline */}
      <div className={styles.headlineRow}>
        <div className={styles.headline}>
          SAFETY
          <br />
          <span className={styles.headlineAccent}>SHOE</span>
        </div>
        <div className={styles.tagline}>Light underfoot.</div>
      </div>

      {/* Footer — spec pills + wholesale */}
      <div className={styles.footerRow}>
        <div className={styles.specs}>
          <span className={styles.spec}>Steel Toe</span>
          <span className={styles.specDot} aria-hidden="true" />
          <span className={styles.spec}>Slip-Resistant</span>
          <span className={styles.specDot} aria-hidden="true" />
          <span className={styles.spec}>EN ISO 20345 S3</span>
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
