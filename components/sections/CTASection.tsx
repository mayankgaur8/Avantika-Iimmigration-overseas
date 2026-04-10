'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle, Calendar } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { CONTACT } from '@/lib/config/contact'

interface CTASectionProps {
  title?: string
  subtitle?: string
  variant?: 'dark' | 'gold' | 'light'
}

export default function CTASection({
  title = 'Start Your Global Journey Today',
  subtitle = 'Take the first step — check your eligibility for free and speak to a certified immigration expert within 24 hours.',
  variant = 'dark',
}: CTASectionProps) {
  const bgClass = {
    dark: 'bg-gradient-to-br from-navy-800 to-navy-900',
    gold: 'bg-gradient-to-br from-gold-500 to-gold-600',
    light: 'bg-white',
  }[variant]

  const textClass = variant === 'light' ? 'text-navy-800' : 'text-white'
  const subTextClass = variant === 'light' ? 'text-gray-500' : variant === 'gold' ? 'text-gold-100' : 'text-navy-300'

  return (
    <section className={`${bgClass} relative overflow-hidden`}>
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 ${variant === 'gold' ? 'bg-white' : 'bg-gold-400'}`} />
        <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 ${variant === 'gold' ? 'bg-white' : 'bg-blue-400'}`} />
      </div>

      <div className="container-pad py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={`text-3xl md:text-4xl font-black leading-tight mb-5 ${textClass}`}>
            {title}
          </h2>
          <p className={`text-lg mb-10 leading-relaxed ${subTextClass}`}>{subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/eligibility"
              className={`inline-flex items-center gap-2 px-8 py-4 font-bold text-base rounded-xl shadow-lg transition-all active:scale-95 ${
                variant === 'gold'
                  ? 'bg-white text-gold-600 hover:bg-gold-50'
                  : 'bg-gold-500 hover:bg-gold-400 text-white shadow-cta'
              }`}
              onClick={() => trackEvent('cta_click', { cta: 'eligibility_bottom' })}
            >
              Free Eligibility Check
              <ArrowRight size={18} />
            </Link>

            <Link
              href={CONTACT.bookingUrl}
              className={`inline-flex items-center gap-2 px-8 py-4 font-bold text-base rounded-xl border-2 transition-all active:scale-95 ${
                variant === 'light'
                  ? 'border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
              onClick={() => {
                trackEvent('cta_click', { cta: 'book_consultation_bottom' })
                trackEvent('appointment_booking_click', { location: 'bottom_cta' })
              }}
            >
              <Calendar size={18} />
              Book Consultation
            </Link>
          </div>

          {/* Quick contact options */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 text-sm ${subTextClass}`}>
            <a
              href={CONTACT.telUrl}
              className={`flex items-center gap-2 hover:opacity-80 transition-opacity font-medium`}
              onClick={() => trackEvent('phone_click', { location: 'cta_section' })}
            >
              <Phone size={15} /> {CONTACT.phonePrimary}
            </a>
            <span className="hidden sm:block opacity-40">|</span>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium"
              onClick={() => trackEvent('whatsapp_click', { location: 'cta_section' })}
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
            <span className="hidden sm:block opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Experts available now
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
