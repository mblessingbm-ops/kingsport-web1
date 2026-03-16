import Link from 'next/link'
import { ArrowRight, Building2, Landmark, HardHat, ShoppingBag, GraduationCap, Globe } from 'lucide-react'

const sectors = [
  {
    id: 'government',
    label: 'Government & Public Sector',
    description: 'Uniforms and PPE for ministries, municipalities, and state enterprises. Full compliance documentation available.',
    icon: Building2,
    products: ['Conti Suits', 'Reflective Vests', 'Corporate Uniforms', 'Branded Stationery'],
    accentColor: 'from-slate-700 to-slate-900',
  },
  {
    id: 'banking',
    label: 'Banking & Finance',
    description: 'Executive corporate wear and branded merchandise for front-line staff and executive teams across branches and head offices.',
    icon: Landmark,
    products: ['Executive Polos', 'Corporate Blazers', 'Oxford Shirts', 'Branded Gifts'],
    accentColor: 'from-zinc-700 to-zinc-900',
  },
  {
    id: 'construction',
    label: 'Construction & Engineering',
    description: 'PPE for site workers, supervisors, and contractors. High-vis, hard hats, safety boots, and full conti suits.',
    icon: HardHat,
    products: ['S5 Safety Boots', 'Hard Hats', 'Hi-Vis Vests', 'Heavy Duty Conti Suits'],
    accentColor: 'from-amber-800 to-amber-950',
  },
  {
    id: 'retail',
    label: 'Retail & FMCG',
    description: 'Staff uniforms, branded aprons, and promotional merchandise for retail chains, supermarkets, and consumer brands.',
    icon: ShoppingBag,
    products: ['Dustcoats', 'Branded T-Shirts', 'Caps & Headwear', 'Promotional Items'],
    accentColor: 'from-oxblood-800 to-oxblood-950',
  },
  {
    id: 'education',
    label: 'Education & Schools',
    description: 'Full school uniform sets, sports kits, and backpacks for primary and secondary schools across Zimbabwe.',
    icon: GraduationCap,
    products: ['School Uniform Sets', 'Sports Kits', 'School Backpacks', 'Kids T-Shirts'],
    accentColor: 'from-blue-800 to-blue-950',
  },
  {
    id: 'ngo',
    label: 'NGOs & Aid Organisations',
    description: 'Branded field gear, high-visibility clothing, and promotional merchandise for NGOs operating across sub-Saharan Africa.',
    icon: Globe,
    products: ['Hi-Vis Vests', 'Branded Caps', 'Drawstring Bags', 'Event Gazebos'],
    accentColor: 'from-emerald-800 to-emerald-950',
  },
]

export default function SectorsServed() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="block w-10 h-px bg-oxblood-900 mb-4" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-charcoal-800">
              Industries
              <br />
              <span className="italic text-oxblood-800">We Serve</span>
            </h2>
          </div>
          <p className="text-charcoal-600 font-sans text-sm leading-relaxed max-w-sm md:text-right">
            From the mine shaft to the boardroom — Kingsport supplies Zimbabwe&apos;s most demanding industries with clothing and branding that meets their standards.
          </p>
        </div>

        {/* Sectors Grid — 2 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sectors.map(({ id, label, description, icon: Icon, products }) => (
            <div
              key={id}
              className="bg-cream-50 border border-charcoal-800/8 p-8 hover:border-charcoal-800/20 transition-all duration-200"
            >
              <Icon size={20} className="text-oxblood-700 mb-5" />

              <h3 className="font-display text-xl font-semibold text-charcoal-800">
                {label}
              </h3>
              <p className="font-sans text-sm text-charcoal-600/70 leading-relaxed mt-2 mb-5">
                {description}
              </p>

              {/* Product tags */}
              <div className="flex flex-wrap gap-2">
                {products.map(product => (
                  <span
                    key={product}
                    className="bg-white border border-charcoal-800/10 text-charcoal-600 text-[10px] tracking-wide uppercase font-sans px-2.5 py-1"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-cream-100 border border-charcoal-800/8 p-8 mt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl font-light text-charcoal-800">
                Don&apos;t see your industry listed?
              </p>
              <p className="font-sans text-sm text-charcoal-600/70 mt-2 max-w-md">
                We supply any sector that needs quality clothing and branding. Get in touch and we&apos;ll put together a category recommendation.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 border border-charcoal-800/20 hover:border-oxblood-700 text-charcoal-700 hover:text-oxblood-700 px-6 py-3 text-sm font-sans font-medium transition-all duration-200"
              >
                Browse Full Catalog
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-oxblood-900 hover:bg-oxblood-700 text-white px-6 py-3 text-sm font-sans font-medium transition-all duration-200"
              >
                Request a Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
