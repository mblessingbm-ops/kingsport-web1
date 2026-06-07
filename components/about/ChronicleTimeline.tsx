'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ChronicleTimeline.module.css'

interface ChronicleEntry {
  year: string
  fact: string
}

const ENTRIES: ChronicleEntry[] = [
  { year: '1998', fact: 'Kingsport Investments (Pvt) Ltd incorporated in Harare, Zimbabwe.' },
  { year: '2001', fact: 'First major institutional supply contract signed with a Harare-based government department.' },
  { year: '2005', fact: 'PPE and industrial safety wear range formalised as a dedicated product category.' },
  { year: '2010', fact: 'Expanded into event branding and large-format display materials.' },
  { year: '2015', fact: 'In-house sublimation and embroidery capabilities established.' },
  { year: '2019', fact: 'School wear and sports kit range launched in response to institutional demand.' },
  { year: '2024', fact: 'Twenty-six years in operation. Still 100% locally produced. Still family-owned.' },
]

export default function ChronicleTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const spineRef = useRef<HTMLSpanElement | null>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])
  const [isIn, setIsIn] = useState(false)
  const [litRows, setLitRows] = useState<Set<number>>(new Set())

  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current
    if (!section || !timeline) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Section enters → eyebrow rule draws out
    const sectionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsIn(true)
        })
      },
      { threshold: 0.05 },
    )
    sectionIO.observe(section)

    if (reduceMotion) {
      // Light every row up-front, fill the spine completely
      setLitRows(new Set(ENTRIES.map((_, i) => i)))
      if (spineRef.current) spineRef.current.style.height = '100%'
      return () => sectionIO.disconnect()
    }

    // Light each row as it crosses ~78% down the viewport
    const rowIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            setLitRows((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
            rowIO.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -22% 0px' },
    )
    rowRefs.current.forEach((r) => r && rowIO.observe(r))

    // Spine fill tracks scroll progress through the timeline
    let ticking = false
    const updateSpine = () => {
      ticking = false
      const rect = timeline.getBoundingClientRect()
      const vh = window.innerHeight
      const anchor = vh * 0.5
      const progress = (anchor - rect.top) / rect.height
      const clamped = Math.max(0, Math.min(1, progress))
      if (spineRef.current) spineRef.current.style.height = `${clamped * 100}%`
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateSpine)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateSpine)
    updateSpine()

    return () => {
      sectionIO.disconnect()
      rowIO.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateSpine)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${styles.chronicle} ${isIn ? styles.isIn : ''} bg-cream-50 py-24 md:py-32`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow with draw-out rule */}
        <div className={`${styles.eyebrow} mb-20`}>
          <span className={styles.eyebrowRule} />
          <span className={styles.eyebrowLabel}>Chronicle</span>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className={styles.timeline}>
          {/* Vertical spine track + fill */}
          <div className={styles.spineTrack}>
            <span ref={spineRef} className={styles.spineFill} />
          </div>

          {ENTRIES.map((entry, i) => (
            <div
              key={entry.year}
              ref={(el) => { rowRefs.current[i] = el }}
              data-idx={i}
              className={`${styles.row} ${litRows.has(i) ? styles.lit : ''}`}
            >
              <span className={styles.node} />
              <div className={styles.year}>{entry.year}</div>
              <div className={styles.desc}>{entry.fact}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
