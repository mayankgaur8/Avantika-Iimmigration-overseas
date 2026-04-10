import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  const subscribers = await db.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-black text-navy-800">Newsletter Subscribers</h1>
      <div className="overflow-auto rounded-2xl bg-white shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">CRM Sync</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-navy-800">{subscriber.email}</td>
                <td className="px-4 py-3">{subscriber.source}</td>
                <td className="px-4 py-3">{subscriber.status}</td>
                <td className="px-4 py-3">{subscriber.crmSyncStatus}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(subscriber.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
