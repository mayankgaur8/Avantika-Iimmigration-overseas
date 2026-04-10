import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data/blog'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avantika-immigration.com'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: ChangeFreq
  priority?: number
}

function url(path: string): string {
  return `${BASE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const corePages: SitemapEntry[] = [
    { url: url('/'),             lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: url('/about'),        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/contact'),      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/eligibility'),  lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: url('/faq'),          lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: url('/blog'),         lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: url('/jobs'),         lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
  ]

  const destinationPagesBase = [
    { url: url('/destinations/canada'),    changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/destinations/germany'),   changeFrequency: 'monthly', priority: 0.9 },
  ] satisfies SitemapEntry[]
  const destinationPages: SitemapEntry[] = destinationPagesBase.map((e) => ({ ...e, lastModified: now }))

  const servicePagesBase = [
    { url: url('/services/work-visa'),     changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/services/student-visa'),  changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/eligibility'),            changeFrequency: 'weekly', priority: 0.95 },
  ] satisfies SitemapEntry[]
  const servicePages: SitemapEntry[] = servicePagesBase.map((e) => ({ ...e, lastModified: now }))

  const coachingPagesBase = [
    { url: url('/coaching/ielts'),  changeFrequency: 'monthly', priority: 0.9 },
  ] satisfies SitemapEntry[]
  const coachingPages: SitemapEntry[] = coachingPagesBase.map((e) => ({ ...e, lastModified: now }))

  const articlePages: SitemapEntry[] = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [
    ...corePages,
    ...destinationPages,
    ...servicePages,
    ...coachingPages,
    ...articlePages,
  ]
}
