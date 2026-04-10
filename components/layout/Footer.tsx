import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, ArrowRight } from 'lucide-react'
import { CONTACT, OFFICES, SOCIAL } from '@/lib/config/contact'
import NewsletterSignup from '@/components/forms/NewsletterSignup'

const footerLinks = {
  services: [
    { label: 'Free Eligibility Check', href: '/eligibility' },
    { label: 'Work Abroad', href: '/services/work-visa' },
    { label: 'Study Abroad', href: '/services/student-visa' },
    { label: 'Canada Immigration', href: '/destinations/canada' },
    { label: 'Germany Opportunity Card', href: '/destinations/germany' },
    { label: 'Job Search Assistance', href: '/jobs' },
    { label: 'IELTS Coaching', href: '/coaching/ielts' },
    { label: 'Book Consultation', href: '/contact' },
  ],
  destinations: [
    { label: 'Canada', href: '/destinations/canada' },
    { label: 'Student Pathways', href: '/services/student-visa' },
    { label: 'Germany', href: '/destinations/germany' },
    { label: 'Work Abroad', href: '/services/work-visa' },
    { label: 'Study Abroad', href: '/services/student-visa' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  coaching: [
    { label: 'IELTS Coaching', href: '/coaching/ielts' },
    { label: 'PTE Coaching', href: '/coaching/ielts' },
    { label: 'TOEFL Coaching', href: '/coaching/ielts' },
    { label: 'Language Test Roadmap', href: '/blog/ielts-band-7-strategy' },
    { label: 'Student Visa Support', href: '/services/student-visa' },
    { label: 'Study Comparison Guides', href: '/blog/study-uk-vs-canada-comparison' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about' },
    { label: 'Success Stories', href: '/about' },
    { label: 'Blog & News', href: '/blog' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Deployment Guide', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Newsletter strip */}
      <div className="bg-navy-800 border-b border-navy-700">
        <div className="container-pad py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl">Stay Updated with Immigration News</h3>
              <p className="text-navy-300 text-sm mt-1">Get the latest visa updates, draw results, and migration tips.</p>
            </div>
            <div className="w-full md:w-auto md:min-w-[360px]">
              <NewsletterSignup source="footer_newsletter" buttonLabel="Subscribe" />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-pad py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <div>
                <div className="text-white font-black text-lg leading-tight">Avantika</div>
                <div className="text-gold-400 text-[10px] font-semibold tracking-wider uppercase">Immigration & Overseas</div>
              </div>
            </Link>

            <p className="text-navy-300 text-sm leading-relaxed mb-6">
              Trusted by 10,000+ clients across India, Avantika Immigration & Overseas is your
              end-to-end partner for migration, work, study, and coaching services worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href={CONTACT.telUrl} className="flex items-center gap-2.5 text-sm hover:text-gold-400 transition-colors">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                {CONTACT.phonePrimary}
              </a>
              <a href={`mailto:${CONTACT.emailPrimary}`} className="flex items-center gap-2.5 text-sm hover:text-gold-400 transition-colors">
                <Mail size={14} className="text-gold-500 flex-shrink-0" />
                {CONTACT.emailPrimary}
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>{OFFICES[0].address}</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: SOCIAL.facebook, label: 'Facebook' },
                { icon: Instagram, href: SOCIAL.instagram, label: 'Instagram' },
                { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
                { icon: Youtube, href: SOCIAL.youtube, label: 'YouTube' },
                { icon: Twitter, href: SOCIAL.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-navy-800 hover:bg-gold-500 text-navy-300 hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coaching */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Coaching</h4>
            <ul className="space-y-2">
              {footerLinks.coaching.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="container-pad py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-400">
          <span>© {new Date().getFullYear()} Avantika Immigration & Overseas Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-gold-400 transition-colors">Privacy and Compliance</Link>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
