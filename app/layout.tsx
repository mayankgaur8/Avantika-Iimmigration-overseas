import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CONTACT, OFFICES, SOCIAL, SITE } from '@/lib/config/contact'
import { websiteSchema } from '@/lib/config/seo'

const WhatsAppButton = dynamic(() => import('@/components/floating/WhatsAppButton'), {
  ssr: false,
})

const FloatingCTA = dynamic(() => import('@/components/floating/FloatingCTA'), {
  ssr: false,
})

const ExitIntentPopup = dynamic(() => import('@/components/floating/ExitIntentPopup'), {
  ssr: false,
})

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Visa, Work, Study Abroad Consultants`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Avantika Immigration & Overseas is a trusted global immigration consultancy helping thousands migrate, work, study, and visit abroad. Free eligibility check, expert consultation, and end-to-end visa assistance.',
  keywords: [
    'immigration consultants',
    'overseas jobs',
    'study abroad',
    'work visa',
    'PR visa',
    'Canada immigration',
    'Australia visa',
    'Germany work permit',
    'IELTS coaching',
    'visa consultants India',
  ],
  authors:  [{ name: SITE.name }],
  creator:  SITE.name,
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         SITE.url,
    siteName:    SITE.name,
    title:       `${SITE.name} | Your Global Career Partner`,
    description: 'Expert immigration consultancy for Canada, Australia, Germany, UK, UAE and more.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE.name,
    description: 'Your trusted partner for global immigration and overseas career services.',
    images:      ['/images/og-image.jpg'],
    creator:     '@avantika_imm',
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? 'your-google-verification-code',
  },
  alternates: {
    canonical: SITE.url,
  },
  manifest: '/manifest.json',
  icons: {
    icon:             [{ url: '/favicon.ico' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple:            [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut:         '/favicon.ico',
  },
  appleWebApp: {
    capable:         true,
    statusBarStyle:  'black-translucent',
    title:           'Avantika Immigration',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type':    ['LocalBusiness', 'ProfessionalService'],
    '@id':      `${SITE.url}/#organization`,
    name:       SITE.name,
    description: 'Trusted immigration and overseas career consulting firm offering visa assistance, study abroad guidance, and job placement services.',
    url:        SITE.url,
    logo: {
      '@type': 'ImageObject',
      url:     `${SITE.url}/images/logo.png`,
      width:   200,
      height:  60,
    },
    image:      `${SITE.url}/images/og-image.jpg`,
    telephone:  CONTACT.phonePrimary,
    email:      CONTACT.emailPrimary,
    address: {
      '@type':           'PostalAddress',
      streetAddress:     OFFICES[0].address.split(',')[0],
      addressLocality:   'Gurugram',
      addressRegion:     'Haryana',
      postalCode:        '122001',
      addressCountry:    'IN',
    },
    geo: {
      '@type':     'GeoCoordinates',
      latitude:    OFFICES[0].lat,
      longitude:   OFFICES[0].lng,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '16:00' },
    ],
    priceRange: '₹₹',
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   '4.9',
      reviewCount:   '3200',
      bestRating:    '5',
      worstRating:   '1',
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.youtube, SOCIAL.twitter],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* LocalBusiness + Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* WebSite schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>

      <body className="flex flex-col min-h-screen">
        {/* Google Analytics 4 — only in production or when ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                });
              `}
            </Script>
          </>
        )}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1e3a5f', color: '#fff', borderRadius: '10px', padding: '14px 18px' },
            success: { iconTheme: { primary: '#f59e0b', secondary: '#fff' } },
            error:   { style: { background: '#dc2626' } },
          }}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />

        {/* Floating widgets */}
        <WhatsAppButton />
        <FloatingCTA />
        <ExitIntentPopup />
      </body>
    </html>
  )
}
