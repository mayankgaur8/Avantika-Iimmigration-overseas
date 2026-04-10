'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  slug: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
  index?: number
  compact?: boolean
}

export default function BlogCard({ post, index = 0, compact = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block card overflow-hidden hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className={`relative overflow-hidden ${compact ? 'h-36' : 'h-48'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute top-3 left-3 badge bg-gold-500 text-white text-[11px]">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          </div>

          <h3 className={`font-bold text-navy-800 group-hover:text-navy-600 transition-colors leading-snug mb-3 ${compact ? 'text-sm line-clamp-2' : 'text-base'}`}>
            {post.title}
          </h3>

          {!compact && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge bg-navy-50 text-navy-600 text-[10px] flex items-center gap-1">
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
            <span className="text-xs font-semibold text-navy-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
