'use client'

import Link from 'next/link'
import { Phone, MessageCircle, User, LogIn } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { CONTACT } from '@/lib/config/contact'

export default function UtilityBar() {
  return (
    <div className="bg-navy-900 text-white text-sm">
      <div className="container-pad flex items-center justify-between h-9">
        {/* Left: Phone */}
        <div className="flex items-center gap-4">
          <a
            href={CONTACT.telUrl}
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            onClick={() => trackEvent('phone_click', { location: 'utility_bar' })}
          >
            <Phone size={13} />
            <span>{CONTACT.phonePrimary}</span>
          </a>
          <span className="text-navy-400 hidden md:inline">|</span>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            onClick={() => trackEvent('whatsapp_click', { location: 'utility_bar' })}
          >
            <MessageCircle size={13} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Right: Auth + Contact */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:block hover:text-gold-300 transition-colors">
            Contact Us
          </Link>
          <span className="text-navy-400 hidden sm:inline">|</span>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
          >
            <LogIn size={13} />
            <span>Admin Login</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-white px-3 py-1 rounded font-medium transition-colors"
          >
            <User size={12} />
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
