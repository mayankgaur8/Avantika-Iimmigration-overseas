/**
 * Site-wide SEO defaults.
 * Individual pages should override title/description but inherit the rest.
 */

import { SITE } from './contact'
import type { BlogPost } from '@/lib/data/blog'

export const DEFAULT_SEO = {
  siteName:    SITE.name,
  siteUrl:     SITE.url,
  locale:      'en_IN',
  twitterHandle: '@avantika_imm',
  defaultOgImage: `${SITE.url}/images/og-default.jpg`,
  defaultKeywords: [
    'immigration consultants India',
    'overseas jobs',
    'study abroad',
    'work visa',
    'PR visa',
    'Canada immigration',
    'Australia visa',
    'Germany work permit',
    'IELTS coaching',
    'visa consultants Aligarh',
  ],
}

/** Build a canonical URL for a given path */
export function canonical(path: string): string {
  return `${SITE.url}${path}`
}

/** Build per-page metadata helpers */
export function pageMetadata(opts: {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}) {
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: canonical(opts.path),
    },
    openGraph: {
      title:       opts.title,
      description: opts.description,
      url:         canonical(opts.path),
      siteName:    DEFAULT_SEO.siteName,
      locale:      DEFAULT_SEO.locale,
      type:        'website' as const,
      images: [
        {
          url:    opts.ogImage ?? DEFAULT_SEO.defaultOgImage,
          width:  1200,
          height: 630,
          alt:    opts.title,
        },
      ],
    },
    twitter: {
      card:        'summary_large_image' as const,
      title:       opts.title,
      description: opts.description,
      images:      [opts.ogImage ?? DEFAULT_SEO.defaultOgImage],
      creator:     DEFAULT_SEO.twitterHandle,
    },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

/**
 * JSON-LD helpers
 */

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
  provider?: string
  areaServed?: string
}) {
  return {
    '@context':    'https://schema.org',
    '@type':       'Service',
    name:          opts.name,
    description:   opts.description,
    url:           opts.url,
    provider: {
      '@type': 'Organization',
      name:    opts.provider ?? SITE.name,
      url:     SITE.url,
    },
    areaServed:    opts.areaServed ?? 'India',
    serviceType:   'Immigration Consulting',
  }
}

export function articleSchema(opts: {
  title:      string
  description: string
  url:        string
  datePublished: string
  dateModified?: string
  image?:     string
  authorName?: string
}) {
  return {
    '@context':     'https://schema.org',
    '@type':        'Article',
    headline:       opts.title,
    description:    opts.description,
    url:            opts.url,
    image:          opts.image ?? DEFAULT_SEO.defaultOgImage,
    datePublished:  opts.datePublished,
    dateModified:   opts.dateModified ?? opts.datePublished,
    author: {
      '@type': 'Organization',
      name:    opts.authorName ?? SITE.name,
      url:     SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.url,
      logo: {
        '@type': 'ImageObject',
        url:     `${SITE.url}/images/logo.png`,
      },
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       SITE.name,
    url:        SITE.url,
    description: SITE.tagline,
    potentialAction: {
      '@type':  'SearchAction',
      target: {
        '@type':      'EntryPoint',
        urlTemplate:  `${SITE.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleMetadata(post: BlogPost) {
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
  })
}
