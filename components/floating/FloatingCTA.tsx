'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, Calendar } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { CONTACT } from '@/lib/config/contact'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 400) {
        setVisible(true)
      } else if (window.scrollY <= 400) {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  return (
    <>
      {/* Sticky bottom CTA bar — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex gap-2">
          <a
            href={CONTACT.telUrl}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-navy-700 text-navy-700 font-semibold text-sm rounded-xl hover:bg-navy-700 hover:text-white transition-all"
            onClick={() => trackEvent('phone_click', { location: 'sticky_bottom' })}
          >
            <Phone size={15} />
            Call Us
          </a>
          <Link
            href="/eligibility"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gold-500 text-white font-semibold text-sm rounded-xl hover:bg-gold-400 transition-all"
            onClick={() => trackEvent('cta_click', { cta: 'free_check_sticky' })}
          >
            Free Eligibility Check
          </Link>
        </div>
      </div>

      {/* Floating consultation button — desktop */}
      <AnimatePresence>
        {visible && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-6 z-40 hidden md:block"
          >
            <div className="bg-navy-700 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gold-300 mb-0.5">Limited Slots Available</div>
                <div className="text-sm font-bold leading-tight">Book a Free Consultation</div>
              </div>
              <Link
                href={CONTACT.bookingUrl}
                className="flex-shrink-0 bg-gold-500 hover:bg-gold-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                onClick={() => {
                  trackEvent('consultation_request', { location: 'floating_cta' })
                  trackEvent('appointment_booking_click', { location: 'floating_cta' })
                }}
              >
                Book
              </Link>
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center"
              >
                <X size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
