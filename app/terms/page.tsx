import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | SOOTHE Technologies',
  description: 'Terms and conditions for using our services',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <div>
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Terms of Service
            </h1>
              <p className="text-lg text-neutral-600">Last updated: November 16, 2025</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
            <div className="text-neutral-700 space-y-6 leading-relaxed">
              <p>
                Welcome to SOOTHE TECHNOLOGIES LIMITED. By accessing or using our website and services, 
                you agree to be bound by these Terms of Service.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By using our services, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms of Service and our Privacy Policy.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Use of Services
              </h2>
              <p>
                You agree to use our services only for lawful purposes and in accordance with these Terms. 
                You may not use our services in any way that could damage, disable, or impair our platform.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Intellectual Property
              </h2>
              <p>
                All content, features, and functionality on our website are owned by SOOTHE TECHNOLOGIES 
                LIMITED and are protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, SOOTHE TECHNOLOGIES LIMITED shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages resulting from 
                your use of our services.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@soothetech.com" className="text-accent-600 hover:text-accent-700">
                  legal@soothetech.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
