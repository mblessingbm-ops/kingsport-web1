'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Crossfading background-video carousel for the About hero.
 *
 * All clips are mounted, stacked, and object-cover. Only the active
 * clip is opacity-100; the rest sit at opacity-0. Advancing flips
 * which clip is active and the opacity transition crossfades between
 * them. The incoming clip is rewound + played *before* the fade
 * begins, so during the ~1.2s crossfade both clips are moving — that's
 * what makes the hand-off "almost unnoticeable" rather than a cut to a
 * frozen frame.
 *
 * Advance trigger: we watch the active clip's timeupdate and start the
 * crossfade FADE_SECONDS before it ends, so the outgoing clip never
 * reaches its hard end (which would otherwise stutter/loop-jump mid-fade).
 */

const CLIPS = [
  { src: '/videos/about-hero/01-preparing-thread.mp4', label: 'Preparing thread for sewing' },
  { src: '/videos/about-hero/02-embroidery.mp4', label: 'Embroidery machine stitching a logo' },
  { src: '/videos/about-hero/03-thread-bobbins.mp4', label: 'Industrial shelves of thread bobbins' },
  { src: '/videos/about-hero/04-uv-printing.mp4', label: 'Large-format UV printer at work' },
  { src: '/videos/about-hero/05-screen-printing.mp4', label: 'Screen printing onto t-shirts' },
]

const FADE_SECONDS = 1.2 // crossfade duration; also how early we start the next clip

export default function HeroVideoCarousel() {
  const [active, setActive] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  // Guards a single advance per clip cycle so timeupdate can't fire it twice.
  const advancingRef = useRef(false)

  const advance = useCallback(() => {
    if (advancingRef.current) return
    advancingRef.current = true

    setActive((current) => {
      const next = (current + 1) % CLIPS.length
      const nextVideo = videoRefs.current[next]
      if (nextVideo) {
        // Start the incoming clip from the top, already playing, so the
        // crossfade reveals motion rather than a static first frame.
        try {
          nextVideo.currentTime = 0
        } catch {
          /* currentTime can throw if metadata isn't ready yet — harmless */
        }
        const p = nextVideo.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
      return next
    })
  }, [])

  // Drive the crossfade off the active clip's playback position.
  useEffect(() => {
    const video = videoRefs.current[active]
    if (!video) return

    advancingRef.current = false

    const ensurePlaying = () => {
      video.muted = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    ensurePlaying()

    const onTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return
      if (video.currentTime >= video.duration - FADE_SECONDS) advance()
    }
    // Fallback in case the threshold is missed (e.g. a tab throttled in
    // the background): a hard end still advances.
    const onEnded = () => advance()
    // If the active clip fails to load/decode, don't hang the carousel
    // on a frozen frame — skip straight to the next clip.
    const onError = () => advance()

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
    }
  }, [active, advance])

  // Once the crossfade has completed, pause + rewind clips that aren't
  // active so they don't keep decoding in the background.
  useEffect(() => {
    const t = window.setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (i !== active && v) {
          v.pause()
          try {
            v.currentTime = 0
          } catch {
            /* ignore */
          }
        }
      })
    }, FADE_SECONDS * 1000 + 100)
    return () => window.clearTimeout(t)
  }, [active])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {CLIPS.map((clip, i) => (
        <video
          key={clip.src}
          ref={(el) => {
            videoRefs.current[i] = el
          }}
          src={clip.src}
          muted
          playsInline
          // Only the first clip autoplays on mount; the rest are started
          // programmatically by advance() just before their fade-in.
          autoPlay={i === 0}
          // Eagerly load the first clip; let the others stream in as they
          // approach (keeps initial payload small despite 5 sources).
          preload={i === 0 ? 'auto' : 'metadata'}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
