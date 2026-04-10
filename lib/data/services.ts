export { blogPosts } from './blog'

export interface Service {
  id: string
  title: string
  slug: string
  icon: string
  description: string
  color: string
  bgColor: string
  features: string[]
  href: string
}

export const mainServices: Service[] = [
  {
    id: 'migrate',
    title: 'Migrate',
    slug: 'migrate',
    icon: '✈️',
    description: 'Permanent residency and immigration pathways to your dream country',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    features: ['PR Visa', 'Skilled Worker', 'Investor Visa', 'Family Sponsorship'],
    href: '/eligibility',
  },
  {
    id: 'work',
    title: 'Work',
    slug: 'work',
    icon: '💼',
    description: 'Work permits, job placement, and career transition abroad',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    features: ['Work Permit', 'Opportunity Card', 'Resume Writing', 'Job Search'],
    href: '/services/work-visa',
  },
  {
    id: 'study',
    title: 'Study',
    slug: 'study',
    icon: '🎓',
    description: 'Student visas, university admissions, and scholarship guidance',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    features: ['Student Visa', 'Admissions Help', 'SOP Writing', 'Scholarship'],
    href: '/services/student-visa',
  },
  {
    id: 'visit',
    title: 'Visit',
    slug: 'visit',
    icon: '🗺️',
    description: 'Tourist, business, and medical visit visas processed swiftly',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    features: ['Tourist Visa', 'Business Visa', 'Medical Visa', 'Transit Visa'],
    href: '/contact',
  },
  {
    id: 'coaching',
    title: 'Coaching',
    slug: 'coaching',
    icon: '📚',
    description: 'IELTS, PTE, TOEFL, GRE, GMAT expert coaching with guaranteed results',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    features: ['IELTS', 'PTE', 'TOEFL', 'GRE / GMAT'],
    href: '/coaching/ielts',
  },
]

export const visaServices = [
  { id: 'pr-visa', title: 'Permanent Residency', href: '/eligibility', icon: '🏠', countries: ['Canada', 'Australia', 'NZ'] },
  { id: 'work-visa', title: 'Work Visa', href: '/services/work-visa', icon: '💼', countries: ['Germany', 'UAE', 'Canada'] },
  { id: 'student-visa', title: 'Student Visa', href: '/services/student-visa', icon: '🎓', countries: ['UK', 'Canada', 'Australia'] },
  { id: 'visit-visa', title: 'Visit Visa', href: '/contact', icon: '🗺️', countries: ['UAE', 'USA', 'Schengen'] },
  { id: 'business-visa', title: 'Business Visa', href: '/contact', icon: '🤝', countries: ['UK', 'Germany', 'Singapore'] },
  { id: 'opportunity-card', title: 'Opportunity Card', href: '/destinations/germany', icon: '⭐', countries: ['Germany'] },
  { id: 'digital-nomad', title: 'Digital Nomad Visa', href: '/services/work-visa', icon: '💻', countries: ['Portugal', 'Malaysia', 'UAE'] },
  { id: 'resume-writing', title: 'Resume Writing', href: '/jobs', icon: '📄', countries: ['Global'] },
  { id: 'linkedin', title: 'LinkedIn Optimization', href: '/jobs', icon: '🔗', countries: ['Global'] },
  { id: 'ielts', title: 'IELTS Coaching', href: '/coaching/ielts', icon: '📝', countries: ['Global'] },
  { id: 'pte', title: 'PTE Coaching', href: '/coaching/ielts', icon: '🎯', countries: ['Global'] },
]

export const faqs = [
  {
    id: '1',
    question: 'How do I know if I am eligible to migrate abroad?',
    answer: 'Eligibility depends on various factors including your age, education, work experience, English language proficiency, and the specific country and visa category you\'re targeting. The best way to know is to take our free eligibility assessment — our consultants will evaluate your profile within 24 hours and suggest the best pathways for you.',
  },
  {
    id: '2',
    question: 'How long does the immigration process typically take?',
    answer: 'Processing times vary by country and visa type. Canada Express Entry typically takes 6-12 months, Germany\'s Opportunity Card takes 3-6 months, Australia PR takes 8-14 months, and UAE employment visas can be completed in 2-4 weeks. We provide realistic timelines specific to your case during the initial consultation.',
  },
  {
    id: '3',
    question: 'What is your success rate for visa approvals?',
    answer: 'Our overall visa approval rate exceeds 92%. We maintain this high rate through thorough document preparation, complete profile checks before submission, and our experienced team\'s knowledge of each country\'s specific requirements. We only file applications when we are confident in the outcome.',
  },
  {
    id: '4',
    question: 'Do I need IELTS for all immigration pathways?',
    answer: 'English language proficiency (IELTS, PTE, TOEFL) is required for most English-speaking destinations like Canada, Australia, UK, and New Zealand. Germany and Japan have separate language requirements. However, some visa categories like certain employer-sponsored visas may have waivers. Our consultants will advise you based on your specific pathway.',
  },
  {
    id: '5',
    question: 'What are your consultation fees?',
    answer: 'We offer a free initial eligibility assessment and 30-minute consultation to help you understand your options. Our paid service packages are transparent and structured based on the visa category and destination. There are no hidden charges — everything is disclosed in writing before you sign the service agreement.',
  },
  {
    id: '6',
    question: 'Can I migrate with my family?',
    answer: 'Yes, most immigration pathways allow you to include spouse and dependent children in your application. We handle family applications comprehensively, including additional document requirements for family members and guidance on schooling, healthcare, and settlement in the destination country.',
  },
  {
    id: '7',
    question: 'How does the IELTS coaching at Avantika work?',
    answer: 'Our IELTS program includes structured classes covering all 4 modules, weekly mock tests with detailed feedback, individual speaking practice sessions, and unlimited doubt-clearing sessions. We offer both online and offline batches. Most students achieve their target band score within 4-8 weeks of our program.',
  },
  {
    id: '8',
    question: 'What documents do I need to start the immigration process?',
    answer: 'Typically you\'ll need your passport, educational certificates, work experience letters, English test scores, and a few personal documents. However, the exact checklist depends on your destination and visa type. We provide a personalized document checklist after your eligibility assessment.',
  },
]
