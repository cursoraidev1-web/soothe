import { frontendApi } from '@/lib/frontend-api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const revalidate = 3600

export async function generateMetadata({ params }: any) {
  const post = await frontendApi.getBlogPost(params.slug).catch(() => null)
  
  if (!post) return {}

  return {
    title: `${post.title} | SOOTHE Blog`,
    description: post.excerpt || post.content?.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: any) {
  const post = await frontendApi.getBlogPost(params.slug).catch(() => null)

  if (!post || post.status !== 'PUBLISHED') {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/blog" className="text-white/80 hover:text-white mb-4 inline-block">
              ← Back to Blog
            </Link>
            
            <div className="mt-6">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-white/90">{post.excerpt}</p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-xl mb-12"
            />
          )}

          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.author.firstName} {post.author.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
            
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          <article 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Want to learn more?</h3>
              <p className="text-gray-700 mb-6">
                Discover how SOOTHE Technologies can help transform your business with innovative solutions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/solutions"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
