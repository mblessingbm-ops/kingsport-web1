'use client'
import { useReducer, useMemo, useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { X, ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import {
  KS_CATEGORIES,
  KS_INDUSTRIES,
  KS_BUNDLES,
  designCat,
  productIndustries,
  productMeta,
  categoryCount,
  type KsCategoryId,
  type IndustryId,
} from '@/data/catalog-meta'
import type { Product } from '@/types'
import { useQuoteCart } from '@/hooks/useQuoteCart'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import RainShellHero from '@/components/catalog/RainShellHero'
import SafetyShoeHero from '@/components/catalog/SafetyShoeHero'
import styles from './page.module.css'

type Path = 'catalog' | 'bundles'
type SortKey = 'requested' | 'lead' | 'moq'

interface CatalogState {
  cat: KsCategoryId
  ind: IndustryId | null
  path: Path
  pdpId: string | null
  sort: SortKey
}

type Action =
  | { type: 'SET_CAT'; cat: KsCategoryId }
  | { type: 'SET_IND'; ind: IndustryId | null }
  | { type: 'SET_PATH'; path: Path }
  | { type: 'OPEN_PDP'; id: string }
  | { type: 'CLOSE_PDP' }
  | { type: 'SET_SORT'; sort: SortKey }

function reducer(state: CatalogState, action: Action): CatalogState {
  switch (action.type) {
    case 'SET_CAT': return { ...state, cat: action.cat }
    case 'SET_IND': return { ...state, ind: action.ind }
    case 'SET_PATH': return { ...state, path: action.path }
    case 'OPEN_PDP': return { ...state, pdpId: action.id }
    case 'CLOSE_PDP': return { ...state, pdpId: null }
    case 'SET_SORT': return { ...state, sort: action.sort }
    default: return state
  }
}

// ── Icons ─────────────────────────────────────────────────────────────
function CategoryGlyph({ id, size = 20, color = 'currentColor' }: { id: KsCategoryId; size?: number; color?: string }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'all':       return <svg {...c}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
    case 'ppe':       return <svg {...c}><path d="M5 11c0-3.9 3.1-7 7-7s7 3.1 7 7v3H5z" /><path d="M5 14h14v3a2 2 0 01-2 2H7a2 2 0 01-2-2z" /><path d="M9 14V8M15 14V8" /></svg>
    case 'corporate': return <svg {...c}><path d="M7 7l5 3 5-3" /><path d="M5 7l7-4 7 4v12a2 2 0 01-2 2h-3v-7H10v7H7a2 2 0 01-2-2z" /></svg>
    case 'promo':     return <svg {...c}><rect x="3" y="8" width="18" height="4" /><path d="M5 12v9h14v-9M12 8V21M12 8s-2-5-5-5-3 3 0 5h5zm0 0s2-5 5-5 3 3 0 5h-5z" /></svg>
    case 'event':     return <svg {...c}><path d="M12 3l9 6H3z" /><path d="M5 9v12M19 9v12M9 21v-7h6v7" /></svg>
    case 'sports':    return <svg {...c}><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" /></svg>
    case 'school':    return <svg {...c}><path d="M3 9l9-4 9 4-9 4z" /><path d="M7 11v5c2 1.5 8 1.5 10 0v-5M21 9v6" /></svg>
    default: return null
  }
}

function IndustryGlyph({ id, size = 11, color = 'currentColor' }: { id: IndustryId; size?: number; color?: string }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (id) {
    case 'construction': return <svg {...c}><path d="M3 21h18M5 21V10l7-4 7 4v11" /><path d="M9 21v-6h6v6" /></svg>
    case 'banking':      return <svg {...c}><path d="M3 10l9-5 9 5" /><path d="M5 10v8M9 10v8M15 10v8M19 10v8" /><path d="M3 21h18" /></svg>
    case 'government':   return <svg {...c}><path d="M3 21h18M5 21V9l7-4 7 4v12" /><circle cx="12" cy="13" r="1.5" /></svg>
    case 'retail':       return <svg {...c}><path d="M5 7h14l-1 13H6z" /><path d="M9 7V5a3 3 0 016 0v2" /></svg>
    case 'education':    return <svg {...c}><path d="M3 9l9-4 9 4-9 4z" /><path d="M7 11v5c2 1.5 8 1.5 10 0v-5" /></svg>
    case 'ngo':          return <svg {...c}><path d="M12 21s-7-5-7-11a4 4 0 017-2.5A4 4 0 0119 10c0 6-7 11-7 11z" /></svg>
  }
}

// Map live product category IDs (used by the navbar dropdown and elsewhere)
// to the design IDs this page filters on, so /catalog?category=ppe-safety
// resolves to the same filter as /catalog?category=ppe.
const liveCatMap: Record<string, KsCategoryId> = {
  'ppe-safety':     'ppe',
  'corporate-wear': 'corporate',
  'promotional':    'promo',
  'event-branding': 'event',
  'sports-wear':    'sports',
  'school-wear':    'school',
}
const KS_CAT_IDS = new Set(['all', 'ppe', 'corporate', 'promo', 'event', 'sports', 'school'])

function normalizeCat(raw: string | null): KsCategoryId {
  if (!raw) return 'all'
  if (KS_CAT_IDS.has(raw)) return raw as KsCategoryId
  return liveCatMap[raw] ?? 'all'
}

const VALID_INDUSTRIES = new Set(['construction', 'banking', 'government', 'retail', 'education', 'ngo'])
function normalizeInd(raw: string | null): IndustryId | null {
  if (!raw) return null
  return VALID_INDUSTRIES.has(raw) ? (raw as IndustryId) : null
}

// ── Page ─────────────────────────────────────────────────────────────
function CatalogContent() {
  const search = useSearchParams()
  const urlCat = normalizeCat(search.get('category'))
  const urlInd = normalizeInd(search.get('industry'))

  const [state, dispatch] = useReducer(reducer, {
    cat: urlCat,
    ind: urlInd,
    path: 'catalog',
    pdpId: null,
    sort: 'requested',
  })

  // Keep reducer state in sync when the URL category or industry param changes
  // (e.g. when the user clicks the navbar dropdown, a homepage tile, or the
  // × clear-filter link)
  useEffect(() => {
    if (state.cat !== urlCat) dispatch({ type: 'SET_CAT', cat: urlCat })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCat])
  useEffect(() => {
    if (state.ind !== urlInd) dispatch({ type: 'SET_IND', ind: urlInd })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlInd])

  const filtered = useMemo(() => {
    let list: Product[] = state.cat === 'all'
      ? products
      : products.filter(p => designCat(p) === state.cat)
    if (state.ind) list = list.filter(p => productIndustries(p).includes(state.ind!))
    // Sort
    if (state.sort === 'lead') list = [...list].sort((a, b) => productMeta(a).lead.localeCompare(productMeta(b).lead))
    else if (state.sort === 'moq') list = [...list].sort((a, b) => productMeta(a).moq - productMeta(b).moq)
    return list
  }, [state.cat, state.ind, state.sort])

  const catObj = state.cat === 'all' ? null : KS_CATEGORIES.find(c => c.id === state.cat)!

  return (
    <div className={styles.catalog}>
      {/* Hero strip */}
      <div className={styles.heroStrip}>
        <div>
          <div className="eyebrow">The 2026 Catalogue</div>
          <h1>Pick a category, then <em>pick a path.</em></h1>
        </div>
        <div className="lede">
          {products.length} products in six categories — browse by SKU or drop a curated kit straight into your quote.
        </div>
      </div>

      {/* Path row */}
      <div className={styles.pathRow}>
        <div className={styles.stepLabel}><b>02 ·</b> Pick a path</div>
        <div className={styles.pathGrid}>
          <PathCard
            n="A"
            title="Browse the catalogue"
            desc={`Pick from ${filtered.length} ${state.cat === 'all' ? 'products' : (catObj?.short || '') + ' products'} — full SKU control.`}
            meta="By SKU · most flexible"
            active={state.path === 'catalog'}
            onClick={() => dispatch({ type: 'SET_PATH', path: 'catalog' })}
            glyph={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>
            }
          />
          <PathCard
            n="B"
            title="Use a curated bundle"
            desc="Peer-tested kits assembled for common roles — site worker, supervisor, visitor."
            meta="6 bundles · fastest"
            active={state.path === 'bundles'}
            onClick={() => dispatch({ type: 'SET_PATH', path: 'bundles' })}
            glyph={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5-9 5z" /><path d="M3 8v9l9 5 9-5V8" /><path d="M12 13v9" /></svg>
            }
          />
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <Sidebar state={state} dispatch={dispatch} />
        {state.path === 'catalog' && (
          <CatalogPane state={state} dispatch={dispatch} products={filtered} catObj={catObj} />
        )}
        {state.path === 'bundles' && (
          <BundlesPane state={state} dispatch={dispatch} catObj={catObj} />
        )}
      </div>

      <PDPDrawer state={state} dispatch={dispatch} />
    </div>
  )
}

function PathCard({ n, title, desc, meta, active, glyph, onClick }: { n: string; title: string; desc: string; meta: string; active: boolean; glyph: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        cursor: 'pointer',
        border: '1px solid ' + (active ? '#1a1a1a' : '#ece1c8'),
        background: active ? '#1a1a1a' : '#fff',
        color: active ? '#fdfbf7' : '#1a1a1a',
        padding: '15px 18px',
        display: 'flex',
        gap: 14,
        fontFamily: 'inherit',
        position: 'relative',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          flex: '0 0 40px',
          background: active ? '#1a1a1c' : '#fdfbf7',
          border: '1px solid ' + (active ? '#1f1f1f' : '#ece1c8'),
          color: active ? '#800020' : '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {glyph}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 10, letterSpacing: 0.6, color: active ? '#800020' : '#9a8e75', fontWeight: 600 }}>{n}</span>
          <span style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: -0.2 }}>{title}</span>
        </div>
        <div style={{ fontSize: 12, color: active ? '#cfc9bd' : '#6b5f4c', lineHeight: 1.5 }}>{desc}</div>
        <div style={{ fontSize: 10, letterSpacing: 0.6, color: active ? '#800020' : '#9a8e75', marginTop: 8, textTransform: 'uppercase' }}>{meta}</div>
      </div>
      {active && (
        <div style={{ position: 'absolute', top: 14, right: 16, color: '#800020', fontSize: 10, letterSpacing: 0.5 }}>● Active</div>
      )}
    </button>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────
function Sidebar({ state, dispatch }: { state: CatalogState; dispatch: React.Dispatch<Action> }) {
  const catObj = state.cat === 'all' ? null : KS_CATEGORIES.find(c => c.id === state.cat)!
  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.stepLabel}>Selected category</div>
        <h2>{catObj ? catObj.label : 'All catalogue'}</h2>
        <div className={styles.ctxBody}>
          {catObj
            ? `Manufactured in Zimbabwe. ${catObj.short === 'PPE' ? 'Compliance docs (EN ISO / ANSI) supplied on request.' : 'Customisable branding via embroidery, screen print, sublimation or heat transfer.'}`
            : `Browsing all ${products.length} products across six categories. Filter by industry or pick a category tile above to narrow.`}
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadTitle}>Industry</div>
          {state.ind && (
            <button className={styles.clearBtn} onClick={() => dispatch({ type: 'SET_IND', ind: null })}>× Clear</button>
          )}
        </div>
        <div className={styles.indChips}>
          {KS_INDUSTRIES.map(i => {
            const active = i.id === state.ind
            return (
              <button
                key={i.id}
                onClick={() => dispatch({ type: 'SET_IND', ind: active ? null : i.id })}
                style={{
                  padding: '6px 10px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  border: '1px solid ' + (active ? '#1a1a1a' : '#ece1c8'),
                  background: active ? '#1a1a1a' : '#fff',
                  color: active ? '#fdfbf7' : '#1a1a1a',
                  fontFamily: 'inherit',
                  fontSize: 11.5,
                  lineHeight: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <IndustryGlyph id={i.id} size={11} color={active ? '#800020' : 'currentColor'} />
                {i.short}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadTitle}>Quick filter</div>
        </div>
        <div className={styles.quickList}>
          {[
            ['EN ISO compliant only', 14],
            ['Logo-ready (branding)', 72],
            ['MOQ ≤ 25 units', 28],
            ['In stock now', 41],
          ].map(([n, c]) => (
            <label key={n as string}>
              <span className={styles.quickBox} />
              <span style={{ flex: 1 }}>{n}</span>
              <span className={styles.quickCount}>{c}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ── Catalog pane ──────────────────────────────────────────────────────
function CatalogPane({ state, dispatch, products: list, catObj }: { state: CatalogState; dispatch: React.Dispatch<Action>; products: Product[]; catObj: ReturnType<typeof KS_CATEGORIES.find> | null }) {
  const indObj = state.ind ? KS_INDUSTRIES.find(i => i.id === state.ind) : null
  const headline = catObj ? catObj.label : 'All catalogue'
  const activeCategory = state.cat !== 'all' ? state.cat : null

  return (
    <section className={styles.pane}>
      <div className={styles.paneHead}>
        <div>
          <div className={styles.paneLead}>{indObj ? `Most ordered by ${indObj.short}` : 'Browsing'}</div>
          <div className={styles.paneTitle}>
            {headline} <span className={styles.paneCount}>· {list.length} items</span>
          </div>
        </div>
        <div className={styles.sortBox}>
          <label>Sort</label>
          <select value={state.sort} onChange={(e) => dispatch({ type: 'SET_SORT', sort: e.target.value as SortKey })}>
            <option value="requested">Most requested</option>
            <option value="lead">Lead time</option>
            <option value="moq">MOQ low → high</option>
          </select>
        </div>
      </div>

      {/* Active filter indicator */}
      {activeCategory && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans tracking-widest uppercase text-charcoal-600/40">
              Showing
            </span>
            <span className="inline-flex items-center gap-2 bg-oxblood-900/[0.08] border border-oxblood-700/20 text-oxblood-800 text-xs font-sans font-medium px-3 py-1.5">
              {KS_CATEGORIES.find(c => c.id === activeCategory)?.label}
              <Link
                href="/catalog"
                onClick={() => dispatch({ type: 'SET_IND', ind: null })}
                className="text-oxblood-600/50 hover:text-oxblood-900 transition-colors"
                aria-label="Clear filter"
              >
                <X size={11} />
              </Link>
            </span>
          </div>
          <span className="text-[11px] font-sans text-charcoal-600/40">
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </span>
        </div>
      )}

      {list.length === 0 ? (
        <div className="text-center py-24 col-span-full">
          <p className="font-display text-2xl font-light text-charcoal-700 mb-2">
            No products found
          </p>
          <p className="font-sans text-sm text-charcoal-600/50 mb-6">
            {activeCategory
              ? `No products in ${KS_CATEGORIES.find(c => c.id === activeCategory)?.label} match your search.`
              : 'No products match your search.'}
          </p>
          <Link
            href="/catalog"
            onClick={() => dispatch({ type: 'SET_IND', ind: null })}
            className="inline-flex items-center gap-2 text-oxblood-700 hover:text-oxblood-900 font-sans text-sm transition-colors"
          >
            Clear filters
            <ArrowRight size={13} />
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {list.map(p => (
            <ProductCard key={p.id} p={p} onOpen={() => dispatch({ type: 'OPEN_PDP', id: p.id })} />
          ))}
        </div>
      )}
    </section>
  )
}

function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const { addItem, items } = useQuoteCart()
  const meta = productMeta(p)
  const inQuote = items.some(i => i.productId === p.id)

  return (
    <div
      onClick={onOpen}
      // Keyboard access: role + tabIndex instead of <button> because the
      // card contains a nested "Add to quote" button (nested buttons are
      // invalid HTML and break focus order).
      role="button"
      tabIndex={0}
      aria-label={`View ${p.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      style={{
        background: '#fff',
        border: '1px solid ' + (inQuote ? '#800020' : '#ece1c8'),
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {inQuote && (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, background: '#800020', color: '#fff', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', padding: '3px 8px', fontWeight: 600 }}>
          ✓ In quote
        </div>
      )}
      <div style={{ aspectRatio: '4 / 5', background: '#faf6ef', position: 'relative', overflow: 'hidden' }}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          style={{ objectFit: 'contain', padding: 12 }}
        />
      </div>
      <div style={{ padding: '12px 14px', borderTop: '1px solid #ece1c8', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'baseline' }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.2 }}>{p.name}</div>
          <div style={{ fontSize: 10, color: '#9a8e75', whiteSpace: 'nowrap', letterSpacing: 0.4 }}>
            {p.id.toUpperCase()}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 2 }}>
          {meta.compliance !== '—' && <Tag tone="safety">{meta.compliance}</Tag>}
          <Tag>MOQ {meta.moq}</Tag>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (inQuote) return
              addItem({
                productId: p.id,
                productName: p.name,
                quantity: Math.max(25, meta.moq),
                size: p.sizes?.[Math.floor((p.sizes?.length || 1) / 2)],
                color: p.availableColors?.[0]?.name,
              })
            }}
            className={inQuote ? 'btn-glass-dark' : 'btn-glass'}
            style={{
              width: '100%',
              padding: '8px 0',
              fontSize: 11.5,
              fontFamily: 'inherit',
              fontWeight: 500,
              cursor: inQuote ? 'default' : 'pointer',
            }}
          >
            {inQuote ? '✓ Added to quote' : 'Add to quote +'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Tag({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'safety' | 'steel' }) {
  const palette = {
    default: { bg: '#faf6ef', fg: '#2e2e2e', bd: '#ece1c8' },
    safety: { bg: '#fdf2f4', fg: '#800020', bd: '#f9d0d8' },
    steel: { bg: '#f5edde', fg: '#1a1a1a', bd: '#ece1c8' },
  }[tone]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 7px',
      background: palette.bg,
      color: palette.fg,
      border: '1px solid ' + palette.bd,
      fontSize: 10,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      lineHeight: 1,
    }}>{children}</span>
  )
}

// ── Bundles pane ──────────────────────────────────────────────────────
function BundlesPane({ state, dispatch, catObj }: { state: CatalogState; dispatch: React.Dispatch<Action>; catObj: ReturnType<typeof KS_CATEGORIES.find> | null }) {
  const matchesCat = (b: typeof KS_BUNDLES[number]) =>
    state.cat === 'all' || b.productIds.some(id => {
      const p = products.find(x => x.id === id)
      return p && designCat(p) === state.cat
    })
  const matchesInd = (b: typeof KS_BUNDLES[number]) => !state.ind || b.industries.includes(state.ind)
  const primary = KS_BUNDLES.filter(b => matchesCat(b) && matchesInd(b))
  const others = KS_BUNDLES.filter(b => !primary.includes(b))
  const indObj = state.ind ? KS_INDUSTRIES.find(i => i.id === state.ind) : null

  return (
    <section className={styles.pane}>
      <div className={styles.paneHead}>
        <div>
          <div className={styles.paneLead}>Curated bundles</div>
          <div className={styles.paneTitle}>
            {catObj ? catObj.label + ' · ' : ''}
            <span>{primary.length}</span> <span className={styles.paneCount}>bundle{primary.length === 1 ? '' : 's'}{indObj ? ` for ${indObj.short}` : ''}</span>
          </div>
        </div>
      </div>

      <div className={styles.bundlesGrid}>
        {primary.map(b => <BundleCard key={b.id} bundle={b} />)}
      </div>

      {others.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '30px 0 12px' }}>
            <div className={styles.stepLabel}>Also available</div>
            <span style={{ fontSize: 10.5, color: '#9a8e75' }}>{others.length} bundles</span>
          </div>
          <div className={styles.bundlesGrid}>
            {others.map(b => <BundleCard key={b.id} bundle={b} />)}
          </div>
        </>
      )}
    </section>
  )
}

function BundleCard({ bundle }: { bundle: typeof KS_BUNDLES[number] }) {
  const { addItem, items } = useQuoteCart()
  const items_in_bundle = bundle.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p))
  const totalMoq = items_in_bundle.reduce((a, p) => a + productMeta(p).moq, 0)
  const alreadyAllInQuote = items_in_bundle.every(p => items.some(i => i.productId === p.id))

  return (
    <div className={styles.bundle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
        <div>
          <div className={`${styles.bundleRole} ${bundle.tone === 'safety' ? styles.bundleRoleSafety : ''}`}>{bundle.role}</div>
          <h3 className={styles.bundleTitle}>{bundle.title}</h3>
        </div>
        {bundle.tone === 'safety' && <Tag tone="safety">PPE</Tag>}
      </div>
      <div className={styles.bundleThumbs}>
        {items_in_bundle.slice(0, 6).map(p => (
          <div key={p.id} className={styles.bundleThumb} title={p.name}>
            <Image src={p.image} alt={p.name} fill style={{ objectFit: 'contain', padding: 6 }} sizes="60px" />
          </div>
        ))}
      </div>
      <div className={styles.bundleBody}>
        Includes {items_in_bundle.length} SKUs · MOQ {totalMoq}+ units per person · lead time 7–14 days. Adjust quantities & sizes after adding.
      </div>
      <div className={styles.bundleCta}>
        <button
          disabled={alreadyAllInQuote}
          onClick={() => {
            items_in_bundle.forEach(p => {
              if (items.some(i => i.productId === p.id)) return
              const meta = productMeta(p)
              addItem({
                productId: p.id,
                productName: p.name,
                quantity: Math.max(25, meta.moq),
                size: p.sizes?.[Math.floor((p.sizes?.length || 1) / 2)],
                color: p.availableColors?.[0]?.name,
              })
            })
          }}
        >
          {alreadyAllInQuote ? '✓ Bundle in quote' : 'Add bundle to quote +'}
        </button>
      </div>
    </div>
  )
}

// ── PDP Drawer ────────────────────────────────────────────────────────
function PDPDrawer({ state, dispatch }: { state: CatalogState; dispatch: React.Dispatch<Action> }) {
  const p = state.pdpId ? products.find(x => x.id === state.pdpId) : null
  const { addItem, updateItem, items } = useQuoteCart()
  const [colorIdx, setColorIdx] = useState(0)
  const [size, setSize] = useState<string | undefined>(undefined)
  const [qty, setQty] = useState(50)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!p) return
    setColorIdx(0)
    const mid = Math.floor((p.sizes?.length || 1) / 2)
    setSize(p.sizes?.[mid])
    setQty(Math.max(50, productMeta(p).moq))
    setSelectedImage(p.image)
  }, [p])

  // Escape closes the drawer (and any launch card riding on it, since
  // they unmount when pdpId clears).
  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_PDP' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p, dispatch])

  // Page behind the drawer shouldn't scroll while it's open.
  useBodyScrollLock(!!p)

  if (!p) return null
  const meta = productMeta(p)
  const inQuote = items.some(i => i.productId === p.id)
  const cat = KS_CATEGORIES.find(c => designCat(p) === c.id)
  const galleryImages = [p.image, ...(p.additionalImages ?? [])]
  const activeImage = selectedImage ?? p.image

  return (
    <>
      <div className={styles.overlay} onClick={() => dispatch({ type: 'CLOSE_PDP' })} />
      <aside className={`${styles.drawer} ${styles.drawerPdp}`}>
        <div className={styles.drawerHead}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 10.5, letterSpacing: 0.6, textTransform: 'uppercase', color: '#6b5f4c' }}>
            <span>Catalogue / {cat?.label}</span>
            <span style={{ color: '#1a1a1a' }}>· {p.id.toUpperCase()}</span>
          </div>
          <button className={styles.drawerClose} onClick={() => dispatch({ type: 'CLOSE_PDP' })}>×</button>
        </div>

        <div className={styles.pdpBody}>
          <div className={styles.pdpGallery}>
            <div className={styles.pdpMain}>
              <Image src={activeImage} alt={p.name} fill style={{ objectFit: 'contain', padding: 32 }} sizes="340px" />
            </div>
            <div className={styles.pdpThumbs}>
              {galleryImages.map((src) => {
                const isActive = src === activeImage
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    aria-label={`View image ${src.split('/').pop()}`}
                    className={`${styles.pdpThumb} ${isActive ? styles.pdpThumbActive : ''}`}
                    style={{ border: 0, padding: 0, cursor: 'pointer', background: 'transparent' }}
                  >
                    <Image src={src} alt={p.name} fill style={{ objectFit: 'contain', padding: 6 }} sizes="80px" />
                  </button>
                )
              })}
              {/* Fill remaining slots with placeholders so the strip keeps its 4-up layout */}
              {Array.from({ length: Math.max(0, 4 - galleryImages.length) }).map((_, i) => (
                <div key={`ph-${i}`} className={`${styles.pdpThumb} ${styles.pdpThumbPlaceholder}`} />
              ))}
            </div>
            <div style={{ padding: '4px 18px 18px', fontSize: 10, color: '#9a8e75', letterSpacing: 0.4 }}>
              {galleryImages.length > 1
                ? `${galleryImages.length} views · click to swap`
                : 'Branded mock-up on request'}
            </div>
          </div>

          <div className={styles.pdpContent}>
            <div>
              <div className={styles.pdpKicker}>
                {cat?.short} · {meta.compliance !== '—' ? meta.compliance : 'Branded merchandise'}
              </div>
              <h2 className={styles.pdpTitle}>{p.name}</h2>
              <div className={styles.pdpBlurb}>{p.description}</div>
            </div>

            <div className={styles.pdpSpecTable}>
              {[
                ['Material', p.materials.join(' · ')],
                ['Compliance', meta.compliance],
                ['MOQ', `${meta.moq} ${meta.unit}${meta.moq > 1 ? 's' : ''}`],
                ['Lead time', meta.lead],
                ['Branding', p.customisationMethods.join(' · ')],
              ].map(([k, v]) => (
                <div key={k} className={styles.pdpSpecRow}>
                  <div className={styles.pdpSpecK}>{k}</div>
                  <div className={styles.pdpSpecV}>{v}</div>
                </div>
              ))}
            </div>

            {p.availableColors.length > 0 && (
              <div>
                <div className={styles.pdpFieldLabel}>Colour · {p.availableColors[colorIdx]?.name}</div>
                <div className={styles.colorSwatches}>
                  {p.availableColors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      title={c.name}
                      className={`${styles.colorSwatch} ${i === colorIdx ? styles.colorSwatchActive : ''}`}
                      style={{ background: c.hex, borderColor: i === colorIdx ? '#1a1a1a' : '#ece1c8' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {p.sizes && p.sizes.length > 0 && (
              <div>
                <div className={styles.pdpFieldLabel}>Size</div>
                <div className={styles.sizeButtons}>
                  {p.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`${styles.sizeButton} ${s === size ? styles.sizeButtonActive : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.pdpAddRow}>
              <div className={styles.pdpStepper}>
                <button onClick={() => setQty(Math.max(meta.moq, qty - 10))}>−</button>
                <input
                  type="number"
                  value={qty}
                  // Allow free typing (including transient empty/low values)…
                  onChange={(e) => setQty(parseInt(e.target.value) || 0)}
                  // …but clamp to MOQ once the field loses focus.
                  onBlur={() => setQty(q => Math.max(meta.moq, q))}
                />
                <button onClick={() => setQty(qty + 10)}>+</button>
              </div>
              <div className={styles.pdpMeta}>
                {meta.unit}s · MOQ {meta.moq}
              </div>
              <button
                className={`${styles.pdpAddBtn} ${inQuote ? styles.pdpAddBtnInQuote : ''}`}
                onClick={() => {
                  // Final guard: a line can never enter the quote below MOQ,
                  // even if the user submits mid-edit before blur fires.
                  const finalQty = Math.max(meta.moq, qty)
                  const line = {
                    productId: p.id,
                    productName: p.name,
                    quantity: finalQty,
                    size,
                    color: p.availableColors[colorIdx]?.name,
                  }
                  if (inQuote) updateItem(p.id, line)
                  else addItem(line)
                  dispatch({ type: 'CLOSE_PDP' })
                  // Site-wide QuotePill pulses to signal the new item;
                  // user can click the pill to review the cart.
                }}
              >
                {inQuote ? '✓ Update in quote' : 'Add to quote'}
                <span style={{ opacity: 0.7 }}>·</span>
                {qty} {meta.unit}{qty > 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Stormline RAIN SHELL launch card — only for the Long Hooded
          Raincoat. A SIBLING of the main drawer so its lower z-index
          (60 vs the drawer's 61) actually puts it behind the drawer
          in the global stacking order. 280ms after the main drawer
          settles, this card slides LEFT from behind the drawer's left
          edge and parks side-by-side at right: 800px on wide viewports.
          On viewports < 1280px there's no room for side-by-side, so it
          falls back to a slide-up-from-bottom over the drawer body. */}
      <RainShellHero active={p.slug === 'long-hooded-raincoat'} />

      {/* Stormline SAFETY SHOE launch card — same drawer behaviour as
          RainShellHero, only for the Low-Cut Safety Shoe (ppe-005).
          Different visual language (cool grey + steel blue + autoplay
          video hero) per the dedicated handoff. */}
      <SafetyShoeHero active={p.slug === 'safety-shoes-low-cut'} />
    </>
  )
}

// ── Page ─────────────────────────────────────────────────────────────
export default function CatalogPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#6b5f4c' }}>Loading catalog…</div>}>
      <CatalogContent />
    </Suspense>
  )
}
