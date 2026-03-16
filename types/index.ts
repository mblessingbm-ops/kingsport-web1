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
  relatedIds: string[]
  featured?: boolean
  tags: string[]
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
