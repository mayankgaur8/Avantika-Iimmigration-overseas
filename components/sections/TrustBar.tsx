import Link from 'next/link'
import { BadgeCheck, Clock3, ShieldCheck, Star } from 'lucide-react'
import { CONTACT, TRUST } from '@/lib/config/contact'

const items = [
  {
    title: `${TRUST.googleRating}/5 Google rating`,
    description: `${TRUST.totalReviews}+ verified client reviews`,
    icon: Star,
  },
  {
    title: `${TRUST.successRate}% success rate`,
    description: 'Case screening before paid onboarding',
    icon: ShieldCheck,
  },
  {
    title: `${TRUST.yearsExperience}+ years in market`,
    description: 'Experienced immigration and overseas education advisors',
    icon: BadgeCheck,
  },
  {
    title: 'Fast response window',
    description: 'Most callbacks are handled within 2 business hours',
    icon: Clock3,
  },
]

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container-pad py-5">
        <div className="grid gap-4 md:grid-cols-4">
          {items.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl bg-gray-50 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-800">{title}</p>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-navy-800 px-5 py-4 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold">Need a same-day consultation?</p>
            <p className="text-sm text-navy-200">Call {CONTACT.phonePrimary} or go straight to a booking slot.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a href={CONTACT.telUrl} className="btn-outline border-white/30 text-white hover:bg-white/10 px-5 py-2.5 text-sm">
              Call Now
            </a>
            <Link href="/contact" className="btn-secondary px-5 py-2.5 text-sm text-center">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
