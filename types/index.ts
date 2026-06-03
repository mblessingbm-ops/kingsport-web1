export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  description: string
  specs: ProductSpec[]
  materials: string[]
  availableColors: ColorOption[]
  sizes?: string[]
  image: string
  /** Optional gallery of additional product photos shown alongside the
      main `image` on the PDP page. */
  additionalImages?: string[]
  relatedIds: string[]
  featured?: boolean
  tags: string[]
  moq: number
  leadTime: string
  customisationMethods: string[]
  /** Optional fabric / materials breakdown rendered as a swatch section
      on the PDP. Products without `fabrics` simply skip the section. */
  fabrics?: Fabric[]
}

export interface CareInstruction {
  /** Short imperative phrase, e.g. 'Machine wash 40°C', 'Do not tumble dry'. */
  label: string
}

export interface Fabric {
  name: string          // e.g. '65/35 Poly-Cotton Drill'
  weight: string        // e.g. '300g/m²' — use '—' when N/A
  composition: string   // e.g. '65% Polyester, 35% Cotton'
  weave: string         // e.g. 'Plain Weave', 'Pique Knit', 'Ripstop' — 'N/A' for non-textile
  finish: string        // e.g. 'Pre-shrunk', 'Water-resistant', 'Brushed'
  care: CareInstruction[]
  /** One-sentence positioning — 'Heavy industrial environments…'. */
  suitedFor: string
  /** Path under /public, e.g. '/images/swatches/heavy-duty-conti-suit.jpg'. */
  swatchImage: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface ColorOption {
  name: string
  hex: string
}

export type ProductCategory =
  | 'ppe-safety'
  | 'corporate-wear'
  | 'promotional'
  | 'event-branding'
  | 'sports-wear'
  | 'school-wear'

export interface CategoryMeta {
  id: ProductCategory
  label: string
  description: string
  icon: string
  count?: number
}

export interface QuoteItem {
  productId: string
  productName: string
  quantity: number
  color?: string
  size?: string
  notes?: string
}

export interface QuoteRequest {
  companyName: string
  contactName: string
  email: string
  phone: string
  items: QuoteItem[]
  deliveryDate?: string
  additionalNotes?: string
}

export interface JournalPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage: string
  embeddedProductIds: string[]
}
