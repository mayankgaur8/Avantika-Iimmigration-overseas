export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface MegaMenuColumn {
  heading: string
  items: { label: string; href: string; description?: string }[]
}

export interface MegaMenuItem {
  label: string
  href: string
  megaMenu?: MegaMenuColumn[]
}

export const mainNav: MegaMenuItem[] = [
  {
    label: 'Migrate',
    href: '/eligibility',
    megaMenu: [
      {
        heading: 'By Visa Type',
        items: [
          { label: 'Permanent Residency (PR)', href: '/eligibility', description: 'Live and work permanently abroad' },
          { label: 'Skilled Worker Visa', href: '/services/work-visa', description: 'For qualified professionals' },
          { label: 'Investor / Business Visa', href: '/contact', description: 'Explore business and investor pathways' },
          { label: 'Family Sponsorship', href: '/contact', description: 'Discuss family migration options' },
        ],
      },
      {
        heading: 'Top Destinations',
        items: [
          { label: 'Canada PR', href: '/destinations/canada' },
          { label: 'Australia PR', href: '/services/student-visa' },
          { label: 'Germany Opportunity Card', href: '/destinations/germany' },
          { label: 'UK Skilled Worker', href: '/services/work-visa' },
          { label: 'Student pathways', href: '/services/student-visa' },
        ],
      },
      {
        heading: 'Tools',
        items: [
          { label: 'Free Eligibility Check', href: '/eligibility', description: 'See if you qualify in 2 minutes' },
          { label: 'Book a consultation', href: '/contact', description: 'Talk to an advisor about your profile' },
          { label: 'Canada guide articles', href: '/blog?category=canada', description: 'Read Canada PR content' },
        ],
      },
    ],
  },
  {
    label: 'Work',
    href: '/services/work-visa',
    megaMenu: [
      {
        heading: 'Work Visas',
        items: [
          { label: 'Work Permit Visa', href: '/services/work-visa', description: 'Temporary work authorization' },
          { label: 'Digital Nomad Visa', href: '/services/work-visa', description: 'Remote work and overseas mobility advice' },
          { label: 'Intra-Company Transfer', href: '/contact', description: 'Role-specific advisory for business transfers' },
          { label: 'Seasonal Worker Visa', href: '/jobs', description: 'Short-term work opportunities' },
        ],
      },
      {
        heading: 'Career Services',
        items: [
          { label: 'International Resume Writing', href: '/jobs' },
          { label: 'LinkedIn Profile Optimization', href: '/jobs' },
          { label: 'Resume Marketing', href: '/jobs' },
          { label: 'Job Search Assistance', href: '/jobs' },
        ],
      },
      {
        heading: 'Popular Countries',
        items: [
          { label: 'Jobs in Canada', href: '/destinations/canada' },
          { label: 'Jobs in UAE', href: '/services/work-visa' },
          { label: 'Jobs in Germany', href: '/destinations/germany' },
          { label: 'Jobs in Australia', href: '/services/student-visa' },
        ],
      },
    ],
  },
  {
    label: 'Study',
    href: '/services/student-visa',
    megaMenu: [
      {
        heading: 'Student Visas',
        items: [
          { label: 'Student Visa Assistance', href: '/services/student-visa', description: 'Full support for study abroad' },
          { label: 'University Admissions', href: '/services/student-visa', description: 'SOP and application support' },
          { label: 'Scholarship Guidance', href: '/services/student-visa', description: 'Find funding for your studies' },
          { label: 'Statement of Purpose', href: '/services/student-visa', description: 'Professional SOP writing' },
        ],
      },
      {
        heading: 'Study Destinations',
        items: [
          { label: 'Study in Canada', href: '/destinations/canada#study' },
          { label: 'Study in UK', href: '/services/student-visa' },
          { label: 'Study in Australia', href: '/services/student-visa' },
          { label: 'Study in Germany', href: '/destinations/germany#study' },
          { label: 'Study in USA', href: '/services/student-visa' },
        ],
      },
      {
        heading: 'Coaching',
        items: [
          { label: 'IELTS Preparation', href: '/coaching/ielts' },
          { label: 'PTE Academic', href: '/coaching/ielts' },
          { label: 'TOEFL Prep', href: '/coaching/ielts' },
          { label: 'GRE / GMAT', href: '/coaching/ielts' },
        ],
      },
    ],
  },
  {
    label: 'Visit',
    href: '/contact',
    megaMenu: [
      {
        heading: 'Visit Visas',
        items: [
          { label: 'Tourist Visa', href: '/contact', description: 'Holiday and leisure travel' },
          { label: 'Business Visit Visa', href: '/contact', description: 'Meetings and conferences' },
          { label: 'Medical Visa', href: '/contact', description: 'Treatment abroad' },
          { label: 'Transit Visa', href: '/contact', description: 'Passing through countries' },
        ],
      },
      {
        heading: 'Popular Destinations',
        items: [
          { label: 'UAE / Dubai', href: '/services/work-visa' },
          { label: 'Japan', href: '/services/work-visa' },
          { label: 'Schengen Countries', href: '/contact' },
          { label: 'USA', href: '/services/student-visa' },
          { label: 'Singapore', href: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'Coaching',
    href: '/coaching/ielts',
    megaMenu: [
      {
        heading: 'Language Tests',
        items: [
          { label: 'IELTS Coaching', href: '/coaching/ielts', description: 'Band 7+ guaranteed program' },
          { label: 'PTE Coaching', href: '/coaching/ielts', description: 'Structured language prep support' },
          { label: 'TOEFL Coaching', href: '/coaching/ielts', description: 'High-score language prep guidance' },
          { label: 'OET Coaching', href: '/coaching/ielts', description: 'For healthcare professionals' },
        ],
      },
      {
        heading: 'Graduate Tests',
        items: [
          { label: 'GRE Preparation', href: '/coaching/ielts', description: 'For Masters programs' },
          { label: 'GMAT Preparation', href: '/coaching/ielts', description: 'For MBA programs' },
          { label: 'SAT / ACT', href: '/coaching/ielts', description: 'Undergraduate admissions' },
        ],
      },
      {
        heading: 'Mode of Study',
        items: [
          { label: 'Online Classes', href: '/coaching/ielts' },
          { label: 'Offline / Classroom', href: '/coaching/ielts' },
          { label: 'Weekend Batches', href: '/coaching/ielts' },
          { label: 'Crash Course', href: '/coaching/ielts' },
        ],
      },
    ],
  },
  {
    label: 'Jobs',
    href: '/jobs',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]
