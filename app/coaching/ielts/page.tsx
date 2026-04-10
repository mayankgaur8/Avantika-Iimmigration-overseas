import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Clock, Star, Users, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ConsultationForm from '@/components/forms/ConsultationForm'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'IELTS Coaching | Expert IELTS Preparation | Band 7+ | Avantika Immigration',
  description:
    'Achieve IELTS Band 7+ with Avantika\'s expert-led coaching. Online and offline batches, mock tests, speaking practice, and personalised feedback. 95% pass rate.',
}

const modules = [
  {
    name: 'Listening',
    icon: '👂',
    duration: '30 minutes',
    questions: '40 questions',
    format: '4 sections, recorded conversations and monologues',
    tips: ['Practice with varied accents', 'Use prediction techniques', 'Focus on keywords'],
  },
  {
    name: 'Reading',
    icon: '📖',
    duration: '60 minutes',
    questions: '40 questions',
    format: '3 academic texts from books, journals, and newspapers',
    tips: ['Skim then scan strategy', 'Use context clues', 'Manage time per passage'],
  },
  {
    name: 'Writing',
    icon: '✍️',
    duration: '60 minutes',
    questions: 'Task 1 + Task 2',
    format: 'Task 1: Graph/Chart/Process (150 words), Task 2: Essay (250 words)',
    tips: ['Strong thesis statement', 'Academic vocabulary', 'Cohesion and coherence'],
  },
  {
    name: 'Speaking',
    icon: '🗣️',
    duration: '11–14 minutes',
    questions: '3 parts',
    format: 'Part 1: General, Part 2: Cue card, Part 3: Discussion',
    tips: ['Extend answers naturally', 'Use complex structures', 'Confident fluency'],
  },
]

const batches = [
  {
    name: 'Intensive Online',
    icon: '💻',
    duration: '4 weeks',
    hours: '60 hours',
    mode: 'Live Online',
    schedule: 'Mon–Fri, 2 hrs/day',
    features: ['Live sessions with expert trainer', 'Weekly mock tests', 'Recording access', 'WhatsApp support group'],
    price: '₹12,000',
    popular: true,
  },
  {
    name: 'Weekend Batch',
    icon: '📅',
    duration: '8 weeks',
    hours: '64 hours',
    mode: 'Online / Offline',
    schedule: 'Sat & Sun, 4 hrs/day',
    features: ['Flexible schedule', 'Recorded sessions', 'Full mock test series', 'One-on-one speaking sessions'],
    price: '₹10,000',
    popular: false,
  },
  {
    name: 'Crash Course',
    icon: '⚡',
    duration: '2 weeks',
    hours: '40 hours',
    mode: 'Online',
    schedule: 'Mon–Sat, 4 hrs/day',
    features: ['Fast-track preparation', 'High-intensity mock tests', 'Module-wise focus', 'Result in 10 days'],
    price: '₹8,000',
    popular: false,
  },
]

const results = [
  { name: 'Priya S.', band: '8.0', module: 'Overall', destination: '→ Canada PR' },
  { name: 'Arjun N.', band: '7.5', module: 'Overall', destination: '→ UK Study Visa' },
  { name: 'Kavitha R.', band: '8.5', module: 'Listening', destination: '→ Australia 189 Visa' },
  { name: 'Rahul M.', band: '7.0', module: 'Overall', destination: '→ Germany Work Visa' },
  { name: 'Deepa P.', band: '9.0', module: 'Reading', destination: '→ Academic IELTS' },
  { name: 'Sameer K.', band: '7.5', module: 'Speaking', destination: '→ New Zealand PR' },
]

const faqs = [
  {
    id: '1',
    question: 'How long does it take to prepare for IELTS?',
    answer: 'Most students need 4–12 weeks depending on their current English level and target band score. Our intensive 4-week batch is ideal for those who already have a solid English foundation. We assess your current level in the first class and create a personalised study plan.',
  },
  {
    id: '2',
    question: 'What is the difference between Academic and General Training IELTS?',
    answer: 'Academic IELTS is for university admissions and skilled migration (Australia, Canada CEC). General Training is for secondary education, work experience, or migration to Australia (General stream) and Canada. Both have the same Listening and Speaking tests but different Reading and Writing tasks. We cover both in our coaching.',
  },
  {
    id: '3',
    question: 'What band score is needed for Canada PR?',
    answer: 'For Canada Express Entry (Federal Skilled Worker), you need a minimum CLB 7 across all modules (typically IELTS 6.0–6.5 in each module). However, a higher band score earns you more CRS points: Band 8.0 = CLB 10 = significantly higher CRS. We train you to score as high as possible, not just the minimum.',
  },
  {
    id: '4',
    question: 'Do you offer one-on-one IELTS coaching?',
    answer: 'Yes! We offer personalised one-on-one sessions for Speaking practice and Writing evaluation. These are available as add-ons to any batch or as standalone sessions at ₹999/session. Our speaking trainers have Band 9.0 scores and professional teaching experience.',
  },
  {
    id: '5',
    question: 'How many mock tests are included in the course?',
    answer: 'Our 4-week intensive batch includes 8 full mock tests plus 20+ section-wise practice tests. Each mock test is followed by a detailed performance analysis report. We simulate real exam conditions so you\'re completely familiar with the test on exam day.',
  },
]

export default function IELTSCoachingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-800 via-navy-800 to-navy-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Coaching', href: '/coaching' }, { label: 'IELTS' }]} dark />
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-5">
                📝 Language Coaching
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
                IELTS Coaching —{' '}
                <span className="text-gold-400">Band 7+ Guaranteed*</span>
              </h1>
              <p className="text-white/70 text-xl leading-relaxed mb-8">
                Join 5,000+ students who achieved their target band score with Avantika&apos;s expert IELTS program.
                Online, offline, weekend, and crash course batches available.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '95%', label: 'Pass Rate' },
                  { value: '7.5+', label: 'Avg. Band Score' },
                  { value: '5,000+', label: 'Students Trained' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center border border-white/20">
                    <div className="text-2xl font-black text-gold-400">{stat.value}</div>
                    <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/contact" className="btn-secondary px-6 py-3">Book Demo Class</Link>
                <Link href="#batches" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold transition-all">
                  View Batches
                </Link>
              </div>
              <p className="text-white/40 text-xs mt-3">*Band 7+ guarantee subject to full attendance and mock test completion terms.</p>
            </div>

            {/* Stars / Recent Results */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Recent Student Results</h3>
              <div className="space-y-3">
                {results.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <div className="w-9 h-9 bg-gold-500/20 rounded-lg flex items-center justify-center text-gold-400 font-black text-sm">
                      {r.band}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{r.name}</div>
                      <div className="text-white/50 text-xs">{r.module} Band</div>
                    </div>
                    <div className="text-emerald-400 text-xs font-semibold">{r.destination}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="Curriculum" title="All Four IELTS Modules Covered" highlight="Four IELTS Modules" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <div key={mod.name} className="card p-6">
                <div className="text-4xl mb-3">{mod.icon}</div>
                <h4 className="font-bold text-navy-800 text-lg mb-1">{mod.name}</h4>
                <div className="text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5 mb-1"><Clock size={12} /> {mod.duration}</div>
                  <div className="text-xs">{mod.format}</div>
                </div>
                <ul className="space-y-1.5">
                  {mod.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <Star size={10} className="text-gold-500 flex-shrink-0 mt-0.5 fill-gold-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batches */}
      <section id="batches" className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="Course Options" title="Choose Your Batch" highlight="Your Batch" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {batches.map((batch) => (
              <div key={batch.name} className={`card p-6 relative ${batch.popular ? 'ring-2 ring-gold-500' : ''}`}>
                {batch.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-3xl mb-3">{batch.icon}</div>
                <h4 className="font-bold text-navy-800 text-xl mb-2">{batch.name}</h4>
                <div className="text-3xl font-black text-navy-700 mb-1">{batch.price}</div>
                <div className="text-xs text-gray-400 mb-4">one-time · includes all materials</div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="font-bold text-navy-700">{batch.duration}</div>
                    <div className="text-xs text-gray-400">Duration</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="font-bold text-navy-700">{batch.hours}</div>
                    <div className="text-xs text-gray-400">Total Hours</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-semibold">Mode:</span> {batch.mode} · {batch.schedule}
                </div>

                <ul className="space-y-2 mb-5">
                  {batch.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    batch.popular
                      ? 'bg-gold-500 hover:bg-gold-400 text-white shadow-cta'
                      : 'bg-navy-50 hover:bg-navy-100 text-navy-700'
                  }`}
                >
                  Enrol Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo class + Form */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading label="Why Avantika IELTS" title="What Makes Our Program Different?" align="left" className="mb-8" />
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: 'Expert Trainers Only', desc: 'All trainers hold IELTS Band 8.5+ and have 5+ years of professional teaching experience.' },
                  { icon: '📊', title: 'Performance Analytics', desc: 'After every mock test, receive a detailed band-wise performance report with specific improvement areas.' },
                  { icon: '🎯', title: 'Module-Specific Strategies', desc: 'Learn proven time-management techniques and question-type strategies for each section.' },
                  { icon: '🗣️', title: 'Speaking Focus', desc: '6 dedicated speaking sessions with one-on-one feedback from certified trainers.' },
                  { icon: '📱', title: '24/7 Study App', desc: 'Access recorded classes, vocabulary lists, and practice tests from anywhere, anytime.' },
                  { icon: '🔁', title: 'Retake Support', desc: 'Didn\'t reach your target? Enrol in the next batch at 50% discount — our commitment to your success.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-navy-800 mb-0.5">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ConsultationForm
                title="Register for Free Demo Class"
                subtitle="Join a live IELTS demo session and experience our teaching method before enrolling."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="FAQs" title="IELTS Coaching FAQs" align="center" className="mb-12" />
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection title="Start Your IELTS Journey Today" subtitle="Join 5,000+ successful students. Book your free demo class and take the first step toward your target band score." />
    </>
  )
}
