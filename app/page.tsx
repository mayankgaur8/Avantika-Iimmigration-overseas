import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import DestinationsSection from '@/components/sections/DestinationsSection'
import StatsSection from '@/components/sections/StatsSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import BlogSection from '@/components/sections/BlogSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import FounderSection from '@/components/sections/FounderSection'
import ConsultationForm from '@/components/forms/ConsultationForm'
import InlineLeadCapture from '@/components/sections/InlineLeadCapture'
import TrustBar from '@/components/sections/TrustBar'
import { CONTACT, OFFICES } from '@/lib/config/contact'
import { visaServices } from '@/lib/data/services'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'))

export const metadata: Metadata = {
  title: 'Avantika Immigration & Overseas | Visa, Work, Study Abroad Consultants',
  description:
    'Avantika Immigration & Overseas offers expert assistance for Canada PR, Australia Visa, Germany Work Permit, UK Student Visa, IELTS Coaching and more. Free eligibility check.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      <TrustBar />

      {/* Services */}
      <ServicesSection />

      {/* Destinations */}
      <DestinationsSection />

      {/* Visa Services Quick Grid */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">All Services</span>
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-navy-800 mb-4">Popular Visa Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Whether you&apos;re migrating, working, studying, visiting, or upskilling — we have a service for every goal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {visaServices.map((svc) => (
              <Link
                key={svc.id}
                href={svc.href}
                className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover p-4 text-center transition-all duration-200 hover:-translate-y-1"
              >
                <span className="text-3xl block mb-2">{svc.icon}</span>
                <div className="text-sm font-semibold text-navy-800 group-hover:text-navy-600 leading-tight mb-1.5">
                  {svc.title}
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {svc.countries.slice(0, 2).map((c) => (
                    <span key={c} className="text-[10px] text-gray-400">{c}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Founder / Personal Branding */}
      <FounderSection />

      <InlineLeadCapture
        title="Get a realistic pathway before you invest time and money"
        subtitle="We compare PR, work, and study routes against your actual profile so you can avoid weak-fit destinations and move straight into the right document checklist."
        service="Permanent Residency (PR)"
        source="home_inline_capture"
        leadMagnetSlug="canada-pr-checklist"
      />

      {/* Process Steps */}
      <section className="section-pad bg-navy-50">
        <div className="container-pad">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Our Process</span>
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-navy-800 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A clear, transparent 5-step process to take you from assessment to approval.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-navy-200 hidden md:block mx-24" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: '01', title: 'Free Assessment', desc: 'We evaluate your profile and suggest the best pathway forward.', icon: '🔍' },
                { step: '02', title: 'Strategy Plan', desc: 'A personalised roadmap with timelines, documents, and costs.', icon: '📋' },
                { step: '03', title: 'Documentation', desc: 'We prepare, verify, and organise every document required.', icon: '📁' },
                { step: '04', title: 'Application Filing', desc: 'We submit your application with expert review before filing.', icon: '📤' },
                { step: '05', title: 'Visa & Beyond', desc: 'Approval support, pre-departure guidance, and settlement help.', icon: '✅' },
              ].map((item, i) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-20 h-20 bg-white rounded-2xl shadow-card flex flex-col items-center justify-center mb-4 border-2 border-navy-100">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-black text-navy-400 mt-0.5">{item.step}</span>
                  </div>
                  <h4 className="font-bold text-navy-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/eligibility" className="btn-secondary px-10 py-4 text-base">
              Start Your Free Assessment
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Lead Capture + Blog */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Consultation Form */}
            <div>
              <span className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-gold-500 inline-block" />
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Get Started</span>
              </span>
              <h2 className="text-3xl font-black text-navy-800 mb-2">Talk to an Expert Today</h2>
              <p className="text-gray-500 mb-6">
                Fill in the form and one of our certified consultants will call you back within 2 hours (Mon–Sat, 9am–6pm).
              </p>
              <ConsultationForm compact={false} source="home_consultation_panel" leadMagnetSlug="work-visa-job-search-pack" />
            </div>

            {/* Quick info */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5 bg-gold-500 inline-block" />
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Our Office</span>
                </span>
                <h2 className="text-3xl font-black text-navy-800 mb-3">Visit or Call Our Aligarh Office</h2>
                <p className="text-gray-500 mb-6">
                  We operate from our Aligarh head office and serve clients across India through founder-led online consultations.
                </p>
              </div>

              {OFFICES.map((office) => (
                <div key={office.city} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl mt-1">📍</span>
                  <div>
                    <div className="font-bold text-navy-800 mb-0.5">{office.city}</div>
                    <div className="text-sm text-gray-500 mb-1">{office.address}</div>
                    <a href={CONTACT.telUrl} className="text-sm text-navy-700 font-semibold hover:text-gold-600 transition-colors">
                      {CONTACT.phonePrimary}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <BlogSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection
        title="Begin Your Immigration Journey Today"
        subtitle="Thousands have already moved to their dream country with our guidance. Your global future starts with one free check."
      />
    </>
  )
}
