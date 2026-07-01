import Link from 'next/link'

const catalogLinks = [
  { label: 'Personal Protective Equipment', href: '/catalog?category=ppe-safety' },
  { label: 'Corporate & Promotional Wear',  href: '/catalog?category=corporate-wear' },
  { label: 'Promotional Gifts',             href: '/catalog?category=promotional' },
  { label: 'Event Branding',                href: '/catalog?category=event-branding' },
  { label: 'Sports Wear',                   href: '/catalog?category=sports-wear' },
  { label: 'School Wear',                   href: '/catalog?category=school-wear' },
]

const companyLinks = [
  { label: 'About Kingsport', href: '/about' },
  { label: 'Factory tours',   href: '/contact' },
  { label: 'Journal',         href: '/journal' },
]

const quoteLinks = [
  { label: 'Request a quote', href: '/quote' },
  { label: 'Browse catalogue', href: '/catalog' },
  { label: 'Contact us', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-[#fdfbf7]/70 pt-[72px] pb-8">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-9">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-11">
          {/* Brand block */}
          <div>
            {/* Wordmark only */}
            <div className="leading-[1.05]">
              <div
                className="text-[#fdfbf7] text-[22px] font-semibold tracking-[1.4px]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                KINGSPORT
              </div>
              <div className="text-[9.5px] text-[#fdfbf7]/55 tracking-[1.5px] uppercase font-medium mt-px">
                Investments · Est. 1998
              </div>
            </div>
            <p className="mt-[18px] text-[13px] leading-[1.65] text-[#fdfbf7]/55 max-w-[280px]">
              Workwear, PPE, corporate uniforms and branded merchandise — manufactured in Harare, Zimbabwe.
            </p>
            <div className="mt-[18px] text-[13px] leading-[1.8] text-[#fdfbf7]/70">
              <b className="text-[#fdfbf7] font-semibold">+263 24 277 0712</b>
              <br />
              info@kingsport.co.zw
              <br />
              4 Grant Street, Harare, Zimbabwe
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="text-[10.5px] tracking-[1.6px] uppercase text-[#fdfbf7]/50 mb-4 font-semibold">
              Catalogue
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {catalogLinks.map((l, i) => (
                <li key={l.label + i}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-[#fdfbf7]/70 hover:text-[#fdfbf7] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10.5px] tracking-[1.6px] uppercase text-[#fdfbf7]/50 mb-4 font-semibold">
              Company
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-[#fdfbf7]/70 hover:text-[#fdfbf7] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div>
            <h4 className="text-[10.5px] tracking-[1.6px] uppercase text-[#fdfbf7]/50 mb-4 font-semibold">
              Quote &amp; account
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {quoteLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-[#fdfbf7]/70 hover:text-[#fdfbf7] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal — data-footer-divider lets the fixed QuotePill (rendered
            as a sibling in the root layout, not nested here) find this
            line and dock its bottom edge just above it near page-end. */}
        <div
          data-footer-divider
          className="mt-14 pt-[26px] border-t border-[#fdfbf7]/10 flex flex-col sm:flex-row justify-between gap-3 text-[10.5px] tracking-[1.2px] text-[#fdfbf7]/50 uppercase font-medium"
        >
          <span>© 2026 Kingsport Investments (Pvt) Ltd · Incorporated 1998</span>
          <span>Privacy · Terms · Sitemap</span>
        </div>
      </div>
    </footer>
  )
}
