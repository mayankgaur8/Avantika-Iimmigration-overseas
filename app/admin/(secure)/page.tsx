import Link from 'next/link'
import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const [leadCount, eligibilityCount, newsletterCount, bookingCount, newLeadCount, convertedCount] =
    await Promise.all([
      db.lead.count(),
      db.eligibilitySubmission.count(),
      db.newsletterSubscriber.count(),
      db.bookingRequest.count(),
      db.lead.count({ where: { status: 'new' } }),
      db.lead.count({ where: { status: 'converted' } }),
    ])

  const cards = [
    { label: 'Total leads', value: leadCount, href: '/admin/leads' },
    { label: 'New leads', value: newLeadCount, href: '/admin/leads?status=new' },
    { label: 'Converted leads', value: convertedCount, href: '/admin/leads?status=converted' },
    { label: 'Eligibility submissions', value: eligibilityCount, href: '/admin/eligibility' },
    { label: 'Newsletter subscribers', value: newsletterCount, href: '/admin/newsletter' },
    { label: 'Booking requests', value: bookingCount, href: '/admin/bookings' },
  ]

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-2 text-3xl font-black text-navy-800">{card.value}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
