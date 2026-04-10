'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, Phone } from 'lucide-react'
import { CONTACT } from '@/lib/config/contact'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    // e.g. Sentry.captureException(error)
    if (process.env.NODE_ENV === 'production') {
      console.error('[Runtime Error]', {
        message: error.message,
        digest: error.digest,
        stack: error.stack,
      })
    }
  }, [error])

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-6xl mb-6">⚠️</div>

        <h1 className="text-3xl font-black text-navy-800 mb-3">
          Something Went Wrong
        </h1>
        <p className="text-gray-500 text-lg mb-2 leading-relaxed">
          We&apos;re sorry — an unexpected error occurred. Our team has been notified.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <pre className="mt-3 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-left overflow-auto max-h-40">
            {error.message}
            {error.digest && `\n\nDigest: ${error.digest}`}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={reset}
            className="btn-primary px-8 py-3.5 flex items-center justify-center gap-2"
          >
            <RefreshCw size={17} /> Try Again
          </button>
          <Link href="/" className="btn-outline px-8 py-3.5 flex items-center justify-center gap-2">
            <Home size={17} /> Go Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          If this keeps happening, please{' '}
          <a href={CONTACT.telUrl} className="text-navy-700 font-semibold hover:text-gold-600 transition-colors">
            call us
          </a>{' '}
          or{' '}
          <Link href="/contact" className="text-navy-700 font-semibold hover:text-gold-600 transition-colors">
            send a message
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
