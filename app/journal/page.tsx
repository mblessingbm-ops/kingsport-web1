import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { journalPosts } from '@/data/journal'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Field notes from the Kingsport factory floor — practical guides on PPE, corporate uniforms, event branding, and the briefs that produce great work.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function JournalIndexPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-charcoal-900 pt-32 pb-20 grain-overlay">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-oxblood-700" />
            <span className="text-oxblood-400 text-[10px] tracking-[0.35em] uppercase font-sans">
              Field Notes
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] max-w-3xl">
            From the<br />
            <span className="italic text-oxblood-400">Factory Floor.</span>
          </h1>
          <p className="text-white/40 font-sans font-light text-base md:text-lg max-w-2xl leading-relaxed mt-8">
            Practical guides, briefs, and field notes from twenty-six years of
            making things in Harare. Written for procurement officers, safety
            managers, and anyone placing a serious order for the first time.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalPosts.map(post => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="group block bg-white border border-charcoal-800/8 hover:border-oxblood-700/40 transition-colors"
            >
              {/* Cover */}
              <div className="relative aspect-[16/9] bg-charcoal-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/20 text-[10px] font-sans tracking-widest uppercase">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h2 className="font-display text-2xl font-light text-charcoal-800 leading-tight group-hover:text-oxblood-800 transition-colors">
                  {post.title}
                </h2>
                <p className="font-sans text-charcoal-700/70 text-sm leading-relaxed mt-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="mt-5 pt-4 border-t border-charcoal-800/8 inline-flex items-center gap-1.5 text-oxblood-800 group-hover:text-oxblood-700 text-xs font-sans font-medium tracking-wide">
                  Read Article
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
