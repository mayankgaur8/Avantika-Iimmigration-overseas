import { Download, CalendarDays, ShieldCheck } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { getLeadMagnetBySlug } from '@/lib/data/leadMagnets'

interface InlineLeadCaptureProps {
  title: string
  subtitle: string
  service: string
  destination?: string
  source: string
  leadMagnetSlug?: string
}

export default function InlineLeadCapture({
  title,
  subtitle,
  service,
  destination,
  source,
  leadMagnetSlug,
}: InlineLeadCaptureProps) {
  const leadMagnet = leadMagnetSlug ? getLeadMagnetBySlug(leadMagnetSlug) : undefined

  return (
    <section className="section-pad bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="container-pad">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
              Inline Lead Capture
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-200">{subtitle}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <CalendarDays size={18} className="text-gold-300" />
                <p className="mt-3 text-sm font-bold">Callback within 2 hours</p>
                <p className="mt-1 text-sm text-navy-200">Short intake form, then a real advisor takes over.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck size={18} className="text-gold-300" />
                <p className="mt-3 text-sm font-bold">Screened before you pay</p>
                <p className="mt-1 text-sm text-navy-200">We flag weak-fit cases early instead of pushing generic packages.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Download size={18} className="text-gold-300" />
                <p className="mt-3 text-sm font-bold">Downloadable planning assets</p>
                <p className="mt-1 text-sm text-navy-200">Use the lead magnet to prepare documents before the first call.</p>
              </div>
            </div>

            {leadMagnet && (
              <div className="mt-8 rounded-3xl border border-gold-400/20 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-300">Free Resource</p>
                <h3 className="mt-2 text-2xl font-black">{leadMagnet.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">{leadMagnet.description}</p>
                <ul className="mt-4 grid gap-2 text-sm text-navy-100 sm:grid-cols-2">
                  {leadMagnet.benefits.map((benefit) => (
                    <li key={benefit} className="rounded-xl bg-black/10 px-3 py-2">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ConsultationForm
            title="Request a Call Back"
            subtitle="Tell us your target plan and we will send the right consultant, checklist, and next-step guidance."
            servicePreset={service}
            destinationPreset={destination}
            source={source}
            leadMagnetSlug={leadMagnetSlug}
          />
        </div>
      </div>
    </section>
  )
}
