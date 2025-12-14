'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Inclusivity',
    description: 'We design for everyone, ensuring our technology is accessible to people of all abilities and backgrounds.',
  },
  {
    title: 'Innovation',
    description: 'We challenge the status quo and continuously evolve to create cutting-edge solutions for everyday challenges.',
  },
  {
    title: 'Empathy',
    description: 'We listen, understand, and build with deep consideration for the human experience behind every interaction.',
  },
  {
    title: 'Sustainability',
    description: 'We build for the long term, creating solutions that grow responsibly and serve communities sustainably.',
  },
]

const team = [
  {
    name: 'Leadership Team',
    description: 'A diverse group of visionaries committed to making technology work for everyone.',
  },
  {
    name: 'Design & UX',
    description: 'Human-centered designers creating beautiful, accessible, and intuitive experiences.',
  },
  {
    name: 'Engineering',
    description: 'World-class developers building robust, scalable, and inclusive solutions.',
  },
  {
    name: 'Research & Accessibility',
    description: 'Dedicated experts ensuring our products meet and exceed accessibility standards.',
  },
]

export default function AboutContent() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Technology That{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Empowers
              </span>{' '}
              Everyone
            </motion.h1>
            <motion.p
              className="text-xl text-neutral-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              At SOOTHE TECHNOLOGIES, we believe technology should be a bridge, not a barrier. 
              Our mission is to simplify everyday life through innovative, accessible, and user-centric 
              digital solutions that truly make a difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Why We Exist
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  We founded SOOTHE TECHNOLOGIES with a simple observation: technology has the power 
                  to transform lives, but too often it is built without considering the diverse needs 
                  of real people.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Every day, millions of people struggle with digital tools that were not designed for 
                  them—whether due to disabilities, age, language, or simply poor user experience. 
                  This is not just frustrating; it is exclusionary.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  We are here to change that. By putting people first - all people - we are creating a 
                  digital ecosystem that enhances productivity, supports wellness, removes barriers, 
                  and makes everyday life genuinely easier.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-8 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                >
                  100%
                </motion.div>
                <div className="text-2xl font-semibold text-neutral-900 mb-2">
                  Accessible by Design
                </div>
                <div className="text-neutral-600">
                  Not a feature. A foundation.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every product we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A passionate, diverse team united by a shared mission to make technology work for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((department, index) => (
              <motion.div
                key={department.name}
                className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {department.name}
                </h3>
                <p className="text-sm text-neutral-700">
                  {department.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

