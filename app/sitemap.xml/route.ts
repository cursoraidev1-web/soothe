import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'

const routes = [
  '',
  'about',
  'solutions',
  'inclusivity',
  'careers',
  'insights',
  'contact',
  'privacy',
  'terms',
]

export async function GET() {
  const lastmod = new Date().toISOString()

  const urls = routes
    .map((path) => {
      const loc = path ? `${siteUrl}/${path}` : siteUrl
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

