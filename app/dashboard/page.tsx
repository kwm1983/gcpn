import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import EditProfileForm from './EditProfileForm'
import JobManager from './JobManager'

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: myJobs } = await supabase
    .from('job_postings')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: myReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('pro_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const isPro = profile?.account_type === 'pro'
  const name = profile?.display_name || profile?.full_name || user.email

  return (
    <div className="pt-16 min-h-screen px-4">
      <div className="max-w-5xl mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-eyebrow">Dashboard</p>
            <h1 className="font-display text-4xl tracking-widest">Welcome, {name?.split(' ')[0]}</h1>
          </div>
          {isPro && (
            <Link href={`/profile/${user.id}`} className="btn-outline text-sm py-2">View My Profile →</Link>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(isPro ? [
            { label: 'Rating', val: profile?.avg_rating ? `★ ${profile.avg_rating}` : '—', color: 'text-gold' },
            { label: 'Reviews', val: String(profile?.review_count ?? 0), color: 'text-teal' },
            { label: 'Plan', val: profile?.plan?.toUpperCase() ?? 'FREE', color: 'text-coral' },
            { label: 'Status', val: profile?.available ? 'Available' : 'Unavailable', color: profile?.available ? 'text-green-400' : 'text-muted' },
          ] : [
            { label: 'Jobs Posted', val: String(myJobs?.length ?? 0), color: 'text-teal' },
            { label: 'Open Jobs', val: String(myJobs?.filter((j: any) => j.status === 'open').length ?? 0), color: 'text-gold' },
          ]).map((s: any) => (
            <div key={s.label} className="card p-5">
              <div className={`font-display text-3xl tracking-widest ${s.color}`}>{s.val}</div>
              <div className="font-condensed text-xs tracking-[2px] uppercase text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edit Profile */}
          <div className="card p-6">
            <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-5 pb-2 border-b border-white/[0.06]">
              {isPro ? 'Edit My Profile' : 'My Account'}
            </h2>
            <EditProfileForm profile={profile} userId={user.id} isPro={isPro} />
          </div>

          {/* Activity */}
          <div className="flex flex-col gap-6">
            {isPro && myReviews && myReviews.length > 0 && (
              <div className="card p-6">
                <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">Recent Reviews</h2>
                {myReviews.map((r: any) => (
                  <div key={r.id} className="mb-3 pb-3 border-b border-white/[0.04] last:border-0">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">{r.reviewer_name || 'Client'}</span>
                      <span className="text-gold">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-muted text-xs mt-1 line-clamp-2">{r.body}</p>
                  </div>
                ))}
              </div>
            )}

            {myJobs && (
              <div className="card p-6">
                <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">My Job Postings</h2>
                <JobManager jobs={myJobs} />
              </div>
            )}

            <div className="card p-6">
              <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">Quick Actions</h2>
              <div className="flex flex-col gap-2">
                <Link href="/post-job" className="btn-primary text-center text-sm py-2.5">+ Post a New Job</Link>
                <Link href="/browse" className="btn-outline text-center text-sm py-2.5">Browse Professionals</Link>
                {isPro && (
                  <Link href={`/profile/${user.id}`} className="btn-outline text-center text-sm py-2.5">View Public Profile</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
