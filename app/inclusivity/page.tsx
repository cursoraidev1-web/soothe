import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Inclusivity | SOOTHE Technologies',
  description: 'Our commitment to building technology for everyone',
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
    title: 'Cognitive Accessibility',
    description: 'Clear language, intuitive navigation, and flexible interfaces that accommodate different cognitive abilities and learning styles.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Continuous Testing',
    description: 'Regular accessibility audits, user testing with people of diverse abilities, and automated testing throughout development.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Community Partnership',
    description: 'We collaborate with disability advocacy groups, accessibility experts, and users to ensure our solutions truly serve their needs.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

export default function InclusivityPage() {
  return (
    <>
      <Header />
      <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Accessibility Isn't a Feature.{' '}
              <span className="text-accent-400">It's the Foundation.</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              At SOOTHE TECHNOLOGIES, inclusive design is not an add-on or checkbox - it is the very 
              foundation of how we build. Every product, every feature, every line of code is crafted 
              with accessibility at its core.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Philosophy */}
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
                Technology as a Bridge, Not a Barrier
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Too often, technology is built for an imagined "average user"—excluding millions 
                  of people with disabilities, older adults, those with temporary impairments, and 
                  anyone in challenging circumstances.
                </p>
                <p>
                  We reject this approach. Our philosophy is simple: <strong>if it is not accessible 
                  to everyone, it is not finished.</strong>
                </p>
                <p>
                  By designing for the edges—for people with diverse abilities, needs, and 
                  contexts—we create better products for everyone.
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
                  <div className="text-7xl mb-6" aria-hidden="true">♿</div>
                  <div className="text-2xl font-display font-bold text-neutral-900">
                    Built for All
                  </div>
                  <div className="text-neutral-600 mt-2">
                    No exceptions. No exclusions.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Accessibility Commitments
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              These are not aspirations - they are requirements we hold ourselves to in every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white mb-4">
                  {commitment.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                  {commitment.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards We Follow */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Standards & Frameworks We Follow
            </h2>
            <div className="space-y-4 text-lg text-neutral-700 text-left">
              <p>✓ <strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines) Level AA as minimum, AAA as goal</p>
              <p>✓ <strong>Section 508</strong> compliance for US federal accessibility standards</p>
              <p>✓ <strong>EN 301 549</strong> for European digital accessibility requirements</p>
              <p>✓ <strong>ADA</strong> (Americans with Disabilities Act) digital compliance</p>
              <p>✓ <strong>ISO 30071-1</strong> for embedding accessibility in organizations</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Questions About Accessibility?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              We're always happy to discuss our accessibility practices, share resources, or 
              collaborate on making the digital world more inclusive.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:scale-105 shadow-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
