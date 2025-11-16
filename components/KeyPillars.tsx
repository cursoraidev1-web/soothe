'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'User-Centric Innovation',
    description: 'Every solution we build starts with understanding real human needs. We design for people first, technology second.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Inclusive by Design',
    description: 'Accessibility isn\'t an afterthought—it\'s the foundation. We build solutions that work for everyone, regardless of ability.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Scalable Platform',
    description: 'Our modular ecosystem grows with you. From individual apps to integrated solutions, we scale to meet your evolving needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
]

export default function KeyPillars() {
  return (
    <section className="py-24 bg-white" aria-labelledby="pillars-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="pillars-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Built on Three Core Pillars
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our approach to technology is guided by principles that put people at the center of everything we do.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-primary-50/50 border border-neutral-200 hover:border-primary-300 transition-all hover:shadow-lg group-hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
