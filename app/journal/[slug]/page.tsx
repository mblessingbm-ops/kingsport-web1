'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getJournalPostBySlug } from '@/data/journal'
import { products } from '@/data/products'
import type { Product } from '@/types'
import ProductCardStatic from '@/components/catalog/ProductCardStatic'

interface Props {
  params: { slug: string }
}

const bodyBySlug: Record<string, React.ReactNode> = {
  'building-a-complete-ppe-kit': (
    <>
      <p>
        A site safety officer&rsquo;s first instinct, when handed a budget for PPE, is to
        order hard hats and high-vis vests. Both are essential. Neither is sufficient.
        Building a complete PPE kit means thinking through the full chain of exposure
        a worker will face on site — from the moment they arrive in the morning to the
        moment they leave.
      </p>
      <p>
        Start with the body. A heavy-duty conti suit is the working uniform of most
        Zimbabwean construction sites — it provides abrasion resistance, pocket
        capacity for tools, and a consistent visual identity across a workforce.
        Specify 280gsm poly-cotton at minimum; lighter weights wear through in months.
      </p>
      <p>
        Footwear is the line item most often under-spec&rsquo;d. An S5-rated safety boot
        gives full-length steel toe and steel midsole protection — important on any
        site where dropped tools or nail punctures are realistic risks. S3 is the
        light-duty alternative for finishing and inspection work, but for general
        site labour, S5 is the right starting point. Whichever rating you choose,
        budget for one new pair per worker per twelve months; sole degradation is
        not visible until it&rsquo;s too late.
      </p>
      <p>
        Head, eye, and ear protection complete the kit. ABS hard hats with a 6-point
        HDPE harness are the standard — slot-compatible with ear defenders and visor
        accessories so a single helmet covers multiple tasks. Add safety goggles
        rated to EN 166 for any work involving cutting, grinding, or chemical
        handling, and nitrile-coated gloves rated to EN 388 for general handling.
      </p>
      <p>
        Finally, hi-vis. A Class 2 reflective vest is the minimum for any site with
        vehicular traffic — Class 3 is required for road-adjacent or low-light work.
        Pair it with the conti suit and you have a complete, EN ISO compliant kit
        that will hold up across a 12-month rotation.
      </p>
      <p>
        Below are the four core products in a representative site-worker kit. Use
        them as a starting point and adjust quantities to your headcount.
      </p>
    </>
  ),
  'corporate-uniform-brief-guide': (
    <>
      <p>
        Vague briefs produce vague results. The phrase &ldquo;something professional
        in our brand colours&rdquo; will get you a quote, but it will not get you the
        uniform you want. After twenty-six years of taking briefs, we&rsquo;ve found
        that the orders that go smoothly share a common pattern: the procurement
        officer arrives with answers to the same six questions.
      </p>
      <p>
        <strong>One: headcount and size breakdown.</strong> Not just the total
        number of garments — the split across S, M, L, XL, and so on. Sizing is
        the single biggest cause of post-delivery exchanges. A good rule of thumb
        for a Zimbabwean office workforce: 20% S, 35% M, 30% L, 12% XL, 3% 2XL+.
        Adjust for known body shape distribution if available.
      </p>
      <p>
        <strong>Two: garment specification.</strong> Polo, oxford, blazer, or
        combination? Short-sleeve or long-sleeve? Pique or jersey knit for the
        polos? These are not stylistic choices — they affect fabric cost, lead
        time, and laundering durability. A 220gsm pique polo and a 140gsm jersey
        polo look similar on a photo. They are entirely different garments in use.
      </p>
      <p>
        <strong>Three: colours.</strong> Pantone references where possible. If
        you only have hex codes, that&rsquo;s fine — we can match to the nearest
        available dye. But &ldquo;our blue&rdquo; or &ldquo;corporate navy&rdquo;
        will be interpreted differently by every supplier. Bring a swatch, a logo
        file, or a printed colour reference.
      </p>
      <p>
        <strong>Four: branding.</strong> Where on the garment? Embroidery, screen
        print, heat transfer, or sublimation? Embroidery is durable but limited to
        smaller logo sizes. Screen print handles larger, multi-colour artwork.
        Confirm logo positions (left chest, right chest, back, sleeve) and provide
        artwork in vector format (.ai, .eps, .pdf) where possible.
      </p>
      <p>
        <strong>Five: delivery date.</strong> Not &ldquo;as soon as possible&rdquo;
        — a real date. Working backwards from your deadline, build in two weeks
        for production and three to five days for branded sample sign-off before
        the run begins. A first-time corporate uniform order is rarely ready in
        under three weeks; account for it in your planning.
      </p>
      <p>
        <strong>Six: budget.</strong> Yes, really. Stating a per-unit budget up
        front allows us to recommend the right fabric weight, branding method,
        and packaging — instead of quoting blind and then negotiating downward.
        It&rsquo;s the fastest route to the right product.
      </p>
      <p>
        Below are the three garments that anchor most corporate uniform orders.
        Use them as a reference point when you put your brief together.
      </p>
    </>
  ),
  'event-branding-checklist': (
    <>
      <p>
        Flags arrive late. Banners have the wrong dimensions. The gazebo is the
        right colour, but the logo placement is upside down. We&rsquo;ve seen all
        of it — usually in the week before a major activation, when there is no
        time to reprint.
      </p>
      <p>
        Event branding is the part of a procurement officer&rsquo;s job that gets
        the least lead time and the most last-minute panic. A pre-event timeline,
        published as soon as the event date is confirmed, eliminates almost every
        problem we see.
      </p>
      <p>
        <strong>Six weeks out — confirm artwork.</strong> Vector files only.
        Confirm pantone references for any colour-critical work (logos with brand
        red, blue, or green almost always need explicit pantone matching for
        large-format print). Lock the artwork; further changes after this point
        will compress production time.
      </p>
      <p>
        <strong>Four weeks out — place the order.</strong> All structural items
        (gazebos, pull-up banners, sharkfin flags) need 14–21 days for fabrication
        and print. Print-only items (tablecloths, vinyl banners, retractable
        signage) need 5–10 days. Order both together to lock in delivery windows.
      </p>
      <p>
        <strong>Two weeks out — sample sign-off.</strong> Request a printed sample
        of the most critical item (typically the gazebo canopy or the largest
        banner). Inspect for colour accuracy, logo placement, and stitching
        quality. Sign off in writing. Once signed, full production runs.
      </p>
      <p>
        <strong>One week out — receive and inspect.</strong> Unbox every item.
        Set up at least one gazebo or banner indoors to confirm it assembles
        correctly. Check that branding orientation is correct on multi-sided
        items. Defects flagged at this stage can usually be remade or repaired
        before the event. Defects flagged at the event itself cannot.
      </p>
      <p>
        <strong>Day before — pack and label.</strong> Group items by deployment
        location. Label boxes with contents and assembly order. Pack assembly
        tools — mallets, pegs, sandbags for outdoor work — with each gazebo or
        flag. The crew setting up at 5am the next morning will thank you.
      </p>
      <p>
        Below are the three event branding workhorses we ship most often. Build
        your activation around them.
      </p>
    </>
  ),
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function JournalPostPage({ params }: Props) {
  const post = getJournalPostBySlug(params.slug)
  if (!post) notFound()

  const embeddedProducts = post.embeddedProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[]

  const body = bodyBySlug[post.slug]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Dark header */}
      <div className="bg-charcoal-900 pt-32 pb-20 grain-overlay">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[10px] font-sans tracking-widest uppercase transition-colors mb-10"
          >
            <ArrowLeft size={12} />
            Back to Journal
          </Link>

          <div className="flex items-center gap-3 text-[10px] font-sans tracking-widest uppercase mb-6">
            <span className="text-oxblood-400">{post.category}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/40">{formatDate(post.date)}</span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="text-white/40">{post.readTime}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05]">
            {post.title}
          </h1>

          <p className="text-white/50 font-sans font-light text-base md:text-lg leading-relaxed mt-8 max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Cover image placeholder */}
      <div className="relative aspect-[16/9] bg-charcoal-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-700 to-charcoal-900" />
        {/* Replace with <Image src={post.coverImage} fill className="object-cover" alt={post.title} /> */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/15 text-[10px] font-sans tracking-widest uppercase">
          Photography coming soon
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <div className="font-sans text-base leading-[1.9] text-charcoal-700/85 space-y-6 [&_strong]:text-charcoal-800 [&_strong]:font-semibold">
          {body ?? (
            <p>
              {post.excerpt} Full article content coming soon — in the meantime,
              the products referenced in this piece are available below.
            </p>
          )}
        </div>
      </article>

      {/* Embedded products */}
      {embeddedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-4 pb-24 pt-16 border-t border-charcoal-800/8">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-oxblood-900" />
            <span className="text-oxblood-700 text-[10px] tracking-[0.35em] uppercase font-sans">
              Products Referenced in This Article
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {embeddedProducts.map(product => (
              <ProductCardStatic key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
