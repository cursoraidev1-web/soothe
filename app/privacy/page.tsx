import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | SOOTHE Technologies',
  description: 'Our commitment to your privacy',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div>
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Privacy Policy
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
                At SOOTHE TECHNOLOGIES LIMITED, we are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy outlines how we collect, 
                use, and safeguard your data.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Information We Collect
              </h2>
              <p>
                We collect information that you provide directly to us, including name, email address, 
                and any other information you choose to provide when using our services or contacting us.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and ensure the security of our platform.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal information. You may also 
                object to or restrict certain processing of your data.
              </p>

              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@soothetech.com" className="text-accent-600 hover:text-accent-700">
                  privacy@soothetech.com
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
