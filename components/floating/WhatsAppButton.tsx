'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { trackEvent } from '@/lib/utils/analytics'
import { CONTACT } from '@/lib/config/contact'

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleClick = () => {
    trackEvent('whatsapp_click', { location: 'floating_button' })
    window.open(CONTACT.whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showPopup && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-4 w-60 border border-green-100 mr-1"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-800">Avantika Support</div>
                <div className="flex items-center gap-1.5 text-xs text-green-600">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                  Online now
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Hi there! 👋 Have questions about immigration? Chat with us on WhatsApp.
            </p>
            <button
              onClick={handleClick}
              className="w-full py-2 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Start Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (dismissed) {
            handleClick()
          } else {
            setShowPopup(!showPopup)
          }
        }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-xl flex items-center justify-center transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
          1
        </span>
      </motion.button>
    </div>
  )
}
