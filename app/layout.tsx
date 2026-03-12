import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://gulfcoastproductionnetwork.com'),
  title: {
    default: 'Gulf Coast Production Network | Find Video, Photo & Media Pros',
    template: '%s | Gulf Coast Production Network',
  },
  description: 'The Gulf Coast\'s premier directory for video, audio, photo & media production professionals. Find and hire videographers, photographers, directors, audio engineers, drone operators and more from Tallahassee to New Orleans.',
  keywords: [
    'Gulf Coast videographer', 'Gulf Coast photographer', 'media production Gulf Coast',
    'hire videographer Pensacola', 'hire videographer New Orleans', 'hire videographer Mobile Alabama',
    'wedding photographer Gulf Coast', 'broadcast camera operator', 'audio engineer Gulf Coast',
    'drone operator Gulf Coast', 'video production Pensacola', 'video production New Orleans',
    'film crew Gulf Coast', 'media jobs Gulf Coast', 'production company Gulf Coast',
    'cinematographer Gulf Coast', 'social media content creator Gulf Coast',
    'graphic designer Gulf Coast', 'video editor Gulf Coast', 'gaffer Gulf Coast',
  ],
  authors: [{ name: 'Gulf Coast Production Network' }],
  creator: 'Gulf Coast Production Network',
  publisher: 'Gulf Coast Production Network',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gulfcoastproductionnetwork.com',
    siteName: 'Gulf Coast Production Network',
    title: 'Gulf Coast Production Network | Find Video, Photo & Media Pros',
    description: 'Find and hire videographers, photographers, directors, audio engineers and more across the Gulf Coast — from Tallahassee to New Orleans.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gulf Coast Production Network' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Coast Production Network',
    description: 'Find and hire media professionals across the Gulf Coast.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://gulfcoastproductionnetwork.com',
  },
  verification: {
    google: 'dWAMejWr1ofFR5oTsoY2BG9o-E-tXZ7LIj9vsf0xu74',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Gulf Coast Production Network',
              url: 'https://gulfcoastproductionnetwork.com',
              description: 'The Gulf Coast\'s premier directory for video, audio, photo & media production professionals.',
              areaServed: [
                'Tallahassee, FL', 'Pensacola, FL', 'Panama City, FL',
                'Mobile, AL', 'Biloxi, MS', 'Gulfport, MS',
                'New Orleans, LA', 'Baton Rouge, LA'
              ],
              serviceType: [
                'Video Production', 'Photography', 'Audio Engineering',
                'Drone Operation', 'Film Production', 'Social Media Content'
              ],
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4rem', padding: '2rem 1rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5C3A' }} />
              <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', fontSize: '0.9rem' }}>
                GULF COAST <span style={{ color: '#00C9B1' }}>PRODUCTION</span> NETWORK
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              Connecting media professionals from Tallahassee to New Orleans
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem' }}>
              <a href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</a>
              <a href="mailto:support@gulfcoastproductionnetwork.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contact</a>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>
              © {new Date().getFullYear()} Gulf Coast Production Network. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
