import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, TrendingUp, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTASection from '@/components/sections/CTASection'
import { featuredCountries, allCountries } from '@/lib/data/countries'
import { pageMetadata } from '@/lib/config/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Immigration Destinations | Canada, Germany, Australia & More',
  description:
    'Explore top immigration destinations worldwide. Get expert guidance on Canada PR, Germany Opportunity Card, Australia skilled visa, UK, UAE, and more.',
  path: '/destinations',
})

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Destinations' },
]

export default function DestinationsPage() {
  const otherCountries = allCountries.filter(
    (c) => !featuredCountries.find((f) => f.id === c.id)
  )

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 text-white" style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6e 60%, #1e4080 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Our Immigration Destinations
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Where Do You Want to <span className="text-amber-400">Build Your Future?</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Avantika Immigration helps clients move to 10+ countries. Explore your options and find the right destination for your career and lifestyle goals.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Destinations"
            subtitle="Most popular immigration pathways our clients choose"
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link
                key={country.id}
                href={country.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card header gradient */}
                <div className={`bg-gradient-to-br ${country.color} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h2 className="text-xl font-bold">{country.name}</h2>
                      <p className="text-sm opacity-90">{country.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{country.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Clock className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <span>{country.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{country.successRate} success</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {country.visaTypes.slice(0, 3).map((v) => (
                      <span key={v} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {v}
                      </span>
                    ))}
                    {country.visaTypes.length > 3 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                        +{country.visaTypes.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center font-semibold text-blue-700 group-hover:text-amber-600 transition-colors">
                    Explore {country.name}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="More Destinations"
            subtitle="We also assist with immigration to these countries"
          />

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {otherCountries.map((country) => (
              <Link
                key={country.id}
                href={country.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center hover:border-amber-400 hover:bg-amber-50 transition-colors"
              >
                <span className="text-3xl">{country.flag}</span>
                <span className="text-sm font-medium text-gray-800">{country.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Avantika */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Trust Avantika Immigration?"
            subtitle="Expert guidance for your international move"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎯', title: '94% Visa Success Rate', desc: 'Consistently high approval rates across all destination countries.' },
              { icon: '📋', title: 'End-to-End Support', desc: 'From eligibility check to landing — we handle every step.' },
              { icon: '🌐', title: '10+ Countries Covered', desc: 'Expertise across North America, Europe, Australia, and Middle East.' },
              { icon: '⚡', title: 'Fast Processing', desc: 'We pre-screen applications to avoid delays and rejections.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-3 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
