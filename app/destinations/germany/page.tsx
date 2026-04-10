import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Clock, DollarSign, TrendingUp, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ConsultationForm from '@/components/forms/ConsultationForm'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'
import InlineLeadCapture from '@/components/sections/InlineLeadCapture'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Germany Immigration 2024 | Opportunity Card and Work Visa',
  description:
    "Germany's Opportunity Card is open globally. Learn about Germany work visas, EU Blue Card, and skilled worker migration.",
  path: '/destinations/germany',
})

const visaCategories = [
  { name: 'Opportunity Card (Chancenkarte)', icon: '⭐', eligibility: 'Points-based: degree + experience + language', time: '3–5 months', fee: '~€75' },
  { name: 'Skilled Worker Visa', icon: '👷', eligibility: 'Recognised qualification + job offer', time: '3–6 months', fee: '~€75' },
  { name: 'EU Blue Card', icon: '💙', eligibility: 'Degree + job offer + min. €43,992/year salary', time: '2–4 months', fee: '~€100' },
  { name: 'Job Seeker Visa', icon: '🔍', eligibility: 'Degree, funds to support 6 months stay', time: '4–8 weeks', fee: '~€75' },
  { name: 'Student Visa', icon: '🎓', eligibility: 'University admission + German or English proficiency', time: '4–12 weeks', fee: '~€75' },
  { name: 'Freelance Visa', icon: '💻', eligibility: 'German clients / market demand / sufficient funds', time: '2–4 months', fee: '~€100' },
]

const processSteps = [
  { step: '01', title: 'Points Assessment', desc: 'We evaluate your qualifications, language skills, and experience against Germany\'s Opportunity Card criteria.' },
  { step: '02', title: 'Credential Recognition', desc: 'Get your foreign qualifications assessed and recognised by German authorities (anabin database or ZAB).' },
  { step: '03', title: 'Document Preparation', desc: 'Translated documents, certified copies, proof of qualifications, bank statements, and health insurance.' },
  { step: '04', title: 'Embassy Appointment', desc: 'We prepare your German embassy interview checklist and help you schedule the appointment.' },
  { step: '05', title: 'Visa Approval', desc: 'Receive your Germany visa — typically within 8–12 weeks of application.' },
  { step: '06', title: 'Arrival & Registration', desc: 'We guide you through Anmeldung (address registration), health insurance, and settlement in Germany.' },
]

const opportunityCardCriteria = [
  { criterion: 'University degree recognised in Germany', points: 3 },
  { criterion: 'Vocational qualification (2+ years) recognised in Germany', points: 2 },
  { criterion: 'German language skills (A1+)', points: 1 },
  { criterion: 'English language skills (B2+)', points: 1 },
  { criterion: 'Below age 35', points: 1 },
  { criterion: 'Verified work experience in high-demand sector', points: 1 },
  { criterion: 'Prior visit or stay in Germany', points: 1 },
]

const faqs = [
  {
    id: '1',
    question: 'What is the Germany Opportunity Card (Chancenkarte)?',
    answer: 'The Opportunity Card is a new visa launched in June 2023 under Germany\'s new skilled immigration law. It allows skilled workers from outside the EU to enter Germany for up to 1 year to look for work. You earn it based on a points system covering qualifications, language skills, age, and prior Germany experience. You need at least 6 points to qualify.',
  },
  {
    id: '2',
    question: 'Do I need a job offer for the Germany Opportunity Card?',
    answer: 'No! The key advantage of the Opportunity Card is that you do NOT need a job offer. You enter Germany, look for work locally, and convert your visa to a work permit once employed. You must show sufficient funds (around €1,027/month) and have a minimum 6 points under the scheme.',
  },
  {
    id: '3',
    question: 'What German language level is required for a work visa?',
    answer: 'For most work visas, German is not mandatory if the job requires English. However, for the Opportunity Card, any German language skill (A1 or above) earns you 1 bonus point. The EU Blue Card often doesn\'t require German at all if the job is in an international environment.',
  },
  {
    id: '4',
    question: 'How can I get my qualifications recognised in Germany?',
    answer: 'Foreign qualifications are assessed through the anabin database or the Central Office for Foreign Education (ZAB). For regulated professions (doctors, nurses, engineers in certain sectors), a formal recognition process through the relevant German authority is required. We guide you through this entire process.',
  },
  {
    id: '5',
    question: 'Is university education free for immigrants in Germany?',
    answer: 'Yes! Public universities in Germany charge little to no tuition (typically €300–500/semester in admin fees). This applies to international students who move on a student visa. Germany is one of the few countries where you can get a world-class degree at minimal cost.',
  },
]

export default function GermanyPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Germany Immigration Advisory',
          description: 'Germany Opportunity Card, skilled worker, and study pathway consulting.',
          url: 'https://avantika-immigration.com/destinations/germany',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Destinations', url: 'https://avantika-immigration.com/blog' },
          { name: 'Germany', url: 'https://avantika-immigration.com/destinations/germany' },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        {/* German flag accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-yellow-400" />

        <div className="container-pad relative z-10">
          <Breadcrumb
            items={[{ label: 'Destinations', href: '/destinations' }, { label: 'Germany' }]}
            dark
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-5xl flag-emoji">🇩🇪</span>
                <div>
                  <div className="text-white/60 text-sm font-medium">Destination Guide</div>
                  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Germany</h1>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 text-sm px-4 py-2 rounded-full mb-5 font-semibold">
                ⭐ New Opportunity Card — Apply Without a Job Offer!
              </div>
              <p className="text-white/80 text-xl leading-relaxed mb-6">
                Germany&apos;s new Opportunity Card (Chancenkarte) lets skilled workers enter Europe&apos;s
                largest economy to find work. No job offer required. Free university education. Strong social security.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['No Job Offer Needed', 'Free University', 'EU Blue Card Eligible', 'Tax-Free Benefits'].map((h) => (
                  <span key={h} className="flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
                    <CheckCircle2 size={13} className="text-green-400" /> {h}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/eligibility" className="btn-secondary px-6 py-3">Check Eligibility</Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold transition-all">
                  Talk to Expert
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Success Rate', value: '88%', icon: TrendingUp, color: 'bg-yellow-500' },
                { label: 'Processing Time', value: '3–5 mo', icon: Clock, color: 'bg-blue-500' },
                { label: 'Avg. Salary', value: '€55K/yr', icon: DollarSign, color: 'bg-green-500' },
                { label: 'Visas Approved', value: '1,800+', icon: Users, color: 'bg-red-600' },
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

      {/* Opportunity Card Deep Dive */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading label="New in 2023" title="Germany Opportunity Card Explained" highlight="Opportunity Card" align="left" className="mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                The Chancenkarte is a game-changer for skilled workers globally. Instead of needing a job offer
                before applying, you earn points based on your profile and enter Germany to search for work.
                You need at least <strong>6 points</strong> from the criteria below.
              </p>

              <div className="space-y-3">
                {opportunityCardCriteria.map((item) => (
                  <div key={item.criterion} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                      {item.criterion}
                    </div>
                    <span className="flex-shrink-0 bg-gold-500 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-3">
                      +{item.points} pt{item.points > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                <p className="text-sm text-gold-800 font-medium">
                  💡 <strong>Minimum 6 points required.</strong> Most degree holders with basic English qualify easily. Check your score with our free assessment.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading label="Why Germany" title="Why Move to Germany?" highlight="Germany?" align="left" className="mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🏛️', title: 'EU Access', desc: 'Live and work freely across 27 EU countries.' },
                  { icon: '🎓', title: 'Free Education', desc: 'Public university education costs almost nothing.' },
                  { icon: '🏥', title: 'Social Security', desc: 'Comprehensive health, pension, and unemployment cover.' },
                  { icon: '💰', title: 'High Wages', desc: 'Average salary €55,000/year with strong worker rights.' },
                  { icon: '🌱', title: 'Green & Clean', desc: 'World leader in sustainability and quality of life.' },
                  { icon: '🔒', title: 'Safety', desc: 'One of Europe\'s safest countries for families.' },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-navy-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="Visa Types" title="Germany Visa Categories" highlight="Visa Categories" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visaCategories.map((visa) => (
              <div key={visa.name} className="card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{visa.icon}</span>
                  <h4 className="font-bold text-navy-800 text-base leading-tight">{visa.name}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{visa.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold-500" />
                    <span className="text-gray-600">{visa.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-gold-500" />
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

      {/* Process + Form */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading label="Application Process" title="How to Apply for Germany Visa" highlight="Germany Visa" align="left" className="mb-8" />
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-navy-700 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800 mb-0.5 text-sm">{step.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <ConsultationForm
                title="Speak to a Germany Immigration Expert"
                subtitle="Free profile evaluation for the Opportunity Card and other Germany visas."
                source="germany_page_form"
                servicePreset="Work Permit / Work Visa"
                destinationPreset="Germany"
                leadMagnetSlug="work-visa-job-search-pack"
              />
            </div>
          </div>
        </div>
      </section>

      <InlineLeadCapture
        title="Need to know if Germany is a strong fit before you apply?"
        subtitle="We review qualification recognition, employability, language requirements, and whether the Opportunity Card or an employer-backed route is the smarter move."
        service="Work Permit / Work Visa"
        destination="Germany"
        source="germany_inline_capture"
        leadMagnetSlug="work-visa-job-search-pack"
      />

      {/* FAQs */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="FAQs" title="Germany Immigration FAQs" align="center" className="mb-12" />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Move to Germany?"
        subtitle="Check if you qualify for the Germany Opportunity Card or Skilled Worker Visa with our free assessment."
      />
    </>
  )
}
