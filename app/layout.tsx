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
  title: 'SOOHE TECHNOLOGIES - Making Life Easier, One Solution at a Time',
  description: 'Innovative, accessible, and user-centric apps and websites that simplify everyday life. Focusing on productivity, wellness, and inclusivity.',
  keywords: 'accessibility, inclusive design, productivity apps, wellness technology, assistive technology, smart living',
  authors: [{ name: 'SOOHE TECHNOLOGIES' }],
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
  openGraph: {
    title: 'SOOHE TECHNOLOGIES',
    description: 'Making life easier. Inclusive. One solution at a time.',
    type: 'website',
    images: [
      {
        url: '/logo/logo-horizontal-dark.png',
        width: 1200,
        height: 630,
        alt: 'SOOHE TECHNOLOGIES Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOOHE TECHNOLOGIES',
    description: 'Making life easier. Inclusive. One solution at a time.',
    images: ['/logo/logo-horizontal-dark.png'],
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
