'use client'
/**
 * Quote cart — single source of truth shared across every component
 * that calls `useQuoteCart()`.
 *
 * The previous implementation kept each consumer's items in its own
 * `useState([])`, so when the PDP added an item the Navbar pill
 * (a separate hook instance) had no idea and stayed at zero. Now the
 * cart lives in module-level state behind `useSyncExternalStore`, so
 * every subscriber re-renders when the cart changes — within the same
 * tab (custom listeners) and across tabs (the browser `storage` event).
 */
import { useSyncExternalStore, useCallback, useEffect } from 'react'
import type { QuoteItem } from '@/types'

const STORAGE_KEY = 'kingsport_quote_cart'

// ── Module-level store ─────────────────────────────────────────────
const EMPTY: QuoteItem[] = []

let storeItems: QuoteItem[] = EMPTY
let initialised = false
const listeners = new Set<() => void>()

function loadFromStorage(): QuoteItem[] {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : EMPTY
  } catch {
    return EMPTY
  }
}

function persist() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storeItems))
  } catch {}
}

/** Replace the cart, persist, and notify every subscriber. */
function setItems(next: QuoteItem[]) {
  storeItems = next
  persist()
  listeners.forEach(fn => fn())
}

function ensureInit() {
  if (initialised || typeof window === 'undefined') return
  storeItems = loadFromStorage()
  initialised = true
  // Cross-tab sync: when another tab writes to localStorage, refresh.
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return
    storeItems = loadFromStorage()
    listeners.forEach(fn => fn())
  })
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function getSnapshot(): QuoteItem[] {
  return storeItems
}

function getServerSnapshot(): QuoteItem[] {
  return EMPTY
}

// ── Hook ───────────────────────────────────────────────────────────
export function useQuoteCart() {
  // Hydrate the store from localStorage on the first client render.
  useEffect(() => {
    if (initialised) return
    ensureInit()
    // Tell every subscriber to take a fresh snapshot now that we've loaded.
    listeners.forEach(fn => fn())
  }, [])

  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const addItem = useCallback((item: QuoteItem) => {
    ensureInit()
    const existing = storeItems.find(i => i.productId === item.productId)
    setItems(
      existing
        ? storeItems.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          )
        : [...storeItems, item],
    )
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(storeItems.filter(i => i.productId !== productId))
  }, [])

  const updateItem = useCallback(
    (productId: string, updates: Partial<QuoteItem>) => {
      setItems(
        storeItems.map(i =>
          i.productId === productId ? { ...i, ...updates } : i,
        ),
      )
    },
    [],
  )

  const clearCart = useCallback(() => {
    setItems(EMPTY)
  }, [])

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    count: items.length,
  }
}
