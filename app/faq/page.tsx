import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import FAQAccordion from '@/components/ui/FAQAccordion'
import CTASection from '@/components/sections/CTASection'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { faqs } from '@/lib/data/services'
import { CONTACT } from '@/lib/config/contact'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Immigration FAQ | Avantika',
  description:
    'Find answers to the most common questions about immigration, visa applications, work permits, study abroad, IELTS coaching, and our consulting services.',
}

const faqCategories = [
  {
    id: 'general',
    label: '🌍 General Immigration',
    faqs: faqs.slice(0, 3),
  },
  {
    id: 'process',
    label: '📋 Process & Timeline',
    faqs: faqs.slice(3, 5),
  },
  {
    id: 'coaching',
    label: '📝 IELTS & Coaching',
    faqs: faqs.slice(6, 8),
  },
  {
    id: 'services',
    label: '💼 Our Services',
    faqs: faqs.slice(4, 7),
  },
]

const popularTopics = [
  { label: 'Canada Express Entry', href: '/destinations/canada#faqs', icon: '🇨🇦' },
  { label: 'Germany Opportunity Card', href: '/destinations/germany#faqs', icon: '🇩🇪' },
  { label: 'Study Abroad', href: '/services/student-visa#faqs', icon: '🎓' },
  { label: 'Work Visa', href: '/services/work-visa#faqs', icon: '💼' },
  { label: 'IELTS Requirements', href: '/coaching/ielts#faqs', icon: '📝' },
  { label: 'Student Visa', href: '/services/student-visa#faqs', icon: '🎓' },
  { label: 'Work Permit', href: '/services/work-visa#faqs', icon: '💼' },
  { label: 'Contact an Expert', href: '/contact', icon: '📞' },
]

export default function FAQPage() {
  const allFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allFaqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'FAQ' }]} dark />
          <div className="max-w-2xl mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Frequently Asked <span className="text-gold-400">Questions</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Answers to the most common questions about immigration, visas, study abroad, coaching, and our services.
              Can&apos;t find what you need? <Link href="/contact" className="text-gold-400 hover:underline">Contact us directly</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container-pad">
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs font-semibold text-gray-400 mr-2">Browse by topic:</span>
            {popularTopics.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-navy-50 hover:text-navy-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
              >
                <span>{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* All FAQs */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Sidebar navigation */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="font-bold text-navy-800 mb-4">Jump to Section</h3>
                <nav className="space-y-1">
                  {faqCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                    >
                      {cat.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-navy-800 text-sm mb-3">Still Have Questions?</h4>
                  <p className="text-xs text-gray-500 mb-3">Our team responds within 2 hours on business days.</p>
                  <Link href="/contact" className="btn-primary w-full text-center text-sm py-2.5">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ content */}
            <div className="lg:col-span-2 space-y-12">
              {faqCategories.map((cat) => (
                <div id={cat.id} key={cat.id}>
                  <h2 className="text-lg font-bold text-navy-800 mb-5 pb-3 border-b border-gray-200">
                    {cat.label}
                  </h2>
                  <FAQAccordion faqs={cat.faqs} />
                </div>
              ))}

              {/* Ask a question */}
              <div className="bg-navy-700 rounded-2xl p-8 text-center text-white">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-xl font-bold mb-2">Didn&apos;t find your answer?</h3>
                <p className="text-navy-300 text-sm mb-5">
                  Our immigration experts are available Mon–Sat 9am–6pm and typically respond within 2 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
                    💬 WhatsApp Us
                  </a>
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
                    📧 Send a Message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Ready to Start Your Immigration Journey?" subtitle="Our certified consultants are here to help you navigate every step of the process." />
    </>
  )
}
