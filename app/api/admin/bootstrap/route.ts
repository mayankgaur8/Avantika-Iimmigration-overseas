import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/server/db'
import { failure, success } from '@/lib/server/apiResponse'
import { reportApiError } from '@/lib/server/monitoring'
import { rejectUntrustedRequest } from '@/lib/server/security'
import { getClientId, rateLimit } from '@/lib/utils/rateLimit'

const bootstrapSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  bootstrapToken: z.string().min(8),
})

export async function POST(req: NextRequest) {
  const originBlock = rejectUntrustedRequest(req)
  if (originBlock) return originBlock

  const limiter = rateLimit(getClientId(req, 'admin_bootstrap'), { limit: 5, windowSecs: 900 })
  if (!limiter.allowed) {
    return failure('Too many requests. Please try again later.', 429)
  }

  try {
    const expectedToken = process.env.ADMIN_BOOTSTRAP_TOKEN
    if (!expectedToken) return failure('Bootstrap disabled.', 403)

    const parsed = bootstrapSchema.safeParse(await req.json())
    if (!parsed.success) return failure('Invalid payload.', 400)
    if (parsed.data.bootstrapToken !== expectedToken) return failure('Invalid bootstrap token.', 401)

    const existingCount = await db.adminUser.count()
    if (existingCount > 0) return failure('Bootstrap blocked: admin already exists.', 409)

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)
    await db.adminUser.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        passwordHash,
        role: 'admin',
      },
    })

    return success({ message: 'Admin user created.' }, 201)
  } catch (error) {
    await reportApiError('admin_bootstrap_failed', error)
    return failure('Unable to complete bootstrap right now.', 500)
  }
}
