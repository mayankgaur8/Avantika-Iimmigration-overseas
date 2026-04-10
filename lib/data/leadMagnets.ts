export interface LeadMagnet {
  slug: string
  title: string
  description: string
  format: string
  downloadPath: string
  service: string
  destination?: string
  benefits: string[]
}

export const leadMagnets: LeadMagnet[] = [
  {
    slug: 'canada-pr-checklist',
    title: 'Canada PR Document Checklist',
    description: 'A practical starter checklist covering passports, ECA, IELTS, proof of funds, and work history evidence for Canada PR applicants.',
    format: 'TXT guide',
    downloadPath: '/downloads/canada-pr-checklist.txt',
    service: 'Permanent Residency (PR)',
    destination: 'Canada',
    benefits: ['Document checklist', 'Proof of funds notes', 'Common rejection risks']
  },
  {
    slug: 'work-visa-job-search-pack',
    title: 'Work Visa and Job Search Pack',
    description: 'A downloadable guide for international resume basics, job-offer readiness, and consular interview preparation.',
    format: 'TXT guide',
    downloadPath: '/downloads/work-visa-job-search-pack.txt',
    service: 'Work Permit / Work Visa',
    benefits: ['Resume checklist', 'Interview prep prompts', 'Employer document checklist']
  },
  {
    slug: 'ielts-band7-study-plan',
    title: 'IELTS Band 7 Weekly Study Plan',
    description: 'A four-week training structure for reading, writing, listening, and speaking with realistic daily workload.',
    format: 'TXT guide',
    downloadPath: '/downloads/ielts-band7-study-plan.txt',
    service: 'IELTS / PTE Coaching',
    benefits: ['4-week plan', 'Mock test schedule', 'Module-wise focus areas']
  }
]

export function getLeadMagnetBySlug(slug: string) {
  return leadMagnets.find((item) => item.slug === slug)
}
