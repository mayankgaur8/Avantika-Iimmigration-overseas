'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { CalendarDays } from 'lucide-react'
import { getTrackingContext, postJson } from '@/lib/utils/formTracking'
import { trackEvent } from '@/lib/utils/analytics'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  consultationMode: z.string().optional(),
  serviceInterest: z.string().optional(),
  destinationInterest: z.string().optional(),
  notes: z.string().max(800, 'Notes can be up to 800 characters').optional(),
  company: z.string().optional(),
})

type BookingValues = z.infer<typeof bookingSchema>

interface BookingFormProps {
  source?: string
  calendlyUrl?: string
}

export default function BookingForm({ source = 'contact_booking_form', calendlyUrl }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferredTime: '10:00 AM - 1:00 PM',
      consultationMode: 'Phone call',
      company: '',
    },
  })

  const onSubmit = async (data: BookingValues) => {
    try {
      const response = await postJson<{ success: boolean; message: string; bookingId: string }>(
        '/api/bookings',
        {
          ...data,
          source,
          calendlyUrl,
          ...getTrackingContext(),
        }
      )

      trackEvent('booking_request', {
        source,
        consultationMode: data.consultationMode,
        serviceInterest: data.serviceInterest,
      })

      toast.success(response.message)
      reset({
        name: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '10:00 AM - 1:00 PM',
        consultationMode: 'Phone call',
        serviceInterest: '',
        destinationInterest: '',
        notes: '',
        company: '',
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit booking request right now.')
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="text-xl font-bold text-navy-800">Request a Callback Slot</h3>
      <p className="mt-1 text-sm text-gray-500">Choose your preferred date and time. We will confirm availability quickly.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name</label>
            <input className="input-field" {...register('name')} autoComplete="name" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Mobile Number</label>
            <input className="input-field" {...register('phone')} autoComplete="tel" maxLength={10} />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email Address</label>
            <input className="input-field" {...register('email')} type="email" autoComplete="email" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Preferred Date</label>
            <input className="input-field" {...register('preferredDate')} type="date" min={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Preferred Time</label>
            <select className="select-field" {...register('preferredTime')}>
              <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
              <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM</option>
              <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Consultation Mode</label>
            <select className="select-field" {...register('consultationMode')}>
              <option value="Phone call">Phone call</option>
              <option value="WhatsApp call">WhatsApp call</option>
              <option value="Office visit">Office visit</option>
              <option value="Video call">Video call</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Service Interest</label>
            <input className="input-field" {...register('serviceInterest')} placeholder="Student visa, PR, work visa..." />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Destination Interest</label>
            <input className="input-field" {...register('destinationInterest')} placeholder="Canada, Germany, UK..." />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Notes</label>
            <textarea className="input-field min-h-24 resize-y" {...register('notes')} placeholder="Any specific questions or constraints" />
            {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>}
          </div>

          <div className="hidden">
            <label htmlFor={`${source}-company`}>Company</label>
            <input id={`${source}-company`} {...register('company')} tabIndex={-1} autoComplete="off" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary flex w-full items-center justify-center gap-2 py-3.5">
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <CalendarDays size={16} />
              Request Callback Slot
            </>
          )}
        </button>
      </form>
    </div>
  )
}
