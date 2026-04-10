import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Clock, DollarSign, FileText, TrendingUp, Users, Briefcase } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ConsultationForm from '@/components/forms/ConsultationForm'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'
import InlineLeadCapture from '@/components/sections/InlineLeadCapture'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Canada Immigration 2024 | PR, Work and Study Visa',
  description:
    'Complete guide to Canada immigration including Express Entry, provincial nominees, study visas, and work permits.',
  path: '/destinations/canada',
})

const visaCategories = [
  { name: 'Express Entry (PR)', icon: '🏠', eligibility: 'Skilled workers, CRS 470+', time: '6 months', fee: '~CAD 1,365' },
  { name: 'Provincial Nominee (PNP)', icon: '🏛️', eligibility: 'Provincial job offer / ties', time: '8–12 months', fee: '~CAD 1,365 + PR' },
  { name: 'Federal Skilled Worker', icon: '👷', eligibility: '67+ points on grid', time: '6 months', fee: '~CAD 1,365' },
  { name: 'Work Permit', icon: '💼', eligibility: 'Valid job offer / LMIA', time: '2–8 weeks', fee: '~CAD 155' },
  { name: 'Student Visa', icon: '🎓', eligibility: 'University acceptance letter', time: '4–12 weeks', fee: '~CAD 150' },
  { name: 'Super Visa (Parents)', icon: '👨‍👩‍👧', eligibility: 'Inviting family in Canada', time: '8–12 weeks', fee: '~CAD 100' },
]

const processSteps = [
  { step: '01', title: 'Profile Evaluation', desc: 'We assess your CRS score, NOC code, education credentials, and language scores.' },
  { step: '02', title: 'Document Preparation', desc: 'Educational certificates, language tests, ECA report, work experience letters, police clearance.' },
  { step: '03', title: 'Create Express Entry Profile', desc: 'We build your optimised online profile to maximise your CRS score.' },
  { step: '04', title: 'Wait for ITA', desc: 'Invitation to Apply issued during IRCC draws — typically within 3–12 months for eligible profiles.' },
  { step: '05', title: 'Submit PR Application', desc: 'Full application submitted within 60 days of receiving your ITA.' },
  { step: '06', title: 'Biometrics & Medical', desc: 'Complete biometric collection and medical examination with approved IRCC physician.' },
  { step: '07', title: 'COPR & Landing', desc: 'Receive Confirmation of Permanent Residence and plan your landing in Canada.' },
]

const documents = [
  'Valid Passport (min. 6 months validity)',
  'Educational Credential Assessment (ECA)',
  'IELTS / CELPIP Language Test Score',
  'Work Experience Proof (employment letters, pay slips)',
  'Police Clearance Certificate',
  'Proof of Funds (minimum CAD 13,310 for single)',
  'Medical Examination (approved IRCC physician)',
  'Reference Letters from Previous Employers',
  'Educational Transcripts & Diplomas',
  'Professional Licence / Registration (if applicable)',
]

const faqs = [
  {
    id: '1',
    question: 'What is the minimum CRS score needed for Canada Express Entry?',
    answer: 'The CRS cut-off score varies by draw and category. In 2024, general draws have ranged from 490 to 525, while category-based draws (healthcare, STEM, trade occupations) have had lower cut-offs around 430–470. We help you understand where you stand and how to improve your score.',
  },
  {
    id: '2',
    question: 'How long does the Canada PR process take?',
    answer: 'Once you receive an ITA (Invitation to Apply), you have 60 days to submit your full application. IRCC processes most complete applications within 6 months. Including time in the Express Entry pool, the total process is typically 9–18 months.',
  },
  {
    id: '3',
    question: 'Do I need a job offer to apply for Canada PR?',
    answer: 'A valid Canadian job offer is not mandatory for Express Entry but does add 50–200 CRS points. Without a job offer, you can still apply if your CRS score is competitive. Many of our clients receive PR without a prior job offer.',
  },
  {
    id: '4',
    question: 'Can I include my family in the PR application?',
    answer: 'Yes. Your spouse/common-law partner and dependent children (under 22 years old, unmarried) can be included in your PR application as accompanying family members.',
  },
  {
    id: '5',
    question: 'What is the minimum IELTS score for Canada Express Entry?',
    answer: 'For Federal Skilled Worker, you need CLB 7 (minimum IELTS: Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0). For FST and CEC, the requirements vary slightly. Higher scores earn more CRS points.',
  },
]

export default function CanadaPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Canada Immigration Consulting',
          description: 'Canada PR, study visa, and work permit advisory services.',
          url: 'https://avantika-immigration.com/destinations/canada',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Destinations', url: 'https://avantika-immigration.com/blog' },
          { name: 'Canada', url: 'https://avantika-immigration.com/destinations/canada' },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb
            items={[{ label: 'Destinations', href: '/destinations' }, { label: 'Canada' }]}
            dark
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-5xl flag-emoji">🇨🇦</span>
                <div>
                  <div className="text-white/60 text-sm font-medium">Destination Guide</div>
                  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Canada</h1>
                </div>
              </div>
              <p className="text-white/80 text-xl leading-relaxed mb-6">
                Canada is the world&apos;s top destination for skilled immigration. With Express Entry,
                Provincial Nominees, and multiple pathways to PR — your Canadian dream is achievable.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Top Ranked for Quality of Life', 'Express Entry PR', 'Free Healthcare', 'World-Class Universities'].map((h) => (
                  <span key={h} className="flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
                    <CheckCircle2 size={13} className="text-green-400" /> {h}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/eligibility" className="btn-secondary px-6 py-3">Check My Eligibility</Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold transition-all">
                  Talk to Expert
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'bg-green-500' },
                { label: 'Processing Time', value: '6–12 mo', icon: Clock, color: 'bg-blue-500' },
                { label: 'Avg. Salary', value: 'CAD 65K', icon: DollarSign, color: 'bg-gold-500' },
                { label: 'PR Visas Approved', value: '2,400+', icon: Users, color: 'bg-purple-500' },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} rounded-2xl p-5 text-white`}>
                  <stat.icon size={22} className="mb-2 opacity-80" />
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="text-sm opacity-80 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Canada */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="Why Canada" title="Why Migrate to Canada?" highlight="Canada?" align="center" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏥', title: 'Universal Healthcare', desc: 'Free or subsidised healthcare for PR holders and citizens.' },
              { icon: '📚', title: 'World-Class Education', desc: 'Top-ranked universities and free K–12 education for PR children.' },
              { icon: '💰', title: 'High Wages', desc: 'Average salaries of CAD 65,000+ with strong labour protections.' },
              { icon: '🌍', title: 'Multicultural Society', desc: 'The most immigrant-friendly nation — over 20% of population are immigrants.' },
              { icon: '🔒', title: 'Safety & Security', desc: 'Consistently ranked among the world\'s safest countries.' },
              { icon: '🏠', title: 'Path to Citizenship', desc: 'Become a Canadian citizen in as little as 3 years after PR.' },
              { icon: '💼', title: 'Strong Job Market', desc: 'Demand for IT, healthcare, trades, and finance professionals is extremely high.' },
              { icon: '🌲', title: 'Natural Beauty', desc: 'Stunning landscapes, clean cities, and exceptional quality of life.' },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-gray-50 rounded-2xl">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-navy-800 mb-1.5">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="Visa Types" title="Canada Visa Categories" highlight="Visa Categories" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visaCategories.map((visa) => (
              <div key={visa.name} className="card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{visa.icon}</span>
                  <h4 className="font-bold text-navy-800 text-lg">{visa.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{visa.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold-500 flex-shrink-0" />
                    <span className="text-gray-600">{visa.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gold-500 flex-shrink-0" />
                    <span className="text-gray-600">{visa.fee}</span>
                  </div>
                </div>
                <Link href="/eligibility" className="mt-4 block text-center text-sm font-semibold text-navy-700 bg-navy-50 hover:bg-navy-100 py-2 rounded-lg transition-colors">
                  Check Eligibility →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="Application Process" title="Step-by-Step Canada PR Process" highlight="Canada PR Process" align="center" className="mb-12" />
          <div className="space-y-4 max-w-3xl mx-auto">
            {processSteps.map((step, i) => (
              <div key={step.step} className="flex gap-5 p-5 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-bold text-navy-800 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents + Form */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading label="Documents" title="Required Documents" align="left" className="mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <div key={doc} className="flex items-start gap-2.5 p-3 bg-white rounded-xl shadow-sm">
                    <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-navy-700 text-white rounded-2xl">
                <h4 className="font-bold text-lg mb-2">Popular Jobs in Canada</h4>
                <div className="flex flex-wrap gap-2">
                  {['Software Engineer', 'Registered Nurse', 'Accountant', 'Civil Engineer', 'Data Analyst', 'Project Manager', 'Electrician', 'Chef'].map((j) => (
                    <span key={j} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Briefcase size={10} /> {j}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky form */}
            <div className="lg:sticky lg:top-24">
              <ConsultationForm
                title="Talk to a Canada Immigration Expert"
                subtitle="Get a free profile assessment and personalised advice within 24 hours."
                source="canada_page_form"
                servicePreset="Permanent Residency (PR)"
                destinationPreset="Canada"
                leadMagnetSlug="canada-pr-checklist"
              />
            </div>
          </div>
        </div>
      </section>

      <InlineLeadCapture
        title="Need a clear Canada roadmap before you enter the pool?"
        subtitle="We review CRS potential, NOC alignment, proof-of-funds readiness, and whether Express Entry or a provincial strategy gives you the best shot."
        service="Permanent Residency (PR)"
        destination="Canada"
        source="canada_inline_capture"
        leadMagnetSlug="canada-pr-checklist"
      />

      {/* FAQs */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="FAQs" title="Canada Immigration FAQs" align="center" className="mb-12" />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Move to Canada?"
        subtitle="Check your Express Entry eligibility for free and get expert guidance from our certified Canadian immigration consultants."
      />
    </>
  )
}
