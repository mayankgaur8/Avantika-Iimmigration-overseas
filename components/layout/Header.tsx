'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { mainNav } from '@/lib/data/navigation'
import { CONTACT } from '@/lib/config/contact'
import { trackEvent } from '@/lib/utils/analytics'
import UtilityBar from './UtilityBar'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [pathname])

  const headerClass = isScrolled
    ? 'bg-white shadow-md'
    : 'bg-white/95 backdrop-blur-nav'

  return (
    <>
      <UtilityBar />
      <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClass}`}>
        <div className="container-pad">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 mr-6">
              <div className="w-9 h-9 bg-gradient-to-br from-navy-700 to-navy-900 rounded-lg flex items-center justify-center">
                <span className="text-gold-400 font-black text-lg leading-none">A</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-navy-800 font-black text-base leading-tight">Avantika</div>
                <div className="text-gold-600 text-[10px] font-semibold tracking-wider uppercase leading-tight">Immigration & Overseas</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1 flex-1"
              onMouseLeave={() => setActiveMega(null)}
            >
              {mainNav.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors
                      ${pathname?.startsWith(item.href)
                        ? 'text-navy-700 bg-navy-50'
                        : 'text-gray-700 hover:text-navy-700 hover:bg-gray-50'
                      }`}
                    onMouseEnter={() => item.megaMenu ? setActiveMega(item.label) : setActiveMega(null)}
                    onClick={() => !item.megaMenu && setActiveMega(null)}
                  >
                    {item.megaMenu ? (
                      <>
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${activeMega === item.label ? 'rotate-180' : ''}`}
                        />
                      </>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.megaMenu && activeMega === item.label && (
                      <motion.div
                        ref={megaRef}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-max max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 mt-1 z-50"
                        onMouseEnter={() => setActiveMega(item.label)}
                        onMouseLeave={() => setActiveMega(null)}
                      >
                        <div className={`grid gap-8 ${item.megaMenu.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                          {item.megaMenu.map((col) => (
                            <div key={col.heading}>
                              <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-3">
                                {col.heading}
                              </div>
                              <ul className="space-y-1.5">
                                {col.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      href={subItem.href}
                                      className="block px-2 py-1.5 rounded-lg hover:bg-navy-50 group transition-colors"
                                      onClick={() => setActiveMega(null)}
                                    >
                                      <div className="text-sm font-medium text-gray-800 group-hover:text-navy-700">
                                        {subItem.label}
                                      </div>
                                      {subItem.description && (
                                        <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Mega menu CTA */}
                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm text-gray-500">Not sure where to start?</span>
                          <Link
                            href="/eligibility"
                            className="text-sm font-semibold text-navy-700 bg-navy-50 hover:bg-navy-100 px-4 py-1.5 rounded-lg transition-colors"
                            onClick={() => setActiveMega(null)}
                          >
                            Free Eligibility Check →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              <button
                className="p-2 text-gray-600 hover:text-navy-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href={CONTACT.telUrl}
                className="hidden xl:flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-gold-600 transition-colors"
                onClick={() => trackEvent('phone_click', { location: 'header' })}
              >
                <Phone size={16} />
                <span>{CONTACT.phonePrimary}</span>
              </Link>

              <Link
                href="/eligibility"
                className="hidden md:inline-flex btn-secondary text-sm py-2 px-4"
              >
                Free Check
              </Link>

              <Link
                href="/contact"
                className="hidden lg:inline-flex btn-primary text-sm py-2 px-4"
                onClick={() => trackEvent('appointment_booking_click', { location: 'header' })}
              >
                Book Consultation
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 bg-white"
            >
              <div className="container-pad py-3">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search for destinations, visas, services..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-y-auto max-h-[80vh]"
            >
              <div className="container-pad py-4 space-y-1">
                {mainNav.map((item) => (
                  <div key={item.label}>
                    {item.megaMenu ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl"
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.megaMenu.flatMap((col) =>
                                col.items.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-navy-700 hover:bg-navy-50 rounded-lg"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-3 mt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <Link href="/eligibility" className="btn-secondary text-sm py-2.5 text-center">
                    Free Eligibility
                  </Link>
                  <Link href="/contact" className="btn-primary text-sm py-2.5 text-center">
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
