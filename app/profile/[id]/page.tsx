import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: pro } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .eq('account_type', 'pro')
    .single()

  if (!pro) notFound()

  const { data: portfolio } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('pro_id', params.id)
    .order('sort_order')
    .limit(9)

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('pro_id', params.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const name = pro.display_name || pro.full_name || 'Gulf Coast Pro'
  const rating = pro.avg_rating ?? 0
  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))

  return (
    <div className="pt-16 min-h-screen">
      {/* Cover */}
      <div className="h-48 bg-gradient-to-br from-navy2 to-card flex items-center justify-center text-8xl opacity-40">🎬</div>

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-12 mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-navy bg-card flex items-center justify-center text-4xl flex-shrink-0">
            {pro.avatar_url
              ? <img src={pro.avatar_url} alt={name} className="w-full h-full rounded-full object-cover" />
              : '👤'}
          </div>

          <div className="flex-1 pb-2">
            <div className="flex gap-2 flex-wrap mb-1">
              {pro.featured && <span className="font-condensed text-[10px] tracking-widest uppercase bg-gold text-navy px-2 py-0.5 rounded">Top Rated</span>}
              {pro.verified && <span className="font-condensed text-[10px] tracking-widest uppercase bg-teal/20 text-teal border border-teal/30 px-2 py-0.5 rounded">✓ Verified</span>}
            </div>
            <h1 className="font-display text-4xl tracking-widest">{name}</h1>
            <p className="text-teal font-semibold">{pro.specialty}</p>
            <p className="text-muted text-sm">📍 {pro.city}{pro.service_area?.length ? ` · Also serves: ${pro.service_area.join(', ')}` : ''}</p>
          </div>

          <div className="flex gap-2 pb-2">
            <Link href={`/post-job?pro=${pro.id}`} className="btn-primary">Hire {(pro.display_name || pro.full_name || '').split(' ')[0]}</Link>
            <Link href={`/messages/new?to=${pro.id}`} className="btn-outline">Message</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          {/* Main */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* About */}
            {pro.bio && (
              <div className="card p-6">
                <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">About</h2>
                <p className="text-muted text-sm leading-relaxed">{pro.bio}</p>
              </div>
            )}

            {/* Skills */}
            {pro.skills?.length > 0 && (
              <div className="card p-6">
                <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">Skills & Equipment</h2>
                <div className="flex flex-wrap gap-2">
                  {[...(pro.skills || []), ...(pro.equipment || [])].map((s: string) => (
                    <span key={s} className="font-condensed text-xs tracking-wide uppercase px-3 py-1 bg-teal/10 text-teal border border-teal/20 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {portfolio && portfolio.length > 0 && (
              <div className="card p-6">
                <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">Portfolio</h2>
                <div className="grid grid-cols-3 gap-2">
                  {portfolio.map((item: any) => (
                    <a
                      key={item.id}
                      href={item.media_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-video rounded-lg bg-navy2 border border-white/[0.06] hover:border-teal/40 transition-colors flex items-center justify-center text-2xl overflow-hidden"
                    >
                      {item.thumbnail
                        ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                        : '🎬'}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">
                Client Reviews {reviews?.length ? `(${reviews.length})` : ''}
              </h2>
              {reviews && reviews.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {reviews.map((r: any) => (
                    <div key={r.id} className="bg-navy/40 rounded-xl p-4 border border-white/[0.04]">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-sm">{r.reviewer_name || 'Client'}</span>
                          {r.reviewer_company && <span className="text-muted text-xs ml-2">· {r.reviewer_company}</span>}
                        </div>
                        <span className="text-gold text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                      </div>
                      <p className="text-muted text-sm leading-relaxed">{r.body}</p>
                      <p className="text-muted text-xs mt-2">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{r.project_type ? ` · ${r.project_type}` : ''}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-sm">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <div className="card p-5">
              <h3 className="font-condensed text-xs tracking-[2px] uppercase text-teal mb-3">Quick Stats</h3>
              {[
                ['Rating', rating > 0 ? `★ ${rating.toFixed(1)}` : 'No reviews yet'],
                ['Reviews', String(pro.review_count ?? 0)],
                ['Experience', pro.years_exp ? `${pro.years_exp} years` : '—'],
                ['Day Rate', pro.day_rate ? `$${pro.day_rate.toLocaleString()}` : 'Contact'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-white/[0.05] last:border-0 text-sm">
                  <span className="text-muted">{k}</span>
                  <span className="text-gold font-semibold">{v}</span>
                </div>
              ))}
            </div>

            <div className="card p-5">
              <h3 className="font-condensed text-xs tracking-[2px] uppercase text-teal mb-2">Availability</h3>
              <p className={`text-sm font-semibold mb-2 ${pro.available ? 'text-green-400' : 'text-coral'}`}>
                {pro.available ? '✅ Available for Work' : '⏸ Currently Booked'}
              </p>
            </div>

            {pro.service_area?.length > 0 && (
              <div className="card p-5">
                <h3 className="font-condensed text-xs tracking-[2px] uppercase text-teal mb-2">Service Area</h3>
                <div className="text-muted text-sm leading-relaxed">
                  {pro.service_area.map((a: string) => <div key={a}>📍 {a}</div>)}
                </div>
              </div>
            )}

            <Link href={`/post-job?pro=${pro.id}`} className="btn-primary text-center block">
              Post a Job for {(pro.display_name || pro.full_name || 'This Pro').split(' ')[0]}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
