'use client'

import { useEffect } from 'react'

/**
 * Client-only listener that blocks the obvious copy paths on images
 * everywhere on the site:
 *
 *  - Right-click (Save Image As…, Copy Image)
 *  - Drag (drag-out to Finder / Desktop / another tab)
 *  - Touch long-press context menu on mobile
 *  - Save shortcut (Cmd/Ctrl+S) when the user has the page open
 *
 * Caveats — this is deterrence, not prevention. DevTools, the
 * browser's Network tab, "View Page Source", screenshots, and direct
 * URL access (e.g. /images/about/sewing-floor.jpg) all still work. A
 * truly impossible-to-download image is not achievable on the web;
 * anything the browser can render, the user can capture. This
 * component blocks the casual paths that 99% of visitors would use.
 *
 * Mounted once at the root layout — no per-image wiring needed.
 */
export default function ImageProtection() {
  useEffect(() => {
    function isProtectedTarget(el: EventTarget | null): boolean {
      if (!(el instanceof Element)) return false
      // Block on real image elements (Next/Image renders <img>),
      // <picture>, and any element a developer has tagged with
      // data-protected or the .protected-image class.
      const node = el.closest('img, picture, [data-protected], .protected-image')
      return Boolean(node)
    }

    const onContextMenu = (e: MouseEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault()
    }
    const onDragStart = (e: DragEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      // Block Cmd/Ctrl+S anywhere on the site (it would save the
      // current page incl. all images to disk).
      const isSave = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's'
      if (isSave) e.preventDefault()
    }

    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('dragstart', onDragStart)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('dragstart', onDragStart)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return null
}
