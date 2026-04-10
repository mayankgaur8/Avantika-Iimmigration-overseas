'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
  icon: string
}

const stats: Stat[] = [
  { value: 18, suffix: '+', label: 'Years of Experience', description: 'Trusted since 2006', icon: '🏆' },
  { value: 10000, suffix: '+', label: 'Successful Cases', description: 'Visas approved globally', icon: '✅' },
  { value: 45, suffix: '+', label: 'Countries Served', description: 'Global destinations', icon: '🌍' },
  { value: 200, suffix: '+', label: 'Expert Consultants', description: 'Certified professionals', icon: '👨‍💼' },
]

export default function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="text-center"
        >
          <div className="text-3xl mb-3">{stat.icon}</div>
          <div className="text-4xl md:text-5xl font-black text-white mb-1">
            {inView && (
              <CountUp end={stat.value} duration={2.5} separator="," />
            )}
            <span>{stat.suffix}</span>
          </div>
          <div className="text-gold-300 font-semibold text-sm mb-1">{stat.label}</div>
          <div className="text-navy-300 text-xs">{stat.description}</div>
        </motion.div>
      ))}
    </div>
  )
}
