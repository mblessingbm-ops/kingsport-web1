import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const categories = [
  { label: 'PPE & Safety', href: '/catalog?category=ppe-safety' },
  { label: 'Corporate Wear', href: '/catalog?category=corporate-wear' },
  { label: 'Promotional', href: '/catalog?category=promotional' },
  { label: 'Event Branding', href: '/catalog?category=event-branding' },
  { label: 'Sports Wear', href: '/catalog?category=sports-wear' },
  { label: 'School Wear', href: '/catalog?category=school-wear' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 relative flex-shrink-0">
              <Image src="/images/kingsport-logo.png" alt="Kingsport" fill className="object-contain" />
            </div>
            <div>
              <div className="font-display text-xl font-semibold tracking-wide">KINGSPORT</div>
              <div className="text-oxblood-400 text-[10px] tracking-[0.2em] uppercase">Investments</div>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed font-sans">
            Zimbabwe&apos;s trusted manufacturer of protective clothing, corporate uniforms, and promotional merchandise since 1998.
          </p>
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-oxblood-700 hover:bg-oxblood-900/30 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-6 text-white">Product Range</h4>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="text-white/60 hover:text-oxblood-400 text-sm transition-colors font-sans flex items-center gap-2"
                >
                  <span className="block w-3 h-px bg-oxblood-700" />
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'About Kingsport', href: '/about' },
              { label: 'Request a Quote', href: '/quote' },
              { label: 'Uniform Builder', href: '/uniform-builder' },
              { label: 'Contact Us', href: '/contact' },
            ].map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-oxblood-400 text-sm transition-colors font-sans flex items-center gap-2"
                >
                  <span className="block w-3 h-px bg-oxblood-700" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-6 text-white">Get In Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white/60 text-sm font-sans">
              <MapPin size={15} className="text-oxblood-400 mt-0.5 flex-shrink-0" />
              <span>Harare, Zimbabwe</span>
            </li>
            <li className="flex items-start gap-3 text-white/60 text-sm font-sans">
              <Phone size={15} className="text-oxblood-400 mt-0.5 flex-shrink-0" />
              <span>024 277 0712 / 0607 / 0922</span>
            </li>
            <li className="flex items-start gap-3 text-white/60 text-sm font-sans">
              <Mail size={15} className="text-oxblood-400 mt-0.5 flex-shrink-0" />
              <span>info@kingsport.co.zw</span>
            </li>
          </ul>
          <div className="mt-8">
            <p className="text-white/40 text-xs font-sans uppercase tracking-widest mb-2">Operating Hours</p>
            <p className="text-white/60 text-sm font-sans">Mon–Fri: 08:00 – 17:00</p>
            <p className="text-white/60 text-sm font-sans">Sat: 08:00 – 12:00</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-sans">
            © {new Date().getFullYear()} Kingsport Investments (Pvt) Ltd. Incorporated 1998. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="block w-8 h-px bg-oxblood-900" />
            <span className="text-oxblood-700 text-xs font-sans tracking-widest uppercase">Est. 1998</span>
            <span className="block w-8 h-px bg-oxblood-900" />
          </div>
        </div>
      </div>
    </footer>
  )
}
