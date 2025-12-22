import type { Metadata } from 'next'
import { frontendApi } from '@/lib/frontend-api'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const career = await frontendApi.getCareer(params.id).catch(() => null)
    
    if (!career) {
      return {
        title: 'Career Opportunity',
        description: 'View career opportunities at SOOTHE Technologies',
        openGraph: {
          title: 'Career Opportunity | SOOTHE Technologies',
          description: 'View career opportunities at SOOTHE Technologies',
          images: [{ url: logoUrl, width: 1200, height: 630, alt: 'SOOTHE Technologies Logo' }],
        },
      }
    }

    const description = `Apply for ${career.title} at SOOTHE Technologies. ${career.description?.substring(0, 100)}...`

    return {
      title: career.title,
      description,
      openGraph: {
        title: `${career.title} | SOOTHE Technologies Careers`,
        description,
        url: `${siteUrl}/careers/${params.id}`,
        type: 'website',
        images: [
          {
            url: logoUrl,
            width: 1200,
            height: 630,
            alt: `${career.title} - SOOTHE Technologies`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${career.title} | SOOTHE Technologies`,
        description,
        images: [logoUrl],
      },
    }
  } catch {
    return {
      title: 'Career Opportunity',
      description: 'View career opportunities at SOOTHE Technologies',
    }
  }
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

