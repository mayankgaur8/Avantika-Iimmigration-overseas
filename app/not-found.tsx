import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/config/contact'

export const metadata: Metadata = {
  title: 'Page Not Found | Avantika Immigration & Overseas',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: false },
}

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/eligibility', label: 'Free Eligibility Check' },
  { href: '/destinations/canada', label: 'Canada Immigration' },
  { href: '/destinations/germany', label: 'Germany Visa' },
  { href: '/services/work-visa', label: 'Work Visa' },
  { href: '/services/student-visa', label: 'Student Visa' },
  { href: '/coaching/ielts', label: 'IELTS Coaching' },
  { href: '/contact', label: 'Contact Us' },
]

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 visual */}
        <div className="relative mb-8 inline-block">
          <div className="text-[10rem] font-black text-navy-50 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🗺️</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-navy-800 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        {/* Primary actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/" className="btn-primary px-8 py-3.5 flex items-center gap-2">
            <Home size={17} /> Back to Home
          </Link>
          <Link href="/eligibility" className="btn-secondary px-8 py-3.5">
            Free Eligibility Check
          </Link>
          <a
            href={CONTACT.telUrl}
            className="btn-outline px-8 py-3.5 flex items-center gap-2"
          >
            <Phone size={17} /> Call Us
          </a>
        </div>

        {/* Quick links */}
        <div className="bg-gray-50 rounded-2xl p-6 text-left">
          <h2 className="font-bold text-navy-800 mb-4 text-sm uppercase tracking-wider">
            Popular pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-navy-700 hover:text-gold-600 hover:bg-white px-3 py-2 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
