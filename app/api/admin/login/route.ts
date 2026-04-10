import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/server/db'
import { createSessionToken, setSessionCookie, verifyPassword } from '@/lib/server/adminAuth'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'admin_login'), { limit: 8, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many login attempts. Please try again later.', 429)
  }

  try {
    const parsed = loginSchema.safeParse(await req.json())
    if (!parsed.success) {
      return failure('Invalid credentials.', 400)
    }

    const admin = await db.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } })
    if (!admin || !admin.isActive) {
      return failure('Invalid credentials.', 401)
    }

    const valid = await verifyPassword(parsed.data.password, admin.passwordHash)
    if (!valid) {
      return failure('Invalid credentials.', 401)
    }

    const token = await createSessionToken({
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    })

    await setSessionCookie(token)

    await db.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    })

    return success({ message: 'Logged in successfully.' })
  } catch (error) {
    await reportApiError('admin_login_failed', error)
    return failure('Unable to login right now.', 500)
  }
}
