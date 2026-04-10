'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  className?: string
}

export default function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={`space-y-3 ${className}`}>
      {faqs.map((faq) => {
        const isOpen = openId === faq.id
        return (
          <div
            key={faq.id}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              isOpen ? 'border-navy-200 shadow-card' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-sm md:text-base pr-4 ${isOpen ? 'text-navy-700' : 'text-gray-800'}`}>
                {faq.question}
              </span>
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-navy-700 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5">
                    <div className="w-full h-px bg-gray-100 mb-4" />
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
