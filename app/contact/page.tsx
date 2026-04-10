import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import BookingForm from '@/components/forms/BookingForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQSection from '@/components/sections/FAQSection'
import { faqs } from '@/lib/data/services'
import JsonLd from '@/components/seo/JsonLd'
import { CONTACT } from '@/lib/config/contact'
import { breadcrumbSchema, pageMetadata } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us | Avantika Immigration and Overseas',
  description:
    'Call, WhatsApp, or book a consultation with Avantika Immigration and Overseas.',
  path: '/contact',
})

const contactFaqs = faqs.slice(0, 4)
const headOfficeAddress = 'G-16 Gulzar Nagar Ramghat Road, Aligarh'
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(headOfficeAddress)}&output=embed`

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Contact', url: 'https://avantika-immigration.com/contact' },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Contact Us' }]} dark />
          <div className="max-w-2xl mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Let&apos;s Start Your <span className="text-gold-400">Journey Together</span>
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Our certified immigration experts are here to answer your questions and guide you to the right pathway. Reach out via any channel — we respond within 2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-pad">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href={CONTACT.telUrl} className="flex items-center gap-3 p-4 bg-navy-50 hover:bg-navy-100 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-navy-700 rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Call Us</div>
                <div className="font-bold text-navy-800 group-hover:text-navy-600">{CONTACT.phonePrimary}</div>
              </div>
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">WhatsApp</div>
                <div className="font-bold text-green-700 group-hover:text-green-600">Chat Instantly</div>
              </div>
            </a>
            <a href={`mailto:${CONTACT.emailPrimary}`}
              className="flex items-center gap-3 p-4 bg-gold-50 hover:bg-gold-100 rounded-xl transition-colors group">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Email</div>
                <div className="font-bold text-gold-700 text-sm group-hover:text-gold-600">{CONTACT.emailPrimary}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-black text-navy-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-6">Complete the form below and a consultant will respond within 2 hours.</p>
              <ConsultationForm
                title="Book a Free Consultation"
                subtitle="Our expert consultants will call you back within 2 hours."
                source="contact_page_form"
              />

              <div className="mt-6">
                <BookingForm source="contact_booking_form" />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-bold text-navy-800 text-lg mb-4">Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'WhatsApp only' },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.day}</span>
                      <span className="text-sm font-semibold text-navy-700">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Currently open — we&apos;re here to help</span>
                </div>
              </div>

              <div className="bg-navy-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2">Emergency Visa Support</h3>
                <p className="text-navy-200 text-sm mb-4">
                  Need urgent visa assistance? Our priority support line is available 7 days a week.
                </p>
                <a href={`tel:${CONTACT.phoneUrgent.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-gold-400 font-bold text-lg">
                  <Phone size={18} />
                  {CONTACT.phoneUrgent}
                </a>
                <div className="text-xs text-navy-400 mt-1">Priority line — Mon–Sun 8am–8pm</div>
              </div>

              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-bold text-navy-800 text-lg mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <a href="/eligibility" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-navy-50 rounded-xl transition-colors group">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-navy-700">Free Eligibility Check</span>
                    <span className="text-gold-500">→</span>
                  </a>
                  <a href="/blog" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-navy-50 rounded-xl transition-colors group">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-navy-700">Read Our Blog</span>
                    <span className="text-gold-500">→</span>
                  </a>
                  <a href="/faq" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-navy-50 rounded-xl transition-colors group">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-navy-700">Browse FAQs</span>
                    <span className="text-gold-500">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office + Nationwide Service */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy-800 mb-3">Our Office & Nationwide Service</h2>
            <p className="text-gray-500 max-w-3xl mx-auto">
              We are a digital-first consultancy with a verified head office in Aligarh. Whether you are nearby or in another city, we deliver complete immigration support through video calls, secure document workflows, and dedicated consultant guidance.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-bold text-navy-800 text-xl mb-4">Aligarh (Head Office)</h3>
                <div className="space-y-3">
                  <div className="flex gap-2.5 text-sm text-gray-600">
                    <MapPin size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{headOfficeAddress}</span>
                  </div>
                  <a href={CONTACT.telUrl} className="flex gap-2.5 text-sm text-navy-700 font-semibold hover:text-gold-600 transition-colors">
                    <Phone size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    {CONTACT.phonePrimary}
                  </a>
                  <a href={`mailto:${CONTACT.emailPrimary}`} className="flex gap-2.5 text-sm text-navy-700 hover:text-gold-600 transition-colors">
                    <Mail size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="truncate">{CONTACT.emailPrimary}</span>
                  </a>
                  <div className="flex gap-2.5 text-sm text-gray-500">
                    <Clock size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    Mon-Sat: 9:00 AM - 6:00 PM
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(headOfficeAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-navy-50 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-100"
                >
                  Get Directions
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-card">
                <iframe
                  title="Avantika Immigration Head Office Map"
                  src={mapEmbedUrl}
                  loading="lazy"
                  className="h-[320px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-navy-900 p-6 text-white shadow-card">
                <h3 className="text-xl font-bold mb-3">Serving Clients Across India</h3>
                <ul className="space-y-2 text-sm text-navy-100">
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-gold-400">•</span><span>Video consultations</span></li>
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-gold-400">•</span><span>Remote document support</span></li>
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-gold-400">•</span><span>WhatsApp and phone guidance</span></li>
                </ul>
                <p className="mt-4 text-xs text-navy-300 leading-relaxed">
                  Active client support in Delhi NCR, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi, and more.
                </p>
              </div>

              <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6 shadow-card">
                <h3 className="text-xl font-bold text-navy-800 mb-3">Book Online Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get strategy clarity before documents and payments. Talk to an expert from anywhere in India.
                </p>
                <div className="space-y-2">
                  <Link href="/contact#contact_page_form-name" className="btn-primary w-full text-center py-3 text-sm">
                    Book Consultation
                  </Link>
                  <Link href="/eligibility" className="btn-secondary w-full text-center py-3 text-sm">
                    Free Eligibility Check
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="text-xl font-bold text-navy-800 mb-4">Why Clients Trust Our Process</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Transparent process',
                'No fake promises',
                'End-to-end support',
                'Remote plus in-person assistance',
              ].map((item) => (
                <div key={item} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy-700 shadow-sm">
                  <span className="mr-2 text-gold-500">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={contactFaqs} />
    </>
  )
}
