import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Production Resources & Guides | Gulf Coast Production Network',
  description: 'Practical guides for hiring media professionals, understanding production roles, and getting the most out of your video and photo projects on the Gulf Coast.',
  alternates: { canonical: 'https://gulfcoastproductionnetwork.com/blog' },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  const categories = posts.map(p => p.category).filter((cat, index, arr) => arr.indexOf(cat) === index)

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-teal/8 to-transparent border-b border-white/[0.06] py-14 px-4 text-center">
        <p className="section-eyebrow">Resources</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-widest mb-4">
          Production <span className="text-teal">Guides</span>
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          Practical advice for hiring media professionals, understanding the industry, and getting great results from your next production.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="font-condensed text-xs tracking-[2px] uppercase text-muted py-1">Filter:</span>
          {categories.map(cat => (
            <span key={cat} className="font-condensed text-xs tracking-wider uppercase px-3 py-1.5 border border-white/15 rounded-full text-muted">
              {cat}
            </span>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-6 hover:border-teal/40 hover:-translate-y-1 transition-all duration-200 group flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-condensed text-[10px] tracking-widest uppercase bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-muted text-xs">{post.readTime}</span>
              </div>
              <h2 className="font-condensed text-lg tracking-wide text-white group-hover:text-teal transition-colors mb-3 leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
                <span className="text-muted text-xs">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-teal text-xs font-condensed tracking-widest uppercase">Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 text-center">
          <h2 className="font-display text-3xl tracking-widest mb-3">Ready to Find a Pro?</h2>
          <p className="text-muted text-sm mb-6">Browse Gulf Coast media professionals available for your next project.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/browse" className="btn-teal font-display tracking-widest px-8 py-3">Browse Professionals</Link>
            <Link href="/post-job" className="btn-outline font-display tracking-widest px-8 py-3">Post a Job</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
