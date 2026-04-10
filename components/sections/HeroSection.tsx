'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'

const benefits = [
  '18+ Years Trusted Experience',
  '10,000+ Visas Approved',
  'Free Eligibility Assessment',
]

const quickServices = [
  { label: 'Migrate', icon: '✈️', href: '/destinations/canada' },
  { label: 'Work', icon: '💼', href: '/services/work-visa' },
  { label: 'Study', icon: '🎓', href: '/services/student-visa' },
  { label: 'Visit', icon: '🗺️', href: '/contact' },
  { label: 'Coaching', icon: '📚', href: '/coaching/ielts' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 min-h-[90vh] flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-600/30 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-pad py-20 md:py-28 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20 mb-7"
            >
              <span className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
                ))}
              </span>
              <span className="text-white/80">Rated 4.9/5 by 10,000+ clients</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{ opacity: 1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6"
            >
              Your Global Career &{' '}
              <span className="text-gold-400 relative">
                Immigration
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M1 9C50 4 100 2 150 5C200 8 250 6 299 3" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Partner
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              style={{ opacity: 1 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Expert visa assistance, overseas job placement, study abroad guidance, and language
              coaching — all under one roof. Trusted by 10,000+ clients across India.
            </motion.p>

            {/* Benefits */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              style={{ opacity: 1 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle size={15} className="text-gold-400 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{ opacity: 1 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white font-bold text-base rounded-xl shadow-cta hover:shadow-xl transition-all duration-200 active:scale-95"
                onClick={() => trackEvent('cta_click', { cta: 'free_eligibility_hero' })}
              >
                Free Eligibility Check
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-xl border-2 border-white/30 backdrop-blur-sm transition-all duration-200 active:scale-95"
                onClick={() => trackEvent('cta_click', { cta: 'book_consultation_hero' })}
              >
                Book Free Consultation
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44 }}
              style={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['RK', 'PS', 'AM', 'VR', 'SN'].map((initials) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full border-2 border-navy-800 bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center text-white text-[10px] font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Join 10,000+ happy clients</div>
                <div className="text-white/50 text-xs">who successfully moved abroad</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Service cards + Quick actions */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{ opacity: 1 }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-5 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-md"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <Image
                src="/hero-journey.svg"
                alt="Animated global immigration journey — flight paths connecting India to Canada, UK, Germany, Australia and UAE"
                width={920}
                height={560}
                className="h-auto w-full rounded-2xl"
                priority
                unoptimized
              />
            </motion.div>

            {/* Quick Service Grid */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-6 text-center">What are you looking for?</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {quickServices.map((svc) => (
                  <Link
                    key={svc.label}
                    href={svc.href}
                    className="group flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-200 text-center"
                  >
                    <span className="text-3xl">{svc.icon}</span>
                    <span className="text-white/80 text-xs font-semibold group-hover:text-white">{svc.label}</span>
                  </Link>
                ))}
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '10K+', label: 'Visas Approved', color: 'bg-gold-500/20 border-gold-500/40' },
                  { value: '45+', label: 'Countries', color: 'bg-blue-400/20 border-blue-400/40' },
                  { value: '18+', label: 'Years Expert', color: 'bg-green-400/20 border-green-400/40' },
                  { value: '92%', label: 'Success Rate', color: 'bg-purple-400/20 border-purple-400/40' },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.color} rounded-xl border p-3 text-center`}>
                    <div className="text-white font-black text-xl">{stat.value}</div>
                    <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 800 0 600 20C400 40 200 10 0 30L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
