export interface LeadConfirmationInput {
  name: string
  service: string
  destination?: string
  leadMagnetUrl?: string
}

export function leadConfirmationTemplate(input: LeadConfirmationInput) {
  const destinationLine = input.destination ? `<p><strong>Destination:</strong> ${input.destination}</p>` : ''
  const magnetLine = input.leadMagnetUrl
    ? `<p>You can download your requested guide here: <a href="${input.leadMagnetUrl}">${input.leadMagnetUrl}</a></p>`
    : ''

  return {
    subject: 'We received your enquiry | Avantika Immigration',
    html: `
      <h2>Hello ${input.name},</h2>
      <p>Thank you for contacting Avantika Immigration & Overseas.</p>
      <p><strong>Service:</strong> ${input.service}</p>
      ${destinationLine}
      <p>One of our consultants will reach out within 2 business hours.</p>
      ${magnetLine}
      <p>Regards,<br/>Avantika Immigration & Overseas</p>
    `,
  }
}

export function leadAdminTemplate(input: { name: string; email: string; phone: string; service: string; source: string }) {
  return {
    subject: `New Lead: ${input.name} (${input.service})`,
    html: `
      <h2>New lead captured</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Phone:</strong> ${input.phone}</p>
      <p><strong>Service:</strong> ${input.service}</p>
      <p><strong>Source:</strong> ${input.source}</p>
    `,
  }
}

export function eligibilityCompletionTemplate(input: { name: string; scoreLevel: string; pathways: string[] }) {
  return {
    subject: 'Eligibility assessment received | Avantika Immigration',
    html: `
      <h2>Hello ${input.name},</h2>
      <p>Your eligibility profile has been received.</p>
      <p><strong>Preliminary score:</strong> ${input.scoreLevel}</p>
      <p><strong>Recommended pathways:</strong> ${input.pathways.join(', ')}</p>
      <p>Our consultant will review and contact you within 24 hours.</p>
    `,
  }
}

export function newsletterConfirmationTemplate() {
  return {
    subject: 'You are subscribed to immigration updates',
    html: `
      <h2>Subscription confirmed</h2>
      <p>Thank you for subscribing to Avantika immigration updates.</p>
      <p>You will receive practical guides, policy updates, and visa insights.</p>
    `,
  }
}
