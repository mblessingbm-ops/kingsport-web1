'use client'

import { useState } from 'react'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

/**
 * Contact form — POSTs to /api/send-email (Resend), which delivers to
 * sales@kingsport.co.zw. Matches the pattern used by the quote form
 * (app/quote/page.tsx) and the imported-gifts enquiry drawer.
 */
export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    const bodyLines = [
      `New contact-form enquiry — submitted via kingsport.co.zw`,
      '====================================================',
      '',
      `Subject: ${form.subject || 'General Enquiry'}`,
      '',
      '— Contact —',
      `Name:    ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Email:   ${form.email}`,
      form.phone && `Phone:   ${form.phone}`,
      '',
      '— Message —',
      form.message,
    ].filter(Boolean).join('\n')

    const subjectLine = `[Contact] ${form.subject || 'General Enquiry'} — ${form.name}`

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subjectLine, text: bodyLines, replyTo: form.email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send — please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send — please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-oxblood-900 flex items-center justify-center mx-auto mb-6">
          <Check size={24} className="text-white" />
        </div>
        <h3 className="font-display text-2xl font-light text-charcoal-800 mb-3">
          Message <span className="italic text-oxblood-800">sent</span>
        </h3>
        <p className="text-charcoal-600/70 font-sans text-sm leading-relaxed max-w-sm mx-auto">
          Your message has been sent to our sales team. We&apos;ll respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
            Full Name *
          </label>
          <input id="contact-name"
            required
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
            Company
          </label>
          <input id="contact-company"
            type="text"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
            Email *
          </label>
          <input id="contact-email"
            required
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
            Phone
          </label>
          <input id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors"
            placeholder="+263 77..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
          Subject *
        </label>
        <select id="contact-subject"
          required
          value={form.subject}
          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-oxblood-700 transition-colors appearance-none"
        >
          <option value="">Select a subject...</option>
          <option>General Enquiry</option>
          <option>Product Information</option>
          <option>Quote Request</option>
          <option>Partnership / Supplier</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[10px] font-sans font-medium tracking-widest text-charcoal-600/50 uppercase mb-1.5">
          Message *
        </label>
        <textarea id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 border border-charcoal-800/15 bg-cream-50 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-600/30 focus:outline-none focus:border-oxblood-700 transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2.5 bg-oxblood-50 border border-oxblood-200 px-4 py-3 text-xs text-oxblood-800 font-sans leading-relaxed">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          <span>
            {submitError} You can also email{' '}
            <a className="underline hover:no-underline" href="mailto:sales@kingsport.co.zw">
              sales@kingsport.co.zw
            </a>{' '}
            or call <b>+263 24 277 0712</b> directly.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-glass-primary w-full py-4 disabled:opacity-60 font-sans font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  )
}
