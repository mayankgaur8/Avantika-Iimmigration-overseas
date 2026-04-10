'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'
import type { Country } from '@/lib/data/countries'

interface CountryCardProps {
  country: Country
  index?: number
}

export default function CountryCard({ country, index = 0 }: CountryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={country.href} className="group block">
        <div className="card overflow-hidden hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <Image
              src={country.image}
              alt={`Move to ${country.name}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Flag + Country */}
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="text-2xl flag-emoji">{country.flag}</span>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{country.name}</h3>
              </div>
            </div>

            {/* Success Rate badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-navy-700 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp size={10} />
              {country.successRate} Success
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-3 leading-relaxed line-clamp-2">{country.tagline}</p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={12} />
                <span>{country.processingTime}</span>
              </div>
              <div className="text-xs font-semibold text-emerald-600">{country.averageSalary}</div>
            </div>

            {/* Visa types */}
            <div className="flex flex-wrap gap-1 mb-4">
              {country.visaTypes.slice(0, 3).map((visa) => (
                <span key={visa} className="badge bg-navy-50 text-navy-700 text-[10px] font-medium">
                  {visa}
                </span>
              ))}
              {country.visaTypes.length > 3 && (
                <span className="badge bg-gray-100 text-gray-500 text-[10px]">
                  +{country.visaTypes.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center text-navy-700 font-semibold text-sm group-hover:text-gold-600 transition-colors">
              <span>Explore {country.name}</span>
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
