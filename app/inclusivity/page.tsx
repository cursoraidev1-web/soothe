import type { Metadata } from 'next'
import Header from '@/components/Header'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  title: 'Inclusivity',
  description: 'Our commitment to building technology for everyone. Learn how SOOTHE Technologies ensures accessibility and inclusivity in everything we create.',
  openGraph: {
    title: 'Inclusivity | SOOTHE Technologies',
    description: 'Our commitment to building technology for everyone. Learn how we ensure accessibility and inclusivity.',
    url: `${siteUrl}/inclusivity`,
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
    title: 'Inclusivity | SOOTHE Technologies',
    description: 'Our commitment to building technology for everyone.',
    images: [logoUrl],
  },
}

const commitments = [
  {
    title: 'Universal Design Principles',
    description: 'Every product starts with universal design. We build for the widest possible audience from day one, not as an afterthought.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'WCAG Compliance & Beyond',
    description: 'We target WCAG 2.1 AAA standards as a baseline and continuously push beyond to create truly inclusive experiences.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Assistive Technology Support',
    description: 'Full compatibility with screen readers, voice control, switch access, and other assistive technologies—tested by real users.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Diverse User Testing',
    description: 'We work with people of all abilities throughout the design process—not just at the end.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

export default function InclusivityPage() {
  return (
    <>
      <Header />
      <div>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Building for{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>
              <p className="text-xl text-neutral-700 leading-relaxed">
                Inclusivity isn't a feature—it's the foundation of everything we build. We believe technology
                should empower everyone, regardless of ability, age, language, or background.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Our Accessibility Commitments
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                These aren't just principles—they're embedded in our development process, product roadmap,
                and company culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commitments.map((commitment) => (
                <div
                  key={commitment.title}
                  className="p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-primary-50/50 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white">
                      {commitment.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                        {commitment.title}
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">{commitment.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                  Why Inclusive Design Matters
                </h2>
                <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                  <p>
                    <strong>1 in 4 adults</strong> in the United States lives with some form of disability.
                    That's over 61 million people whose needs are often overlooked by technology.
                  </p>
                  <p>
                    But inclusive design benefits everyone—not just people with disabilities. Captions help
                    in noisy environments. Voice control frees your hands. High contrast improves readability
                    for all. Keyboard navigation speeds up workflows.
                  </p>
                  <p>
                    When we design inclusively, we create better experiences for everyone. That's why
                    accessibility is at the core of everything we do—not an afterthought.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-4">
                      100%
                    </div>
                    <div className="text-2xl font-semibold text-neutral-900 mb-2">
                      WCAG Compliant
                    </div>
                    <div className="text-neutral-600">Every Product. Every Time.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get In Touch */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Have Accessibility Feedback?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                We're always working to improve. If you encounter any accessibility barriers or have
                suggestions, please let us know.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:scale-105 shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
