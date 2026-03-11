'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const PRODUCTION_TYPES = [
  'Wedding Video & Photo','Broadcast / News','Commercial / Ad',
  'Documentary','Social Media Content','Corporate Video',
  'Event Coverage','Music Video','Real Estate','Film / Narrative','Other',
]
const ROLES = [
  'Videographer','Photographer','Director / Producer','Broadcast Camera Op',
  'Audio Engineer','Video Editor','Motion Graphics','Graphic Designer',
  'Drone Operator','Gaffer / Lighting','Social Media Creator','Full Crew',
]
const CITIES = [
  'Tallahassee, FL','Pensacola, FL','Panama City, FL','Destin, FL',
  'Mobile, AL','Gulf Shores, AL','Biloxi, MS','Gulfport, MS',
  'New Orleans, LA','Baton Rouge, LA','Lafayette, LA',
]
const BUDGETS = [
  { label: '$250–500', sub: 'Half Day' },
  { label: '$500–1,500', sub: 'Full Day' },
  { label: '$1,500–5K', sub: 'Multi-Day' },
  { label: '$5K–15K', sub: 'Full Production' },
  { label: '$15K+', sub: 'Major Campaign' },
  { label: 'Negotiable', sub: 'Open Budget' },
]

export default function PostJobPage() {
  const router = useRouter()
  const supabase = createClient()
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)

    const { data: { user } } = await supabase.auth.getUser()

    const payload = {
      client_id: user?.id || null,
      title: data.get('title') as string,
      description: data.get('description') as string,
      production_type: data.get('production_type') as string,
      role_needed: data.get('role_needed') as string,
      city: data.get('city') as string,
      project_date: data.get('project_date') as string || null,
      duration: data.get('duration') as string,
      location_detail: data.get('location_detail') as string,
      budget_range: budget,
      contact_name: data.get('contact_name') as string,
      contact_email: data.get('contact_email') as string,
      contact_phone: data.get('contact_phone') as string,
    }

    const { error: err } = await supabase.from('job_postings').insert([payload])
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4">
      <div className="card p-12 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display text-4xl tracking-widest mb-3">Job Posted!</h2>
        <p className="text-muted mb-8">Gulf Coast professionals will be reaching out soon. Check your email.</p>
        <button onClick={() => router.push('/browse')} className="btn-teal w-full">Browse Pros →</button>
      </div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen">
      <div className="text-center py-12 px-4 bg-gradient-to-b from-coral/7 to-transparent">
        <h1 className="font-display text-5xl md:text-6xl tracking-widest mb-2">Post a <span className="text-coral">Job</span></h1>
        <p className="text-muted">Reach 1,200+ Gulf Coast media professionals. Free to post.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        <form onSubmit={handleSubmit} className="card p-8 flex flex-col gap-5">

          <h3 className="font-condensed text-xs tracking-[3px] uppercase text-coral border-b border-coral/20 pb-2">📋 Project Details</h3>

          <div>
            <label className="label">Project Title *</label>
            <input name="title" required className="input" placeholder="e.g. Wedding Videographer Needed — Pensacola Beach June 14" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Production Type *</label>
              <select name="production_type" required className="select">
                <option value="">Select...</option>
                {PRODUCTION_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Role Needed *</label>
              <select name="role_needed" required className="select">
                <option value="">Select...</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Project Description *</label>
            <textarea name="description" required rows={4} className="input resize-none" placeholder="Describe the project, scope, and any important details..." />
          </div>

          <h3 className="font-condensed text-xs tracking-[3px] uppercase text-coral border-b border-coral/20 pb-2 mt-2">📍 Location & Schedule</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">City *</label>
              <select name="city" required className="select">
                <option value="">Select city...</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Project Date</label>
              <input name="project_date" type="date" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Duration</label>
              <select name="duration" className="select">
                <option value="">Select...</option>
                <option>Half Day (1–4 hrs)</option>
                <option>Full Day (8 hrs)</option>
                <option>Multi-Day</option>
                <option>Ongoing / Retainer</option>
              </select>
            </div>
            <div>
              <label className="label">Shoot Location</label>
              <input name="location_detail" className="input" placeholder="Venue, beach, studio..." />
            </div>
          </div>

          <h3 className="font-condensed text-xs tracking-[3px] uppercase text-coral border-b border-coral/20 pb-2 mt-2">💰 Budget</h3>
          <div className="grid grid-cols-3 gap-2">
            {BUDGETS.map(b => (
              <button
                key={b.label}
                type="button"
                onClick={() => setBudget(b.label)}
                className={`p-3 rounded-lg border text-center transition-all text-sm ${
                  budget === b.label
                    ? 'border-coral bg-coral/10 text-white'
                    : 'border-white/10 text-muted hover:border-coral/40'
                }`}
              >
                <span className="font-display block text-lg text-white">{b.label}</span>
                {b.sub}
              </button>
            ))}
          </div>

          <h3 className="font-condensed text-xs tracking-[3px] uppercase text-coral border-b border-coral/20 pb-2 mt-2">👤 Your Contact Info</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Your Name</label>
              <input name="contact_name" className="input" placeholder="Name or company" />
            </div>
            <div>
              <label className="label">Email *</label>
              <input name="contact_email" required type="email" className="input" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="label">Phone (optional)</label>
            <input name="contact_phone" type="tel" className="input" placeholder="(850) 555-0000" />
          </div>

          {error && <p className="text-coral text-sm bg-coral/10 rounded-lg px-4 py-3">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary text-center font-display text-xl tracking-widest py-4 mt-2">
            {loading ? 'Posting...' : 'POST YOUR JOB'}
          </button>
        </form>
      </div>
    </div>
  )
}
