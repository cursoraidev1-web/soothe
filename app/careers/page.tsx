'use client'

import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Mission-Driven Work',
    description: 'Be part of a team that is genuinely making technology more accessible and inclusive.',
    icon: '🎯',
  },
  {
    title: 'Flexible & Remote',
    description: 'Work from anywhere with flexible hours that respect your life outside work.',
    icon: '🌍',
  },
  {
    title: 'Growth & Learning',
    description: 'Continuous learning opportunities, conferences, courses, and mentorship.',
    icon: '📚',
  },
  {
    title: 'Inclusive Culture',
    description: 'A truly diverse team where everyone has a voice that is heard and valued.',
    icon: '🤝',
  },
  {
    title: 'Competitive Compensation',
    description: 'Fair pay, equity options, and comprehensive health benefits.',
    icon: '💰',
  },
  {
    title: 'Work-Life Balance',
    description: 'Generous PTO, parental leave, and a culture that respects boundaries.',
    icon: '⚖️',
  },
]

const openings = [
  {
    title: 'Senior Accessibility Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead accessibility implementation across our product ecosystem. Deep expertise in WCAG, ARIA, and assistive technologies required.',
  },
  {
    title: 'Product Designer (Inclusive Design)',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design beautiful, intuitive experiences that work for everyone. Experience with user research and inclusive design principles essential.',
  },
  {
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build scalable, accessible web applications with React, Node.js, and TypeScript. Passion for clean code and user experience required.',
  },
  {
    title: 'UX Researcher',
    department: 'Research',
    location: 'Remote',
    type: 'Full-time',
    description: 'Conduct user research with diverse populations to inform product decisions. Experience with accessibility research strongly preferred.',
  },
]

export default function CareersPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Join Us in Building a{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                More Inclusive
              </span>{' '}
              Future
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              We're looking for passionate, talented people who believe technology should work for 
              everyone. If you want to make a real impact, you've found the right place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Why Work at SOOTHE?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              More than just a job - it is an opportunity to do meaningful work with amazing people.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-primary-50/50 border border-neutral-200 hover:border-primary-300 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{benefit.icon}</div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-700">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Our Culture & Values
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  At SOOTHE, we believe the best ideas come from diverse perspectives. We actively 
                  cultivate an inclusive environment where everyone—regardless of background, ability, 
                  or identity—can thrive.
                </p>
                <p>
                  We value <strong>empathy</strong>, <strong>curiosity</strong>, and{' '}
                  <strong>collaboration</strong>. We celebrate failure as learning. We support each 
                  other's growth. And we never compromise on our commitment to accessibility.
                </p>
                <p>
                  This is not just what we build - it is how we work.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-6" aria-hidden="true">💜</div>
                  <div className="text-2xl font-display font-bold text-neutral-900">
                    People First
                  </div>
                  <div className="text-neutral-600 mt-2">
                    Always
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore opportunities to join our team and make an impact.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                className="p-8 rounded-2xl bg-white border-2 border-neutral-200 hover:border-primary-400 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105">
                    Apply Now
                  </button>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  {job.description}
                </p>
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
            <p className="text-neutral-600 mb-4">
              Don't see the right role? We're always looking for exceptional talent.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-accent-600 font-semibold hover:text-accent-700 transition-colors"
            >
              Send us your resume
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
