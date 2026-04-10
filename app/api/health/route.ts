import { db } from '@/lib/server/db'
import { success, failure } from '@/lib/server/apiResponse'

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return success({
      message: 'degraded',
      timestamp: new Date().toISOString(),
      checks: { database: 'not_configured' },
    })
  }

  try {
    await db.$queryRaw`SELECT 1`
    return success({
      message: 'ok',
      timestamp: new Date().toISOString(),
      checks: { database: 'up' },
    })
  } catch (error) {
    return failure('Health check failed', 500, error instanceof Error ? error.message : String(error))
  }
}
