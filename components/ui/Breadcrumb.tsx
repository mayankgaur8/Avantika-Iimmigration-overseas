import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  dark?: boolean
}

export default function Breadcrumb({ items, dark = false }: BreadcrumbProps) {
  const textClass = dark ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-navy-700'
  const activeClass = dark ? 'text-gold-300 font-medium' : 'text-navy-700 font-medium'
  const dividerClass = dark ? 'text-white/30' : 'text-gray-300'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avantika-immigration.com' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href && { item: `https://avantika-immigration.com${item.href}` }),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          <li>
            <Link href="/" className={`flex items-center gap-1 transition-colors ${textClass}`}>
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight size={14} className={dividerClass} />
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className={`transition-colors ${textClass}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={activeClass}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
