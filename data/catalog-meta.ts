import { products } from '@/data/products'
import type { Product, ProductCategory } from '@/types'

export type KsCategoryId = 'all' | 'ppe' | 'corporate' | 'promo' | 'event' | 'sports' | 'school'

export const KS_CATEGORIES: { id: Exclude<KsCategoryId, 'all'>; label: string; short: string; live: ProductCategory }[] = [
  { id: 'ppe',       label: 'Personal Protective Equipment', short: 'PPE',       live: 'ppe-safety' },
  { id: 'corporate', label: 'Corporate & Promotional Wear',  short: 'Corp & Promo', live: 'corporate-wear' },
  { id: 'promo',     label: 'Promotional Gifts',             short: 'Gifts',     live: 'promotional' },
  { id: 'event',     label: 'Event Branding',                short: 'Event',     live: 'event-branding' },
  { id: 'sports',    label: 'Sports Wear',                   short: 'Sports',    live: 'sports-wear' },
  { id: 'school',    label: 'School Wear',                   short: 'School',    live: 'school-wear' },
]

export type IndustryId = 'construction' | 'banking' | 'government' | 'retail' | 'education' | 'ngo'

export const KS_INDUSTRIES: { id: IndustryId; label: string; short: string }[] = [
  { id: 'construction', label: 'Construction & Engineering', short: 'Construction' },
  { id: 'banking',      label: 'Banking & Finance',          short: 'Banking' },
  { id: 'government',   label: 'Government & Public Sector', short: 'Government' },
  { id: 'retail',       label: 'Retail & FMCG',              short: 'Retail' },
  { id: 'education',    label: 'Education & Schools',        short: 'Education' },
  { id: 'ngo',          label: 'NGOs & Aid',                 short: 'NGO' },
]

const liveToDesignCat: Record<ProductCategory, Exclude<KsCategoryId, 'all'>> = {
  'ppe-safety':    'ppe',
  'corporate-wear':'corporate',
  'promotional':   'promo',
  'event-branding':'event',
  'sports-wear':   'sports',
  'school-wear':   'school',
}

export function designCat(p: Product): Exclude<KsCategoryId, 'all'> {
  return liveToDesignCat[p.category]
}

// Default industry mapping per category, used when product doesn't have explicit industries.
const categoryIndustries: Record<Exclude<KsCategoryId, 'all'>, IndustryId[]> = {
  ppe:       ['construction', 'government', 'ngo'],
  corporate: ['banking', 'government', 'retail'],
  promo:     ['retail', 'ngo', 'education', 'banking'],
  event:     ['retail', 'ngo', 'banking'],
  sports:    ['education'],
  school:    ['education'],
}

export function productIndustries(p: Product): IndustryId[] {
  return categoryIndustries[designCat(p)] || []
}

// Derived design fields not in the existing product data.
export interface ProductMeta {
  moq: number
  unit: string
  compliance: string
  lead: string
}

export function productMeta(p: Product): ProductMeta {
  const cat = designCat(p)
  if (cat === 'ppe') {
    if (p.id === 'ppe-001') return { moq: 25, unit: 'set',  compliance: 'EN ISO 13688',    lead: '7–10 days' }
    if (p.id === 'ppe-002') return { moq: 25, unit: 'set',  compliance: 'EN ISO 13688',    lead: '7–10 days' }
    if (/boot|footwear|shoe/i.test(p.name)) return { moq: 12, unit: 'pair', compliance: 'EN ISO 20345 S5',    lead: '5–7 days' }
    if (/vest|hi.?vis|reflective/i.test(p.name)) return { moq: 50, unit: 'unit', compliance: 'EN ISO 20471 Class 2', lead: '3–5 days' }
    if (/helmet|hard hat/i.test(p.name)) return { moq: 24, unit: 'unit', compliance: 'EN 397', lead: '5–7 days' }
    if (/glove/i.test(p.name)) return { moq: 100, unit: 'pair', compliance: 'EN 388', lead: '3–5 days' }
    if (/goggle|eyewear|glasses|safety eye/i.test(p.name)) return { moq: 50, unit: 'unit', compliance: 'EN 166', lead: '5–7 days' }
    return { moq: 25, unit: 'unit', compliance: 'EN ISO certified', lead: '7–10 days' }
  }
  if (cat === 'corporate') {
    if (/blazer|coat|jacket/i.test(p.name)) return { moq: 12, unit: 'unit', compliance: '—', lead: '14–21 days' }
    if (/dustcoat|overall|apron/i.test(p.name)) return { moq: 25, unit: 'unit', compliance: '—', lead: '7–10 days' }
    return { moq: 20, unit: 'unit', compliance: '—', lead: '10–14 days' }
  }
  if (cat === 'promo')  return { moq: 50, unit: 'unit', compliance: '—', lead: '7–10 days' }
  if (cat === 'event') {
    if (/gazebo/i.test(p.name)) return { moq: 1, unit: 'unit', compliance: '—', lead: '14–21 days' }
    if (/banner|flag/i.test(p.name)) return { moq: 1, unit: 'unit', compliance: '—', lead: '3–5 days' }
    return { moq: 1, unit: 'unit', compliance: '—', lead: '5–7 days' }
  }
  if (cat === 'sports') return { moq: 20, unit: 'unit', compliance: '—', lead: '14–21 days' }
  if (cat === 'school') {
    if (/backpack|bag/i.test(p.name)) return { moq: 25, unit: 'unit', compliance: '—', lead: '10–14 days' }
    return { moq: 30, unit: 'unit', compliance: '—', lead: '14–21 days' }
  }
  return { moq: 25, unit: 'unit', compliance: '—', lead: '7–14 days' }
}

// Build category counts from live products.
export function categoryCount(catId: Exclude<KsCategoryId, 'all'>): number {
  return products.filter(p => designCat(p) === catId).length
}

// ── Bundles ──────────────────────────────────────────────────────────
export interface Bundle {
  id: string
  title: string
  role: string
  productIds: string[]
  tone: 'safety' | 'default'
  industries: IndustryId[]
}

export const KS_BUNDLES: Bundle[] = [
  {
    id: 'site-worker',
    title: 'Site Worker Starter',
    role: 'Per site worker',
    productIds: ['ppe-001', 'ppe-005', 'ppe-004', 'ppe-003'],
    tone: 'safety',
    industries: ['construction'],
  },
  {
    id: 'supervisor',
    title: 'Supervisor Kit',
    role: 'Per supervisor',
    productIds: ['ppe-001', 'ppe-005', 'ppe-004', 'ppe-003', 'ppe-007', 'ppe-006'],
    tone: 'safety',
    industries: ['construction', 'government'],
  },
  {
    id: 'visitor',
    title: 'Visitor / Contractor',
    role: 'Per visitor',
    productIds: ['ppe-004', 'ppe-003', 'ppe-007'],
    tone: 'safety',
    industries: ['construction', 'government', 'ngo'],
  },
  {
    id: 'corporate',
    title: 'Corporate Front-Office',
    role: 'Per office staff',
    productIds: ['corp-001', 'corp-002', 'corp-003'],
    tone: 'default',
    industries: ['banking', 'government'],
  },
  {
    id: 'event-day',
    title: 'Event Day Kit',
    role: 'Per activation',
    productIds: ['event-001', 'event-002', 'event-003', 'promo-001'],
    tone: 'default',
    industries: ['retail', 'banking', 'ngo'],
  },
  {
    id: 'school-uni',
    title: 'School Uniform Pack',
    role: 'Per learner',
    productIds: ['school-001', 'school-002', 'school-003', 'sport-001'],
    tone: 'default',
    industries: ['education'],
  },
]
