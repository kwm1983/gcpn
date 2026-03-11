'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`font-condensed text-xs tracking-[2px] uppercase px-3 py-2 rounded transition-colors ${
        pathname === href
          ? 'text-white bg-teal/10'
          : 'text-muted hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-teal/20 h-16 flex items-center px-4 md:px-8">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-6 flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-coral" />
        <span className="font-display text-xl tracking-widest">
          GCPN<span className="text-teal"> GULF COAST</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1 flex-1">
        {navLink('/browse', 'Find Pros')}
        {navLink('/jobs', 'Job Board')}
        {navLink('/post-job', 'Post a Job')}
      </div>

      {/* Auth buttons */}
      <div className="hidden md:flex items-center gap-2 ml-auto">
        {user ? (
          <>
            {navLink('/dashboard', 'My Dashboard')}
            <button
              onClick={handleSignOut}
              className="font-condensed text-xs tracking-[2px] uppercase px-3 py-2 text-muted hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth" className="font-condensed text-xs tracking-[2px] uppercase px-3 py-2 text-muted hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/auth?mode=signup" className="btn-primary text-sm py-2 px-4">
              Join Free
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden ml-auto text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-navy2 border-b border-white/10 p-4 flex flex-col gap-2 md:hidden">
          <Link href="/browse" className="font-condensed tracking-widest uppercase text-sm text-muted hover:text-white py-2" onClick={() => setMenuOpen(false)}>Find Pros</Link>
          <Link href="/jobs" className="font-condensed tracking-widest uppercase text-sm text-muted hover:text-white py-2" onClick={() => setMenuOpen(false)}>Job Board</Link>
          <Link href="/post-job" className="font-condensed tracking-widest uppercase text-sm text-muted hover:text-white py-2" onClick={() => setMenuOpen(false)}>Post a Job</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="font-condensed tracking-widest uppercase text-sm text-teal py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleSignOut} className="text-left font-condensed tracking-widest uppercase text-sm text-muted hover:text-white py-2">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth" className="font-condensed tracking-widest uppercase text-sm text-muted hover:text-white py-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link href="/auth?mode=signup" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>Join Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
