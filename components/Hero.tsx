'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <motion.p
            className="text-accent-600 font-medium mb-6 text-sm sm:text-base tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Build Easy Technology. Inclusive from the start.
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Technology That{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              Bridges
            </span>
            , Not Barriers
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mx-auto max-w-3xl text-lg sm:text-xl text-neutral-700 mb-10 text-balance leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We develop innovative, accessible, and user-centric digital solutions that simplify everyday life. 
            From productivity to wellness, from assistive technology to smart living—we're here to make 
            technology work for everyone.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              href="/solutions"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              Explore Our Solutions
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-lg border-2 border-neutral-200 hover:border-primary-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              Learn Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-neutral-600 mt-2">Accessible Design</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Global
              </div>
              <div className="text-sm text-neutral-600 mt-2">Reach & Impact</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                User-First
              </div>
              <div className="text-sm text-neutral-600 mt-2">Design Philosophy</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
