import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

export default async function AdminBookingsPage() {
  const bookings = await db.bookingRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-black text-navy-800">Booking Requests</h1>
      <div className="overflow-auto rounded-2xl bg-white shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Preferred Slot</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr key={booking.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-semibold text-navy-800">{booking.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{booking.email}</div>
                  <div>{booking.phone}</div>
                </td>
                <td className="px-4 py-3">{booking.preferredDate || '-'} {booking.preferredTime || ''}</td>
                <td className="px-4 py-3">{booking.consultationMode || '-'}</td>
                <td className="px-4 py-3">{booking.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
