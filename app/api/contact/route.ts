import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/server/db'
import { sendMail } from '@/lib/server/email'
import { leadAdminTemplate } from '@/lib/server/email/templates'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest, verifyTurnstileToken } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'
import { sanitizeEmail, sanitizeText } from '@/lib/utils/sanitize'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(120).optional(),
  message: z.string().min(5).max(2000),
  source: z.string().max(80).optional(),
  pageUrl: z.string().url().optional(),
  pagePath: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  turnstileToken: z.string().optional(),
  company: z.string().max(0).optional(),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'contact'), { limit: 6, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  try {
    const raw = await req.json()
    const parsed = contactSchema.safeParse(raw)
    if (!parsed.success) {
      return failure('Validation failed', 422, parsed.error.flatten())
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return success({ message: 'Message captured.' }, 201)
    }

    const captchaValid = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!captchaValid) {
      return failure('Captcha verification failed.', 400)
    }

    const externalId = `MSG-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

    const message = await db.contactMessage.create({
      data: {
        externalId,
        name: sanitizeText(parsed.data.name),
        email: sanitizeEmail(parsed.data.email),
        phone: sanitizeText(parsed.data.phone ?? ''),
        subject: sanitizeText(parsed.data.subject ?? ''),
        message: sanitizeText(parsed.data.message),
        source: sanitizeText(parsed.data.source ?? 'contact_form'),
        pageUrl: parsed.data.pageUrl,
        pagePath: sanitizeText(parsed.data.pagePath ?? ''),
        utmSource: sanitizeText(parsed.data.utmSource ?? ''),
        utmMedium: sanitizeText(parsed.data.utmMedium ?? ''),
        utmCampaign: sanitizeText(parsed.data.utmCampaign ?? ''),
        clientId: getClientId(req),
        userAgent: req.headers.get('user-agent') ?? '',
      },
    })

    const adminMail = leadAdminTemplate({
      name: message.name,
      email: message.email,
      phone: message.phone ?? '-',
      service: message.subject || 'Contact message',
      source: message.source,
    })

    await sendMail({
      to: process.env.EMAIL_TO_ADMIN ?? process.env.NEXT_PUBLIC_EMAIL_PRIMARY ?? 'admin@example.com',
      subject: `[Contact] ${adminMail.subject}`,
      html: `${adminMail.html}<p><strong>Message:</strong> ${message.message}</p>`,
    })

    return success({ message: 'Message received. Our team will get back to you shortly.' }, 201)
  } catch (error) {
    await reportApiError('api_contact_post_failed', error)
    return failure('Server error. Please try again.', 500)
  }
}

export async function GET() {
  return failure('Method not allowed', 405)
}
