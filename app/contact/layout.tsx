import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soothe-technologies.com'
const logoUrl = `${siteUrl}/logo/logo-horizontal-dark.png`

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SOOTHE Technologies. We\'d love to hear from you about accessibility, technology solutions, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | SOOTHE Technologies',
    description: 'Get in touch with SOOTHE Technologies. We\'d love to hear from you about accessibility, technology solutions, or partnership opportunities.',
    url: `${siteUrl}/contact`,
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
    title: 'Contact Us | SOOTHE Technologies',
    description: 'Get in touch with SOOTHE Technologies.',
    images: [logoUrl],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

