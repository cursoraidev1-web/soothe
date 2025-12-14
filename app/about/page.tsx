import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutContent from './AboutContent'

export const metadata = {
  title: 'About Us | SOOTHE Technologies',
  description: 'Technology that empowers everyone',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutContent />
      <Footer />
    </>
  )
}
