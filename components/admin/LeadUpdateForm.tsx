'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trackEvent } from '@/lib/utils/analytics'

const statuses = ['new', 'contacted', 'qualified', 'consultation_booked', 'converted', 'closed']

interface LeadUpdateFormProps {
  id: string
  status: string
  assignedConsultant?: string | null
  notes?: string | null
}

export default function LeadUpdateForm({ id, status, assignedConsultant, notes }: LeadUpdateFormProps) {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState(status)
  const [consultant, setConsultant] = useState(assignedConsultant ?? '')
  const [internalNotes, setInternalNotes] = useState(notes ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setMessage(null)

    const response = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: formStatus,
        assignedConsultant: consultant,
        notes: internalNotes,
      }),
    })

    const json = (await response.json().catch(() => ({}))) as { message?: string }

    if (!response.ok) {
      setMessage(json.message ?? 'Unable to update lead')
      setSaving(false)
      return
    }

    trackEvent('admin_status_change', { leadId: id, status: formStatus })
    setMessage('Lead updated successfully.')
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
      <h2 className="text-lg font-bold text-navy-800">Update Lead</h2>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Status</label>
        <select className="select-field" value={formStatus} onChange={(event) => setFormStatus(event.target.value)}>
          {statuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Assigned consultant</label>
        <input className="input-field" value={consultant} onChange={(event) => setConsultant(event.target.value)} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Internal notes</label>
        <textarea
          className="input-field min-h-40 resize-y"
          value={internalNotes}
          onChange={(event) => setInternalNotes(event.target.value)}
        />
      </div>

      {message && <p className="rounded-xl bg-navy-50 px-4 py-2 text-sm text-navy-700">{message}</p>}

      <button className="btn-primary px-6 py-2.5" disabled={saving} onClick={handleSave}>
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </div>
  )
}
