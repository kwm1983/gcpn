'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SPECIALTIES = [
  'Broadcast Camera','Director / Producer','Videographer','Photographer',
  'Audio Engineering','Video Editing / Post','Motion Graphics','Graphic Artist',
  'Drone / Aerial','Social Media Creator','Wedding Video & Photo',
  'Cinematography','Lighting / Gaffer','Music / Composer','Other',
]
const CITIES = [
  'Tallahassee, FL','Pensacola, FL','Panama City, FL','Mobile, AL',
  'Gulf Shores, AL','Biloxi, MS','Gulfport, MS','New Orleans, LA',
  'Baton Rouge, LA','Lafayette, LA','Other Gulf Coast',
]

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  )
  const [accountType, setAccountType] = useState<'pro' | 'client'>(
    searchParams.get('type') === 'pro' ? 'pro' : 'client'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    const email = data.get('email') as string
    const password = data.get('password') as string

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/dashboard')
      router.refresh()
    } else {
      const fullName = data.get('full_name') as string
      const city = data.get('city') as string
      const specialty = data.get('specialty') as string

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            account_type: accountType,
            city,
            specialty: accountType === 'pro' ? specialty : null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Check your email to confirm your account!')
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 0% 50%, rgba(0,201,177,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 100% 50%, rgba(255,184,0,0.06) 0%, transparent 60%)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-coral" />
            <span className="font-display text-xl tracking-widest">GCPN<span className="text-teal"> GULF COAST</span></span>
          </Link>
          <h1 className="font-display text-4xl tracking-widest">
            {mode === 'signup' ? 'Join the Network' : 'Welcome Back'}
          </h1>
          <p className="text-muted text-sm mt-1">
            {mode === 'signup' ? 'Connect with the Gulf Coast media community' : 'Sign in to your account'}
          </p>
        </div>

        {/* Mode toggle */}
        {mode === 'signup' && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['pro', 'client'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setAccountType(t)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  accountType === t ? 'border-teal bg-teal/8' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="text-3xl mb-1">{t === 'pro' ? '🎬' : '🔍'}</div>
                <span className="font-condensed tracking-widest uppercase text-sm text-white block">
                  {t === 'pro' ? "I'm a Pro" : "I'm a Client"}
                </span>
                <span className="text-muted text-xs">
                  {t === 'pro' ? 'List my services & get hired' : 'Find & hire talent'}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="card p-7">
          {success ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📬</div>
              <h3 className="font-display text-2xl tracking-widest mb-2">Check Your Email</h3>
              <p className="text-muted text-sm">{success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'signup' && (
                <div>
                  <label className="label">Full Name</label>
                  <input name="full_name" required className="input" placeholder="Your name or company" />
                </div>
              )}
              <div>
                <label className="label">Email</label>
                <input name="email" required type="email" className="input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="label">Password</label>
                <input name="password" required type="password" className="input" placeholder={mode === 'signup' ? 'Create a password (8+ chars)' : 'Your password'} minLength={8} />
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="label">Your City</label>
                    <select name="city" required className="select">
                      <option value="">Select your city...</option>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  {accountType === 'pro' && (
                    <div>
                      <label className="label">Primary Specialty</label>
                      <select name="specialty" className="select">
                        <option value="">Select your specialty...</option>
                        {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  )}
                </>
              )}

              {error && <p className="text-coral text-sm bg-coral/10 rounded-lg px-4 py-3">{error}</p>}

              <button type="submit" disabled={loading} className="btn-teal text-center font-display text-xl tracking-widest py-3">
                {loading ? 'Please wait...' : mode === 'signup' ? 'CREATE MY ACCOUNT' : 'SIGN IN'}
              </button>
            </form>
          )}

          {!success && (
            <p className="text-center text-sm text-muted mt-5">
              {mode === 'signup' ? (
                <>Already have an account?{' '}
                  <button onClick={() => setMode('signin')} className="text-teal hover:underline">Sign in</button>
                </>
              ) : (
                <>Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="text-teal hover:underline">Join free</button>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
