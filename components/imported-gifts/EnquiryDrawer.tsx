'use client'

import { useEffect, useState } from 'react'
import { X, Plus, Trash2, ArrowRight, Mail, Check, AlertCircle } from 'lucide-react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

interface LineItem {
  id: string
  code: string
  qty: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

// Sequential ids instead of Date.now()/Math.random(): the server render
// and client hydration both start the sequence at 1, so the initial
// line's id matches and React doesn't see a hydration mismatch.
let lineSeq = 0
const emptyLine = (): LineItem => ({
  id: `line-${++lineSeq}`,
  code: '',
  qty: '',
})

export default function EnquiryDrawer({ isOpen, onClose }: Props) {
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<LineItem[]>(() => [emptyLine()])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  // Escape closes
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Page behind the drawer shouldn't scroll while it's open.
  useBodyScrollLock(isOpen)

  // Reset success/error state when drawer reopens
  useEffect(() => {
    if (isOpen) {
      setSent(false)
      setSendError(null)
    }
  }, [isOpen])

  const addLine = () => setLines(prev => [...prev, emptyLine()])
  const removeLine = (id: string) =>
    setLines(prev => (prev.length > 1 ? prev.filter(l => l.id !== id) : prev))
  const updateLine = (id: string, field: 'code' | 'qty', value: string) =>
    setLines(prev => prev.map(l => (l.id === id ? { ...l, [field]: value } : l)))

  const validLines = lines.filter(l => l.code.trim() && l.qty.trim())
  const canSubmit =
    company.trim() && email.trim() && /.+@.+\..+/.test(email) && validLines.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || sending) return
    setSending(true)
    setSendError(null)

    const lineBlock = validLines
      .map((l, i) => `  ${i + 1}.  Code: ${l.code.trim()}    Qty: ${l.qty.trim()}`)
      .join('\n')

    const subject = `Imported Gifts Enquiry — ${company.trim()}`
    const body = [
      'New enquiry for items in the imported supplier catalogues.',
      '',
      '── Customer ──',
      `Company:  ${company.trim()}`,
      contact.trim() ? `Contact:  ${contact.trim()}` : null,
      `Email:    ${email.trim()}`,
      phone.trim() ? `Phone:    ${phone.trim()}` : null,
      '',
      '── Products ──',
      lineBlock,
      '',
      notes.trim() ? '── Notes ──' : null,
      notes.trim() || null,
      notes.trim() ? '' : null,
      '────────',
      'Sent via kingsport.co.zw — Imported Gifts enquiry form.',
    ]
      .filter((line): line is string => line !== null)
      .join('\n')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, text: body, replyTo: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send — please try again.')
      }
      setSent(true)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send — please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setCompany('')
    setContact('')
    setEmail('')
    setPhone('')
    setNotes('')
    setLines([emptyLine()])
    setSent(false)
    setSendError(null)
  }

  return (
    <>
      {/* Backdrop — soft blur for premium feel */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-charcoal-900/55 backdrop-blur-[3px] z-40 transition-opacity duration-[450ms] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer — decel-emphasis curve for an arrival that settles rather than snaps */}
      <aside
        role="dialog"
        aria-label="Imported Gifts Enquiry"
        aria-hidden={!isOpen}
        style={{
          transitionTimingFunction: isOpen
            ? 'cubic-bezier(0.16, 1, 0.3, 1)'
            : 'cubic-bezier(0.7, 0, 0.84, 0)',
          transitionDuration: isOpen ? '480ms' : '320ms',
        }}
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col transition-transform will-change-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-charcoal-800/8">
          <div>
            <p className="text-[10px] font-sans tracking-widest uppercase text-oxblood-700 mb-1">
              Send enquiry
            </p>
            <h2 className="font-display text-2xl font-light text-charcoal-800">
              Imported Gifts &amp; <span className="italic text-oxblood-800">Merchandise</span>
            </h2>
            <p className="text-[11px] font-sans text-charcoal-600/50 mt-1.5 leading-relaxed">
              Tell us which items you spotted in the supplier catalogues. We&apos;ll come back with pricing and lead time.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close enquiry"
            className="w-8 h-8 flex items-center justify-center border border-charcoal-800/15 hover:border-oxblood-700 text-charcoal-600/50 hover:text-oxblood-700 transition-all flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
              <Check size={22} className="text-emerald-700" />
            </div>
            <h3 className="font-display text-2xl font-light text-charcoal-800 mb-2">
              Enquiry sent
            </h3>
            <p className="font-sans text-sm text-charcoal-600/70 leading-relaxed max-w-xs">
              Your enquiry has been sent to our sales team. We respond within one business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
              <button
                onClick={handleReset}
                className="btn-glass flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-sans text-xs font-medium tracking-wide text-charcoal-700"
              >
                New enquiry
              </button>
              <button
                onClick={onClose}
                className="btn-glass-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-sans text-xs font-medium tracking-wide"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Customer block */}
            <div>
              <h3 className="text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal-600/50 mb-3">
                Your Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-charcoal-600/50 mb-1.5">
                    Company *
                  </label>
                  <input
                    required
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Your company name"
                    className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-charcoal-600/50 mb-1.5">
                      Contact name
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-charcoal-600/50 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-charcoal-600/50 mb-1.5">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Product lines */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal-600/50">
                  Products of Interest *
                </h3>
                <span className="text-[10px] font-sans text-charcoal-600/40">
                  From the supplier catalogues
                </span>
              </div>
              <div className="space-y-2">
                {lines.map((line, idx) => (
                  <div key={line.id} className="flex items-center gap-2">
                    <div className="flex-1 grid grid-cols-[1fr_88px] gap-2">
                      <input
                        type="text"
                        value={line.code}
                        onChange={e => updateLine(line.id, 'code', e.target.value)}
                        placeholder={`Product code${idx === 0 ? ' (e.g. ALT-AP-2026)' : ''}`}
                        className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
                      />
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={e => updateLine(line.id, 'qty', e.target.value)}
                        placeholder="Qty"
                        className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors text-center"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length === 1}
                      aria-label="Remove line"
                      className="w-9 h-9 flex items-center justify-center text-charcoal-600/30 hover:text-oxblood-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addLine}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-sans font-medium tracking-wide uppercase text-oxblood-700 hover:text-oxblood-900 transition-colors"
              >
                <Plus size={12} />
                Add another product
              </button>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-sans font-semibold tracking-widest uppercase text-charcoal-600/50 mb-1.5">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Branding requirements, delivery deadline, anything else…"
                className="w-full px-3 py-2.5 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <div className="space-y-2 pt-2">
              {sendError && (
                <div role="alert" className="flex items-start gap-2.5 bg-oxblood-50 border border-oxblood-200 px-3.5 py-2.5 text-xs text-oxblood-800 font-sans leading-relaxed">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    {sendError} You can also email{' '}
                    <a className="underline hover:no-underline" href="mailto:sales@kingsport.co.zw">
                      sales@kingsport.co.zw
                    </a>{' '}
                    or call <b>+263 24 277 0712</b> directly.
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={!canSubmit || sending}
                className={`btn-glass-primary w-full inline-flex items-center justify-center gap-2 py-3 font-sans text-sm font-medium tracking-wide ${
                  !canSubmit || sending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {sending ? 'Sending…' : 'Send Enquiry'}
                {!sending && <ArrowRight size={14} />}
              </button>
              <p className="text-[10px] font-sans text-charcoal-600/40 text-center leading-relaxed">
                <Mail size={10} className="inline mr-1 -mt-0.5" />
                Delivered directly to{' '}
                <span className="text-charcoal-700 font-medium">sales@kingsport.co.zw</span>
              </p>
            </div>
          </form>
        )}
      </aside>
    </>
  )
}
