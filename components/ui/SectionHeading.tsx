'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  label?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  dark?: boolean
  className?: string
}

export default function SectionHeading({
  label,
  title,
  highlight,
  subtitle,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align]

  const renderTitle = () => {
    if (!highlight) return title
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-gold-500">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('flex flex-col', alignClass, className)}
    >
      {label && (
        <span className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-0.5 bg-gold-500 inline-block" />
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">{label}</span>
          <span className="w-6 h-0.5 bg-gold-500 inline-block" />
        </span>
      )}
      <h2 className={cn('text-3xl md:text-4xl font-black leading-tight', dark ? 'text-white' : 'text-navy-800')}>
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-base md:text-lg leading-relaxed max-w-2xl', dark ? 'text-navy-200' : 'text-gray-500', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
