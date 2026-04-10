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

const bookingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  preferredDate: z.string().max(40).optional(),
  preferredTime: z.string().max(40).optional(),
  consultationMode: z.string().max(40).optional(),
  notes: z.string().max(1000).optional(),
  source: z.string().min(1).max(80),
  serviceInterest: z.string().max(100).optional(),
  destinationInterest: z.string().max(80).optional(),
  pageUrl: z.string().url().optional(),
  pagePath: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  calendlyUrl: z.string().url().optional(),
  turnstileToken: z.string().optional(),
  company: z.string().max(0).optional(),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'bookings'), { limit: 5, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  try {
    const raw = await req.json()
    const parsed = bookingSchema.safeParse(raw)
    if (!parsed.success) {
      return failure('Validation failed', 422, parsed.error.flatten())
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return success({ message: 'Booking request captured.' }, 201)
    }

    const captchaValid = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!captchaValid) {
      return failure('Captcha verification failed.', 400)
    }

    const externalId = `BOOK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

    const booking = await db.bookingRequest.create({
      data: {
        externalId,
        name: sanitizeText(parsed.data.name),
        email: sanitizeEmail(parsed.data.email),
        phone: parsed.data.phone,
        preferredDate: sanitizeText(parsed.data.preferredDate ?? ''),
        preferredTime: sanitizeText(parsed.data.preferredTime ?? ''),
        consultationMode: sanitizeText(parsed.data.consultationMode ?? ''),
        notes: sanitizeText(parsed.data.notes ?? ''),
        source: sanitizeText(parsed.data.source),
        serviceInterest: sanitizeText(parsed.data.serviceInterest ?? ''),
        destinationInterest: sanitizeText(parsed.data.destinationInterest ?? ''),
        pageUrl: parsed.data.pageUrl,
        pagePath: sanitizeText(parsed.data.pagePath ?? ''),
        utmSource: sanitizeText(parsed.data.utmSource ?? ''),
        utmMedium: sanitizeText(parsed.data.utmMedium ?? ''),
        utmCampaign: sanitizeText(parsed.data.utmCampaign ?? ''),
        calendlyUrl: parsed.data.calendlyUrl,
        clientId: getClientId(req),
        userAgent: req.headers.get('user-agent') ?? '',
      },
    })

    await db.leadActivity.create({
      data: {
        bookingRequestId: booking.id,
        type: 'created',
        message: 'Booking request created',
      },
    })

    const adminMail = leadAdminTemplate({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      service: booking.serviceInterest ?? 'General consultation',
      source: booking.source,
    })

    await sendMail({
      to: process.env.EMAIL_TO_ADMIN ?? process.env.NEXT_PUBLIC_EMAIL_PRIMARY ?? 'admin@example.com',
      subject: `[Booking] ${adminMail.subject}`,
      html: `${adminMail.html}<p><strong>Preferred slot:</strong> ${booking.preferredDate} ${booking.preferredTime}</p>`,
    })

    return success(
      {
        bookingId: booking.externalId,
        message: 'Booking request submitted. Our team will confirm your slot shortly.',
      },
      201
    )
  } catch (error) {
    await reportApiError('api_bookings_post_failed', error)
    return failure('Server error. Please try again.', 500)
  }
}

export async function GET() {
  return failure('Method not allowed', 405)
}
