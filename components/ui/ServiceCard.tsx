'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Service } from '@/lib/data/services'

interface ServiceCardProps {
  service: Service
  index?: number
  featured?: boolean
}

export default function ServiceCard({ service, index = 0, featured = false }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={service.href}
        className={cn(
          'group flex flex-col h-full rounded-2xl border-2 border-transparent p-6 transition-all duration-300',
          'hover:border-navy-200 hover:shadow-card-hover',
          featured ? 'bg-gradient-brand text-white' : 'bg-white shadow-card'
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform group-hover:scale-110',
          featured ? 'bg-white/20' : service.bgColor
        )}>
          {service.icon}
        </div>

        {/* Content */}
        <h3 className={cn('text-xl font-bold mb-2', featured ? 'text-white' : 'text-navy-800')}>
          {service.title}
        </h3>
        <p className={cn('text-sm leading-relaxed mb-4 flex-1', featured ? 'text-white/80' : 'text-gray-500')}>
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-1.5 mb-5">
          {service.features.map((f) => (
            <li key={f} className={cn('flex items-center gap-2 text-sm', featured ? 'text-white/90' : 'text-gray-600')}>
              <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', featured ? 'bg-gold-400' : 'bg-gold-500')} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={cn(
          'flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all',
          featured ? 'text-gold-300' : 'text-navy-700'
        )}>
          Explore Services
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}
