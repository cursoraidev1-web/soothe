'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const solutions = [
  {
    title: 'Productivity',
    description: 'Tools that help you work smarter, not harder. Streamline tasks, organize your day, and achieve more with less stress.',
    gradient: 'from-purple-600 to-pink-600',
    href: '/solutions#productivity',
  },
  {
    title: 'Wellness',
    description: 'Digital companions for your physical and mental wellbeing. Track, improve, and maintain a healthier, more balanced life.',
    gradient: 'from-accent-600 to-orange-600',
    href: '/solutions#wellness',
  },
  {
    title: 'Assistive Technology',
    description: 'Empowering solutions that remove barriers and create equal access for people of all abilities.',
    gradient: 'from-primary-600 to-purple-600',
    href: '/solutions#assistive',
  },
  {
    title: 'Smart Living',
    description: 'Connected experiences that make your home and daily routines more intuitive, efficient, and enjoyable.',
    gradient: 'from-pink-600 to-accent-600',
    href: '/solutions#smart-living',
  },
]

export default function SolutionsOverview() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="solutions-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Solution Ecosystem
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            A diverse range of digital solutions designed to enhance every aspect of daily living.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={solution.href}
                className="block group h-full"
              >
                <div className="h-full p-8 rounded-2xl bg-white border-2 border-neutral-200 hover:border-transparent transition-all hover:shadow-2xl group-hover:-translate-y-2 relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${solution.gradient} text-white font-semibold mb-4 text-sm`}>
                      {solution.title}
                    </div>
                    <p className="text-neutral-700 leading-relaxed text-lg">
                      {solution.description}
                    </p>
                    <div className="mt-6 flex items-center text-accent-600 font-medium group-hover:translate-x-2 transition-transform">
                      Learn more
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/solutions"
            className="inline-flex items-center px-8 py-4 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            View All Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
