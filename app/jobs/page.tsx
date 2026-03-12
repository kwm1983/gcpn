import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Production Jobs | Gulf Coast Production Network',
  description: 'Browse open video, photo and media production jobs across the Gulf Coast. Find work as a videographer, photographer, audio engineer, drone operator and more.',
  alternates: { canonical: 'https://gulfcoastproductionnetwork.com/jobs' },
}

const ROLES = [
  'All Roles','Videographer','Photographer','Director / Producer',
  'Broadcast Camera Op','Audio Engineer','Video Editor','Motion Graphics',
  'Graphic Designer','Drone Operator','Gaffer / Lighting',
  'Social Media Creator','Full Crew',
]
const CITIES = [
  'All Cities','Tallahassee, FL','Pensacola, FL','Panama City, FL',
  'Destin, FL','Mobile, AL','Gulf Shores, AL','Biloxi, MS',
  'Gulfport, MS','New Orleans, LA','Baton Rouge, LA','Lafayette, LA',
]
const TYPES = [
  'All Types','Wedding Video & Photo','Broadcast / News','Commercial / Ad',
  'Documentary','Social Media Content','Corporate Video',
  'Event Coverage','Music Video','Real Estate','Film / Narrative','Other',
]

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { role?: string; city?: string; type?: string; q?: string }
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from('job_postings')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  if (searchParams.q) {
    query = query.or(`title.ilike.%${searchParams.q}%,description.ilike.%${searchParams.q}%`)
  }
  if (searchParams.role && searchParams.role !== 'All Roles') {
    query = query.ilike('role_needed', `%${searchParams.role}%`)
  }
  if (searchParams.city && searchParams.city !== 'All Cities') {
    query = query.ilike('city', `%${searchParams.city}%`)
  }
  if (searchParams.type && searchParams.type !== 'All Types') {
    query = query.ilike('production_type', `%${searchParams.type}%`)
  }

  const { data: jobs } = await query.limit(50)

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just posted'
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gold/8 to-transparent border-b border-white/[0.06] py-10 px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl tracking-widest mb-2">
          Open <span className="text-gold">Jobs</span>
        </h1>
        <p className="text-muted mb-6">Productions looking for Gulf Coast talent right now</p>
        <form method="GET" action="/jobs" className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input name="q" defaultValue={searchParams.q} className="input flex-1" placeholder="Search job titles..." />
          <select name="city" defaultValue={searchParams.city} className="select md:w-44">
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Sidebar filters */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="card p-5 md:sticky md:top-20">
            <h3 className="font-condensed text-xs tracking-[3px] uppercase text-gold mb-4">⚙ Filters</h3>
            <form method="GET" action="/jobs" className="flex flex-col gap-4">
              <div>
                <label className="label">Role Needed</label>
                <select name="role" defaultValue={searchParams.role} className="select text-xs">
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="label">City</label>
                <select name="city" defaultValue={searchParams.city} className="select text-xs">
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Production Type</label>
                <select name="type" defaultValue={searchParams.type} className="select text-xs">
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-teal text-sm py-2">Apply Filters</button>
              <Link href="/jobs" className="text-center text-xs text-muted hover:text-white transition-colors">Clear All</Link>
            </form>
          </div>
        </aside>

        {/* Job listings */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="font-condensed text-sm tracking-wide text-muted">
              <span className="text-white font-bold">{jobs?.length ?? 0}</span> open jobs
            </p>
            <Link href="/post-job" className="btn-primary text-sm py-2">+ Post a Job</Link>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {jobs.map((job: any) => (
                <div key={job.id} className="card p-5 hover:border-gold/40 transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-start gap-3">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-navy2 border border-white/[0.06] flex items-center justify-center text-2xl flex-shrink-0">
                      {job.production_type?.includes('Wedding') ? '💒' :
                       job.production_type?.includes('Broadcast') ? '📡' :
                       job.production_type?.includes('Social') ? '📱' :
                       job.production_type?.includes('Music') ? '🎵' :
                       job.production_type?.includes('Real Estate') ? '🏠' :
                       job.production_type?.includes('Documentary') ? '🎞️' : '🎬'}
                    </div>

                    {/* Main info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h2 className="font-condensed text-lg tracking-wide text-white">{job.title}</h2>
                        <div className="flex gap-2 flex-wrap">
                          {job.budget_range && (
                            <span className="font-condensed text-[10px] tracking-widest uppercase bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded">
                              {job.budget_range}
                            </span>
                          )}
                          <span className="font-condensed text-[10px] tracking-widest uppercase bg-green-500/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded">
                            Open
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-muted mb-2">
                        <span>🎬 {job.role_needed}</span>
                        <span>📍 {job.city}</span>
                        {job.production_type && <span>🎥 {job.production_type}</span>}
                        {job.duration && <span>⏱ {job.duration}</span>}
                        {job.project_date && <span>📅 {new Date(job.project_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                        <span className="text-white/30">· {timeAgo(job.created_at)}</span>
                      </div>

                      <p className="text-muted text-sm leading-relaxed line-clamp-2">{job.description}</p>

                      <div className="mt-3 flex gap-2">
                        <a
                          href={`mailto:${job.contact_email}?subject=Re: ${encodeURIComponent(job.title)}`}
                          className="btn-primary text-xs py-1.5 px-4"
                        >
                          Contact Client
                        </a>
                        {job.contact_phone && (
                          <a
                            href={`tel:${job.contact_phone}`}
                            className="btn-outline text-xs py-1.5 px-4"
                          >
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-16 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="font-display text-2xl tracking-widest mb-2">No Jobs Found</h3>
              <p className="text-muted text-sm mb-6">Be the first to post a job for Gulf Coast pros!</p>
              <Link href="/post-job" className="btn-primary">Post a Job →</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
