'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/data/testimonials'

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, testimonials.length])

  const prev = () => {
    setAutoPlay(false)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setAutoPlay(false)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative quote */}
          <Quote className="absolute top-6 left-8 w-16 h-16 text-navy-50 -rotate-12" fill="currentColor" />

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < t.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>

          {/* Text */}
          <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 relative z-10 max-w-2xl mx-auto">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center text-white font-bold text-sm">
              {t.avatar}
            </div>
            <div className="text-left">
              <div className="font-bold text-navy-800">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
              <div className="text-xs text-gold-600 font-medium mt-0.5">
                <span className="flag-emoji mr-1">{t.flag}</span>
                {t.country} · {t.service}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border-2 border-navy-200 text-navy-700 hover:bg-navy-700 hover:text-white hover:border-navy-700 transition-all flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAutoPlay(false); setCurrent(i) }}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-2.5 bg-gold-500' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border-2 border-navy-200 text-navy-700 hover:bg-navy-700 hover:text-white hover:border-navy-700 transition-all flex items-center justify-center"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
