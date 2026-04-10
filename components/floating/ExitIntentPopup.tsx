'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { trackEvent } from '@/lib/utils/analytics'
import { postJson } from '@/lib/utils/formTracking'

const STORAGE_KEY = 'avantika_exit_popup_dismissed'
const COOLDOWN_HOURS = 48

function isDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const { dismissedAt } = JSON.parse(raw) as { dismissedAt: number }
    const hoursSince = (Date.now() - dismissedAt) / (1000 * 60 * 60)
    return hoursSince < COOLDOWN_HOURS
  } catch {
    return false
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedAt: Date.now() }))
  } catch { /* storage unavailable */ }
}

export default function ExitIntentPopup() {
  const [visible, setVisible]   = useState(false)
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const triggered               = useRef(false)

  const dismiss = useCallback((reason: string) => {
    setVisible(false)
    markDismissed()
    trackEvent('cta_click', { cta: `exit_popup_${reason}` })
  }, [])

  useEffect(() => {
    // Don't attach on mobile (no cursor leave event)
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    if (isDismissed()) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when cursor exits through the top of the viewport
      if (e.clientY > 20 || triggered.current) return
      triggered.current = true
      setVisible(true)
      trackEvent('cta_click', { cta: 'exit_popup_shown' })
    }

    // Delay attaching listener so it doesn't fire on page load transitions
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 8000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await postJson('/api/newsletter', { email, source: 'exit_popup' })
      setSubmitted(true)
      trackEvent('form_submit', { form: 'exit_popup_newsletter', email })
      setTimeout(() => dismiss('subscribed'), 2500)
    } catch {
      // Silently fail — don't block the user
      dismiss('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
            onClick={() => dismiss('backdrop')}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            initial={{ opacity: 0, scale: 0.92, y: -20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0,   scale: 0.92, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden">
              {/* Top accent strip */}
              <div className="h-1.5 bg-gradient-to-r from-navy-700 via-gold-500 to-navy-700" />

              <div className="p-8">
                {/* Close */}
                <button
                  onClick={() => dismiss('close_button')}
                  aria-label="Close popup"
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  <X size={16} />
                </button>

                {submitted ? (
                  <div className="text-center py-4">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-black text-navy-800 mb-2">You&apos;re In!</h2>
                    <p className="text-gray-500 text-sm">
                      Check your inbox for your free guide. Good luck with your immigration journey!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Download size={26} className="text-gold-600" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-1">
                          Free Download
                        </div>
                        <h2 id="exit-popup-title" className="text-xl font-black text-navy-800 leading-tight">
                          Wait! Grab Your Free Immigration Guide
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Before you go — download our{' '}
                      <strong>&ldquo;2024 Complete Immigration Handbook&rdquo;</strong> covering
                      Canada, Germany, Australia, UK and UAE. 48 pages. Free.
                    </p>

                    <ul className="space-y-2 mb-6">
                      {[
                        'Step-by-step PR pathways for top 5 countries',
                        'CRS score calculator worksheet',
                        'Document checklist templates',
                        'Cost & timeline comparison table',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 text-[10px]">✓</span>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        aria-label="Email address for free guide"
                        className="input-field flex-1 text-sm"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-secondary px-5 py-2.5 text-sm flex-shrink-0 flex items-center gap-1.5"
                      >
                        {loading
                          ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          : <><Download size={14} /> Get It</>
                        }
                      </button>
                    </form>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
                      <button
                        onClick={() => dismiss('no_thanks')}
                        className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                      >
                        No thanks
                      </button>
                    </div>

                    {/* Alt CTA */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Or speak to an expert directly</span>
                      <Link
                        href="/eligibility"
                        onClick={() => dismiss('cta_eligibility')}
                        className="text-xs font-semibold text-navy-700 hover:text-gold-600 flex items-center gap-1 transition-colors"
                      >
                        Free Eligibility Check <ArrowRight size={12} />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
