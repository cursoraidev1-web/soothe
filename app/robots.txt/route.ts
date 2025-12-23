import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join('\n')

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

