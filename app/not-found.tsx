import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Gulf Coast Production Network',
}

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-display text-[120px] leading-none text-teal/20 tracking-widest mb-4">404</div>
        <div className="w-2 h-2 rounded-full bg-coral mx-auto mb-6" />
        <h1 className="font-display text-4xl tracking-widest mb-4">PAGE NOT FOUND</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          Looks like this page went off on a shoot and didn't come back. Let's get you back to the network.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-teal font-display tracking-widest px-8 py-3">
            Go Home
          </Link>
          <Link href="/browse" className="btn-outline font-display tracking-widest px-8 py-3">
            Browse Pros
          </Link>
        </div>
      </div>
    </div>
  )
}
