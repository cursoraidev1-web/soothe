'use client'

import { useMemo, useState } from 'react'
import Header from '@/components/Header'
import { toast } from 'sonner'
import { frontendApi } from '@/lib/frontend-api'
import Swal from 'sweetalert2'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact SOOTHE Technologies',
  description: 'Reach the SOOTHE Technologies team for solutions, partnerships, accessibility, or careers.',
  url: `${siteUrl}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'SOOTHE Technologies',
    url: siteUrl,
  },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const subjectOptions = useMemo(
    () => [
      { value: 'general', label: 'General question' },
      { value: 'solutions', label: 'Product or solution fit' },
      { value: 'partnership', label: 'Partnership or collaboration' },
      { value: 'accessibility', label: 'Accessibility or inclusive design' },
      { value: 'careers', label: 'Careers or hiring' },
      { value: 'other', label: 'Something else' },
    ],
    [],
  )

  const validate = () => {
    const nextErrors: Record<string, string> = {}
    if (!formData.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!formData.email.trim()) nextErrors.email = 'We need an email to reply.'
    if (!formData.subject.trim()) nextErrors.subject = 'Pick a subject.'
    if (!formData.message.trim()) nextErrors.message = 'Share a few details.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fill in the required fields.')
      return
    }

    try {
      setSubmitting(true)
      await frontendApi.submitContact(formData)

      await Swal.fire({
        icon: 'success',
        title: 'Message sent',
        text: 'Thanks for reaching out. We will get back shortly.',
        confirmButtonColor: '#2563eb',
      })

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setErrors({})
    } catch (error) {
      console.error('Failed to submit form:', error)
      toast.error('We could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const { [e.target.name]: _, ...rest } = prev
        return rest
      })
    }
  }

  return (
    <>
      <Header />
      <div className="breathe-page">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
        />
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50 breathe-hero">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">
                Build Easy Technology
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
                Breathe Easy. Reach a team that answers.
              </h1>
              <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed">
                Tell us what you are trying to solve, and we will get you to the right person—no friction,
                no jargon. Just clear next steps.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-neutral-600">
                <span className="pill">Product guidance</span>
                <span className="pill">Accessibility questions</span>
                <span className="pill">Partnerships</span>
                <span className="pill">Careers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8 breathe-card">
                <div>
                  <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                    We’ll meet you where you are
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Share the context. We read every message and route it to a human owner within one business day.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="contact-icon">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                      <a href="mailto:hello@soothetech.com" className="text-accent-600 hover:text-accent-700 transition-colors">
                        hello@soothetech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="contact-icon">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Careers</h3>
                      <a href="/careers" className="text-accent-600 hover:text-accent-700 transition-colors">
                        View open roles
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <p className="text-sm text-neutral-700">
                    Response window: 24–48 hours on business days. Mark accessibility requests and we will jump sooner.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 breathe-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="field-label">
                        Your Name <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`field-input ${errors.name ? 'field-error' : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="field-error-text">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="field-label">
                        Email Address <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`field-input ${errors.email ? 'field-error' : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="field-error-text">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="field-label">
                      Subject <span className="text-accent-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className={`field-input ${errors.subject ? 'field-error' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p id="subject-error" className="field-error-text">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">
                      Message <span className="text-accent-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`field-input resize-none ${errors.message ? 'field-error' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="field-error-text">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-neutral-600">
                      We read everything. No spam. No outsourcing.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="cta-button"
                    >
                      {submitting ? 'Sending...' : 'Send message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="font-display text-3xl font-bold text-neutral-900">
                What happens next
              </h2>
              <p className="text-lg text-neutral-700">
                We route your note to the right lead and share clear next steps—whether that is a quick answer,
                a short demo, or a deep-dive workshop.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
