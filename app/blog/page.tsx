import { frontendApi } from '@/lib/frontend-api'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog | SOOTHE Technologies',
  description: 'Insights, articles, and updates from SOOTHE Technologies',
}

export const revalidate = 600

export default async function BlogPage({ searchParams }: any) {
  const page = searchParams?.page || 1
  const blogData = await frontendApi
    .getBlogPosts(page)
    .catch(() => ({ data: [], meta: { totalPages: 1 } }))

  const postsArray = Array.isArray(blogData) ? blogData : blogData.data || []
  const publishedPosts = postsArray.filter((post: any) => post.status === 'PUBLISHED')

  return (
    const html = renderTiptapContent(post.content)
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl">Insights, articles, and updates on technology and innovation</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {publishedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedPosts.map((post: any) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">

                    {post.featuredImage && (
                      <Link href={`/blog/${post.slug}`}>
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}

                    <div className="p-6">
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">

                          {post.author && (
                            <span>
                              By {post.author.firstName} {post.author.lastName}
                            </span>
                          )}

                          {post.readingTime && (
                            <span>• {post.readingTime} min read</span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {blogData.meta.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/blog?page=${Number(page) - 1}`}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Previous
                    </Link>
                  )}

                  {Array.from(
                    { length: Math.min(blogData.meta.totalPages, 5) },
                    (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Link
                          key={pageNum}
                          href={`/blog?page=${pageNum}`}
                          className={`px-4 py-2 rounded ${
                            pageNum === Number(page)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    }
                  )}

                  {page < blogData.meta.totalPages && (
                    <Link
                      href={`/blog?page=${Number(page) + 1}`}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
