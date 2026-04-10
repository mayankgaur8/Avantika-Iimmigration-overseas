/**
 * Lightweight in-memory rate limiter.
 * For production, replace with Redis-backed solution (e.g. @upstash/ratelimit).
 *
 * Dev bypass: rate limiting is NEVER applied when NODE_ENV === 'development'.
 * This prevents the shared "unknown" IP key on localhost from blocking all
 * local testing after just a handful of form submissions.
 */

interface RateLimitEntry {
  count:   number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key)
    }
  }, 10 * 60 * 1000)
}

interface RateLimitOptions {
  /** Max requests allowed per window */
  limit:      number
  /** Window duration in seconds */
  windowSecs: number
}

interface RateLimitResult {
  allowed:   boolean
  remaining: number
  resetAt:   number
}

export function rateLimit(
  identifier: string,
  { limit, windowSecs }: RateLimitOptions
): RateLimitResult {
  // ── Development bypass ────────────────────────────────────────────────────
  // On localhost the IP always resolves to "unknown", collapsing all traffic
  // from every tab into a single bucket. Skip limiting entirely in dev so
  // testing never gets blocked.
  if (process.env.NODE_ENV === 'development') {
    return { allowed: true, remaining: limit, resetAt: Date.now() + windowSecs * 1000 }
  }

  const now      = Date.now()
  const windowMs = windowSecs * 1000

  const entry = store.get(identifier)

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count += 1
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}

/**
 * Extract a stable client identifier from a request.
 * Uses x-forwarded-for → x-real-ip → fallback.
 *
 * On localhost neither header is set, so this returns "unknown" — which is
 * why the dev bypass in rateLimit() is essential: without it every local
 * request shares one bucket.
 */
export function getClientId(req: Request, extra = ''): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp    = req.headers.get('x-real-ip')
  const ip        = (forwarded ? forwarded.split(',')[0].trim() : realIp) ?? 'unknown'
  return extra ? `${ip}:${extra}` : ip
}
