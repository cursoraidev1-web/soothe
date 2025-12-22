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

// Site configuration
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const siteName = 'SOOTHE Technologies'
const defaultDescription = 'Innovative, accessible, and user-centric apps and websites that simplify everyday life. Focusing on productivity, wellness, and inclusivity.'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Making Life Easier, One Solution at a Time`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: ['accessibility', 'inclusive design', 'productivity apps', 'wellness technology', 'assistive technology', 'smart living', 'SOOTHE Technologies'],
  authors: [{ name: 'SOOTHE Technologies' }],
  creator: 'SOOTHE Technologies',
  publisher: 'SOOTHE Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: 'SOOTHE Technologies Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: [logoUrl],
    creator: '@soothetech',
  },
  alternates: {
    canonical: siteUrl,
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
