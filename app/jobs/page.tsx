import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import CTASection from '@/components/sections/CTASection'
import ConsultationForm from '@/components/forms/ConsultationForm'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Overseas Jobs | International Career Placement | Avantika Immigration',
  description:
    'Find overseas jobs in Canada, UAE, Germany, Australia, UK and more. Upload your resume and let our career placement team connect you with top international employers.',
}

const jobsByCountry = [
  { flag: '🇨🇦', country: 'Canada', openings: '1,200+', topRoles: 'IT Engineer, Nurse, Accountant' },
  { flag: '🇦🇪', country: 'UAE', openings: '3,500+', topRoles: 'Sales Manager, Civil Engineer, Chef' },
  { flag: '🇩🇪', country: 'Germany', openings: '800+', topRoles: 'Software Engineer, Nurse, Researcher' },
  { flag: '🇬🇧', country: 'UK', openings: '950+', topRoles: 'Finance Analyst, NHS Nurse, Developer' },
  { flag: '🇦🇺', country: 'Australia', openings: '1,100+', topRoles: 'Project Manager, Electrician, Nurse' },
  { flag: '🇯🇵', country: 'Japan', openings: '600+', topRoles: 'IT Engineer, Hotel Staff, Teacher' },
]

const industries = [
  { icon: '💻', name: 'Information Technology', openings: '4,200+' },
  { icon: '🏥', name: 'Healthcare & Nursing', openings: '3,800+' },
  { icon: '🏗️', name: 'Engineering & Construction', openings: '2,900+' },
  { icon: '🏦', name: 'Finance & Accounting', openings: '2,100+' },
  { icon: '🎓', name: 'Education & Teaching', openings: '1,500+' },
  { icon: '🍽️', name: 'Hospitality & Tourism', openings: '2,700+' },
  { icon: '🚗', name: 'Automotive & Manufacturing', openings: '1,800+' },
  { icon: '🔬', name: 'Research & Science', openings: '900+' },
]

const careerServices = [
  { icon: '📄', title: 'International Resume Writing', desc: 'ATS-optimised resumes tailored to each country\'s format and employer expectations.', href: '/services/resume-writing' },
  { icon: '🔗', title: 'LinkedIn Profile Optimization', desc: 'Make your profile stand out to global recruiters with keyword-rich, strategic content.', href: '/services/linkedin' },
  { icon: '📢', title: 'Resume Marketing', desc: 'We actively market your CV to our network of 500+ international employers and recruiters.', href: '/services/resume-marketing' },
  { icon: '🤝', title: 'Job Search Assistance', desc: 'Dedicated career advisor who actively searches and applies for matching positions.', href: '/jobs/assistance' },
]

export default function JobsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-pad relative z-10">
          <Breadcrumb items={[{ label: 'Overseas Jobs' }]} dark />
          <div className="max-w-3xl mt-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Find Your <span className="text-gold-400">Overseas Dream Job</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8">
              Access 10,000+ international job opportunities. Our career placement team connects skilled
              professionals with top employers in Canada, UAE, Germany, Australia, UK, and Japan.
            </p>

            {/* Job search bar */}
            <div className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-2xl">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or skill (e.g. Software Engineer)"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-500 bg-gray-50"
                />
              </div>
              <div className="relative md:w-48">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy-500 bg-gray-50 appearance-none">
                  <option value="">Any Country</option>
                  <option>Canada</option>
                  <option>UAE</option>
                  <option>Germany</option>
                  <option>Australia</option>
                  <option>UK</option>
                  <option>Japan</option>
                </select>
              </div>
              <button className="btn-secondary px-8 py-3 whitespace-nowrap">
                Search Jobs
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['Software Engineer', 'Registered Nurse', 'Civil Engineer', 'Finance Manager', 'IT Manager'].map((tag) => (
                <span key={tag} className="text-xs bg-white/10 text-white/70 border border-white/20 px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs by Country */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading label="By Destination" title="Jobs by Country" highlight="Jobs by Country" align="center" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobsByCountry.map((c) => (
              <Link
                key={c.country}
                href={`/jobs/${c.country.toLowerCase()}`}
                className="group card p-6 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5"
              >
                <span className="text-5xl flag-emoji flex-shrink-0">{c.flag}</span>
                <div>
                  <h4 className="font-bold text-navy-800 text-lg group-hover:text-navy-600 transition-colors">
                    {c.country}
                  </h4>
                  <div className="text-emerald-600 font-semibold text-sm mb-1">{c.openings} openings</div>
                  <div className="text-xs text-gray-400">{c.topRoles}</div>
                </div>
                <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-navy-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs by Industry */}
      <section className="section-pad bg-gray-50">
        <div className="container-pad">
          <SectionHeading label="By Sector" title="Jobs by Industry" highlight="Jobs by Industry" align="center" className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="bg-white card p-5 text-center hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="text-4xl mb-3">{ind.icon}</div>
                <h4 className="font-semibold text-navy-800 text-sm mb-1">{ind.name}</h4>
                <div className="text-emerald-600 text-xs font-bold">{ind.openings} jobs</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Services */}
      <section className="section-pad bg-white">
        <div className="container-pad">
          <SectionHeading
            label="Career Support"
            title="Beyond Job Listings — Full Career Services"
            highlight="Career Services"
            subtitle="We don't just show you jobs. We prepare you, market you, and place you."
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {careerServices.map((svc) => (
              <Link key={svc.title} href={svc.href} className="group card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-3">{svc.icon}</div>
                <h4 className="font-bold text-navy-800 mb-2">{svc.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                <span className="text-sm font-semibold text-navy-700 group-hover:text-gold-600 transition-colors">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upload CV */}
      <section className="section-pad bg-navy-900">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-4">
                Upload Your Resume — Get Matched with International Jobs
              </h2>
              <p className="text-navy-300 leading-relaxed mb-6">
                Our career placement team actively shares your CV with 500+ international employers, recruiter
                networks, and LinkedIn contacts. We work on your behalf while you focus on preparation.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Your profile reviewed by a career expert within 24 hrs',
                  'Matched to relevant overseas openings',
                  'Resume reformatted for target country standards',
                  'Directly submitted to employer HR portals',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-navy-200 text-sm">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-secondary px-8 py-3.5 text-base">
                Upload My Resume
              </Link>
            </div>
            <ConsultationForm
              title="Register for Job Placement"
              subtitle="Tell us your experience and target role — we'll find the right match for you."
            />
          </div>
        </div>
      </section>

      <CTASection title="Ready to Launch Your International Career?" subtitle="Our overseas career placement team is ready to help you land your dream job abroad." />
    </>
  )
}
