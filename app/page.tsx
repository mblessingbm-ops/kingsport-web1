import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const categories = [
  {
    name: 'Personal Protective Equipment',
    desc: 'Conti suits, hi-vis, boots, gloves, hard hats — all EN ISO certified.',
    items: 84,
    moq: '12+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11c0-3.9 3.1-7 7-7s7 3.1 7 7v3H5z"/><path d="M5 14h14v3a2 2 0 01-2 2H7a2 2 0 01-2-2z"/><path d="M9 14V8M15 14V8"/></svg>
    ),
  },
  {
    name: 'Corporate Wear',
    desc: 'Executive polos, oxford shirts, blazers, dustcoats — branded to your standard.',
    items: 62,
    moq: '20+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7l5 3 5-3"/><path d="M5 7l7-4 7 4v12a2 2 0 01-2 2h-3v-7H10v7H7a2 2 0 01-2-2z"/></svg>
    ),
  },
  {
    name: 'Promotional',
    desc: 'T-shirts, caps, mugs, bags, notebooks — branded for events, schools, and giveaways.',
    items: 138,
    moq: '50+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8V21M12 8s-2-5-5-5-3 3 0 5h5zm0 0s2-5 5-5 3 3 0 5h-5z"/></svg>
    ),
  },
  {
    name: 'Event Branding',
    desc: 'Gazebos, pull-up banners, sharkfin flags, tablecloths — built for activations.',
    items: 41,
    moq: '1+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 6H3z"/><path d="M5 9v12M19 9v12M9 21v-7h6v7"/></svg>
    ),
  },
  {
    name: 'Sports Wear',
    desc: 'Sublimated jerseys, tracksuits, sports kits — for clubs, schools, and corporates.',
    items: 53,
    moq: '20+',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>
    ),
  },
  {
    name: 'School Wear',
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
    count: '84 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V10l7-4 7 4v11"/><path d="M9 21v-6h6v6"/></svg>
    ),
  },
  {
    name: 'Banking & Finance',
    count: '41 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-5 9 5"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 21h18"/></svg>
    ),
  },
  {
    name: 'Government',
    count: '62 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V9l7-4 7 4v12"/><circle cx="12" cy="13" r="1.5"/></svg>
    ),
  },
  {
    name: 'Retail & FMCG',
    count: '53 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1 13H6z"/><path d="M9 7V5a3 3 0 016 0v2"/></svg>
    ),
  },
  {
    name: 'Education',
    count: '47 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v5c2 1.5 8 1.5 10 0v-5"/></svg>
    ),
  },
  {
    name: 'NGOs & Aid',
    count: '28 items',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5-7-11a4 4 0 017-2.5A4 4 0 0119 10c0 6-7 11-7 11z"/></svg>
    ),
  },
]

const clients = ['Delta Corp', 'Econet', 'CBZ Bank', 'Old Mutual', 'UNICEF Zim', 'Hippo Valley', 'Schweppes', '+ 200 more']

const compliance = [
  { prefix: 'EN ISO', tag: '20471 · Hi-vis' },
  { prefix: 'EN ISO', tag: '20345 · Safety footwear' },
  { prefix: 'EN', tag: '397 · Industrial helmets' },
  { prefix: 'EN', tag: '388 · Mech. gloves' },
  { prefix: 'EN', tag: '166 · Eye protection' },
  { prefix: 'ISO', tag: '9001 · Quality' },
]

const journalPosts = [
  {
    meta: 'Case study · 03 May 2026',
    title: "Kitting out Cresta Mining's Bindura site in 14 days.",
    desc: '500 workers, four SKUs, one delivery window. How we coordinated cutting, branding, and dispatch to hit a tight expansion deadline.',
    cta: 'Read the case →',
  },
  {
    meta: 'Guide · 18 Apr 2026',
    title: 'Buying hi-vis: what EN ISO 20471 actually means.',
    desc: 'The plain-English guide for procurement officers. Class 1 vs 2 vs 3, when each is required, and what to look for on the label.',
    cta: 'Read the guide →',
  },
  {
    meta: 'Factory · 02 Apr 2026',
    title: 'Inside the embroidery floor.',
    desc: 'Eight machines, 32,000 stitches per logo, and the quality checks that catch problems before garments ship.',
    cta: 'Read the post →',
  },
]

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>Manufactured in Harare &mdash; since 1998</div>
            <h1 className={styles.heroH1}>Outfit your team.</h1>
            <p className={styles.heroItalic}>We&rsquo;ll handle the rest.</p>
            <p className={styles.heroTagline}>
              Workwear, protective equipment and corporate uniforms &mdash; designed, cut and stitched under one roof in Zimbabwe.
            </p>
            <div className={styles.heroMeta}>
              <Link href="/catalog" className={styles.heroLink}>
                Browse the catalogue <span className="arrow">→</span>
              </Link>
              <span className={styles.heroIssue}>Vol. XXVI / 2026</span>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className="frameNum"><b>F. 01</b> &mdash; Heavy Duty Conti</div>
            <div className="frameIssue">EN ISO 13688</div>
            <Image
              src="/images/products/conti-suit.png"
              alt="Heavy duty conti suit"
              width={520}
              height={540}
              priority
            />
            <div className="floor" />
            <div className="credit">
              <div className="name">Heavy Duty Conti Suit</div>
              <div className="meta">KS-CS-001 · MOQ 25 sets</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 quote paths ──────────────────────────────────────────── */}
      <section className={styles.paths}>
        <div className={styles.wrap}>
          <div className={styles.pathsHead}>
            <h2>
              Three ways<br />to start <em>a quote.</em>
            </h2>
            <p>Whether you know exactly what you want, want us to choose, or want to design something custom — pick a path.</p>
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

            <Link className={styles.path} href="/catalog">
              <div className={styles.pathHead}>
                <div className="glyph">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4l-4 5v11h6v-6h4v6h6V9l-4-5z"/><circle cx="12" cy="11" r="1.4"/></svg>
                </div>
                <div>
                  <div className="num">C</div>
                  <h3>Open Uniform Builder</h3>
                </div>
              </div>
              <p>Configure your uniform piece-by-piece — fabric, colour, logo positions, embroidery vs print, size breakdown.</p>
              <div className="foot"><span className="metaTag">Visual · made-to-spec</span><span className="go">→</span></div>
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
              <Link key={c.name} className={styles.cat} href="/catalog">
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

      {/* ── Trust strip ────────────────────────────────────────────── */}
      <section className={styles.trust}>
        <div className={styles.wrap}>
          <div className={styles.trustRow}>
            <div>
              <h3>Compliance &amp; standards</h3>
              <div className={styles.compliance}>
                {compliance.map((c) => (
                  <div key={c.tag} className={styles.cb}>
                    <b>{c.prefix}</b> {c.tag}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3>Trusted by</h3>
              <div className={styles.clients}>
                {clients.map((c) => (
                  <div key={c} className={styles.client}>{c}</div>
                ))}
              </div>
            </div>
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
            <div className="ph">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 16l5-4 4 3 3-2 6 5"/><circle cx="9" cy="10" r="1.2"/></svg>
              <div className="label">Factory floor · Harare</div>
              <div>photo · pending</div>
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
              <Link key={i.name} className={styles.ind} href="/catalog">
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
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>View all →</span>
            </div>
          </div>
          <div className={styles.journalGrid}>
            {journalPosts.map((p) => (
              <article key={p.title} className={styles.post}>
                <div className="img">photo · pending</div>
                <div className="body">
                  <div className="metaTag">{p.meta}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="read">{p.cta}</div>
                </div>
              </article>
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
