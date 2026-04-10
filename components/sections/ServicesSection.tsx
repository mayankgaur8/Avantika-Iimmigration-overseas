import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'
import { mainServices } from '@/lib/data/services'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ServicesSection() {
  return (
    <section className="section-pad bg-gray-50">
      <div className="container-pad">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            label="What We Do"
            title="Our Core Services"
            highlight="Core Services"
            subtitle="End-to-end support for every stage of your global journey — migration, work, study, visits, and coaching."
            align="left"
          />
          <Link href="/services" className="flex-shrink-0 flex items-center gap-1.5 text-navy-700 font-semibold text-sm hover:text-gold-600 transition-colors">
            View All Services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {mainServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 bg-gradient-to-r from-navy-700 to-navy-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Not sure which service is right for you?</h3>
            <p className="text-navy-300 text-sm">Take our free 2-minute assessment and we&apos;ll recommend the best pathway.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/eligibility" className="btn-secondary px-6 py-3 whitespace-nowrap">
              Free Eligibility Check
            </Link>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap">
              Talk to Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
