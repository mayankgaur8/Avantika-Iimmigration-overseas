import SectionHeading from '@/components/ui/SectionHeading'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { faqs } from '@/lib/data/services'
import Link from 'next/link'
import { CONTACT } from '@/lib/config/contact'

interface FAQSectionProps {
  items?: typeof faqs
  showAll?: boolean
}

export default function FAQSection({ items, showAll = false }: FAQSectionProps) {
  const displayFaqs = items || (showAll ? faqs : faqs.slice(0, 6))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <section className="section-pad bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container-pad">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              label="FAQs"
              title="Frequently Asked Questions"
              highlight="Frequently Asked"
              subtitle="Answers to the most common questions about immigration, visas, and our services."
              align="left"
            />
            <div className="mt-8 bg-white rounded-2xl shadow-card p-6">
              <h4 className="font-bold text-navy-800 mb-3">Still have questions?</h4>
              <p className="text-sm text-gray-500 mb-4">Our experts are available Mon–Sat 9am–6pm to answer all your queries.</p>
              <div className="space-y-2">
                <a href={CONTACT.telUrl} className="flex items-center gap-2 text-sm text-navy-700 font-semibold hover:text-gold-600 transition-colors">
                  📞 {CONTACT.phonePrimary}
                </a>
                <a href={`mailto:${CONTACT.emailPrimary}`} className="flex items-center gap-2 text-sm text-navy-700 font-semibold hover:text-gold-600 transition-colors">
                  ✉️ {CONTACT.emailPrimary}
                </a>
              </div>
              <Link href="/contact" className="mt-4 btn-primary w-full text-center text-sm py-2.5">
                Ask Your Question
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <FAQAccordion faqs={displayFaqs} />
            {!showAll && faqs.length > 6 && (
              <div className="mt-6 text-center">
                <Link href="/faq" className="btn-outline px-8 py-3 text-sm">
                  View All FAQs ({faqs.length} total)
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
