'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Download, Phone } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { getTrackingContext, postJson } from '@/lib/utils/formTracking'
import { getLeadMagnetBySlug } from '@/lib/data/leadMagnets'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  destination: z.string().optional(),
  message: z.string().optional(),
  preferredCallbackTime: z.string().optional(),
  company: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface LeadResponse {
  success: boolean
  message: string
  leadId: string
  downloadUrl?: string
}

const services = [
  'Permanent Residency (PR)',
  'Work Permit / Work Visa',
  'Student Visa',
  'Visit / Tourist Visa',
  'Business Visa',
  'IELTS / PTE Coaching',
  'Resume Writing',
  'LinkedIn Optimization',
  'Other',
]

const destinations = [
  'Canada', 'Australia', 'Germany', 'United Kingdom', 'UAE', 'Japan', 'New Zealand', 'USA', 'Singapore', 'Other',
]

interface ConsultationFormProps {
  compact?: boolean
  title?: string
  subtitle?: string
  source?: string
  servicePreset?: string
  destinationPreset?: string
  leadMagnetSlug?: string
  submitLabel?: string
}

export default function ConsultationForm({
  compact = false,
  title = 'Book a Free Consultation',
  subtitle = 'Our expert consultants will call you back within 2 hours.',
  source = 'consultation_form',
  servicePreset,
  destinationPreset,
  leadMagnetSlug,
  submitLabel = 'Book Free Consultation',
}: ConsultationFormProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const leadMagnet = leadMagnetSlug ? getLeadMagnetBySlug(leadMagnetSlug) : undefined
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: servicePreset ?? '',
      destination: destinationPreset ?? '',
      preferredCallbackTime: 'Today, 2pm-6pm',
      company: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await postJson<LeadResponse>('/api/leads', {
        ...data,
        source,
        leadType: leadMagnetSlug ? 'download' : 'consultation',
        leadMagnet: leadMagnetSlug,
        consent: true,
        tags: [data.service, data.destination, source].filter(Boolean),
        ...getTrackingContext(),
      })

      trackEvent('consultation_request', { service: data.service, destination: data.destination, source })
      trackEvent('form_submit', { form: source, service: data.service, destination: data.destination })

      if (leadMagnetSlug) {
        trackEvent('download_guide', { slug: leadMagnetSlug, source })
      }

      toast.success(result.message)
      setDownloadUrl(result.downloadUrl ?? leadMagnet?.downloadPath ?? null)
      reset({
        name: '',
        phone: '',
        email: '',
        message: '',
        company: '',
        service: servicePreset ?? '',
        destination: destinationPreset ?? '',
        preferredCallbackTime: 'Today, 2pm-6pm',
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit the form right now.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
      {!compact && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-navy-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <div>
            <label htmlFor={`${source}-name`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id={`${source}-name`}
              {...register('name')}
              placeholder="Your Full Name *"
              className="input-field"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor={`${source}-phone`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Mobile Number
            </label>
            <input
              id={`${source}-phone`}
              {...register('phone')}
              placeholder="Mobile Number *"
              type="tel"
              className="input-field"
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className={compact ? '' : 'md:col-span-2'}>
            <label htmlFor={`${source}-email`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              id={`${source}-email`}
              {...register('email')}
              placeholder="Email Address *"
              type="email"
              className="input-field"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor={`${source}-service`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Interested Service
            </label>
            <div className="relative">
              <select
                id={`${source}-service`}
                {...register('service')}
                className="select-field"
                disabled={Boolean(servicePreset)}
                aria-invalid={Boolean(errors.service)}
              >
                <option value="">Interested Service *</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
          </div>

          <div>
            <label htmlFor={`${source}-destination`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Target Destination
            </label>
            <div className="relative">
              <select
                id={`${source}-destination`}
                {...register('destination')}
                className="select-field"
                disabled={Boolean(destinationPreset)}
              >
                <option value="">Target Destination</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className={compact ? '' : 'md:col-span-2'}>
            <label htmlFor={`${source}-callback`} className="mb-1.5 block text-sm font-semibold text-gray-700">
              Preferred Callback Time
            </label>
            <select id={`${source}-callback`} {...register('preferredCallbackTime')} className="select-field">
              <option value="Today, 2pm-6pm">Today, 2pm-6pm</option>
              <option value="Tomorrow, 10am-1pm">Tomorrow, 10am-1pm</option>
              <option value="Tomorrow, 2pm-6pm">Tomorrow, 2pm-6pm</option>
              <option value="WhatsApp first">WhatsApp first</option>
            </select>
          </div>

          {!compact && (
            <div className="md:col-span-2">
              <label htmlFor={`${source}-message`} className="mb-1.5 block text-sm font-semibold text-gray-700">
                Tell us about your goals or questions
              </label>
              <textarea
                id={`${source}-message`}
                {...register('message')}
                placeholder="Tell us about your goals or questions (optional)"
                rows={3}
                className="input-field resize-none"
              />
            </div>
          )}

          <div className="hidden">
            <label htmlFor={`${source}-company`}>Company</label>
            <input id={`${source}-company`} {...register('company')} tabIndex={-1} autoComplete="off" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-secondary py-3.5 text-base flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Phone size={16} />
                {submitLabel}
            </>
          )}
        </button>

        {downloadUrl && leadMagnet && (
          <Link
            href={downloadUrl}
            target="_blank"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <Download size={16} />
            Download {leadMagnet.title}
          </Link>
        )}

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to our privacy policy. We never share your data.
        </p>
      </form>
    </div>
  )
}
