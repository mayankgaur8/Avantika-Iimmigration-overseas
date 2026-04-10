type EventName =
  | 'form_submit'
  | 'cta_click'
  | 'appointment_booking_click'
  | 'country_page_visit'
  | 'consultation_request'
  | 'eligibility_check_start'
  | 'eligibility_check_complete'
  | 'whatsapp_click'
  | 'phone_click'
  | 'download_guide'
  | 'newsletter_signup'
  | 'booking_request'
  | 'admin_status_change'
  | 'email_click'

interface EventProperties {
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(event: EventName, properties?: EventProperties): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event, properties)
  }

  // Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', event, properties)
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties)
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!measurementId) return

  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', measurementId, {
      page_path: path,
      page_title: title,
    })
  }
}

// Extend Window type
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}
