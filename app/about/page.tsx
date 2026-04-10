import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Globe, Heart, ShieldCheck, BriefcaseBusiness, Lightbulb, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import CTASection from '@/components/sections/CTASection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FounderSection from '@/components/sections/FounderSection'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'About Us | Avantika Immigration & Overseas',
  description:
    'Avantika Immigration & Overseas is guided by Mayank Gaur — 16+ years of IT and enterprise experience, now applied to help professionals and students build practical global careers.',
}

const timeline = [
  {
    period: 'Early 2000s',
    event: 'Started career in enterprise software development, working on large-scale Java-based applications.',
    icon: '💻',
  },
  {
    period: '2008 – 2012',
    event: 'Deepened expertise in backend systems, API design, and scalable application architecture.',
    icon: '⚙️',
  },
  {
    period: '2013 – 2018',
    event: 'Led solution delivery for complex, cloud-enabled enterprise systems across multiple domains.',
    icon: '☁️',
  },
  {
    period: '2018 – 2022',
    event: 'Expanded into microservices, cloud platforms (AWS & Azure), and system design for high-scale products.',
    icon: '🔧',
  },
  {
    period: '2022 – 2023',
    event: 'Began mentoring professionals on career strategy, international job markets, and global mobility options.',
    icon: '🎯',
  },
  {
    period: '2024',
    event: 'Founded Avantika Immigration & Overseas — a guidance-first consultancy built on real industry experience.',
    icon: '🚀',
  },
  {
    period: '2025 & Beyond',
    event: 'Building a digital-first model with personal, founder-led consultations and zero tolerance for false promises.',
    icon: '🌍',
  },
]

const values = [
  {
    Icon: ShieldCheck,
    title: 'Radical Honesty',
    description:
      'If a pathway is not right for your profile, we will tell you — clearly and early. We would rather lose a lead than waste your time and money.',
  },
  {
    Icon: BriefcaseBusiness,
    title: 'Industry-Backed Guidance',
    description:
      'Our advice comes from 16+ years of real technology and enterprise experience, not just immigration textbooks.',
  },
  {
    Icon: Lightbulb,
    title: 'Practical Over Theoretical',
    description:
      'We focus on what actually works for your profile, your budget, and your timeline — not what sounds impressive on a brochure.',
  },
  {
    Icon: Heart,
    title: 'Client-First Always',
    description:
      'Every recommendation is built around your long-term career interests, not around closing a sale.',
  },
  {
    Icon: Globe,
    title: 'Real Global Perspective',
    description:
      'We understand how international employers think, what overseas systems expect, and how Indian professionals can position themselves effectively.',
  },
  {
    Icon: Users,
    title: 'Personal Attention',
    description:
      'You speak directly with the founder — not a junior agent reading from a script. Your case gets real thinking, not a template.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'About Us' }]} dark />
          <div className="max-w-3xl mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Built on Real Experience.{' '}
              <span className="text-gold-400">Focused on Your Global Future.</span>
            </h1>
            <p className="text-navy-200 text-xl leading-relaxed">
              Avantika Immigration & Overseas is a guidance-first consultancy led by Mayank Gaur —
              a technologist with 16+ years of enterprise experience who now helps professionals
              and students pursue overseas opportunities with clarity, confidence, and direct support
              from our Aligarh head office.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Promise ──────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-navy-700 text-white rounded-2xl p-8">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-navy-200 leading-relaxed">
                To give every individual honest, practical guidance so they can pursue overseas careers,
                study opportunities, and immigration pathways without confusion, false hope, or wasted effort.
              </p>
            </div>
            <div className="bg-gold-500 text-white rounded-2xl p-8">
              <div className="text-3xl mb-4">🔭</div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gold-100 leading-relaxed">
                To build a consultancy that people trust not because of the marketing, but because of the
                quality of thinking and the integrity of every conversation — from the first call to the final approval.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Our Promise</h3>
              <p className="text-gray-500 leading-relaxed">
                We will always give you a straight, honest assessment of your profile. No inflated success
                rates. No pressured timelines. Just clear, professional guidance you can actually act on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────────────────────── */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left – Story */}
            <div>
              {/* Label */}
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5 bg-gold-500 inline-block" />
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                  The Journey Behind Avantika
                </span>
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-navy-800 leading-tight mb-7">
                From 16+ Years in Technology to{' '}
                <span className="text-gold-500">Guiding Global Careers</span>
              </h2>

              {/* Founder quote pull */}
              <blockquote className="border-l-4 border-gold-500 bg-gold-50 px-5 py-4 rounded-r-xl mb-7">
                <p className="text-navy-800 font-semibold text-base leading-relaxed italic">
                  &ldquo;I spent 16 years building enterprise systems. The most valuable thing I learned
                  is that good decisions come from honest information — not from what someone wants to hear.
                  That principle runs everything we do here.&rdquo;
                </p>
                <footer className="mt-2 text-sm font-bold text-gold-700 not-italic">
                  — Mayank Gaur, Founder
                </footer>
              </blockquote>

              <div className="space-y-5 text-gray-600 leading-relaxed text-[15px] md:text-base">
                <p>
                  Mayank Gaur spent over 16 years building enterprise software systems — working across
                  Java, Spring Boot, microservices, cloud infrastructure on AWS and Azure, and large-scale
                  system design. He has delivered end-to-end solutions for complex, high-scale applications,
                  and through that career developed a deep understanding of how global technology teams
                  operate, how employers evaluate international talent, and what it actually takes to build
                  a career that crosses borders.
                </p>
                <p>
                  Through his professional journey, Mayank saw firsthand how much confusion exists around
                  overseas careers and immigration pathways. Talented people were being misled by agencies
                  focused on paperwork volume rather than outcomes. Professionals were being pushed toward
                  countries and programs that did not match their profiles. Students were paying for guidance
                  that amounted to little more than form-filling. That gap — between what people deserve to
                  know and what they were actually being told — is the reason Avantika Immigration & Overseas
                  exists.
                </p>
                <p>
                  Today, Avantika operates as a digital-first, founder-led consultancy with one clear
                  priority: help you make a well-informed decision about your global future. Whether you
                  are exploring a Canada PR, a Germany work permit, a UK or Australian visa, or a study
                  opportunity abroad — you will get guidance that is honest about your chances, practical
                  about your options, and grounded in real industry experience. Not sales tactics. Not
                  inflated numbers. Just real guidance from someone who has built a career the hard way.
                </p>
                <p>
                  Our head office is in Aligarh, and our model is intentionally lean and transparent:
                  personal consultations, digital document support, and guidance that reflects the way
                  modern clients actually prefer to work across cities and schedules.
                </p>
              </div>

              {/* Trust signal chips */}
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  '16+ Years Enterprise Experience',
                  'Founder-Led Consultations',
                  'No False Promises',
                  'Digital-First Model',
                  'Real Job Market Insights',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-navy-50 text-navy-700 border border-navy-100 rounded-full px-3 py-1"
                  >
                    <CheckCircle2 size={11} className="text-gold-500 flex-shrink-0" />
                    {chip}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary px-7 py-3">
                  Talk to Mayank Gaur
                </Link>
                <Link href="/eligibility" className="btn-outline px-7 py-3">
                  Check My Eligibility
                </Link>
              </div>
            </div>

            {/* Right – Founder Journey Timeline */}
            <div>
              <div className="mb-7">
                <span className="inline-flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-gold-500 inline-block" />
                  <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">
                    Founder&apos;s Journey
                  </span>
                </span>
                <h3 className="mt-3 text-xl font-black text-navy-800">
                  A Career Built on Real-World Delivery
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Every milestone below is truthful. This is the experience behind your guidance.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-navy-100 space-y-5">
                {timeline.map((m, i) => (
                  <div key={i} className="relative group">
                    {/* Circle dot */}
                    <div className="absolute -left-[37px] w-7 h-7 rounded-full bg-white border-2 border-navy-200 group-hover:border-gold-500 flex items-center justify-center transition-colors">
                      <span className="text-[13px] leading-none">{m.icon}</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm group-hover:shadow-card group-hover:border-gold-200 transition-all">
                      <span className="text-xs font-black text-gold-600 uppercase tracking-wider">
                        {m.period}
                      </span>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom note */}
              <div className="mt-6 rounded-2xl bg-navy-800 p-5 text-center">
                <p className="text-white font-bold text-sm mb-1">Every consultation is with the founder.</p>
                <p className="text-navy-300 text-xs leading-relaxed">
                  You will not be handed off to a junior agent. When you book a call, you speak directly
                  with Mayank Gaur.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors"
                >
                  Book a Direct Consultation →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Founder Section (full) ───────────────────────────────────── */}
      <FounderSection compact={false} />

      {/* ── Our Values ──────────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            highlight="Stand For"
            subtitle="Six principles that guide every conversation, every assessment, and every recommendation we make."
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card p-6 flex gap-4 items-start">
                <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <v.Icon size={20} className="text-navy-700" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-800 mb-1.5">{v.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Approach Is Different ──────────────────────────── */}
      <section className="section-pad bg-navy-900">
        <div className="container-pad">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                Why We Are Different
              </span>
              <span className="w-6 h-0.5 bg-gold-500 inline-block" />
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              What You Will Not Get Here
            </h2>
            <p className="text-navy-300 mt-3 text-lg">
              There are things most agencies do that we have deliberately chosen not to do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                no: 'No inflated success statistics',
                yes: 'Honest outcome expectations based on your real profile',
              },
              {
                no: 'No pushing you toward the wrong pathway',
                yes: 'Pathways recommended only when they genuinely fit',
              },
              {
                no: 'No junior agents handling your case',
                yes: 'Direct conversation with the founder, every time',
              },
              {
                no: 'No fake certifications or fabricated credentials',
                yes: '16+ years of verifiable industry and delivery experience',
              },
              {
                no: 'No high-pressure sales tactics',
                yes: 'Take your time — we want informed clients, not rushed ones',
              },
              {
                no: 'No template-based advice',
                yes: 'A strategy built around your specific profile and goals',
              },
            ].map((item) => (
              <div key={item.no} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-red-400 text-base mt-0.5">✕</span>
                  <p className="text-navy-300 text-sm">{item.no}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 text-base mt-0.5">✓</span>
                  <p className="text-white text-sm font-semibold">{item.yes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <CTASection
        title="Ready to Plan Your Global Future with Someone Who Gets It?"
        subtitle="Book a direct consultation with Mayank Gaur. Get honest guidance on whether your target pathway makes sense — before you invest time or money."
      />
    </>
  )
}
