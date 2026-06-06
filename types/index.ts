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
  /** Set to `true` once a real photograph has been added at the
      `coverImage` path. Posts where this is false (or absent) render
      the dark gradient placeholder instead of the broken image. */
  imageReady?: boolean
  embeddedProductIds: string[]
}
