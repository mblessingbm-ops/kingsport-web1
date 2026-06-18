import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { journalPosts } from '@/data/journal'

function formatJournalDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZW', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const categories = [
  {
    name: 'Personal Protective Equipment',
    href: '/catalog?category=ppe-safety',
    desc: 'Conti suits, hi-vis, boots, gloves, hard hats — all EN ISO certified.',
    items: 84,
    moq: '12+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11c0-3.9 3.1-7 7-7s7 3.1 7 7v3H5z"/><path d="M5 14h14v3a2 2 0 01-2 2H7a2 2 0 01-2-2z"/><path d="M9 14V8M15 14V8"/></svg>
    ),
  },
  {
    name: 'Corporate & Promotional Wear',
    href: '/catalog?category=corporate-wear',
    desc: 'Branded apparel — polos, shirts, t-shirts, caps and outerwear for uniformed teams and promotional runs.',
    items: 122,
    moq: '20+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l5 3 5-3"/><path d="M5 7l7-4 7 4v12a2 2 0 01-2 2h-3v-7H10v7H7a2 2 0 01-2-2z"/></svg>
    ),
  },
  {
    name: 'Promotional Gifts',
    href: '/catalog?category=promotional',
    desc: 'Lanyards, bags, water bottles, pens, mugs, diaries, calendars and umbrellas — branded for events and giveaways.',
    items: 78,
    moq: '50+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8V21M12 8s-2-5-5-5-3 3 0 5h5zm0 0s2-5 5-5 3 3 0 5h-5z"/></svg>
    ),
  },
  {
    name: 'Event Branding',
    href: '/catalog?category=event-branding',
    desc: 'Gazebos, pull-up banners, sharkfin flags, tablecloths — built for activations.',
    items: 41,
    moq: '1+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 6H3z"/><path d="M5 9v12M19 9v12M9 21v-7h6v7"/></svg>
    ),
  },
  {
    name: 'Sports Wear',
    href: '/catalog?category=sports-wear',
    desc: 'Sublimated jerseys, tracksuits, sports kits — for clubs, schools, and corporates.',
    items: 53,
    moq: '20+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>
    ),
  },
  {
    name: 'School Wear',
    href: '/catalog?category=school-wear',
    desc: 'Tunics, blazers, backpacks, tracksuits — kitted for the academic calendar.',
    items: 47,
    moq: '25+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v5c2 1.5 8 1.5 10 0v-5M21 9v6"/></svg>
    ),
  },
]

const industries = [
  {
    name: 'Construction & Engineering',
    href: '/catalog?industry=construction',
    count: '84 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10l7-4 7 4v11"/><path d="M9 21v-6h6v6"/></svg>
    ),
  },
  {
    name: 'Banking & Finance',
    href: '/catalog?industry=banking',
    count: '41 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-5 9 5"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 21h18"/></svg>
    ),
  },
  {
    name: 'Government',
    href: '/catalog?industry=government',
    count: '62 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V9l7-4 7 4v12"/><circle cx="12" cy="13" r="1.5"/></svg>
    ),
  },
  {
    name: 'Retail & FMCG',
    href: '/catalog?industry=retail',
    count: '53 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1 13H6z"/><path d="M9 7V5a3 3 0 016 0v2"/></svg>
    ),
  },
  {
    name: 'Education',
    href: '/catalog?industry=education',
    count: '47 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v5c2 1.5 8 1.5 10 0v-5"/></svg>
    ),
  },
  {
    name: 'NGOs & Aid',
    href: '/catalog?industry=ngo',
    count: '28 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5-7-11a4 4 0 017-2.5A4 4 0 0119 10c0 6-7 11-7 11z"/></svg>
    ),
  },
]

// Client logos for the "Trusted by" marquee. Real organisations Kingsport
// has supplied over the years — rendered greyscale, restored to full colour
// on hover (see .clientLogo in page.module.css).
const clients = [
  { name: 'Econet', src: '/images/clients/econet.webp', w: 958, h: 213 },
  { name: 'Delta Corporation', src: '/images/clients/delta.webp', w: 711, h: 121 },
  { name: 'Old Mutual', src: '/images/clients/old-mutual.webp', w: 759, h: 167 },
  { name: 'CBZ Bank', src: '/images/clients/cbz.webp', w: 607, h: 319 },
  { name: 'UNICEF', src: '/images/clients/unicef.webp', w: 211, h: 113 },
  { name: 'NetOne', src: '/images/clients/netone.webp', w: 660, h: 405 },
  { name: 'UNDP', src: '/images/clients/undp.webp', w: 253, h: 514 },
  { name: 'TelOne', src: '/images/clients/telone.webp', w: 759, h: 283 },
  { name: 'World Vision', src: '/images/clients/world-vision.webp', w: 704, h: 147 },
  { name: 'British American Tobacco', src: '/images/clients/bat.webp', w: 659, h: 297 },
  { name: 'Higherlife Foundation', src: '/images/clients/higherlife.webp', w: 551, h: 444 },
  { name: 'NSSA', src: '/images/clients/nssa.webp', w: 821, h: 387 },
  { name: 'CAMFED', src: '/images/clients/camfed.webp', w: 670, h: 230 },
  { name: 'ZINARA', src: '/images/clients/zinara.webp', w: 496, h: 430 },
  { name: 'Forestry Commission', src: '/images/clients/forestry-commission.webp', w: 1039, h: 247 },
  { name: 'Traffic Safety Council', src: '/images/clients/traffic-safety-council.webp', w: 572, h: 572 },
  { name: 'Zimbabwe Leaf Tobacco', src: '/images/clients/zlt.webp', w: 671, h: 237 },
  { name: 'Alliance Ginneries', src: '/images/clients/alliance.webp', w: 1069, h: 240 },
  { name: 'Flint Junior School', src: '/images/clients/flint.webp', w: 429, h: 429 },
]

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* ── Hero · Cover (C · Liquid Glass) ─────────────────────── */}
      <section className={styles.heroCover}>
        <div className={styles.heroCoverBody}>
          <div className={styles.heroCoverStack}>
            <div className={styles.heroCoverEyebrow}>Manufactured in Harare &mdash; since 1998</div>
            <h1 className={styles.heroCoverH1}>
              <span className="word">If you are proud</span>
              <span className="word">of your corporate image&hellip;</span>
            </h1>
            <p className={styles.heroCoverItalic}>show it!</p>
          </div>
        </div>

        <div className={styles.heroCoverFoot}>
          <span className="left" />
          <Link className="center" href="/catalog">
            Browse the catalogue <span className="arrow">→</span>
          </Link>
          <span className="right" />
        </div>
      </section>

      {/* ── Hero · Plate I (feature plate · full-bleed lineup) ───── */}
      <section className={styles.heroPlate}>
        <div className={styles.heroPlateBg}>
          <div className="panel">
            <Image src="/images/hero/lineup-1.webp" alt="Royal blue hi-vis conti suit" fill sizes="20vw" priority style={{ objectFit: 'cover', objectPosition: 'bottom center' }} />
          </div>
          <div className="panel">
            <Image src="/images/hero/lineup-2.webp" alt="Branded corporate shirt" fill sizes="20vw" priority style={{ objectFit: 'cover', objectPosition: 'bottom center' }} />
          </div>
          <div className="panel">
            <Image src="/images/hero/lineup-3.webp" alt="Yellow cotton tee" fill sizes="20vw" priority style={{ objectFit: 'cover', objectPosition: 'bottom center' }} />
          </div>
          <div className="panel">
            <Image src="/images/hero/lineup-4.webp" alt="Pink striped corporate polo" fill sizes="20vw" priority style={{ objectFit: 'cover', objectPosition: 'bottom center' }} />
          </div>
          <div className="panel">
            <Image src="/images/hero/lineup-5.webp" alt="Black hi-vis rain jacket" fill sizes="20vw" priority style={{ objectFit: 'cover', objectPosition: 'bottom center' }} />
          </div>
        </div>
        <div className={styles.heroPlateScrim} />
        <span className={styles.heroPlateMast}>Plate I · The lineup</span>
        <span className={styles.heroPlateSeal}>F. 01–05 &mdash; Featured ranges</span>
        <div className={styles.heroPlateInner}>
          <div className={styles.heroPlateText}>
            <div className={styles.heroPlateTag}>Plate I</div>
            <div className={styles.heroPlateRule} />
            <div className={styles.heroPlateCat}>PPE · Corp &amp; Promo Wear · Gifts · Event · Sports · School</div>
            <h2 className={styles.heroPlateName}>
              Whatever the<br />workday demands.
            </h2>
            <p className={styles.heroPlateBody}>
              Hi-vis and conti suits for the field, polos and corporate shirts for the front of house &mdash; every garment cut, stitched and finished under one roof in Harare.
            </p>
            <dl className={styles.heroPlateSpecs}>
              <dt>Ranges</dt><dd>Six categories</dd>
              <dt>Lead time</dt><dd>7&ndash;14 days</dd>
              <dt>MOQ</dt><dd>From 12 sets</dd>
              <dt>Ships to</dt><dd>SADC × 5</dd>
            </dl>
            <Link className={styles.heroPlateLink} href="/catalog">
              Browse the catalogue <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2 quote paths ──────────────────────────────────────────── */}
      <section className={styles.paths}>
        <div className={styles.wrap}>
          <div className={styles.pathsHead}>
            <h2>
              Two ways<br />to start <em>a quote.</em>
            </h2>
            <p>Whether you know exactly what you want or want us to choose — pick a path.</p>
          </div>
          <div className={styles.pathsGrid}>
            <Link className={styles.path} href="/catalog">
              <div className={styles.pathHead}>
                <div className="glyph">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                </div>
                <div>
                  <div className="num">A</div>
                  <h3>Browse the catalogue</h3>
                </div>
              </div>
              <p>425 ready-to-quote products across six categories. Full SKU control — specify exactly what you need.</p>
              <div className="foot"><span className="metaTag">By SKU · most flexible</span><span className="go">→</span></div>
            </Link>

            <Link className={styles.path} href="/catalog">
              <div className={styles.pathHead}>
                <div className="glyph">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5-9 5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>
                </div>
                <div>
                  <div className="num">B</div>
                  <h3>Pick a curated bundle</h3>
                </div>
              </div>
              <p>Peer-tested kits — site worker, supervisor, visitor, school pack, event day. Drop one into your quote in a click.</p>
              <div className="foot"><span className="metaTag">6 bundles · fastest</span><span className="go">→</span></div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────────── */}
      <section className={styles.cats}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2>
              Six ranges,<br /><em>one factory floor.</em>
            </h2>
            <div className="right">Every category is manufactured in Harare and ships across Zim, Zam, Bots, Moz and South Africa.</div>
          </div>
          <div className={styles.catsGrid}>
            {categories.map((c) => (
              <Link key={c.name} className={styles.cat} href={c.href}>
                <div className="icon">{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="metaTag">
                    <span><b>{c.items}</b> items</span>
                    <span>MOQ <b>{c.moq}</b></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted by — revolving client marquee ──────────────────── */}
      <section className={styles.trust}>
        <div className={styles.wrap}>
          <h3 className={styles.trustHeading}>Trusted by</h3>
        </div>
        <div className={styles.clientsMarquee}>
          {/* Repeat the list twice so the loop seams without a gap */}
          <div className={styles.clientsTrack}>
            {clients.map((c) => (
              <span key={`a-${c.name}`} className={styles.client}>
                <Image
                  src={c.src}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  className={styles.clientLogo}
                />
              </span>
            ))}
            {clients.map((c) => (
              <span key={`b-${c.name}`} className={styles.client} aria-hidden="true">
                <Image
                  src={c.src}
                  alt=""
                  width={c.w}
                  height={c.h}
                  className={styles.clientLogo}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Made in Zimbabwe ───────────────────────────────────────── */}
      <section className={styles.made}>
        <div className={`${styles.wrap} ${styles.madeGrid}`}>
          <div>
            <div className="eyebrow">The Kingsport advantage</div>
            <h2>
              One supplier.<br />One factory.<br /><em>One country.</em>
            </h2>
            <p>From the cutting table to the embroidery floor, every garment is made under one roof in Harare. That means shorter lead times, fewer surprises, and a real factory you can walk through before you order.</p>
            <div className={styles.madeStats}>
              <div className="stat"><div className="k">7–14d</div><div className="v">Typical lead time</div></div>
              <div className="stat"><div className="k">5</div><div className="v">SADC delivery countries</div></div>
              <div className="stat"><div className="k">180+</div><div className="v">Staff on the floor</div></div>
            </div>
            <div className={styles.madeCta}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">Book a factory tour →</Link>
              <Link className={`${styles.btn} ${styles.btnOnDark}`} href="/about">About Kingsport</Link>
            </div>
          </div>
          <div className={styles.madeImage}>
            <div className="photo">
              <Image
                src="/images/home/factory-floor.jpg"
                alt="Kingsport factory floor in Harare — industrial production line on the workshop floor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="footerTag"><span>Harare · Zimbabwe</span><span className="live">Live · operating 24/6</span></div>
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────────────────────── */}
      <section className={styles.industries}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2>Sectors <em>we kit out.</em></h2>
            <div className="right">Compliance documentation, sizing breakdowns and branding standards tailored to each industry&rsquo;s daily reality.</div>
          </div>
          <div className={styles.industriesGrid}>
            {industries.map((i) => (
              <Link key={i.name} className={styles.ind} href={i.href}>
                <div className="icon">{i.icon}</div>
                <div className="name">{i.name}</div>
                <div className="count">{i.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal preview ────────────────────────────────────────── */}
      <section className={styles.journal}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <h2>From <em>the Journal.</em></h2>
            <div className="right">
              Case studies, kit guides, and behind-the-scenes from twenty-six years of dressing Zimbabwean industry.{' '}
              <Link href="/journal" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                View all →
              </Link>
            </div>
          </div>
          <div className={styles.journalGrid}>
            {journalPosts.map((p) => (
              <Link
                key={p.id}
                href={`/journal/${p.slug}`}
                className={styles.post}
                aria-label={`${p.title} — ${p.category}`}
              >
                <div className="img">
                  {p.imageReady ? (
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span>photo · pending</span>
                  )}
                </div>
                <div className="body">
                  <div className="metaTag">{p.category} · {formatJournalDate(p.date)}</div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="read">Read the article →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.wrap}>
          <div className="eyebrow">Start a quote</div>
          <h2>Let&rsquo;s <em>outfit</em> your team.</h2>
          <p>Tell us what you need and we&rsquo;ll come back within one working day with pricing, lead times, and branding mock-ups — free of charge.</p>
          <div className={styles.ctaCtas}>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/catalog">Browse the catalogue →</Link>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/quote">Request a quote</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
