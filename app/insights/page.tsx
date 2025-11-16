'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const articles = [
  {
    title: 'The Future of Inclusive Technology: Beyond Compliance',
    excerpt: 'Why accessibility compliance is just the starting point, and how truly inclusive design benefits everyone.',
    category: 'Accessibility',
    date: 'November 10, 2025',
    readTime: '8 min read',
    gradient: 'from-primary-600 to-purple-600',
  },
  {
    title: 'Building for Cognitive Accessibility: A Developer Guide',
    excerpt: 'Practical strategies for creating interfaces that work for users with diverse cognitive abilities.',
    category: 'Development',
    date: 'November 5, 2025',
    readTime: '12 min read',
    gradient: 'from-accent-600 to-orange-600',
  },
  {
    title: 'Why Productivity Tools Fail (And How to Fix Them)',
    excerpt: 'An exploration of common productivity app pitfalls and the user-centric approach that actually works.',
    category: 'Product Design',
    date: 'October 28, 2025',
    readTime: '10 min read',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Wellness Tech Done Right: Privacy, Ethics, and Empathy',
    excerpt: 'How to build health and wellness applications that truly serve users without exploiting their data.',
    category: 'Wellness',
    date: 'October 20, 2025',
    readTime: '9 min read',
    gradient: 'from-pink-600 to-accent-600',
  },
  {
    title: 'The Case for Universal Design in Smart Home Tech',
    excerpt: 'Why smart home solutions should be designed for people of all abilities from day one.',
    category: 'Smart Living',
    date: 'October 15, 2025',
    readTime: '7 min read',
    gradient: 'from-primary-600 to-accent-600',
  },
  {
    title: 'Screen Readers and Modern Web Apps: A Testing Guide',
    excerpt: 'Comprehensive guide to testing your web applications with popular screen readers.',
    category: 'Accessibility',
    date: 'October 8, 2025',
    readTime: '15 min read',
    gradient: 'from-purple-600 to-primary-600',
  },
]

const categories = [
  'All',
  'Accessibility',
  'Development',
  'Product Design',
  'Wellness',
  'Smart Living',
]

export default function InsightsPage() {
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
              Insights &{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Perspectives
              </span>
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Thoughts on accessibility, inclusive design, technology, and the future of digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href="#" className="block h-full">
                  <div className="h-full flex flex-col rounded-2xl bg-white border-2 border-neutral-200 hover:border-transparent transition-all hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden">
                    {/* Gradient header */}
                    <div className={`h-40 bg-gradient-to-br ${article.gradient} relative`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-900">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <h2 className="font-display text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-neutral-700 leading-relaxed mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t border-neutral-200">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button className="px-8 py-4 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-neutral-700 mb-8">
              Get our latest insights on accessibility, inclusive design, and technology delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
