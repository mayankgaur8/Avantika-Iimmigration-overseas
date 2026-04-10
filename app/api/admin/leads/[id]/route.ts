import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getApiSession } from '@/lib/server/adminAuth'
import { db } from '@/lib/server/db'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'
import { sanitizeText } from '@/lib/utils/sanitize'

const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'consultation_booked', 'converted', 'closed']).optional(),
  notes: z.string().max(4000).optional(),
  assignedConsultant: z.string().max(120).optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, `admin_lead_patch_${params.id}`), { limit: 60, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  const session = await getApiSession(req)
  if (!session) return failure('Unauthorized', 401)

  try {
    const parsed = updateLeadSchema.safeParse(await req.json())
    if (!parsed.success) {
      return failure('Invalid payload', 422, parsed.error.flatten())
    }

    const lead = await db.lead.findUnique({ where: { id: params.id } })
    if (!lead) return failure('Lead not found', 404)

    const updated = await db.lead.update({
      where: { id: params.id },
      data: {
        status: parsed.data.status,
        notes: parsed.data.notes ? sanitizeText(parsed.data.notes) : lead.notes,
        assignedConsultant: parsed.data.assignedConsultant
          ? sanitizeText(parsed.data.assignedConsultant)
          : lead.assignedConsultant,
      },
    })

    if (parsed.data.status && parsed.data.status !== lead.status) {
      await db.leadActivity.create({
        data: {
          leadId: lead.id,
          adminUserId: session.id,
          type: 'status_changed',
          message: `Lead status changed from ${lead.status} to ${parsed.data.status}`,
          metadata: { from: lead.status, to: parsed.data.status },
        },
      })
    }

    if (parsed.data.notes && parsed.data.notes !== lead.notes) {
      await db.leadActivity.create({
        data: {
          leadId: lead.id,
          adminUserId: session.id,
          type: 'note_added',
          message: 'Admin note updated',
        },
      })
    }

    return success({ message: 'Lead updated', lead: updated })
  } catch (error) {
    await reportApiError('admin_lead_update_failed', error, { leadId: params.id })
    return failure('Unable to update lead', 500)
  }
}
