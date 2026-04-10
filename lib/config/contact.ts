/**
 * Central contact configuration.
 * All phone numbers, emails, addresses, and social links live here.
 * Components should import from this file — never hardcode contact info.
 */

export const SITE = {
  name: 'Avantika Immigration & Overseas',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://avantika-immigration.com',
  tagline: 'Your Global Career & Immigration Partner',
  foundedYear: 2006,
}

export const CONTACT = {
  phonePrimary:   process.env.NEXT_PUBLIC_PHONE_PRIMARY   ?? '+91 96204 39138',
  phoneRaw:       process.env.NEXT_PUBLIC_PHONE_RAW       ?? '+919620439138',   // for tel: links
  phoneWhatsApp:  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919620439138',    // for wa.me links
  phoneUrgent:    process.env.NEXT_PUBLIC_PHONE_URGENT    ?? '+91 96204 39138',
  emailPrimary:   process.env.NEXT_PUBLIC_EMAIL_PRIMARY   ?? 'info@avantika-immigration.com',
  emailAdmin:     process.env.EMAIL_TO_ADMIN              ?? 'admin@avantika-immigration.com',
  bookingUrl:     process.env.NEXT_PUBLIC_BOOKING_URL     ?? '/contact',
  whatsappMessage: encodeURIComponent(
    'Hello! I would like to know more about immigration services.'
  ),
  get whatsappUrl() {
    return `https://wa.me/${this.phoneWhatsApp}?text=${this.whatsappMessage}`
  },
  get telUrl() {
    return `tel:${this.phoneRaw}`
  },
}

export const OFFICES = [
  {
    id:      'aligarh',
    city:    'Aligarh (Head Office)',
    address: 'G-16 Gulzar Nagar Ramghat Road Aligarh (U.P) 202001',
    phone:   process.env.NEXT_PUBLIC_PHONE_PRIMARY   ?? '+91 96204 39138',
    email:   process.env.NEXT_PUBLIC_EMAIL_PRIMARY   ?? 'info@avantika-immigration.com',
    hours:   'Mon–Sat: 9:00 AM – 6:00 PM',
    lat:     28.4595,
    lng:     77.0266,
  },
]

export const SOCIAL = {
  facebook:  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? 'https://www.facebook.com/avantika-immigration',
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? 'https://www.instagram.com/avantika-immigration',
  linkedin:  process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN  ?? 'https://www.linkedin.com/company/avantika-immigration',
  youtube:   process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE   ?? 'https://www.youtube.com/@avantika-immigration',
  twitter:   process.env.NEXT_PUBLIC_SOCIAL_TWITTER   ?? 'https://twitter.com/avantika_imm',
}

export const TRUST = {
  yearsExperience:  18,
  successfulCases:  10000,
  countriesServed:  45,
  expertConsultants: 200,
  googleRating:     4.9,
  totalReviews:     3200,
  successRate:      92,
}
