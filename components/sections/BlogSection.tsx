import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import BlogCard from '@/components/ui/BlogCard'
import { blogPosts } from '@/lib/data/blog'

export default function BlogSection() {
  const featured = blogPosts.slice(0, 3)

  return (
    <section className="section-pad bg-white">
      <div className="container-pad">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="Latest Updates"
            title="Immigration News & Guides"
            highlight="News & Guides"
            subtitle="Stay ahead with the latest visa policy updates, immigration tips, and country guides."
            align="left"
          />
          <Link href="/blog" className="flex-shrink-0 flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-gold-600 transition-colors">
            All Articles <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {['All', 'Canada Immigration', 'Germany Visa', 'IELTS Coaching', 'Study Abroad'].map((cat) => (
            <Link
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat.toLowerCase())}`}
              className="badge bg-gray-100 text-gray-600 hover:bg-navy-700 hover:text-white transition-colors px-4 py-2 text-xs font-semibold rounded-full cursor-pointer"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
