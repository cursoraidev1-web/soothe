import { frontendApi } from '@/lib/frontend-api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import AccessibilityControls from '@/components/AccessibilityControls'
import Link from 'next/link'

export const revalidate = 3600

export async function generateMetadata({ params }: any) {
  const solution = await frontendApi.getSolution(params.slug).catch(() => null)
  
  if (!solution) return {}

  return {
    title: `${solution.title} | SOOTHE Technologies`,
    description: solution.description,
    openGraph: {
      title: solution.title,
      description: solution.description,
      images: solution.imageUrl ? [solution.imageUrl] : [],
    },
  }
}

export default async function SolutionDetailPage({ params }: any) {
  const [solution, accessibility] = await Promise.all([
    frontendApi.getSolution(params.slug).catch(() => null),
    frontendApi.getAccessibility().catch(() => ({})),
  ])

  if (!solution || !solution.isPublished) {
    notFound()
  }

  return (
    <>
      <AccessibilityControls />
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <Link href="/solutions" className="text-white/80 hover:text-white mb-4 inline-block">
              ← Back to Solutions
            </Link>
            <h1 className="text-5xl font-bold">{solution.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {solution.imageUrl && (
              <img
                src={solution.imageUrl}
                alt={solution.title}
                className="w-full max-w-4xl mx-auto h-96 object-cover rounded-lg shadow-xl mb-12"
              />
            )}
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">{solution.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {solution.features && solution.features.length > 0 && (
                <div className="bg-green-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-green-900">Key Features</h2>
                  <ul className="space-y-3">
                    {solution.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-600 text-xl font-bold">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {solution.benefits && solution.benefits.length > 0 && (
                <div className="bg-blue-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-blue-900">Benefits</h2>
                  <ul className="space-y-3">
                    {solution.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-600 text-xl">★</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Interested in this solution?</h2>
              <p className="text-xl mb-8">Get in touch with our team to learn more</p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
