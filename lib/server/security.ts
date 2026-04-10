import { NextRequest, NextResponse } from 'next/server'

function normalizeOrigin(value: string | null): string | null {
  if (!value) return null
  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

export function isTrustedRequest(req: NextRequest): boolean {
  // Never reject requests in development regardless of NEXT_PUBLIC_SITE_URL
  if (process.env.NODE_ENV === 'development') return true

  const appOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? null)
  if (!appOrigin) return true

  const origin = normalizeOrigin(req.headers.get('origin'))
  const referer = normalizeOrigin(req.headers.get('referer'))

  if (origin && origin === appOrigin) return true
  if (referer && referer === appOrigin) return true
  if (!origin && !referer) return true

  return false
}

export function rejectUntrustedRequest(req: NextRequest): NextResponse | null {
  if (isTrustedRequest(req)) return null

  return NextResponse.json(
    { success: false, message: 'Untrusted request origin.' },
    { status: 403 }
  )
}

export async function verifyTurnstileToken(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // Placeholder mode when secret is not configured.
  if (!secret) return true

  if (!token) return false

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    })

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    })

    const result = (await response.json()) as { success?: boolean }
    return Boolean(result.success)
  } catch {
    return false
  }
}
