'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              Let's{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Have a question, idea, or partnership opportunity? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-8">
                  Whether you are interested in our solutions, have accessibility questions, 
                  or want to explore partnership opportunities - we are here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <a href="mailto:hello@soothetech.com" className="text-accent-600 hover:text-accent-700 transition-colors">
                      hello@soothetech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-neutral-900 mb-1">Office</h3>
                    <p className="text-neutral-700">
                      Global - Remote First<br />
                      Headquarters: To Be Announced
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-neutral-900 mb-1">Careers</h3>
                    <a href="/careers" className="text-accent-600 hover:text-accent-700 transition-colors">
                      View Open Positions
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject <span className="text-accent-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors"
                    aria-required="true"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="solutions">Product Solutions</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="accessibility">Accessibility Question</option>
                    <option value="careers">Career Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    aria-required="true"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>

                <p className="text-sm text-neutral-600">
                  <span className="text-accent-500">*</span> Required fields
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl font-bold text-neutral-900 mb-4">
              Response Time
            </h2>
            <p className="text-lg text-neutral-700">
              We aim to respond to all inquiries within 24-48 hours during business days. 
              For urgent accessibility-related questions, please mark your message as high priority.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
