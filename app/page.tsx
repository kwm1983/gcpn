import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import ProCard from '@/components/ProCard'

const CATEGORIES = [
  { icon: '📹', name: 'Broadcast Camera', slug: 'broadcast-camera' },
  { icon: '🎬', name: 'Director / Producer', slug: 'director-producer' },
  { icon: '📸', name: 'Photography', slug: 'photography' },
  { icon: '💒', name: 'Wedding Video & Photo', slug: 'wedding' },
  { icon: '🎙️', name: 'Audio Engineering', slug: 'audio-engineering' },
  { icon: '✂️', name: 'Video Editing / Post', slug: 'video-editing' },
  { icon: '📱', name: 'Social Media Creator', slug: 'social-media' },
  { icon: '🎨', name: 'Graphic Artist / Motion', slug: 'graphic-artist' },
  { icon: '🚁', name: 'Drone / Aerial', slug: 'drone-aerial' },
  { icon: '🎞️', name: 'Cinematography', slug: 'cinematography' },
  { icon: '💡', name: 'Lighting / Gaffer', slug: 'lighting' },
  { icon: '📡', name: 'Live Streaming', slug: 'live-streaming' },
  { icon: '🎵', name: 'Music / Composer', slug: 'music-composer' },
  { icon: '🖥️', name: 'Web / Digital Media', slug: 'web-digital' },
  { icon: '💄', name: 'Hair / Makeup', slug: 'hair-makeup' },
  { icon: '🎭', name: 'Casting / Talent', slug: 'casting-talent' },
]

export default async function Home() {
  const supabase = createServerSupabaseClient()

  // Fetch top-rated pros
  const { data: featuredPros } = await supabase
    .from('pro_listings')
    .select('*')
    .eq('available', true)
    .order('avg_rating', { ascending: false })
    .order('review_count', { ascending: false })
    .limit(6)

  // Stats
  const { count: proCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('account_type', 'pro')

  const { count: jobCount } = await supabase
    .from('job_postings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open')

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,201,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,177,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="font-condensed text-xs tracking-[4px] uppercase text-teal mb-5 flex items-center justify-center gap-3">
            <span className="w-10 h-px bg-teal/50 inline-block" />
            Tallahassee · Pensacola · Mobile · Biloxi · New Orleans
            <span className="w-10 h-px bg-teal/50 inline-block" />
          </p>
          <h1 className="font-display leading-none tracking-wider mb-6">
            <span className="block text-white text-6xl md:text-8xl">GULF COAST</span>
            <span className="block text-teal text-6xl md:text-8xl">PRODUCTION</span>
            <span className="block text-sand text-3xl md:text-4xl tracking-[10px]">NETWORK</span>
          </h1>
          <p className="text-muted text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            The Gulf Coast's premier directory for video, audio, photo & media professionals. Find the right talent for any production.
          </p>

          {/* Search */}
          <div className="bg-white/5 border border-teal/30 rounded-xl p-3 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto backdrop-blur-sm mb-6">
            <input className="input flex-1" placeholder="Director, wedding photographer, audio engineer..." />
            <select className="select md:w-48">
              <option value="">All Cities</option>
              <option>Tallahassee, FL</option>
              <option>Pensacola, FL</option>
              <option>Panama City, FL</option>
              <option>Mobile, AL</option>
              <option>Biloxi, MS</option>
              <option>Gulfport, MS</option>
              <option>New Orleans, LA</option>
              <option>Baton Rouge, LA</option>
            </select>
            <Link href="/browse" className="btn-primary text-center">🔍 Search</Link>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {['📹 Broadcast Camera','🎬 Director','📸 Wedding Photo','🎙️ Audio','🎨 Graphic Artist','📱 Social Media','✂️ Video Editor'].map(t => (
              <Link key={t} href="/browse" className="font-condensed text-xs tracking-wider uppercase px-3 py-1.5 border border-white/15 rounded-full text-muted hover:border-teal hover:text-teal transition-colors">{t}</Link>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-16 justify-center border-t border-white/10 pt-8">
            {[
              { num: `${proCount ?? 0}+`, label: 'Professionals' },
              { num: '40+', label: 'Specialties' },
              { num: `${jobCount ?? 0}`, label: 'Open Jobs' },
              { num: '8', label: 'Gulf Coast Cities' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl text-gold tracking-widest">{s.num}</div>
                <div className="font-condensed text-xs tracking-[2px] uppercase text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 bg-navy2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Browse by Specialty</p>
            <h2 className="section-title">Every Role in <span className="text-teal">Production</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/browse?specialty=${cat.slug}`}
                className="card p-4 text-center hover:border-teal/40 hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-condensed text-sm tracking-wide uppercase text-white group-hover:text-teal transition-colors">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROS */}
      {featuredPros && featuredPros.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-eyebrow">Top Rated</p>
              <h2 className="section-title">Featured <span className="text-teal">Professionals</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPros.map((pro: any) => <ProCard key={pro.id} pro={pro} />)}
            </div>
            <div className="text-center mt-10">
              <Link href="/browse" className="btn-outline">Browse All Professionals →</Link>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-navy2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Simple Process</p>
            <h2 className="section-title">How It <span className="text-teal">Works</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { n: '01', icon: '🔍', title: 'Search & Filter', desc: 'Browse by specialty, city, rating, and budget to find exactly who you need.' },
              { n: '02', icon: '👤', title: 'Review Profiles', desc: 'See portfolios, read verified client reviews, and check credentials.' },
              { n: '03', icon: '💬', title: 'Connect & Hire', desc: 'Message directly, agree on scope and rate, then book with confidence.' },
              { n: '04', icon: '⭐', title: 'Review & Repeat', desc: 'Leave a review after the project. Build the Gulf Coast community.' },
            ].map(s => (
              <div key={s.n} className="card p-6 relative">
                <span className="absolute top-4 right-4 font-display text-5xl text-teal/10">{s.n}</span>
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="font-condensed tracking-widest uppercase text-white text-sm mb-2">{s.title}</div>
                <div className="text-muted text-sm leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal to-teal/80 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />
            <h2 className="font-display text-4xl md:text-5xl tracking-widest text-navy mb-3 relative">ARE YOU A GULF COAST PRO?</h2>
            <p className="text-navy/70 mb-8 relative">Join the directory and start getting discovered. Free to list your profile.</p>
            <div className="flex gap-4 justify-center flex-wrap relative">
              <Link href="/auth?mode=signup&type=pro" className="bg-navy text-white font-condensed tracking-widest uppercase px-8 py-3 rounded-lg hover:bg-navy2 transition-colors">Create Your Profile</Link>
              <Link href="/post-job" className="border-2 border-navy text-navy font-condensed tracking-widest uppercase px-8 py-3 rounded-lg hover:bg-navy/10 transition-colors">Post a Job Instead</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy2 border-t border-white/[0.06] pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-coral" />
              <span className="font-display text-lg tracking-widest">GCPN <span className="text-teal">GULF COAST</span></span>
            </div>
            <p className="text-muted text-sm leading-relaxed">Connecting media professionals from Tallahassee to New Orleans. The Gulf Coast's home for production talent.</p>
          </div>
          {[
            { head: 'Find Talent', links: ['Browse All Pros', 'Videographers', 'Photographers', 'Audio Engineers', 'Video Editors'] },
            { head: 'For Pros', links: ['Create Profile', 'How It Works', 'Pricing', 'Verification'] },
            { head: 'Regions', links: ['Tallahassee, FL', 'Pensacola, FL', 'Mobile, AL', 'Biloxi / Gulfport', 'New Orleans, LA'] },
          ].map(col => (
            <div key={col.head}>
              <h4 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4">{col.head}</h4>
              {col.links.map(l => (
                <Link key={l} href="/browse" className="block text-sm text-muted hover:text-white mb-2 transition-colors">{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} Gulf Coast Production Network · gulfcoastproductionnetwork.com</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Made on the Gulf Coast
          </span>
        </div>
      </footer>
    </>
  )
}
