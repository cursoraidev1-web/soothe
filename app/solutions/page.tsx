import { frontendApi } from '@/lib/frontend-api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AccessibilityControls from '@/components/AccessibilityControls'

export const metadata = {
  title: 'Our Solutions | SOOTHE Technologies',
  description: 'Explore our comprehensive technology solutions designed for accessibility and innovation.',
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
      <AccessibilityControls />
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Our Solutions</h1>
            <p className="text-xl">Innovative technology solutions designed for everyone</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {categoriesArray.length > 0 ? (
            categoriesArray.map((category: any) => {
              const categorySolutions = publishedSolutions.filter(
                (s: any) => s.categoryId === category.id
              )

              if (categorySolutions.length === 0) return null

              return (
                <section key={category.id} className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    {category.icon && <span className="text-3xl">{category.icon}</span>}
                    <h2 className="text-3xl font-bold">{category.name}</h2>
                  </div>
                  {category.description && (
                    <p className="text-gray-600 mb-8">{category.description}</p>
                  )}

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categorySolutions.map((solution: any) => (
                      <Link
                        key={solution.id}
                        href={`/solutions/${solution.slug}`}
                        className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
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
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                            {solution.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-3">{solution.description}</p>
                          
                          {solution.features && solution.features.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm font-semibold text-gray-700 mb-2">
                                Key Features:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {solution.features.slice(0, 3).map((feature: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span className="line-clamp-1">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="mt-4 text-blue-600 font-semibold flex items-center gap-2">
                            Learn More 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No solutions available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
