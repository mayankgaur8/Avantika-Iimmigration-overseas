import type { Metadata } from 'next'
import { Shield, Clock, CheckCircle2, Star } from 'lucide-react'
import EligibilityWizard from '@/components/forms/EligibilityWizard'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Free Eligibility Check | Immigration & Visa Assessment | Avantika',
  description:
    'Check your immigration eligibility for free. Complete our 4-step assessment and our certified consultants will review your profile for Canada, Australia, Germany, UK, UAE and more.',
}

const reassurances = [
  { icon: Shield, text: 'Your data is 100% secure and never shared' },
  { icon: Clock, text: 'Takes less than 3 minutes to complete' },
  { icon: CheckCircle2, text: 'Reviewed by a certified consultant within 24 hours' },
  { icon: Star, text: 'Completely free — no credit card required' },
]

export default function EligibilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Free Eligibility Check' }]} dark />
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm px-4 py-1.5 rounded-full mb-5 font-semibold">
              ✅ Free Assessment
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Check Your <span className="text-gold-400">Immigration Eligibility</span> — Free
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Answer a few questions about your profile and our certified immigration experts will
              personally review your eligibility and suggest the best pathways within 24 hours.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reassurances.map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <item.icon size={18} className="text-gold-400" />
                  <span className="text-white/70 text-xs leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-card p-8 md:p-12">
            <EligibilityWizard />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-black text-navy-800 mb-10">What Happens After You Submit?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', icon: '📩', title: 'Instant Confirmation', desc: 'You receive a confirmation email with your assessment reference number immediately.' },
                { step: '2', icon: '👨‍💼', title: 'Expert Review', desc: 'A certified consultant personally reviews your profile and identifies the best immigration pathways.' },
                { step: '3', icon: '📞', title: 'Personal Callback', desc: 'We call you within 24 hours to discuss your options, timelines, and next steps — with no obligation.' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="w-7 h-7 bg-gold-500 text-white rounded-full text-sm font-black flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-navy-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
