import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import CountryCard from '@/components/ui/CountryCard'
import { featuredCountries } from '@/lib/data/countries'

export default function DestinationsSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-pad">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            label="Top Destinations"
            title="Popular Migration Destinations"
            highlight="Migration Destinations"
            subtitle="Explore immigration opportunities in the world's most sought-after countries."
            align="left"
          />
          <Link href="/destinations" className="flex-shrink-0 flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-gold-600 transition-colors">
            All Destinations <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCountries.map((country, i) => (
            <CountryCard key={country.id} country={country} index={i} />
          ))}
        </div>

        {/* Country flags strip */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-5">
            More destinations we cover
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: 'New Zealand', flag: '🇳🇿' },
              { name: 'Singapore', flag: '🇸🇬' },
              { name: 'USA', flag: '🇺🇸' },
              { name: 'Portugal', flag: '🇵🇹' },
              { name: 'Malaysia', flag: '🇲🇾' },
              { name: 'Ireland', flag: '🇮🇪' },
              { name: 'Netherlands', flag: '🇳🇱' },
              { name: 'Norway', flag: '🇳🇴' },
            ].map(({ name, flag }) => (
              <div key={name} className="flex items-center gap-1.5 bg-gray-50 hover:bg-navy-50 rounded-full px-4 py-1.5 text-sm text-gray-600 hover:text-navy-700 font-medium transition-colors cursor-pointer">
                <span className="text-base flag-emoji">{flag}</span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
