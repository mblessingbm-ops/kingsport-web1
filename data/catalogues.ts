export interface ImportedCatalogue {
  id: string
  title: string
  supplier: string
  description: string
  url: string
  pages: number
  tags: string[]
  year: string
  coverImage: string // local path — placeholder until real cover screenshots are added
  hasCover?: boolean // true once a real cover JPG exists in public/images/catalogues/
  featured?: boolean
}

export const importedCatalogues: ImportedCatalogue[] = [
  {
    id: 'amrod-apparel-2026',
    title: 'New Apparel Styles 2026',
    supplier: 'Amrod',
    description:
      'Featuring 48 new styles and 14 new colours for men, ladies and kids — the latest introductions to a comprehensive collection of apparel, headwear and workwear.',
    url: 'https://catalogues.promoafrica.com/view/321394298/',
    pages: 87,
    tags: ['Apparel', 'Headwear', 'Workwear', 'New Arrivals'],
    year: '2026',
    coverImage: '/images/catalogues/amrod-apparel-2026.jpg',
    hasCover: true,
    featured: true,
  },
  {
    id: 'corporate-promo-apparel-2026',
    title: 'Corporate & Promotional Apparel and Headwear 2026–2027',
    supplier: 'Amrod',
    description:
      'A comprehensive range of corporate and promotional apparel and headwear for the 2026–2027 season — ideal for branded uniforms, staff gifting, and promotional campaigns.',
    url: 'https://viewer.zoomcatalog.com/corporate-and-promotional-apparel-and-headwear-2026-2027',
    pages: 0, // page count not available — card hides the pages display when 0
    tags: ['Corporate', 'Promotional', 'Apparel', 'Headwear'],
    year: '2026',
    coverImage: '/images/catalogues/corporate-promo-apparel-2026.jpg',
    featured: false,
  },
  {
    id: 'altitude-workwear-2026',
    title: 'Altitude Workwear 2026–2027',
    supplier: 'Altitude',
    description:
      'Designed for Agriculture, Mining, Construction and Manufacturing — Altitude Workwear focuses on safety, durability and reliability across a full range of industrial workwear.',
    url: 'https://catalogues.promoafrica.com/view/909574033/',
    pages: 0,
    tags: ['Workwear', 'PPE', 'Safety', 'Industrial'],
    year: '2026',
    coverImage: '/images/catalogues/altitude-workwear-2026.jpg',
    hasCover: true,
    featured: false,
  },
]
