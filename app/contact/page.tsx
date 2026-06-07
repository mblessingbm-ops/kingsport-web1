import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Kingsport Investments. Reach our sales team in Harare, Zimbabwe for quotes and enquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-charcoal-900 pt-32 pb-16 grain-overlay">
        <div className="max-w-7xl mx-auto px-6">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-3">
            Get in <span className="italic text-oxblood-400">Touch</span>
          </h1>
          <p className="text-white/50 font-sans text-sm max-w-xl">
            Our sales team is available Monday–Friday to discuss your requirements and provide expert advice.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-3xl font-light text-charcoal-800 mb-6">
                Contact <span className="italic text-oxblood-800">Information</span>
              </h2>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-oxblood-900 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-charcoal-800 text-sm">Head Office</p>
                    <p className="font-sans text-charcoal-600/70 text-sm leading-relaxed mt-0.5">
                      4 Grant Street<br />
                      Harare, Zimbabwe
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=4+Grant+Street,+Harare,+Zimbabwe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-xs text-oxblood-700 hover:text-oxblood-900 transition-colors mt-1.5"
                    >
                      Get directions
                      <ArrowRight size={11} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-oxblood-900 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-charcoal-800 text-sm">Sales Line</p>
                    <a
                      href="tel:+2630242770712"
                      className="font-sans text-charcoal-600/70 text-sm hover:text-oxblood-700 transition-colors mt-0.5 block"
                    >
                      024 277 0712
                    </a>
                    <a
                      href="tel:+2630242770607"
                      className="font-sans text-charcoal-600/70 text-sm hover:text-oxblood-700 transition-colors mt-0.5 block"
                    >
                      024 277 0607
                    </a>
                    <a
                      href="tel:+2630242770922"
                      className="font-sans text-charcoal-600/70 text-sm hover:text-oxblood-700 transition-colors mt-0.5 block"
                    >
                      024 277 0922
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-oxblood-900 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-charcoal-800 text-sm">Email</p>
                    <a
                      href="mailto:sales@kingsport.co.zw"
                      className="font-sans text-charcoal-600/70 text-sm hover:text-oxblood-700 transition-colors mt-0.5 block"
                    >
                      sales@kingsport.co.zw
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-oxblood-900 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-charcoal-800 text-sm">Business Hours</p>
                    <p className="font-sans text-charcoal-600/70 text-sm leading-relaxed mt-0.5">
                      Mon – Fri: 8:00am – 5:00pm<br />
                      Saturday: 8:00am – 1:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="bg-oxblood-900 p-8 grain-overlay">
              <h3 className="font-display text-2xl font-light text-white mb-2">
                Need a <em>Quote?</em>
              </h3>
              <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
                Browse our catalog, add products to your list, and submit a detailed quote request — we&apos;ll respond within 1–2 business days.
              </p>
              <a
                href="/quote"
                className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-oxblood-900 text-white px-6 py-3 font-sans font-medium text-sm tracking-wide transition-all duration-200"
              >
                Build Your Quote
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-charcoal-800/8 p-8 md:p-10">
              <h2 className="font-display text-3xl font-light text-charcoal-800 mb-1">
                Send a <span className="italic text-oxblood-800">Message</span>
              </h2>
              <p className="text-charcoal-600/50 text-xs font-sans mb-8">
                For general enquiries, partnership opportunities, or supplier questions.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-20">
          <span className="block w-10 h-px bg-oxblood-700 mb-4" />
          <h2 className="font-display text-3xl font-light text-charcoal-800 mb-2">
            Find <span className="italic text-oxblood-800">Us</span>
          </h2>
          <p className="text-charcoal-600/50 text-xs font-sans mb-6">
            4 Grant Street, Harare — visitors welcome during business hours.
          </p>
          <div className="border border-charcoal-800/8 overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <iframe
              title="Kingsport Investments — 4 Grant Street, Harare"
              src="https://www.google.com/maps?q=4+Grant+Street,+Harare,+Zimbabwe&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}

