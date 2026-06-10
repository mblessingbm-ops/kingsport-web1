'use client'

import { useEffect } from 'react'

/**
 * Locks body scroll while `locked` is true — used by drawers/modals so
 * the page behind them doesn't scroll (especially on mobile, where the
 * background otherwise scrolls under an open drawer).
 *
 * Uses a module-level counter so overlapping locks (e.g. a sub-drawer
 * over a drawer) don't unlock the body when the inner one closes.
 */
let lockCount = 0
let previousOverflow = ''

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount++
    return () => {
      lockCount--
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [locked])
}
