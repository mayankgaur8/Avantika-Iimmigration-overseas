'use client'

import Link from 'next/link'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
          <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-card">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">System Error</p>
            <h1 className="mt-3 text-3xl font-black text-navy-800">Something Broke Unexpectedly</h1>
            <p className="mt-3 text-gray-500">
              We hit a critical rendering issue. Please retry, or return home and continue browsing.
            </p>

            {process.env.NODE_ENV === 'development' && error?.message && (
              <pre className="mt-5 max-h-48 overflow-auto rounded-xl border border-red-200 bg-red-50 p-3 text-left text-xs text-red-700">
                {error.message}
              </pre>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={reset} className="btn-primary px-6 py-3">
                Try Again
              </button>
              <Link href="/" className="btn-outline px-6 py-3 text-center">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
