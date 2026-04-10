export interface Country {
  id: string
  name: string
  flag: string
  image: string
  tagline: string
  description: string
  highlights: string[]
  visaTypes: string[]
  processingTime: string
  successRate: string
  averageSalary: string
  popularJobs: string[]
  color: string
  href: string
}

export const featuredCountries: Country[] = [
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
    tagline: 'World\'s Top Destination for Skilled Immigrants',
    description:
      'Canada offers Express Entry, Provincial Nominee Programs, and multiple pathways to permanent residency. A multicultural, safe, and high-quality lifestyle awaits.',
    highlights: ['High quality of life', 'Strong economy', 'Excellent healthcare', 'World-class education'],
    visaTypes: ['Express Entry PR', 'Provincial Nominee', 'Federal Skilled Worker', 'Student Visa', 'Work Permit'],
    processingTime: '6-12 months',
    successRate: '94%',
    averageSalary: 'CAD 65,000/year',
    popularJobs: ['IT Engineer', 'Nurse', 'Accountant', 'Civil Engineer', 'Data Analyst'],
    color: 'from-red-600 to-red-800',
    href: '/destinations/canada',
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tagline: 'Land of Opportunities & Sunshine',
    description:
      'Australia\'s points-based immigration system welcomes skilled workers, students, and investors. Enjoy excellent work-life balance and world-renowned natural beauty.',
    highlights: ['Points-based PR system', 'Excellent wages', 'Great outdoor lifestyle', 'Thriving job market'],
    visaTypes: ['Skilled Independent (189)', 'State Nominated (190)', 'Student Visa', 'Working Holiday', 'Employer Sponsored'],
    processingTime: '8-14 months',
    successRate: '91%',
    averageSalary: 'AUD 85,000/year',
    popularJobs: ['Software Developer', 'Registered Nurse', 'Project Manager', 'Chef', 'Electrician'],
    color: 'from-yellow-500 to-orange-600',
    href: '/destinations/australia',
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80',
    tagline: 'Europe\'s Economic Powerhouse Welcomes You',
    description:
      'Germany\'s Opportunity Card (Chancenkarte) and skilled worker visa make it the easiest country to enter in Europe. Low cost of living compared to earnings.',
    highlights: ['Opportunity Card 2024', 'Free university education', 'Strong social security', 'Central European location'],
    visaTypes: ['Opportunity Card', 'Skilled Worker Visa', 'EU Blue Card', 'Student Visa', 'Job Seeker Visa'],
    processingTime: '3-6 months',
    successRate: '88%',
    averageSalary: '€55,000/year',
    popularJobs: ['Software Engineer', 'Mechanical Engineer', 'Doctor', 'Nurse', 'Research Scientist'],
    color: 'from-gray-800 to-yellow-600',
    href: '/destinations/germany',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    tagline: 'Global Finance & Cultural Capital',
    description:
      'The UK Skilled Worker visa offers a clear path to settlement. London is a global business hub, and the NHS offers excellent opportunities for healthcare workers.',
    highlights: ['Global financial hub', 'Prestigious universities', 'Diverse multicultural society', 'Strong job market'],
    visaTypes: ['Skilled Worker Visa', 'Global Talent', 'Graduate Visa', 'Student Visa', 'Health & Care Worker'],
    processingTime: '3-8 weeks',
    successRate: '89%',
    averageSalary: '£42,000/year',
    popularJobs: ['Finance Analyst', 'Software Developer', 'Nurse', 'Teacher', 'Marketing Manager'],
    color: 'from-blue-700 to-red-700',
    href: '/destinations/uk',
  },
  {
    id: 'uae',
    name: 'UAE / Dubai',
    flag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    tagline: 'Tax-Free Salaries & Global Business Hub',
    description:
      'The UAE offers tax-free income, a booming economy, and a cosmopolitan lifestyle. The Golden Visa program provides long-term residency for skilled professionals.',
    highlights: ['Zero income tax', 'Golden Visa program', 'Cosmopolitan lifestyle', 'World-class infrastructure'],
    visaTypes: ['Employment Visa', 'Golden Visa', 'Freelance Permit', 'Business Setup', 'Retirement Visa'],
    processingTime: '2-4 weeks',
    successRate: '96%',
    averageSalary: 'AED 180,000/year',
    popularJobs: ['IT Manager', 'Sales Executive', 'Civil Engineer', 'Chef', 'Finance Manager'],
    color: 'from-green-600 to-red-600',
    href: '/destinations/uae',
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
    tagline: 'Innovation, Culture & Career Growth',
    description:
      'Japan is actively seeking skilled workers to address its aging workforce. The Specified Skilled Worker program and IT visas are popular entry routes.',
    highlights: ['World\'s 3rd largest economy', 'Advanced technology sector', 'Unique cultural experience', 'Safe and clean cities'],
    visaTypes: ['Skilled Worker (SSW)', 'Engineer/Specialist', 'Highly Skilled Professional', 'Student Visa', 'Working Holiday'],
    processingTime: '1-3 months',
    successRate: '85%',
    averageSalary: '¥4,800,000/year',
    popularJobs: ['Software Engineer', 'Japanese Language Teacher', 'Nurse', 'Hotel Staff', 'Automotive Engineer'],
    color: 'from-red-600 to-white',
    href: '/destinations/japan',
  },
]

export const allCountries = [
  ...featuredCountries,
  { id: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', href: '/destinations/new-zealand' },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', href: '/destinations/singapore' },
  { id: 'usa', name: 'USA', flag: '🇺🇸', href: '/destinations/usa' },
  { id: 'schengen', name: 'Schengen', flag: '🇪🇺', href: '/destinations/schengen' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', href: '/destinations/malaysia' },
  { id: 'portugal', name: 'Portugal', flag: '🇵🇹', href: '/destinations/portugal' },
]
