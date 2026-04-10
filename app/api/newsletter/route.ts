import { NextRequest } from 'next/server'
import { z } from 'zod'
import { enqueueCrmSync } from '@/lib/server/crm'
import { db } from '@/lib/server/db'
import { sendMail } from '@/lib/server/email'
import { newsletterConfirmationTemplate } from '@/lib/server/email/templates'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest, verifyTurnstileToken } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'
import { sanitizeEmail, sanitizeText } from '@/lib/utils/sanitize'

const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email address').max(255),
  source: z.string().min(1).max(80),
  pageUrl: z.string().url().optional(),
  pagePath: z.string().max(200).optional(),
  pageTitle: z.string().max(200).optional(),
  referrer: z.string().url().optional().or(z.literal('')),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  gclid: z.string().max(200).optional(),
  fbclid: z.string().max(200).optional(),
  timezone: z.string().max(100).optional(),
  viewport: z.string().max(40).optional(),
  turnstileToken: z.string().optional(),
  company: z.string().max(0).optional(),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'newsletter'), { limit: 8, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  try {
    const raw = await req.json()
    const parsed = newsletterSchema.safeParse(raw)

    if (!parsed.success) {
      return failure('Validation failed', 422, parsed.error.flatten())
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return success({ message: 'Subscribed successfully.' }, 201)
    }

    const captchaValid = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!captchaValid) {
      return failure('Captcha verification failed.', 400)
    }

    const email = sanitizeEmail(parsed.data.email)

    const subscriber = await db.newsletterSubscriber.upsert({
      where: { email },
      create: {
        email,
        source: sanitizeText(parsed.data.source),
        pageUrl: parsed.data.pageUrl,
        pagePath: sanitizeText(parsed.data.pagePath ?? ''),
        pageTitle: sanitizeText(parsed.data.pageTitle ?? ''),
        referrer: parsed.data.referrer,
        utmSource: sanitizeText(parsed.data.utmSource ?? ''),
        utmMedium: sanitizeText(parsed.data.utmMedium ?? ''),
        utmCampaign: sanitizeText(parsed.data.utmCampaign ?? ''),
        utmTerm: sanitizeText(parsed.data.utmTerm ?? ''),
        utmContent: sanitizeText(parsed.data.utmContent ?? ''),
        gclid: sanitizeText(parsed.data.gclid ?? ''),
        fbclid: sanitizeText(parsed.data.fbclid ?? ''),
        timezone: sanitizeText(parsed.data.timezone ?? ''),
        viewport: sanitizeText(parsed.data.viewport ?? ''),
        clientId: getClientId(req),
        userAgent: req.headers.get('user-agent') ?? '',
      },
      update: {
        source: sanitizeText(parsed.data.source),
        status: 'active',
        pageUrl: parsed.data.pageUrl,
        pagePath: sanitizeText(parsed.data.pagePath ?? ''),
        pageTitle: sanitizeText(parsed.data.pageTitle ?? ''),
      },
    })

    const crmResult = await enqueueCrmSync({
      entity: 'newsletter',
      queuedAt: new Date().toISOString(),
      payload: {
        email: subscriber.email,
        source: subscriber.source,
      },
    })

    await db.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        crmSyncStatus: crmResult.success ? 'synced' : 'failed',
        crmProvider: crmResult.provider,
        crmExternalId: crmResult.externalId,
        crmLastSyncedAt: crmResult.success ? new Date() : undefined,
        crmLastError: crmResult.error,
      },
    })

    const template = newsletterConfirmationTemplate()
    await sendMail({ to: email, subject: template.subject, html: template.html })

    return success(
      {
        message: 'You are subscribed. Expect weekly immigration updates and practical checklists.',
        subscriptionId: subscriber.id,
      },
      201
    )
  } catch (error) {
    await reportApiError('api_newsletter_post_failed', error)
    return failure('Server error. Please try again.', 500)
  }
}

export async function GET() {
  return failure('Method not allowed', 405)
}
