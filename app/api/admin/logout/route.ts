import { NextRequest } from 'next/server'
import { clearSessionCookie } from '@/lib/server/adminAuth'
import { failure, success } from '@/lib/server/apiResponse'
import { rejectUntrustedRequest } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'admin_logout'), { limit: 20, windowSecs: 300 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  clearSessionCookie()
  return success({ message: 'Logged out.' })
}
