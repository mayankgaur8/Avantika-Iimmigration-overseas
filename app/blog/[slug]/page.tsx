import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import CTASection from '@/components/sections/CTASection'
import JsonLd from '@/components/seo/JsonLd'
import NewsletterSignup from '@/components/forms/NewsletterSignup'
import { articleMetadata, articleSchema, breadcrumbSchema } from '@/lib/config/seo'
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/data/blog'

interface BlogArticlePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: false },
    }
  }

  return articleMetadata(post)
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.cluster)

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          url: `https://avantika-immigration.com/blog/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: post.image,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Blog', url: 'https://avantika-immigration.com/blog' },
          { name: post.title, url: `https://avantika-immigration.com/blog/${post.slug}` },
        ])}
      />

      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} dark />
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex rounded-full bg-gold-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
              {post.category}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.cluster.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-pad grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="max-w-3xl">
            <p className="text-lg leading-relaxed text-gray-700">{post.intro}</p>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-black text-navy-800">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-navy-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-navy-500">Next steps</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {post.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-600">Stay updated</p>
              <h2 className="mt-2 text-2xl font-black text-navy-800">Get immigration updates by email</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Weekly updates, draw trends, visa changes, and practical guides for serious applicants.
              </p>
              <div className="mt-5">
                <NewsletterSignup source={`blog_article_${post.slug}`} compact />
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-navy-800">Related articles</h2>
                <div className="mt-4 space-y-4">
                  {relatedPosts.map((relatedPost, index) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} compact index={index} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTASection
        title="Need help applying this advice to your profile?"
        subtitle="A consultant can turn the article into an actual action plan based on your target country, timeline, and documents."
      />
    </>
  )
}
