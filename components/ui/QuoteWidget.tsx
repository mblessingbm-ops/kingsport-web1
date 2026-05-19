'use client'

import { useState } from 'react'
import QuotePill from './QuotePill'
import QuoteDrawer from './QuoteDrawer'

export default function QuoteWidget() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <QuotePill onOpen={() => setDrawerOpen(true)} />
      <QuoteDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
