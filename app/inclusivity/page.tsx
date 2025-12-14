import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InclusivityContent from './InclusivityContent'

export const metadata = {
  title: 'Inclusivity | SOOTHE Technologies',
  description: 'Our commitment to building technology for everyone',
}

export default function InclusivityPage() {
  return (
    <>
      <Header />
      <InclusivityContent />
      <Footer />
    </>
  )
}
