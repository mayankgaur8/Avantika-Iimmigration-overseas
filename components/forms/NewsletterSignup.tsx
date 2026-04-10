'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { getTrackingContext, postJson } from '@/lib/utils/formTracking'

interface NewsletterSignupProps {
  source: string
  className?: string
  buttonLabel?: string
  compact?: boolean
}

interface NewsletterResponse {
  success: boolean
  message: string
}

export default function NewsletterSignup({
  source,
  className,
  buttonLabel = 'Subscribe',
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      const result = await postJson<NewsletterResponse>('/api/newsletter', {
        email,
        source,
        company,
        ...getTrackingContext(),
      })

      trackEvent('newsletter_signup', { source })
      trackEvent('form_submit', { form: source, category: 'newsletter' })
      toast.success(result.message)
      setEmail('')
      setCompany('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to subscribe right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <label htmlFor={`${source}-newsletter-email`} className="sr-only">
        Email address
      </label>
      <div className={`flex ${compact ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-2`}>
        <input
          id={`${source}-newsletter-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 input-field"
          required
          aria-describedby={`${source}-newsletter-note`}
        />
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          className="btn-secondary px-6 py-3 flex-shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : buttonLabel}
          {!isSubmitting && <ArrowRight size={14} />}
        </button>
      </div>
      <p id={`${source}-newsletter-note`} className="text-xs text-gray-400 mt-3">
        Weekly visa updates, no spam, unsubscribe anytime.
      </p>
    </form>
  )
}
