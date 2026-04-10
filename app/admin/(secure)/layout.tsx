import Link from 'next/link'
import { redirect } from 'next/navigation'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
import { getServerSession } from '@/lib/server/adminAuth'

export const dynamic = 'force-dynamic'

const nav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/eligibility', label: 'Eligibility' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/bookings', label: 'Bookings' },
]

export default async function AdminSecureLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container-pad flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-600">Admin Console</p>
            <h1 className="text-xl font-black text-navy-800">Avantika Operations</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-semibold text-navy-800">{session.name}</p>
              <p className="text-gray-500">{session.role}</p>
            </div>
            <AdminLogoutButton />
          </div>
        </div>
      </div>

      <div className="container-pad py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {children}
      </div>
    </main>
  )
}
