import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, FileText, ArrowRight, GraduationCap, BookOpen } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ConsultationForm from '@/components/forms/ConsultationForm'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'
import InlineLeadCapture from '@/components/sections/InlineLeadCapture'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Student Visa Services | Study Abroad Assistance',
  description:
    'Study abroad with confidence using expert admissions, SOP, scholarship, and student visa support.',
  path: '/services/student-visa',
})

const studyDestinations = [
  { flag: '🇬🇧', name: 'United Kingdom', intake: 'Sep & Jan', cost: '£15,000–45,000/yr', pr: '2-yr PSW Visa' },
  { flag: '🇨🇦', name: 'Canada', intake: 'Jan, May & Sep', cost: 'CAD 20,000–40,000/yr', pr: 'PGWP → PR' },
  { flag: '🇦🇺', name: 'Australia', intake: 'Feb & Jul', cost: 'AUD 30,000–50,000/yr', pr: 'Subclass 485 → PR' },
  { flag: '🇩🇪', name: 'Germany', intake: 'Apr & Oct', cost: '€300–500 admin fees!', pr: 'Job Seeker → PR' },
  { flag: '🇺🇸', name: 'USA', intake: 'Aug/Sep & Jan', cost: 'USD 25,000–60,000/yr', pr: 'OPT/H-1B path' },
  { flag: '🇮🇪', name: 'Ireland', intake: 'Sep & Jan', cost: '€15,000–28,000/yr', pr: 'GNIB → Stamp 4' },
]

const services = [
  { icon: GraduationCap, title: 'University Admissions', desc: 'We help you choose the right program, shortlist universities, and submit complete applications.' },
  { icon: BookOpen, title: 'SOP Writing', desc: 'Professionally crafted Statement of Purpose tailored to each university\'s expectations.' },
  { icon: '📋', title: 'Student Visa Application', desc: 'Complete guidance from DS-160, CAS, eCOE to bank statements and visa interviews.' },
  { icon: '🏅', title: 'Scholarship Guidance', desc: 'We identify scholarships matching your profile and guide you through applications.' },
  { icon: '📝', title: 'IELTS / PTE Coaching', desc: 'Language test coaching to achieve the required score for admission and visa.' },
  { icon: '✈️', title: 'Pre-Departure Support', desc: 'Travel insurance, accommodation, orientation pack, and banking guidance.' },
]

const requirements = [
  'Accepted offer from a recognised institution (LoA / CAS / i20)',
  'Valid passport with at least 6 months validity',
  'IELTS / TOEFL / PTE score meeting the course requirement',
  'Academic transcripts and certificates',
  'Statement of Purpose (SOP)',
  'Proof of financial funds (bank statements)',
  'Sponsor letter / scholarship letter if applicable',
  'Health insurance documentation',
  'English medium instruction certificate (if applicable)',
  'GMAT / GRE score for business / engineering programs',
]

const faqs = [
  {
    id: '1',
    question: 'When should I start the student visa application?',
    answer: 'Ideally, start the process 6–9 months before your intended intake. This allows time for IELTS preparation (4–8 weeks), university applications (8–12 weeks), and visa processing (4–12 weeks). We map out a personalised timeline during your free consultation.',
  },
  {
    id: '2',
    question: 'What is a Statement of Purpose (SOP) and why is it important?',
    answer: 'An SOP is a 1–2 page essay explaining why you want to pursue the specific course, why at that university, and what your future goals are. A well-written SOP can make or break your admission and visa application. Our writers specialise in SOPs for each university and visa category.',
  },
  {
    id: '3',
    question: 'Can I work while studying on a student visa?',
    answer: 'Yes, in most countries. UK (20 hrs/week during term), Canada (20 hrs/week during term, unlimited during breaks), Australia (48 hrs/fortnight), Germany (120 full days or 240 half-days per year). This significantly offsets living costs.',
  },
  {
    id: '4',
    question: 'Can I stay back in the destination country after completing my degree?',
    answer: 'Yes! Most countries have post-study work visas: UK Graduate Visa (2 years), Canada PGWP (up to 3 years), Australia 485 visa (2–4 years), Germany (18-month job seeker). These are excellent pathways to permanent residency.',
  },
  {
    id: '5',
    question: 'How much does it cost to study in Germany?',
    answer: 'Germany\'s public universities are essentially free — you pay only €300–500/semester in administrative fees. Living costs (accommodation, food, transport) average €850–1,100/month. It remains the most cost-effective destination for world-class higher education.',
  },
]

export default function StudentVisaPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Student Visa Assistance',
          description: 'Study abroad admissions, SOP writing, scholarship guidance, and student visa support.',
          url: 'https://avantika-immigration.com/services/student-visa',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://avantika-immigration.com/' },
          { name: 'Services', url: 'https://avantika-immigration.com/contact' },
          { name: 'Student Visa', url: 'https://avantika-immigration.com/services/student-visa' },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-800 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Student Visa' }]} dark />
          <div className="max-w-3xl mt-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-5 font-semibold">
              🎓 Study Abroad
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Student Visa & <span className="text-gold-400">Study Abroad</span> Services
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              Study at world-ranked universities in the UK, Canada, Australia, Germany, or USA. We handle
              everything — from shortlisting universities to visa approval and pre-departure support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/eligibility" className="btn-secondary px-7 py-3.5 text-base">
                Free Eligibility Check <ArrowRight size={17} />
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-7 py-3.5 rounded-xl font-semibold text-base transition-all">
                Talk to a Study Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="Our Services" title="Complete Study Abroad Support" highlight="Study Abroad Support" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.title} className="card p-6">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                  {typeof svc.icon === 'string' ? (
                    <span className="text-2xl">{svc.icon}</span>
                  ) : (
                    <svc.icon size={22} className="text-purple-700" />
                  )}
                </div>
                <h4 className="font-bold text-navy-800 mb-2">{svc.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="Study Destinations" title="Where Do You Want to Study?" highlight="Want to Study?" align="center" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {studyDestinations.map((d) => (
              <div key={d.name} className="card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl flag-emoji">{d.flag}</span>
                  <h4 className="font-bold text-navy-800 text-lg">{d.name}</h4>
                </div>
                <div className="space-y-2 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Intake</span>
                    <span className="font-medium text-navy-700">{d.intake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Annual Cost</span>
                    <span className="font-medium text-navy-700">{d.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">PR Pathway</span>
                    <span className="font-medium text-emerald-600">{d.pr}</span>
                  </div>
                </div>
                <Link href={d.name === 'Canada' ? '/destinations/canada' : d.name === 'Germany' ? '/destinations/germany' : '/contact'}
                  className="block text-center text-sm font-semibold text-navy-700 bg-navy-50 hover:bg-navy-100 py-2 rounded-lg transition-colors">
                  Study in {d.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + Form */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading label="Requirements" title="Documents You Will Need" align="left" className="mb-8" />
              <div className="space-y-3">
                {requirements.map((req) => (
                  <div key={req} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <FileText size={15} className="text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ConsultationForm
                title="Study Abroad Consultation"
                subtitle="Free 30-minute session to map your university shortlist, language plan, and visa timeline."
                source="student_visa_page_form"
                servicePreset="Student Visa"
                leadMagnetSlug="ielts-band7-study-plan"
              />
            </div>
          </div>
        </div>
      </section>

      <InlineLeadCapture
        title="Need help choosing the right country, intake, and exam timeline?"
        subtitle="We assess your academics, budget, and long-term plans so you do not spend on the wrong shortlist or the wrong exam strategy."
        service="Student Visa"
        source="student_visa_inline_capture"
        leadMagnetSlug="ielts-band7-study-plan"
      />

      {/* FAQs */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="FAQs" title="Student Visa FAQs" align="center" className="mb-12" />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection title="Ready to Study at Your Dream University?" subtitle="Our study abroad advisors will find the right university, write your SOP, and secure your student visa." />
    </>
  )
}
