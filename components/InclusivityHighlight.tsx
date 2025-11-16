'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function InclusivityHighlight() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-2 bg-accent-500/20 rounded-full text-accent-300 font-medium text-sm mb-6">
              Our Core Commitment
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Inclusive Design,{' '}
              <span className="text-accent-400">Not an Afterthought</span>
            </h2>
            <p className="text-lg text-primary-100 leading-relaxed mb-8">
              At SOOTHE TECHNOLOGIES, accessibility isn't a feature—it's the foundation. 
              We believe technology should be a bridge, not a barrier. Every product we create 
              is designed from the ground up to work for people of all abilities, ages, and backgrounds.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'WCAG 2.1 AAA compliance as standard',
                'Full keyboard and screen reader support',
                'Adaptable interfaces for diverse needs',
                'Continuous accessibility testing and improvement',
              ].map((item, index) => (
                <motion.li
                  key={item}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6 text-accent-400 mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-primary-50">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/inclusivity"
              className="inline-flex items-center px-6 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
            >
              Learn About Our Commitment
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-square">
              {/* Circular elements representing inclusivity */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute w-64 h-64 rounded-full border-4 border-accent-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-48 h-48 rounded-full border-4 border-primary-400/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
