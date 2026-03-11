import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Gulf Coast Production Network',
  description: 'The Gulf Coast\'s premier directory for video, audio, photo & media professionals — Tallahassee to New Orleans.',
  openGraph: {
    title: 'Gulf Coast Production Network',
    description: 'Find and hire media professionals across the Gulf Coast.',
    url: 'https://gulfcoastproductionnetwork.com',
    siteName: 'GCPN',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
