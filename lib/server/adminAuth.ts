import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { db } from '@/lib/server/db'

const SESSION_COOKIE = 'ai_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 8

interface SessionPayload extends JWTPayload {
  sub: string
  role: 'admin' | 'staff'
  email: string
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured')
  }
  return new TextEncoder().encode(secret)
}

export async function verifyPassword(raw: string, hash: string) {
  return bcrypt.compare(raw, hash)
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSessionSecret())
}

export async function setSessionCookie(token: string) {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE)
}

export async function getSessionFromToken(token: string) {
  try {
    const verified = await jwtVerify(token, getSessionSecret())
    const payload = verified.payload as unknown as SessionPayload

    const adminUser = await db.adminUser.findUnique({ where: { id: payload.sub } })
    if (!adminUser || !adminUser.isActive) return null

    return {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    }
  } catch {
    return null
  }
}

export async function getServerSession() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!token) return null
  return getSessionFromToken(token)
}

export async function getApiSession(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token) return null
  return getSessionFromToken(token)
}
