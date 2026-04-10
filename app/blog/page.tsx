import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import CTASection from '@/components/sections/CTASection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import NewsletterSignup from '@/components/forms/NewsletterSignup'
import { blogPosts, blogTopicClusters } from '@/lib/data/blog'
import { breadcrumbSchema, pageMetadata } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Immigration Blog | Visa News and Country Guides',
  description:
    'Stay updated with immigration news, policy changes, country guides, IELTS strategy, and overseas career advice.',
  path: '/blog',
})

const categories = ['All', 'Canada Immigration', 'Germany Visa', 'IELTS Coaching', 'Study Abroad']

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Blog', url: 'https://avantika-immigration.com/blog' },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Blog' }]} dark />
          <div className="max-w-2xl mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Immigration News & <span className="text-gold-400">Expert Guides</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Stay ahead with the latest visa updates, immigration policy changes, country guides, and
              expert advice from our certified consultants.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-pad py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-500"
              />
            </div>
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                    cat === 'All'
                      ? 'bg-navy-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-navy-50 hover:text-navy-700'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="mb-10">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Featured Article</span>
          </div>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid lg:grid-cols-2 gap-8 card overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 badge bg-gold-500 text-white">{featured.category}</span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="text-xs text-gray-400 mb-3">{featured.date} · {featured.readTime}</div>
                <h2 className="text-2xl font-black text-navy-800 leading-tight mb-4 group-hover:text-navy-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="badge bg-navy-50 text-navy-600 text-xs">{tag}</span>
                  ))}
                </div>
                <div className="mt-5 text-navy-700 font-semibold group-hover:text-gold-600 transition-colors text-sm">
                  Read Full Article →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts */}
      <section className="pb-24 bg-white">
        <div className="container-pad">
          <div className="mb-10 grid gap-5 lg:grid-cols-4">
            {blogTopicClusters.map((cluster) => (
              <Link
                key={cluster.slug}
                href={cluster.href}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-colors hover:border-navy-200 hover:bg-navy-50"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-600">Topic Cluster</p>
                <h2 className="mt-2 text-lg font-bold text-navy-800">{cluster.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{cluster.description}</p>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-navy-800">Latest Articles</h2>
            <span className="text-sm text-gray-400">{rest.length} articles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* Load more */}
          <div className="mt-12 text-center">
            <button className="btn-outline px-10 py-3">Load More Articles</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-navy-50">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl font-black text-navy-800 mb-3">Never Miss an Immigration Update</h2>
            <p className="text-gray-500 mb-6">
              Get the latest Express Entry draws, visa policy changes, and expert tips delivered to your inbox every week.
            </p>
            <NewsletterSignup source="blog_newsletter" className="max-w-md mx-auto" />
            <p className="text-xs text-gray-400 mt-3">Join 15,000+ subscribers. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <CTASection title="Questions About Your Immigration Options?" subtitle="Our experts are ready to provide personalised advice based on your profile." />
    </>
  )
}
