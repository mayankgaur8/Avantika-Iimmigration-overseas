import { redirect } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { getServerSession } from '@/lib/server/adminAuth'

export default async function AdminLoginPage() {
  const session = await getServerSession()
  if (session) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-md">
        <AdminLoginForm />
      </div>
    </main>
  )
}
