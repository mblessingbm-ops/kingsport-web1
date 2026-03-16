'use client'
import { useState, useEffect, useCallback } from 'react'
import type { QuoteItem } from '@/types'

const STORAGE_KEY = 'kingsport_quote_cart'

export function useQuoteCart() {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = useCallback((item: QuoteItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId)
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const updateItem = useCallback((productId: string, updates: Partial<QuoteItem>) => {
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, ...updates } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  return { items, addItem, removeItem, updateItem, clearCart, count: items.length }
}
