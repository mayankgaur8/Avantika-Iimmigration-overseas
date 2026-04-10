import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export default async function AdminEligibilityPage() {
  const items = await db.eligibilitySubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-black text-navy-800">Eligibility Submissions</h1>
      <div className="overflow-auto rounded-2xl bg-white shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-navy-800">{item.name}</div>
                  <div className="text-gray-500">{item.email}</div>
                </td>
                <td className="px-4 py-3">{item.targetCountry}</td>
                <td className="px-4 py-3">{item.interestedService}</td>
                <td className="px-4 py-3">{item.level} ({item.score})</td>
                <td className="px-4 py-3">{item.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
