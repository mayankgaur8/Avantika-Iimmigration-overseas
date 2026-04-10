import { ActivityType, Prisma } from '@prisma/client'
import { db } from '@/lib/server/db'

interface LogActivityInput {
  type: ActivityType
  message: string
  metadata?: Prisma.InputJsonValue
  leadId?: string
  eligibilitySubmissionId?: string
  bookingRequestId?: string
  adminUserId?: string
}

export async function logActivity(input: LogActivityInput) {
  await db.leadActivity.create({
    data: {
      type: input.type,
      message: input.message,
      metadata: input.metadata,
      leadId: input.leadId,
      eligibilitySubmissionId: input.eligibilitySubmissionId,
      bookingRequestId: input.bookingRequestId,
      adminUserId: input.adminUserId,
    },
  })
}
