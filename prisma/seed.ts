import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.log('Skipping admin seed: ADMIN_EMAIL or ADMIN_PASSWORD is not set.')
    return
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.adminUser.create({
    data: {
      name: 'Platform Admin',
      email,
      passwordHash,
      role: 'admin',
    },
  })

  console.log(`Seeded admin user: ${email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
