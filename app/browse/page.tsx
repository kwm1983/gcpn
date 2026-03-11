import { createServerSupabaseClient } from '@/lib/supabase-server'
import ProCard from '@/components/ProCard'
import Link from 'next/link'

const SPECIALTIES = [
  'All Specialties','Broadcast Camera','Director / Producer','Photography',
  'Wedding Video & Photo','Audio Engineering','Video Editing / Post',
  'Social Media Creator','Graphic Artist / Motion','Drone / Aerial',
  'Cinematography','Lighting / Gaffer','Live Streaming','Music / Composer',
  'Web / Digital Media','Hair / Makeup','Casting / Talent',
]
const CITIES = [
  'All Cities','Tallahassee, FL','Pensacola, FL','Panama City, FL',
  'Destin, FL','Mobile, AL','Gulf Shores, AL','Biloxi, MS',
  'Gulfport, MS','New Orleans, LA','Baton Rouge, LA','Lafayette, LA',
]

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { specialty?: string; city?: string; sort?: string; q?: string }
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from('pro_listings')
    .select('*')

  if (searchParams.q) {
    query = query.or(`display_name.ilike.%${searchParams.q}%,full_name.ilike.%${searchParams.q}%,specialty.ilike.%${searchParams.q}%,bio.ilike.%${searchParams.q}%`)
  }
  if (searchParams.specialty && searchParams.specialty !== 'All Specialties') {
    query = query.ilike('specialty', `%${searchParams.specialty}%`)
  }
  if (searchParams.city && searchParams.city !== 'All Cities') {
    query = query.ilike('city', `%${searchParams.city}%`)
  }

  const sortField = searchParams.sort === 'newest' ? 'created_at' : searchParams.sort === 'reviews' ? 'review_count' : 'avg_rating'
  query = query.order(sortField, { ascending: false })

  const { data: pros, count } = await query.limit(48)

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero bar */}
      <div className="bg-gradient-to-b from-teal/8 to-transparent border-b border-white/[0.06] py-10 px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl tracking-widest mb-2">
          Find <span className="text-teal">Gulf Coast</span> Professionals
        </h1>
        <p className="text-muted mb-6">Vetted media & production pros from Tallahassee to New Orleans</p>
        <form method="GET" action="/browse" className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input name="q" defaultValue={searchParams.q} className="input flex-1" placeholder="Name, role, or skill..." />
          <select name="city" defaultValue={searchParams.city} className="select md:w-44">
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Sidebar */}
        <aside className="md:w-60 flex-shrink-0">
          <div className="card p-5 md:sticky md:top-20">
            <h3 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4">⚙ Filters</h3>
            <form method="GET" action="/browse" className="flex flex-col gap-4">
              <div>
                <label className="label">Specialty</label>
                <select name="specialty" defaultValue={searchParams.specialty} className="select text-xs">
                  {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">City</label>
                <select name="city" defaultValue={searchParams.city} className="select text-xs">
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Sort By</label>
                <select name="sort" defaultValue={searchParams.sort} className="select text-xs">
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <button type="submit" className="btn-teal text-sm py-2">Apply Filters</button>
              <Link href="/browse" className="text-center text-xs text-muted hover:text-white transition-colors">Clear All</Link>
            </form>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="font-condensed text-sm tracking-wide text-muted">
              Showing <span className="text-white font-bold">{pros?.length ?? 0}</span> professionals
            </p>
          </div>

          {pros && pros.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pros.map((pro: any) => <ProCard key={pro.id} pro={pro} />)}
            </div>
          ) : (
            <div className="card p-16 text-center">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="font-display text-2xl tracking-widest mb-2">No Pros Found</h3>
              <p className="text-muted text-sm mb-6">Be the first to list in this category!</p>
              <Link href="/auth?mode=signup&type=pro" className="btn-teal">Join as a Pro →</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
