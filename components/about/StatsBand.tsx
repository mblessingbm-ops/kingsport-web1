'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsBand.module.css'

interface StatItem {
  /** Target value to count to (integer). */
  target: number
  /** Suffix appended after the number — e.g. '+', '%'. */
  suffix?: string
  /** When true, the number is rendered with thousands grouping (1,000). */
  group?: boolean
  /** Display label split across two lines via <br>. */
  label: string
}

const STATS: StatItem[] = [
  { target: 26,   suffix: '+', label: 'Years in\nOperation' },
  { target: 6,                 label: 'Product\nCategories' },
  { target: 500,  suffix: '+', label: 'Products\nin Range' },
  { target: 1000, suffix: '+', group: true, label: 'Clients\nServed' },
  { target: 100,  suffix: '%', label: 'Locally\nProduced' },
]

/** Per-column animation stagger (ms) — matches the CSS transition-delay. */
const BASE_DELAY = [50, 170, 290, 410, 530]
/** Count-up rides the rise — start the number tween slightly after the column delay. */
const COUNT_LEAD_IN = 200
const COUNT_DURATION = 1600

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function formatNumber(value: number, group?: boolean): string {
  const n = Math.round(value)
  return group ? n.toLocaleString('en-US') : String(n)
}

export default function StatsBand() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const numRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [isIn, setIsIn] = useState(false)

  // Reset DOM numbers to zero (used when re-arming on scroll-back).
  function resetNumbers() {
    STATS.forEach((s, i) => {
      const el = numRefs.current[i]
      if (el) el.textContent = '0' + (s.suffix ?? '')
    })
  }

  // Animate a single number from 0 → target with easeOutQuart.
  function countUp(stat: StatItem, el: HTMLSpanElement, delayMs: number, reduceMotion: boolean) {
    if (reduceMotion) {
      el.textContent = formatNumber(stat.target, stat.group) + (stat.suffix ?? '')
      return
    }
    let startTs: number | null = null
    let rafId = 0
    function step(ts: number) {
      if (startTs === null) startTs = ts
      const progress = Math.min((ts - startTs) / COUNT_DURATION, 1)
      el.textContent =
        formatNumber(stat.target * easeOutQuart(progress), stat.group) + (stat.suffix ?? '')
      if (progress < 1) rafId = requestAnimationFrame(step)
      else el.textContent = formatNumber(stat.target, stat.group) + (stat.suffix ?? '')
    }
    const timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(step)
    }, delayMs)
    return () => {
      window.clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: Array<(() => void) | undefined> = []

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true)
            // Kick off the count-up for each column with its staggered delay.
            STATS.forEach((stat, i) => {
              const el = numRefs.current[i]
              if (!el) return
              const cleanup = countUp(stat, el, BASE_DELAY[i] + COUNT_LEAD_IN, reduceMotion)
              cleanups.push(cleanup)
            })
          } else if (entry.boundingClientRect.top > 0) {
            // Re-arm only when scrolled back above the section.
            setIsIn(false)
            resetNumbers()
          }
        })
      },
      { threshold: 0.35 }
    )

    io.observe(section)
    return () => {
      io.disconnect()
      cleanups.forEach((c) => c?.())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${styles.stats} ${isIn ? styles.isIn : ''} bg-charcoal-900 py-24 md:py-32 grain-overlay`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Eyebrow with draw-out rule */}
        <div className={`${styles.eyebrow} flex items-center gap-[22px] mb-16`}>
          <span className={styles.rule} />
          <span className={styles.eyebrowLabel}>By the Numbers</span>
        </div>

        {/* 5-column stat row */}
        <div className={styles.row}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.stat} style={{ ['--idx' as string]: i }}>
              <span className={styles.divider} />
              <span className={styles.numMask}>
                <span
                  ref={(el) => { numRefs.current[i] = el }}
                  className={styles.num}
                >
                  0{stat.suffix ?? ''}
                </span>
              </span>
              <div className={styles.statLabel}>
                {stat.label.split('\n').map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
