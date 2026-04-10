import SectionHeading from '@/components/ui/SectionHeading'
import TestimonialSlider from '@/components/ui/TestimonialSlider'
import { testimonials } from '@/lib/data/testimonials'
import Link from 'next/link'

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-gray-50">
      <div className="container-pad">
        <div className="text-center mb-12">
          <SectionHeading
            label="Client Stories"
            title="What Our Clients Say"
            highlight="Clients Say"
            subtitle="Real stories from real people who achieved their global dreams with our help."
            align="center"
          />
        </div>

        <TestimonialSlider testimonials={testimonials} />

        {/* Google reviews bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 bg-white rounded-2xl shadow-card p-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">⭐</div>
            <div>
              <div className="text-3xl font-black text-navy-800">4.9/5</div>
              <div className="text-sm text-gray-500">Google Reviews</div>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-lg font-bold text-navy-800 mb-1">10,000+ Happy Clients</div>
            <div className="text-sm text-gray-500">Read all reviews on Google</div>
            <div className="flex gap-2 mt-3">
              <a href="#" className="text-xs bg-navy-50 text-navy-700 font-medium px-3 py-1.5 rounded-lg hover:bg-navy-100 transition-colors">
                Google Reviews
              </a>
              <a href="#" className="text-xs bg-gray-50 text-gray-700 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                JustDial Reviews
              </a>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <Link href="/success-stories" className="btn-outline py-2 px-6 text-sm">
            View All Success Stories →
          </Link>
        </div>
      </div>
    </section>
  )
}
