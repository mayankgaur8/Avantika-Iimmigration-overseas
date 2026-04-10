import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import { reportApiError } from '@/lib/server/monitoring'

export interface MailInput {
  to: string
  subject: string
  html: string
}

function getProvider() {
  return process.env.EMAIL_PROVIDER ?? 'nodemailer'
}

async function sendWithResend(input: MailInput) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!key || !from) throw new Error('Resend is not configured')

  const resend = new Resend(key)
  await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  })
}

async function sendWithSendgrid(input: MailInput) {
  const apiKey = process.env.SENDGRID_API_KEY
  const from = process.env.EMAIL_FROM
  if (!apiKey || !from) throw new Error('SendGrid is not configured')

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: input.to }] }],
      from: { email: from },
      subject: input.subject,
      content: [{ type: 'text/html', value: input.html }],
    }),
  })

  if (!response.ok) {
    throw new Error(`SendGrid failed: ${response.status}`)
  }
}

async function sendWithNodemailer(input: MailInput) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.EMAIL_FROM

  if (!host || !user || !pass || !from) {
    throw new Error('SMTP is not configured')
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
  })
}

export async function sendMail(input: MailInput) {
  const provider = getProvider()

  // No-op when email is explicitly disabled or unconfigured
  if (provider === 'none' || !provider) {
    console.info('[email] skipped (EMAIL_PROVIDER=none)', { to: input.to, subject: input.subject })
    return
  }

  try {
    if (provider === 'resend') {
      await sendWithResend(input)
      return
    }

    if (provider === 'sendgrid') {
      await sendWithSendgrid(input)
      return
    }

    await sendWithNodemailer(input)
  } catch (error) {
    await reportApiError('email_send_failed', error, { provider, to: input.to, subject: input.subject })
    throw error
  }
}
