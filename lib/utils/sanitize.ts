/**
 * Strip HTML tags and dangerous characters from user input.
 * Server-side only. Prevents stored-XSS if values are later echoed in emails/admin views.
 */
export function sanitizeText(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw
    .replace(/<[^>]*>/g, '')                   // strip tags
    .replace(/[<>"'`]/g, '')                   // strip remaining dangerous chars
    .replace(/\s+/g, ' ')                      // normalize whitespace
    .trim()
    .slice(0, 2000)                            // hard cap
}

export function sanitizeEmail(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.toLowerCase().trim().slice(0, 255)
}
