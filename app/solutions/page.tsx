'use client'

import { motion } from 'framer-motion'

const solutions = [
  {
    id: 'productivity',
    title: 'Productivity Solutions',
    tagline: 'Work Smarter, Not Harder',
    description: 'Our productivity tools are designed to help you organize your day, streamline repetitive tasks, and focus on what truly matters. From task management to time tracking, we create intuitive solutions that adapt to your workflow.',
    features: [
      'Intelligent task prioritization',
      'Seamless calendar integration',
      'Cross-platform synchronization',
      'Voice commands and keyboard shortcuts',
      'Customizable workflows',
    ],
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'wellness',
    title: 'Wellness & Health',
    tagline: 'Your Digital Companion for Wellbeing',
    description: 'Health and wellness are foundational to quality of life. Our solutions help you track physical activity, manage mental health, maintain healthy habits, and achieve balance—all with empathy and privacy at the core.',
    features: [
      'Personalized wellness tracking',
      'Mental health support tools',
      'Mindfulness and meditation guides',
      'Sleep quality analysis',
      'Privacy-first data handling',
    ],
    gradient: 'from-accent-600 to-orange-600',
  },
  {
    id: 'assistive',
    title: 'Assistive Technology',
    tagline: 'Removing Barriers, Creating Opportunities',
    description: 'Technology should empower, not exclude. Our assistive solutions are built from the ground up to support people with disabilities—from screen reader optimization to alternative input methods and beyond.',
    features: [
      'Advanced screen reader support',
      'Voice-controlled interfaces',
      'Customizable visual displays',
      'Cognitive accessibility features',
      'Community-driven improvements',
    ],
    gradient: 'from-primary-600 to-purple-600',
  },
  {
    id: 'smart-living',
    title: 'Smart Living',
    tagline: 'Make Your Space Intuitive',
    description: 'Connected experiences that make your home more responsive, efficient, and enjoyable. From smart routines to energy management, we make daily living effortless and sustainable.',
    features: [
      'Intuitive home automation',
      'Energy efficiency insights',
      'Personalized routines',
      'Multi-device integration',
      'Simple, secure setup',
    ],
    gradient: 'from-pink-600 to-accent-600',
  },
]

export default function SolutionsPage() {
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
              A Complete{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Ecosystem
              </span>{' '}
              for Daily Living
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              From productivity to wellness, from assistive technology to smart living—our diverse 
              portfolio of solutions is designed to enhance every aspect of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                id={solution.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${solution.gradient} text-white font-semibold mb-4 text-sm`}>
                      {solution.title}
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                      {solution.tagline}
                    </h2>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                    <ul className="space-y-3">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg
                            className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0 mt-0.5"
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
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Element */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${solution.gradient} p-12 flex items-center justify-center`}>
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-white opacity-10"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative text-center text-white">
                        <div className="text-8xl mb-4" aria-hidden="true">
                          {solution.id === 'productivity' && '⚡'}
                          {solution.id === 'wellness' && '❤️'}
                          {solution.id === 'assistive' && '♿'}
                          {solution.id === 'smart-living' && '🏠'}
                        </div>
                        <div className="text-2xl font-display font-bold">
                          {solution.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Interested in Our Solutions?
            </h2>
            <p className="text-lg text-neutral-700 mb-8">
              Whether you are looking for a specific product or exploring partnership opportunities, 
              we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
