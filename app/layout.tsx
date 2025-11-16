import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AccessibilityControls from '@/components/AccessibilityControls'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOOTHE TECHNOLOGIES LIMITED - Making Life Easier, One Solution at a Time',
  description: 'Innovative, accessible, and user-centric apps and websites that simplify everyday life. Focusing on productivity, wellness, and inclusivity.',
  keywords: 'accessibility, inclusive design, productivity apps, wellness technology, assistive technology, smart living',
  authors: [{ name: 'SOOTHE TECHNOLOGIES LIMITED' }],
  openGraph: {
    title: 'SOOTHE TECHNOLOGIES LIMITED',
    description: 'Making life easier. Inclusive. One solution at a time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <AccessibilityControls />
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
