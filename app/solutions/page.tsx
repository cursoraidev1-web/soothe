import type { Metadata } from 'next'
import { frontendApi } from '@/lib/frontend-api'
import Link from 'next/link'
import Header from '@/components/Header'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  title: 'Our Solutions',
  description: 'Explore our comprehensive technology solutions designed for accessibility and innovation. Discover how we make technology work for everyone.',
  openGraph: {
    title: 'Our Solutions | SOOTHE Technologies',
    description: 'Explore our comprehensive technology solutions designed for accessibility and innovation.',
    url: `${siteUrl}/solutions`,
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
    title: 'Our Solutions | SOOTHE Technologies',
    description: 'Explore our comprehensive technology solutions designed for accessibility and innovation.',
    images: [logoUrl],
  },
}

export const revalidate = 3600

export default async function SolutionsPage() {
  const [solutions, categories, accessibility] = await Promise.all([
    frontendApi.getSolutions().catch(() => []),
    frontendApi.getCategories().catch(() => []),
    frontendApi.getAccessibility().catch(() => ({})),
  ])

  const solutionsArray = Array.isArray(solutions) ? solutions : []
  const categoriesArray = Array.isArray(categories) ? categories : []
  const publishedSolutions = solutionsArray.filter((s: any) => s.isPublished)

  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="text-xl text-neutral-700 leading-relaxed">
                Build Easy Technology that people actually enjoy using—practical, inclusive, and tuned for real teams.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Content */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {categoriesArray.length > 0 ? (
              categoriesArray.map((category: any) => {
                const categorySolutions = publishedSolutions.filter(
                  (s: any) => s.categoryId === category.id
                )

                if (categorySolutions.length === 0) return null

                return (
                  <div key={category.id} className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                      {category.icon && <span className="text-3xl">{category.icon}</span>}
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">
                        {category.name}
                      </h2>
                    </div>
                    {category.description && (
                      <p className="text-lg text-neutral-600 mb-8 max-w-3xl">
                        {category.description}
                      </p>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categorySolutions.map((solution: any) => (
                        <Link
                          key={solution.id}
                          href={`/solutions/${solution.slug}`}
                          className="group bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary-400 transition-all hover:shadow-lg overflow-hidden"
                        >
                          {solution.imageUrl && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={solution.imageUrl}
                                alt={solution.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                              {solution.title}
                            </h3>
                            <p className="text-neutral-700 line-clamp-3 leading-relaxed">
                              {solution.description}
                            </p>
                            
                            {solution.features && solution.features.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-neutral-200">
                                <p className="text-sm font-semibold text-neutral-900 mb-2">
                                  Key Features:
                                </p>
                                <ul className="text-sm text-neutral-700 space-y-1">
                                  {solution.features.slice(0, 3).map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-primary-600">✓</span>
                                      <span className="line-clamp-1">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="mt-4 text-primary-600 font-semibold flex items-center gap-2">
                              Learn More 
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600">
                  No solutions available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
