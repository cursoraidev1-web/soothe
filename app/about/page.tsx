import type { Metadata } from 'next'
import Header from '@/components/Header'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SOOTHE Technologies - our mission to create innovative, accessible technology that empowers everyone and makes life easier.',
  openGraph: {
    title: 'About Us | SOOTHE Technologies',
    description: 'Learn about SOOTHE Technologies - our mission to create innovative, accessible technology that empowers everyone.',
    url: `${siteUrl}/about`,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: 'SOOTHE Technologies Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | SOOTHE Technologies',
    description: 'Technology that empowers everyone.',
    images: [logoUrl],
  },
}

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

export default function AboutPage() {
  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Technology That{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Empowers
              </span>{' '}
              Everyone
              </h1>
              <p className="text-xl text-neutral-700 leading-relaxed">
              We build easy technology that feels calm, clear, and considered. Every product we ship should
              remove friction, honor accessibility from the start, and give people confidence to get things
              done without thinking about the tool.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                Why We Exist
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                We started SOOTHE because too much software makes people tense. The tools are powerful, but
                the experience often ignores real-world constraints—accessibility, clarity, and time.
                </p>
                <p>
                We design for people first: different abilities, different contexts, and different levels of
                comfort with technology. If it is not clear, it is not done.
                </p>
                <p>
                We are here to build easy technology that respects attention, reduces noise, and works for
                everyone—not just the power user.
                </p>
              </div>
            </div>

              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-4">
                  100%
                </div>
                <div className="text-2xl font-semibold text-neutral-900 mb-2">
                  Accessible by Design
                </div>
                <div className="text-neutral-600">
                  Not a feature. A foundation.
                </div>
              </div>
            </div>
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
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
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
              {team.map((department) => (
                <div
                  key={department.name}
                  className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100"
                >
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                  {department.name}
                </h3>
                <p className="text-sm text-neutral-700">
                  {department.description}
                </p>
              </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
