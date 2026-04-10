import { NextRequest } from 'next/server'
import { z } from 'zod'
import { enqueueCrmSync } from '@/lib/server/crm'
import { db } from '@/lib/server/db'
import { sendMail } from '@/lib/server/email'
import { eligibilityCompletionTemplate, leadAdminTemplate } from '@/lib/server/email/templates'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest, verifyTurnstileToken } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'
import { sanitizeEmail, sanitizeText } from '@/lib/utils/sanitize'

const eligibilitySchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email required').max(255),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid mobile number required'),
  currentCountry: z.string().min(1).max(80),
  targetCountry: z.string().min(1).max(80),
  interestedService: z.string().min(1).max(100),
  education: z.string().min(1).max(100),
  workExperience: z.string().min(1).max(80),
  englishScore: z.string().max(60).optional(),
  budget: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
  goals: z.string().max(1000).optional(),
  source: z.string().max(80).optional(),
  leadType: z.string().max(40).optional(),
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
  turnstileToken: z.string().optional(),
  company: z.string().max(0).optional(),
})

function calculateEligibilityScore(data: z.infer<typeof eligibilitySchema>) {
  let score = 0
  const pathways: string[] = []

  if (data.education.includes('Master') || data.education.includes('PhD')) score += 30
  else if (data.education.includes('Bachelor')) score += 20
  else if (data.education.includes('Diploma')) score += 12
  else score += 5

  if (data.workExperience.includes('8+')) score += 30
  else if (data.workExperience.includes('5-8') || data.workExperience.includes('5–8')) score += 24
  else if (data.workExperience.includes('3-5') || data.workExperience.includes('3–5')) score += 18
  else if (data.workExperience.includes('1-3') || data.workExperience.includes('1–3')) score += 10

  if (data.englishScore) {
    if (data.englishScore.includes('7') || data.englishScore.includes('65+')) score += 20
    else if (data.englishScore.includes('6')) score += 14
    else if (data.englishScore.includes('5')) score += 6
  }

  if (data.targetCountry === 'Canada' && score >= 50) pathways.push('Canada Express Entry')
  if (data.targetCountry === 'Germany') pathways.push('Germany Opportunity Card')
  if (data.targetCountry === 'Australia' && score >= 45) pathways.push('Australia Skilled Migration')
  if (data.targetCountry === 'UAE') pathways.push('UAE Employment Route')
  if (data.interestedService === 'Student Visa') pathways.push('Student Visa Program')
  if (pathways.length === 0) pathways.push('Consultation Recommended')

  return {
    score,
    level: score >= 60 ? 'High' : score >= 35 ? 'Medium' : 'Low',
    recommendedPathways: pathways,
  }
}

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  // rateLimit() is a no-op in development (bypass lives in lib/utils/rateLimit.ts)
  const limiter = rateLimit(getClientId(req, 'eligibility'), { limit: 10, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  try {
    const raw = await req.json()
    const parsed = eligibilitySchema.safeParse(raw)

    if (!parsed.success) {
      return failure('Invalid form data', 422, parsed.error.flatten())
    }

    if (parsed.data.company && parsed.data.company.length > 0) {
      return success({ submissionId: 'BOT', message: 'Captured' }, 201)
    }

    // verifyTurnstileToken returns true when TURNSTILE_SECRET_KEY is not set (dev)
    const captchaValid = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!captchaValid) {
      return failure('Captcha verification failed.', 400)
    }

    // ── Score is calculated and returned immediately ──────────────
    // DB write, CRM sync, and emails all run in the background.
    // This means the user always gets their score even when DATABASE_URL
    // is not configured (dev) or any downstream service is unavailable.
    const assessment = calculateEligibilityScore(parsed.data)
    const externalId = `ELIG-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const clientId   = getClientId(req)
    const userAgent  = req.headers.get('user-agent') ?? ''

    // ── Fire-and-forget: DB + CRM + email ────────────────────────
    void (async () => {
      try {
        const submission = await db.eligibilitySubmission.create({
          data: {
            externalId,
            name:               sanitizeText(parsed.data.name),
            email:              sanitizeEmail(parsed.data.email),
            phone:              parsed.data.phone,
            currentCountry:     sanitizeText(parsed.data.currentCountry),
            targetCountry:      sanitizeText(parsed.data.targetCountry),
            interestedService:  sanitizeText(parsed.data.interestedService),
            education:          sanitizeText(parsed.data.education),
            workExperience:     sanitizeText(parsed.data.workExperience),
            englishScore:       sanitizeText(parsed.data.englishScore ?? ''),
            budget:             sanitizeText(parsed.data.budget ?? ''),
            timeline:           sanitizeText(parsed.data.timeline ?? ''),
            goals:              sanitizeText(parsed.data.goals ?? ''),
            score:              assessment.score,
            level:              assessment.level,
            recommendedPathways: assessment.recommendedPathways,
            source:             sanitizeText(parsed.data.source ?? 'eligibility_wizard'),
            leadType:           sanitizeText(parsed.data.leadType ?? 'eligibility'),
            consent:            Boolean(parsed.data.consent),
            pageUrl:            parsed.data.pageUrl,
            pagePath:           sanitizeText(parsed.data.pagePath ?? ''),
            pageTitle:          sanitizeText(parsed.data.pageTitle ?? ''),
            referrer:           parsed.data.referrer,
            utmSource:          sanitizeText(parsed.data.utmSource ?? ''),
            utmMedium:          sanitizeText(parsed.data.utmMedium ?? ''),
            utmCampaign:        sanitizeText(parsed.data.utmCampaign ?? ''),
            utmTerm:            sanitizeText(parsed.data.utmTerm ?? ''),
            utmContent:         sanitizeText(parsed.data.utmContent ?? ''),
            gclid:              sanitizeText(parsed.data.gclid ?? ''),
            fbclid:             sanitizeText(parsed.data.fbclid ?? ''),
            timezone:           sanitizeText(parsed.data.timezone ?? ''),
            viewport:           sanitizeText(parsed.data.viewport ?? ''),
            clientId,
            userAgent,
          },
        })

        await db.leadActivity.create({
          data: {
            eligibilitySubmissionId: submission.id,
            type:    'created',
            message: 'Eligibility submission created',
          },
        })

        const crmResult = await enqueueCrmSync({
          entity:   'eligibility',
          queuedAt: new Date().toISOString(),
          payload:  {
            name:              submission.name,
            email:             submission.email,
            phone:             submission.phone,
            source:            submission.source,
            targetCountry:     submission.targetCountry,
            interestedService: submission.interestedService,
            level:             submission.level,
          },
        })

        await db.eligibilitySubmission.update({
          where: { id: submission.id },
          data:  {
            crmSyncStatus:  crmResult.success ? 'synced' : 'failed',
            crmProvider:    crmResult.provider,
            crmExternalId:  crmResult.externalId,
            crmLastSyncedAt: crmResult.success ? new Date() : undefined,
            crmLastError:   crmResult.error,
          },
        })

        await db.leadActivity.create({
          data: {
            eligibilitySubmissionId: submission.id,
            type:    'crm_sync',
            message: crmResult.success ? 'CRM sync succeeded' : 'CRM sync failed',
            metadata: {
              success:    crmResult.success,
              provider:   crmResult.provider,
              externalId: crmResult.externalId ?? null,
              error:      crmResult.error ?? null,
            },
          },
        })

        const userMail = eligibilityCompletionTemplate({
          name:       submission.name,
          scoreLevel: submission.level,
          pathways:   submission.recommendedPathways,
        })
        await sendMail({ to: submission.email, subject: userMail.subject, html: userMail.html })

        const adminMail = leadAdminTemplate({
          name:    submission.name,
          email:   submission.email,
          phone:   submission.phone,
          service: submission.interestedService,
          source:  submission.source,
        })
        await sendMail({
          to:      process.env.EMAIL_TO_ADMIN ?? process.env.NEXT_PUBLIC_EMAIL_PRIMARY ?? 'admin@example.com',
          subject: `[Eligibility] ${adminMail.subject}`,
          html:    adminMail.html,
        })
      } catch (bgError) {
        void reportApiError('api_eligibility_background_failed', bgError)
      }
    })()

    return success(
      {
        message:            'Assessment submitted. Our consultant will review your profile and contact you within 24 hours.',
        submissionId:       externalId,
        preliminaryScore:   assessment.level,
        recommendedPathways: assessment.recommendedPathways,
      },
      201
    )
  } catch (error) {
    await reportApiError('api_eligibility_post_failed', error)
    return failure('Server error. Please try again.', 500)
  }
}

export async function GET() {
  return failure('Method not allowed', 405)
}
