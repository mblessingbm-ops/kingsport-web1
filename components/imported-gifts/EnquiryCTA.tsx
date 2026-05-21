'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import EnquiryDrawer from './EnquiryDrawer'

export default function EnquiryCTA() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-glass-primary inline-flex items-center gap-2 px-5 py-3 font-sans font-medium text-sm tracking-wide"
      >
        Send an Enquiry
        <ArrowRight size={14} />
      </button>
      <EnquiryDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
