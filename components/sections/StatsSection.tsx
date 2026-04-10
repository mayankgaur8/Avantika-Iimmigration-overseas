import StatsCounter from '@/components/ui/StatsCounter'
import Link from 'next/link'

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container-pad py-20 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-gold-500 inline-block" />
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Our Impact</span>
            <span className="w-8 h-0.5 bg-gold-500 inline-block" />
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Numbers That <span className="text-gold-400">Define Our Trust</span>
          </h2>
          <p className="text-navy-300 text-lg mt-4 max-w-xl mx-auto">
            Every milestone represents a family that found its new home, a professional who found their dream career, a student who built their future.
          </p>
        </div>

        <StatsCounter />

        {/* Certifications / trust logos */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-center text-navy-400 text-xs font-semibold uppercase tracking-widest mb-8">
            Accreditations & Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: 'ICCRC Member', icon: '🏛️' },
              { name: 'OISC Registered', icon: '⚖️' },
              { name: 'MARA Registered', icon: '🦘' },
              { name: 'ISO 9001:2015', icon: '✅' },
              { name: 'Google Reviews 4.9★', icon: '⭐' },
            ].map((cert) => (
              <div key={cert.name} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <span className="text-xl">{cert.icon}</span>
                <span className="text-white/70 text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-navy-300 mb-5">Ready to become our next success story?</p>
          <Link href="/eligibility" className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold text-base px-10 py-4 rounded-xl shadow-cta transition-all">
            Check Your Eligibility — Free
          </Link>
        </div>
      </div>
    </section>
  )
}
