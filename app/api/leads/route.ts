import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getLeadMagnetBySlug } from '@/lib/data/leadMagnets'
import { enqueueCrmSync } from '@/lib/server/crm'
import { db } from '@/lib/server/db'
import { sendMail } from '@/lib/server/email'
import { leadAdminTemplate, leadConfirmationTemplate } from '@/lib/server/email/templates'
import { reportApiError } from '@/lib/server/monitoring'
import { failure, success } from '@/lib/server/apiResponse'
import { rejectUntrustedRequest, verifyTurnstileToken } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'
import { sanitizeEmail, sanitizeText } from '@/lib/utils/sanitize'

const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[\p{L}\s'\-.]+$/u, 'Name contains invalid characters'),
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  service: z.string().min(1).max(100),
  destination: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
  preferredCallbackTime: z.string().max(80).optional(),
  source: z.string().min(1).max(80),
  leadType: z.enum(['consultation', 'download', 'newsletter', 'booking']).optional(),
  leadMagnet: z.string().max(80).optional(),
  consent: z.boolean().optional(),
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
  tags: z.array(z.string().max(60)).max(8).optional(),
  turnstileToken: z.string().optional(),
  company: z.string().max(0, 'bot_detected').optional(),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'leads'), { limit: 5, windowSecs: 900 })
  if (!limiter.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((limiter.resetAt - Date.now()) / 1000)) } }
    )
  }

  try {
    const raw = await req.json()
    const parsed = leadSchema.safeParse(raw)

    if (!parsed.success) {
      return failure('Validation failed', 422, parsed.error.flatten())
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return success({ message: 'Captured', leadId: 'BOT' }, 201)
    }

    const captchaValid = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!captchaValid) {
      return failure('Captcha verification failed.', 400)
    }

    const leadMagnet = parsed.data.leadMagnet ? getLeadMagnetBySlug(parsed.data.leadMagnet) : undefined
    const externalId = `LEAD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

    const lead = await db.lead.create({
      data: {
        externalId,
        name: sanitizeText(parsed.data.name),
        email: sanitizeEmail(parsed.data.email),
        phone: parsed.data.phone,
        source: sanitizeText(parsed.data.source),
        serviceInterest: sanitizeText(parsed.data.service),
        destinationInterest: sanitizeText(parsed.data.destination ?? ''),
        message: sanitizeText(parsed.data.message ?? ''),
        preferredCallback: sanitizeText(parsed.data.preferredCallbackTime ?? ''),
        leadType: parsed.data.leadType ?? 'consultation',
        leadMagnet: leadMagnet?.slug,
        consent: Boolean(parsed.data.consent),
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
    })

    await db.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'created',
        message: 'Lead created via public form',
        metadata: { source: lead.source, serviceInterest: lead.serviceInterest },
      },
    })

    const crmResult = await enqueueCrmSync({
      entity: 'lead',
      queuedAt: new Date().toISOString(),
      payload: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        serviceInterest: lead.serviceInterest,
        destinationInterest: lead.destinationInterest,
      },
    })

    await db.lead.update({
      where: { id: lead.id },
      data: {
        crmSyncStatus: crmResult.success ? 'synced' : 'failed',
        crmProvider: crmResult.provider,
        crmExternalId: crmResult.externalId,
        crmLastSyncedAt: crmResult.success ? new Date() : undefined,
        crmLastError: crmResult.error,
      },
    })

    await db.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'crm_sync',
        message: crmResult.success ? 'CRM sync succeeded' : 'CRM sync failed',
        metadata: {
          success: crmResult.success,
          provider: crmResult.provider,
          externalId: crmResult.externalId ?? null,
          error: crmResult.error ?? null,
        },
      },
    })

    const confirmation = leadConfirmationTemplate({
      name: lead.name,
      service: lead.serviceInterest,
      destination: lead.destinationInterest ?? undefined,
      leadMagnetUrl: leadMagnet?.downloadPath,
    })

    await sendMail({ to: lead.email, subject: confirmation.subject, html: confirmation.html })

    const adminTemplate = leadAdminTemplate({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.serviceInterest,
      source: lead.source,
    })

    await sendMail({
      to: process.env.EMAIL_TO_ADMIN ?? process.env.NEXT_PUBLIC_EMAIL_PRIMARY ?? 'admin@example.com',
      subject: adminTemplate.subject,
      html: adminTemplate.html,
    })

    await db.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'email_sent',
        message: 'Lead confirmation and admin emails sent',
      },
    })

    return success(
      {
        message: 'Thank you. A consultant will contact you within 2 business hours.',
        leadId: lead.externalId,
        ...(leadMagnet?.downloadPath ? { downloadUrl: leadMagnet.downloadPath } : {}),
      },
      201
    )
  } catch (error) {
    await reportApiError('api_leads_post_failed', error)
    return failure('Server error. Please try again.', 500)
  }
}

export async function GET() {
  return failure('Method not allowed', 405)
}

export async function PUT() {
  return failure('Method not allowed', 405)
}

export async function DELETE() {
  return failure('Method not allowed', 405)
}
