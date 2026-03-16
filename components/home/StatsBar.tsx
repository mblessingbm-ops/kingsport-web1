const stats = [
  { value: '26+', label: 'Years in Operation' },
  { value: '500+', label: 'Products in Range' },
  { value: '1,000+', label: 'Clients Served' },
  { value: '100%', label: 'Local Production' },
  { value: '6', label: 'Product Categories' },
]

export default function StatsBar() {
  return (
    <section className="bg-oxblood-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <span className="font-display text-3xl md:text-4xl font-light text-white">{stat.value}</span>
              <span className="text-white/60 text-xs tracking-widest uppercase font-sans mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
