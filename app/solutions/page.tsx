import { frontendApi } from '@/lib/frontend-api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AccessibilityControls from '@/components/AccessibilityControls'
import SolutionsContent from './SolutionsContent'

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
      <AccessibilityControls accessibility={accessibility} />
      <Header />
      <SolutionsContent categories={categoriesArray} publishedSolutions={publishedSolutions} />
      <Footer />
    </>
  )
}
