import type { JournalPost } from '@/types'

export const journalPosts: JournalPost[] = [
  {
    id: 'j-001',
    slug: 'building-a-complete-ppe-kit',
    title: 'Building a Complete PPE Kit for a Construction Site',
    excerpt:
      'A site safety officer needs more than a hard hat. Here is how to spec a full PPE complement for a Zimbabwean construction workforce.',
    category: 'PPE & Safety',
    date: '2024-09-12',
    readTime: '4 min read',
    coverImage: '/images/journal/ppe-kit-guide.jpg',
    imageReady: true,
    embeddedProductIds: ['ppe-001', 'ppe-004', 'ppe-006', 'ppe-007'],
  },
  {
    id: 'j-002',
    slug: 'corporate-uniform-brief-guide',
    title: 'How to Brief a Uniform Order: What Your Supplier Needs to Know',
    excerpt:
      'Vague briefs produce vague results. A practical checklist for procurement officers placing a corporate uniform order for the first time.',
    category: 'Corporate Wear',
    date: '2024-10-03',
    readTime: '5 min read',
    coverImage: '/images/journal/uniform-brief-guide.jpg',
    embeddedProductIds: ['corp-001', 'corp-002', 'corp-004'],
  },
  {
    id: 'j-003',
    slug: 'event-branding-checklist',
    title: 'The Event Branding Checklist: What to Order and When',
    excerpt:
      'Flags arrive late. Banners have the wrong dimensions. Avoid the common mistakes with this pre-event order timeline.',
    category: 'Event Branding',
    date: '2024-11-18',
    readTime: '3 min read',
    coverImage: '/images/journal/event-checklist.jpg',
    imageReady: true,
    embeddedProductIds: ['event-001', 'event-002', 'event-005'],
  },
]

export const getJournalPostBySlug = (slug: string) =>
  journalPosts.find(p => p.slug === slug)
