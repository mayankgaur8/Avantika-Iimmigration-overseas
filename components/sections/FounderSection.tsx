'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  ShieldCheck,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  MessageCircle,
} from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'

const highlights = [
  {
    title: '16+ Years Industry Experience',
    description: 'Hands-on software engineering and enterprise architecture background.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Real Job Market Insights',
    description: 'Practical guidance aligned with current employer expectations globally.',
    Icon: TrendingUp,
  },
  {
    title: 'End-to-End Guidance',
    description: 'Support from profile strategy to applications and career transitions.',
    Icon: Route,
  },
  {
    title: 'No False Promises',
    description: 'Honest assessment focused on fit, effort, and realistic outcomes.',
    Icon: ShieldCheck,
  },
  {
    title: 'Personalised Strategy',
    description: 'Every roadmap is tailored to your profile, budget, and direction.',
    Icon: Target,
  },
  {
    title: 'Tech + Career Expertise',
    description: 'Deep Java, cloud, and system design knowledge applied to career planning.',
    Icon: Sparkles,
  },
]

interface FounderSectionProps {
  compact?: boolean
}

export default function FounderSection({ compact = false }: FounderSectionProps) {
  const visibleHighlights = compact ? highlights.slice(0, 3) : highlights

  return (
    <section className={`${compact ? 'py-16' : 'section-pad'} bg-gradient-to-b from-white to-navy-50`}>
      <div className="container-pad">
        <div className={`grid items-center gap-10 ${compact ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-2'}`}>

          {/* ── Photo column ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold-400/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-3 shadow-card">
              {/* Shimmer sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] bg-navy-100">
                <Image
                  src="/founder-mayank.jpg"
                  alt="Mayank Gaur — Founder, Avantika Immigration & Overseas"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Floating "talk directly" badge */}
            {!compact && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-navy-800 rounded-2xl px-4 py-3 shadow-lg border border-navy-600 flex items-center gap-2 max-w-[200px]"
              >
                <MessageCircle size={16} className="text-gold-400 flex-shrink-0" />
                <span className="text-white text-xs font-semibold leading-snug">
                  You talk directly with the founder
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* ── Content column ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {/* Label */}
            <span className="inline-flex items-center gap-2">
              <span className="h-0.5 w-8 bg-gold-500" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">
                {compact ? 'Founder Perspective' : 'Meet the Founder'}
              </span>
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight text-navy-800 md:text-4xl">
              {compact
                ? 'Helping You Build a Global Career with Real-World Expertise'
                : 'Practical Guidance for Overseas Dreams, Backed by Real Industry Experience'}
            </h2>

            {/* Founder identity card */}
            <div className="mt-5 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-navy-800">Mayank Gaur</h3>
              <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-600">
                Founder · Career Mobility Consultant
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                {compact
                  ? 'With 16+ years of real IT experience across Java, Spring Boot, cloud platforms, and enterprise delivery, Mayank combines technical depth and career strategy to guide candidates toward practical, high-fit global pathways for jobs, study, and PR.'
                  : 'After 16+ years as a senior developer and architect — delivering enterprise systems, working across AWS and Azure, and leading complex software solutions — Mayank built a rare combination of skills: deep technical credibility and a first-hand understanding of how global careers are actually built. He launched Avantika Immigration & Overseas to close the gap between what immigration agencies typically offer and what people actually need: honest, experienced, end-to-end guidance.'}
              </p>
            </div>

            {/* Signature quote */}
            <p className="mt-5 rounded-xl border-l-4 border-gold-500 bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-800">
              &ldquo;I guide you based on real-world experience, not just documentation.&rdquo;
            </p>

            {/* Highlights grid */}
            <div className={`mt-6 grid gap-3 ${compact ? 'sm:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
              {visibleHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm"
                >
                  <item.Icon size={18} className="text-gold-500" />
                  <h4 className="mt-2 text-sm font-bold text-navy-800">{item.title}</h4>
                  {!compact && (
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {!compact && (
              <p className="mt-5 text-sm italic text-gray-500">
                Your global journey should be guided by someone who understands how careers are built —
                not just how forms are filled.
              </p>
            )}

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-primary px-7 py-3 text-center"
                onClick={() => trackEvent('cta_click', { cta: 'founder_book_consultation' })}
              >
                Book Consultation
              </Link>
              <Link
                href="/eligibility"
                className="btn-secondary px-7 py-3 text-center"
                onClick={() => trackEvent('cta_click', { cta: 'founder_free_eligibility' })}
              >
                Free Eligibility Check
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
