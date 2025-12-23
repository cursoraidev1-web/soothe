import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import KeyPillars from '@/components/KeyPillars'
import SolutionsOverview from '@/components/SolutionsOverview'
import InclusivityHighlight from '@/components/InclusivityHighlight'
import CTASection from '@/components/CTASection'
import { frontendApi } from '@/lib/frontend-api'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  title: 'Home',
  description: 'Innovative, accessible, and user-centric apps and websites that simplify everyday life. Focusing on productivity, wellness, and inclusivity.',
  openGraph: {
    title: 'SOOTHE Technologies - Build Easy Technology',
    description: 'Innovative, accessible, and user-centric apps and websites that simplify everyday life. Focusing on productivity, wellness, and inclusivity.',
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
    title: 'SOOTHE Technologies - Build Easy Technology',
    description: 'Innovative, accessible, and user-centric apps and websites that simplify everyday life.',
    images: [logoUrl],
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch data from backend API
  const [solutions, settings] = await Promise.all([
    frontendApi.getSolutions().catch(() => []),
    frontendApi.getSettings().catch(() => ({})),
  ])

  // Filter published solutions and get top 3
  const solutionsArray = Array.isArray(solutions) ? solutions : []
  const topSolutions = solutionsArray.filter((s: any) => s.isPublished).slice(0, 3)

  return (
    <>
      <Hero />
      <KeyPillars />
      <SolutionsOverview />
      <InclusivityHighlight />
      <CTASection />
    </>
  )
}
