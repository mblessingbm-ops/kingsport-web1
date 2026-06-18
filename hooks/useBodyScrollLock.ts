'use client'

import { useEffect, useRef } from 'react'

/**
 * Locks body scroll while `locked` is true — used by drawers/modals so
 * the page behind them doesn't scroll (especially on mobile, where the
 * background otherwise scrolls under an open drawer).
 *
 * Uses a module-level counter so overlapping locks (e.g. a sub-drawer
 * over a drawer) don't unlock the body when the inner one closes. A
 * per-instance `held` ref guarantees a single hook instance contributes
 * at most one lock at a time, so a StrictMode double-invoke or an odd
 * re-run can never leak the count and leave the body stuck.
 */
let lockCount = 0
let previousOverflow = ''

export function useBodyScrollLock(locked: boolean) {
  const held = useRef(false)

  useEffect(() => {
    if (!locked || held.current) return
    held.current = true
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
    return () => {
      held.current = false
      lockCount--
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [locked])
}
