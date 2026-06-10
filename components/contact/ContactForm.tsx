'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

/**
 * Contact form — routes the submission to sales@kingsport.co.zw via
 * the user's default mail client. Matches the pattern used by the
 * quote form (app/quote/page.tsx) and the imported-gifts enquiry drawer.
 */
export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
    const mailto = `mailto:sales@kingsport.co.zw?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyLines)}`

    if (typeof window !== 'undefined') {
      window.location.href = mailto
    }

    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
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
        <p className="text-charcoal-600/70 font-sans text-sm leading-relaxed max-w-sm mx-auto mb-4">
          Your mail client just opened with the message pre-filled for{' '}
          <b className="text-charcoal-800">sales@kingsport.co.zw</b>. Hit send there and we&apos;ll
          respond within one business day.
        </p>
        <p className="text-[11px] text-charcoal-600/40 font-sans">
          Didn&apos;t see your mail client open? Write to{' '}
          <a className="text-oxblood-700 hover:underline" href="mailto:sales@kingsport.co.zw">
            sales@kingsport.co.zw
          </a>{' '}
          directly or call <b className="text-charcoal-700">+263 24 277 0712</b>.
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

      <button
        type="submit"
        disabled={submitting}
        className="btn-glass-primary w-full py-4 disabled:opacity-60 font-sans font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Opening mail…
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
