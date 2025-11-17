import { frontendApi } from '@/lib/frontend-api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Insights & Blog | SOOTHE Technologies',
  description: 'Latest insights on accessibility, technology, and inclusive design',
}

export const revalidate = 3600

export default async function InsightsPage() {
  const posts = await frontendApi.getBlogPosts().catch(() => [])
  const publishedPosts = posts.filter((post: any) => post.status === 'PUBLISHED')

  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Insights &{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Perspectives
                </span>
              </h1>
              <p className="text-xl text-neutral-700 leading-relaxed">
                Thoughts on accessibility, technology, design, and building products that work for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedPosts.map((post: any) => (
                  <article key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.featuredImage && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}

                      <div>
                        <h2 className="font-display text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-neutral-700 mb-4 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-neutral-600 space-x-4">
                          {post.author && <span>By {post.author}</span>}
                          {post.readTime && (
                            <>
                              <span>•</span>
                              <span>{post.readTime} min read</span>
                            </>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.slice(0, 3).map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-neutral-700 mb-8">
                Get the latest insights on accessibility, product design, and inclusive technology delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
