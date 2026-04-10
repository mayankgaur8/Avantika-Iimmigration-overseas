'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const json = (await response.json().catch(() => ({}))) as { message?: string }

    if (!response.ok) {
      setError(json.message ?? 'Login failed')
      setLoading(false)
      return
    }

    router.replace('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-card">
      <h1 className="text-2xl font-black text-navy-800">Admin Login</h1>
      <p className="text-sm text-gray-500">Sign in to manage leads, submissions, bookings, and operations.</p>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input-field"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input-field"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
