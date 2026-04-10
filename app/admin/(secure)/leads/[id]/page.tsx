import { notFound } from 'next/navigation'
import LeadUpdateForm from '@/components/admin/LeadUpdateForm'
import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export default async function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await db.lead.findUnique({
    where: { id: params.id },
    include: { activities: { orderBy: { createdAt: 'desc' }, take: 50 } },
  })

  if (!lead) {
    notFound()
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h1 className="text-2xl font-black text-navy-800">{lead.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{lead.externalId}</p>

          <div className="mt-5 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone}</p>
            <p><strong>Service:</strong> {lead.serviceInterest}</p>
            <p><strong>Destination:</strong> {lead.destinationInterest || '-'}</p>
            <p><strong>Source:</strong> {lead.source}</p>
            <p><strong>Status:</strong> {lead.status}</p>
            <p><strong>UTM Source:</strong> {lead.utmSource || '-'}</p>
            <p><strong>UTM Campaign:</strong> {lead.utmCampaign || '-'}</p>
          </div>

          {lead.message && (
            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
              <strong>Message:</strong>
              <p className="mt-2 leading-relaxed">{lead.message}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-navy-800">Activity trail</h2>
          <div className="mt-4 space-y-3">
            {lead.activities.map((activity: any) => (
              <div key={activity.id} className="rounded-xl border border-gray-100 p-3 text-sm">
                <p className="font-semibold text-navy-800">{activity.type}</p>
                <p className="text-gray-600">{activity.message}</p>
                <p className="mt-1 text-xs text-gray-400">{new Date(activity.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LeadUpdateForm
        id={lead.id}
        status={lead.status}
        assignedConsultant={lead.assignedConsultant}
        notes={lead.notes}
      />
    </section>
  )
}
