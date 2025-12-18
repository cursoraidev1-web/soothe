import Hero from '@/components/Hero'
import KeyPillars from '@/components/KeyPillars'
import SolutionsOverview from '@/components/SolutionsOverview'
import InclusivityHighlight from '@/components/InclusivityHighlight'
import CTASection from '@/components/CTASection'
import { frontendApi } from '@/lib/frontend-api'

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
