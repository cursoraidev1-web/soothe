'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SolutionsContentProps {
  categories: any[]
  publishedSolutions: any[]
}

export default function SolutionsContent({ categories, publishedSolutions }: SolutionsContentProps) {
  return (
    <main className="min-h-screen">
      <motion.div
        className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Solutions
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Innovative technology solutions designed for everyone
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        {categories.length > 0 ? (
          categories.map((category: any) => {
            const categorySolutions = publishedSolutions.filter(
              (s: any) => s.categoryId === category.id
            )

            if (categorySolutions.length === 0) return null

            return (
              <motion.section
                key={category.id}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  {category.icon && <span className="text-3xl">{category.icon}</span>}
                  <h2 className="text-3xl font-bold">{category.name}</h2>
                </motion.div>
                {category.description && (
                  <motion.p
                    className="text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {category.description}
                  </motion.p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorySolutions.map((solution: any, index: number) => (
                    <motion.div
                      key={solution.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 block"
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
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
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
                          
                          <div className="mt-4 text-primary-600 font-semibold flex items-center gap-2">
                            Learn More 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )
          })
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg">No solutions available at the moment.</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}

