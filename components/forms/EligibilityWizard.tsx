'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { trackEvent } from '@/lib/utils/analytics'
import { getTrackingContext, postJson } from '@/lib/utils/formTracking'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid mobile number required'),
  currentCountry: z.string().min(1, 'Required'),
  targetCountry: z.string().min(1, 'Please select a country'),
  interestedService: z.string().min(1, 'Please select a service'),
  education: z.string().min(1, 'Please select your education level'),
  workExperience: z.string().min(1, 'Please select work experience'),
  englishScore: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  goals: z.string().optional(),
  company: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface EligibilityResponse {
  success: boolean
  message: string
  submissionId: string
  preliminaryScore: 'High' | 'Medium' | 'Low'
  recommendedPathways: string[]
}

const steps = [
  { id: 1, title: 'Personal Details', fields: ['name', 'email', 'phone'] },
  { id: 2, title: 'Your Goals', fields: ['currentCountry', 'targetCountry', 'interestedService'] },
  { id: 3, title: 'Your Background', fields: ['education', 'workExperience', 'englishScore'] },
  { id: 4, title: 'Timeline & Budget', fields: ['budget', 'timeline', 'goals'] },
]

export default function EligibilityWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<EligibilityResponse | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '',
    },
  })

  const step = steps[currentStep]

  const nextStep = async () => {
    const fields = step.fields as (keyof FormData)[]
    const valid = await trigger(fields)
    if (valid) {
      trackEvent('eligibility_check_start', { step: currentStep + 1 })
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1))
    }
  }

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0))

  const onSubmit = async (data: FormData) => {
    try {
      const response = await postJson<EligibilityResponse>('/api/eligibility', {
        ...data,
        source: 'eligibility_wizard',
        leadType: 'eligibility',
        consent: true,
        ...getTrackingContext(),
      })

      trackEvent('eligibility_check_complete', {
        targetCountry: data.targetCountry,
        service: data.interestedService,
      })
      trackEvent('form_submit', {
        form: 'eligibility_wizard',
        targetCountry: data.targetCountry,
        service: data.interestedService,
      })

      toast.success(response.message)
      setResult(response)
      setSubmitted(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit assessment right now.')
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-navy-800 mb-3">Assessment Submitted!</h2>
        <p className="text-gray-500 mb-2 max-w-md mx-auto">
          Thank you, <strong>{getValues('name')}</strong>! Our expert team will review your profile and reach out within{' '}
          <strong>24 hours</strong>.
        </p>
        <p className="text-sm text-gray-400">Check your email at <strong>{getValues('email')}</strong> for a confirmation.</p>
        {result && (
          <div className="mt-6 rounded-2xl bg-navy-50 p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-navy-500">Preliminary fit</p>
            <p className="mt-2 text-lg font-bold text-navy-800">{result.preliminaryScore} potential</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {result.recommendedPathways.map((pathway) => (
                <li key={pathway} className="rounded-xl bg-white px-3 py-2">
                  {pathway}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">Back to Home</Link>
          <Link href="/contact" className="btn-outline px-8 py-3">Book Consultation</Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? 'bg-green-500 text-white'
                  : i === currentStep
                  ? 'bg-navy-700 text-white shadow-lg scale-110'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {i < currentStep ? <CheckCircle2 size={18} /> : s.id}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block ${
                i === currentStep ? 'text-navy-700' : 'text-gray-400'
              }`}>
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-colors duration-500 ${
                i < currentStep ? 'bg-green-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h2 className="text-xl font-bold text-navy-800 mb-6">{step.title}</h2>

            {/* Step 1: Personal */}
            {currentStep === 0 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input {...register('name')} placeholder="e.g. Priya Sharma" className="input-field" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input {...register('email')} placeholder="you@example.com" type="email" className="input-field" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                  <div className="flex gap-2">
                    <span className="input-field w-20 flex-shrink-0 text-center bg-gray-50 text-gray-500">+91</span>
                    <input {...register('phone')} placeholder="9876543210" type="tel" className="input-field flex-1" maxLength={10} />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </>
            )}

            {/* Step 2: Goals */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Current Country *</label>
                  <input {...register('currentCountry')} placeholder="e.g. India" className="input-field" />
                  {errors.currentCountry && <p className="text-red-500 text-xs mt-1">{errors.currentCountry.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Destination *</label>
                  <select {...register('targetCountry')} className="select-field">
                    <option value="">Select a country</option>
                    {['Canada', 'Australia', 'Germany', 'United Kingdom', 'UAE', 'Japan', 'New Zealand', 'USA', 'Singapore', 'Other'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.targetCountry && <p className="text-red-500 text-xs mt-1">{errors.targetCountry.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Interested Service *</label>
                  <select {...register('interestedService')} className="select-field">
                    <option value="">Select a service</option>
                    {['Permanent Residency (PR)', 'Work Permit', 'Student Visa', 'Visit Visa', 'Business Visa', 'IELTS/PTE Coaching', 'Job Assistance'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.interestedService && <p className="text-red-500 text-xs mt-1">{errors.interestedService.message}</p>}
                </div>
              </>
            )}

            {/* Step 3: Background */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Highest Education *</label>
                  <select {...register('education')} className="select-field">
                    <option value="">Select education level</option>
                    {['High School (12th)', 'Diploma', "Bachelor's Degree", "Master's Degree", 'PhD / Doctorate', 'Trade Certificate'].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                  {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Experience *</label>
                  <select {...register('workExperience')} className="select-field">
                    <option value="">Select experience range</option>
                    {['No Experience', '0–1 year', '1–3 years', '3–5 years', '5–8 years', '8+ years'].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                  {errors.workExperience && <p className="text-red-500 text-xs mt-1">{errors.workExperience.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">English Test Score (Optional)</label>
                  <select {...register('englishScore')} className="select-field">
                    <option value="">Do you have a test score?</option>
                    <option value="ielts-5-5">IELTS – Band 5.5</option>
                    <option value="ielts-6">IELTS – Band 6.0</option>
                    <option value="ielts-6-5">IELTS – Band 6.5</option>
                    <option value="ielts-7">IELTS – Band 7.0+</option>
                    <option value="pte-50">PTE – 50–58</option>
                    <option value="pte-65">PTE – 65+</option>
                    <option value="toefl">TOEFL – 90+</option>
                    <option value="no-test">I haven&apos;t taken a test</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Budget Range</label>
                  <select {...register('budget')} className="select-field">
                    <option value="">Select approximate budget</option>
                    {['Under ₹1 Lakh', '₹1–2 Lakhs', '₹2–5 Lakhs', '₹5–10 Lakhs', 'Above ₹10 Lakhs', 'Flexible / Not Sure'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">When do you want to move?</label>
                  <select {...register('timeline')} className="select-field">
                    <option value="">Select your timeline</option>
                    {['As soon as possible', '3–6 months', '6–12 months', '1–2 years', 'Just exploring'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe Your Goals (Optional)</label>
                  <textarea
                    {...register('goals')}
                    placeholder="e.g. I want to move to Canada with my family and settle permanently. I have 5 years of IT experience..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
              </>
            )}

            <div className="hidden">
              <label htmlFor="eligibility-company">Company</label>
              <input id="eligibility-company" {...register('company')} tabIndex={-1} autoComplete="off" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="btn-outline py-2.5 px-6 disabled:opacity-0 flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-secondary py-2.5 px-8 flex items-center gap-2"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-secondary py-2.5 px-8 flex items-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Submitting...</>
              ) : (
                <>Submit Assessment <ChevronRight size={16} /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
