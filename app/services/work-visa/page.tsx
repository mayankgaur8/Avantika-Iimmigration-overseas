import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Clock, DollarSign, ArrowRight, FileText } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ConsultationForm from '@/components/forms/ConsultationForm'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'
import InlineLeadCapture from '@/components/sections/InlineLeadCapture'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Work Visa Services | Overseas Work Permit Assistance',
  description:
    'Expert work visa and work permit assistance for Canada, Germany, UAE, Australia, UK and more.',
  path: '/services/work-visa',
})

const countries = [
  { flag: '🇨🇦', name: 'Canada', visaType: 'Work Permit (LMIA)', salary: 'CAD 55K+', demand: 'IT, Healthcare, Trades' },
  { flag: '🇩🇪', name: 'Germany', visaType: 'Skilled Worker / EU Blue Card', salary: '€50K+', demand: 'Engineering, IT, Nursing' },
  { flag: '🇦🇪', name: 'UAE', visaType: 'Employment Visa / Golden Visa', salary: 'AED 150K+', demand: 'Finance, IT, Hospitality' },
  { flag: '🇬🇧', name: 'United Kingdom', visaType: 'Skilled Worker Visa', salary: '£38K+', demand: 'Healthcare, IT, Education' },
  { flag: '🇦🇺', name: 'Australia', visaType: 'Employer Sponsored (482)', salary: 'AUD 75K+', demand: 'Mining, Nursing, IT' },
  { flag: '🇯🇵', name: 'Japan', visaType: 'Skilled Worker (SSW)', salary: '¥4.5M+', demand: 'Manufacturing, IT, Hospitality' },
]

const benefits = [
  'Earn in a strong foreign currency',
  'Gain international work experience',
  'Path to Permanent Residency in most countries',
  'Access to excellent social security & healthcare',
  'Career growth in globally competitive markets',
  'Cultural exposure and professional network',
]

const eligibility = [
  'A relevant job offer from a foreign employer (in most cases)',
  'Recognised educational qualification in the relevant field',
  'Minimum work experience (varies: 1–5 years by country)',
  'English or local language proficiency (IELTS / TOEFL / B1–B2)',
  'Clean criminal record',
  'Medical fitness certificate',
  'Financial stability (sufficient funds for initial stay)',
]

const documents = [
  'Valid Passport (min. 6–12 months validity)',
  'Signed Employment Contract or Job Offer Letter',
  'Educational Certificates & Transcripts',
  'Work Experience Letters / Reference Letters',
  'IELTS / Language Test Score',
  'Professional Licence (if applicable)',
  'Police Clearance Certificate',
  'Medical / Health Certificate',
  'Bank Statements (6 months)',
  'Passport Photos',
]

const processSteps = [
  { step: '01', title: 'Profile Evaluation', desc: 'We assess your education, experience, language scores, and target country requirements.' },
  { step: '02', title: 'Job Offer / LMIA Support', desc: 'We assist with sourcing a valid job offer or LMIA, or verify your existing offer.' },
  { step: '03', title: 'Document Preparation', desc: 'Full checklist, document organisation, translation and attestation support.' },
  { step: '04', title: 'Application Filing', desc: 'We prepare and submit your work visa application with accuracy and thoroughness.' },
  { step: '05', title: 'Embassy / Consulate Follow-up', desc: 'We track your application and respond promptly to any queries from the authority.' },
  { step: '06', title: 'Visa & Onboarding', desc: 'On approval, we guide pre-departure preparation and first-week checklist at your destination.' },
]

const faqs = [
  {
    id: '1',
    question: 'Can I apply for a work visa without a job offer?',
    answer: 'In most countries, a valid job offer is required for a work permit. However, Germany\'s Opportunity Card, UAE Freelance Visa, and Canada\'s Self-Employment visa allow you to enter and seek work without a prior offer. We advise the best option based on your profile.',
  },
  {
    id: '2',
    question: 'What is an LMIA and why do I need it for Canada?',
    answer: 'A Labour Market Impact Assessment (LMIA) is a document issued by Employment and Social Development Canada (ESDC) confirming that no Canadian citizen or PR holder is available to fill the position, and therefore, a foreign worker can be hired. We assist employers in obtaining LMIAs and help workers understand the process.',
  },
  {
    id: '3',
    question: 'How long does a work visa take to process?',
    answer: 'Processing times vary significantly: UAE employment visas can take 2–4 weeks, UK Skilled Worker takes 3–8 weeks, Germany Skilled Worker takes 2–4 months, Canada Work Permit takes 2–6 months. We always provide realistic timelines specific to your case.',
  },
  {
    id: '4',
    question: 'Can I convert a work visa into a permanent residency?',
    answer: 'Yes, in most countries, work visas are the first step toward permanent residency. Canada (Express Entry), Germany (EU Blue Card to PR in 21 months), UK (Skilled Worker to Indefinite Leave to Remain), and Australia (482 to ENS 186) all offer clear PR pathways for work permit holders.',
  },
  {
    id: '5',
    question: 'Will my family be allowed to join me on a work visa?',
    answer: 'In most cases, yes. Most countries allow work permit holders to bring their spouse (who may also be permitted to work) and dependent children. The exact rules vary by country and visa type — we cover this in detail during your consultation.',
  },
]

export default function WorkVisaPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Work Visa Assistance',
          description: 'Overseas work permit, employer-sponsored visa, and relocation support.',
          url: 'https://avantika-immigration.com/services/work-visa',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Services', url: 'https://avantika-immigration.com/contact' },
          { name: 'Work Visa', url: 'https://avantika-immigration.com/services/work-visa' },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Work Visa' }]} dark />
          <div className="max-w-3xl mt-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm px-4 py-1.5 rounded-full mb-5 font-semibold">
              💼 Work Abroad
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Work Visa & <span className="text-gold-400">Overseas Employment</span> Services
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              Take your career global. We provide end-to-end work permit assistance for Canada, Germany, UAE,
              UK, Australia, and more — from job offer support to visa approval.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/eligibility" className="btn-secondary px-7 py-3.5 text-base">
                Check My Eligibility <ArrowRight size={17} />
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-7 py-3.5 rounded-xl font-semibold text-base transition-all">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="Overview" title="Why Work Abroad?" highlight="Work Abroad?" align="left" className="mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-xl">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/contact" className="btn-primary px-6 py-3">Talk to a Career Expert</Link>
              </div>
            </div>

            {/* Country mini cards */}
            <div>
              <SectionHeading label="Top Destinations" title="Where Can You Work?" align="left" className="mb-6" />
              <div className="space-y-3">
                {countries.map((c) => (
                  <div key={c.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-navy-50 transition-colors">
                    <span className="text-3xl flag-emoji flex-shrink-0">{c.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-navy-800 text-sm">{c.name}</div>
                      <div className="text-xs text-gray-500 truncate">{c.visaType}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-emerald-600">{c.salary}</div>
                      <div className="text-xs text-gray-400">{c.demand.split(',')[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <SectionHeading label="Eligibility" title="Who Can Apply?" highlight="Who Can Apply?" align="left" className="mb-6" />
              <div className="space-y-3">
                {eligibility.map((item) => (
                  <div key={item} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading label="Documentation" title="Documents Required" align="left" className="mb-6" />
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <FileText size={15} className="text-navy-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process + Form */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading label="Step-by-Step" title="Our Work Visa Process" align="left" className="mb-8" />
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-5 border border-gray-100 hover:border-emerald-200 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">
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
            <div className="lg:sticky lg:top-24">
              <ConsultationForm
                title="Work Visa Consultation"
                subtitle="Talk to a certified work permit expert and receive a practical job-search prep pack."
                source="work_visa_page_form"
                servicePreset="Work Permit / Work Visa"
                leadMagnetSlug="work-visa-job-search-pack"
              />
            </div>
          </div>
        </div>
      </section>

      <InlineLeadCapture
        title="Need help deciding between direct job search, sponsorship, and country-specific routes?"
        subtitle="Tell us your role, experience, and destination shortlist. We will identify the most realistic work-visa route and send the right preparation pack after submission."
        service="Work Permit / Work Visa"
        source="work_visa_inline_capture"
        leadMagnetSlug="work-visa-job-search-pack"
      />

      {/* FAQs */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="FAQs" title="Work Visa FAQs" align="center" className="mb-12" />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection title="Ready to Work Abroad?" subtitle="Let our certified work visa experts match you with the best overseas job and visa pathway." />
    </>
  )
}
