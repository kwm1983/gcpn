import Link from 'next/link'

interface ProCardProps {
  pro: {
    id: string
    display_name?: string
    full_name?: string
    specialty?: string
    city?: string
    avg_rating?: number
    review_count?: number
    avatar_url?: string
    skills?: string[]
    verified?: boolean
    featured?: boolean
    available?: boolean
  }
}

export default function ProCard({ pro }: ProCardProps) {
  const name = pro.display_name || pro.full_name || 'Anonymous Pro'
  const rating = pro.avg_rating ?? 0
  const reviews = pro.review_count ?? 0
  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))

  return (
    <Link href={`/profile/${pro.id}`} className="card hover:border-teal/40 hover:-translate-y-1 transition-all duration-200 block group overflow-hidden">
      {/* Cover */}
      <div className="h-24 bg-gradient-to-br from-navy2 to-card flex items-center justify-center text-5xl opacity-60">
        {pro.specialty?.includes('photo') ? '📸' :
         pro.specialty?.includes('audio') ? '🎙️' :
         pro.specialty?.includes('drone') ? '🚁' :
         pro.specialty?.includes('graphic') ? '🎨' :
         pro.specialty?.includes('social') ? '📱' : '🎬'}
      </div>

      <div className="p-4 pt-2 relative">
        {/* Badges */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {pro.featured && (
            <span className="font-condensed text-[10px] tracking-widest uppercase bg-gold text-navy px-2 py-0.5 rounded">Top Rated</span>
          )}
          {pro.verified && (
            <span className="font-condensed text-[10px] tracking-widest uppercase bg-teal/20 text-teal border border-teal/30 px-2 py-0.5 rounded">✓ Verified</span>
          )}
          {pro.available && (
            <span className="font-condensed text-[10px] tracking-widest uppercase bg-green-500/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded">Available</span>
          )}
        </div>

        <div className="font-condensed text-lg tracking-wide text-white group-hover:text-teal transition-colors">{name}</div>
        <div className="text-teal text-xs font-semibold mb-1">{pro.specialty}</div>
        <div className="text-muted text-xs mb-2">📍 {pro.city}</div>

        {reviews > 0 && (
          <div className="text-gold text-sm mb-2">
            {stars} <span className="text-muted text-xs">({reviews})</span>
          </div>
        )}

        {pro.skills && pro.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pro.skills.slice(0, 3).map(skill => (
              <span key={skill} className="text-[10px] font-condensed tracking-wide uppercase px-2 py-0.5 bg-teal/10 text-teal border border-teal/20 rounded">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
