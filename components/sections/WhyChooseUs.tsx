'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'

const reasons = [
  {
    icon: '🎯',
    title: 'Profile-First Approach',
    description:
      'We start by deeply understanding your background, goals, and constraints before recommending any pathway. No one-size-fits-all advice here.',
  },
  {
    icon: '🔍',
    title: 'Transparent Process',
    description:
      'You are kept informed at every step. We provide clear timelines, honest assessments, and regular updates — no surprises, no hidden costs.',
  },
  {
    icon: '📋',
    title: 'Complete Documentation Support',
    description:
      'From translation to attestation, skills assessments to police clearances — we handle the entire document trail so you can focus on your move.',
  },
  {
    icon: '👩‍💼',
    title: 'Certified Expert Team',
    description:
      'Our consultants are ICCRC, OISC, and MARA registered. You always work with a qualified professional, never a junior sales rep.',
  },
  {
    icon: '🔒',
    title: 'Ethical & Honest',
    description:
      'We will tell you honestly if your profile is not strong enough for a pathway and suggest what to improve — rather than taking your fees for a doomed application.',
  },
  {
    icon: '🤝',
    title: 'Post-Landing Support',
    description:
      'Our relationship doesn\'t end at visa approval. We help with pre-departure preparation, settlement guidance, and community connections.',
  },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-pad bg-white">
      <div className="container-pad">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-50 to-navy-100 h-96 lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    { label: 'Trust', value: '18+ Years', bg: 'bg-navy-700 text-white' },
                    { label: 'Success', value: '92%+', bg: 'bg-gold-500 text-white' },
                    { label: 'Clients', value: '10,000+', bg: 'bg-white text-navy-700' },
                    { label: 'Countries', value: '45+', bg: 'bg-emerald-600 text-white' },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-2xl p-6 flex flex-col items-center justify-center shadow-card text-center`}>
                      <div className="text-3xl font-black">{item.value}</div>
                      <div className={`text-xs font-semibold mt-1 opacity-80`}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promise badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold-500 text-white rounded-2xl p-4 shadow-xl">
                <div className="text-2xl mb-1 text-center">🛡️</div>
                <div className="text-xs font-bold text-center leading-tight max-w-[100px]">
                  Ethical Consulting Promise
                </div>
              </div>
            </div>
          </div>

          {/* Right: Reasons */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              label="Why Avantika"
              title="Why Thousands Choose Us"
              highlight="Choose Us"
              subtitle="Our client-first philosophy, certified experts, and transparent process make us different from every other consultancy."
              align="left"
            />

            <div ref={ref} className="mt-8 space-y-5">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 mt-0.5">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-800 mb-1">{reason.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="/about" className="btn-primary py-3 px-6">Our Story</Link>
              <Link href="/contact" className="btn-outline py-3 px-6">Talk to Us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
