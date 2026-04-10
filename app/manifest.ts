import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Avantika Immigration & Overseas',
    short_name: 'Avantika',
    description:
      'Founder-led immigration and overseas career guidance for work, study, PR, and visa pathways.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16335b',
    lang: 'en-IN',
  }
}