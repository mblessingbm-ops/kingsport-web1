// Client logo carousel — uses placeholder "trusted by" logos
// Replace with real client logos in /public/images/clients/

const clients = [
  { name: 'Delta Beverages', initials: 'DB' },
  { name: 'Econet Wireless', initials: 'EW' },
  { name: 'CBZ Bank', initials: 'CBZ' },
  { name: 'Zimbabwe Electricity', initials: 'ZESA' },
  { name: 'NMB Bank', initials: 'NMB' },
  { name: 'Spar Zimbabwe', initials: 'SZ' },
  { name: 'Old Mutual', initials: 'OM' },
  { name: 'Stanbic Bank', initials: 'SB' },
  { name: 'Innscor Africa', initials: 'IA' },
  { name: 'Seed Co Limited', initials: 'SC' },
]

export default function TrustedBy() {
  const doubled = [...clients, ...clients]

  return (
    <section className="py-20 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="block w-10 h-px bg-oxblood-900 mx-auto mb-4" />
        <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800">
          Trusted By <span className="italic text-oxblood-800">Industry Leaders</span>
        </h2>
        <p className="text-charcoal-600/70 font-sans text-sm mt-3 max-w-md mx-auto">
          Zimbabwe&apos;s leading corporates, institutions, and public sector organisations rely on Kingsport.
        </p>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-scroll" style={{ width: 'max-content' }}>
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 h-20 border border-charcoal-800/10 bg-white flex flex-col items-center justify-center px-4 hover:border-oxblood-700 transition-colors duration-200 group"
            >
              <div className="font-display text-lg font-bold text-charcoal-700/40 group-hover:text-oxblood-800 transition-colors tracking-wide">
                {client.initials}
              </div>
              <div className="text-[9px] tracking-wider text-charcoal-600/30 font-sans uppercase mt-0.5 group-hover:text-charcoal-600/60 transition-colors">
                {client.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
