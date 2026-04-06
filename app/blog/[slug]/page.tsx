import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Gulf Coast Production Network`,
    description: post.description,
    alternates: { canonical: `https://gulfcoastproductionnetwork.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gulfcoastproductionnetwork.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const allPosts = getAllBlogPosts().filter(p => p.slug !== post.slug).slice(0, 3)

  // Convert markdown-style content to HTML
  const renderContent = (content: string) => {
    return content
      .trim()
      .split('\n\n')
      .map((block, i) => {
        if (block.startsWith('## ')) {
          return <h2 key={i} className="font-display text-2xl tracking-widest text-white mt-10 mb-4">{block.replace('## ', '')}</h2>
        }
        if (block.startsWith('**') && block.endsWith('**')) {
          return <p key={i} className="font-semibold text-white mb-3">{block.replace(/\*\*/g, '')}</p>
        }
        if (block.startsWith('- ')) {
          const items = block.split('\n').filter(l => l.startsWith('- '))
          return (
            <ul key={i} className="list-disc pl-6 mb-4 space-y-2">
              {items.map((item, j) => (
                <li key={j} className="text-white/75 text-sm leading-relaxed">{item.replace('- ', '')}</li>
              ))}
            </ul>
          )
        }
        // Handle bold within paragraphs
        const parts = block.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="text-white/75 text-sm leading-relaxed mb-4">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>
              }
              return part
            })}
          </p>
        )
      })
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Gulf Coast Production Network',
      url: 'https://gulfcoastproductionnetwork.com',
    },
    mainEntityOfPage: `https://gulfcoastproductionnetwork.com/blog/${post.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="pt-16 min-h-screen">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 pt-12 pb-8">
          <Link href="/blog" className="text-teal text-xs font-condensed tracking-widest uppercase hover:underline mb-6 inline-block">
            ← Back to Guides
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-condensed text-[10px] tracking-widest uppercase bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded">
              {post.category}
            </span>
            <span className="text-muted text-xs">{post.readTime}</span>
            <span className="text-muted text-xs">·</span>
            <span className="text-muted text-xs">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-widest text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed border-l-2 border-teal pl-4">
            {post.description}
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4">
          <div className="border-t border-white/[0.06] mb-10" />
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 pb-16">
          {renderContent(post.content)}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-teal/10 to-transparent border border-teal/20 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl tracking-widest mb-3">Find a Professional on the Gulf Coast</h3>
            <p className="text-muted text-sm mb-6">Browse verified media professionals available for your next project — from Tallahassee to New Orleans.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/browse" className="btn-teal font-display tracking-widest px-6 py-2">Browse Pros</Link>
              <Link href="/post-job" className="btn-outline font-display tracking-widest px-6 py-2">Post a Job</Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {allPosts.length > 0 && (
          <div className="bg-navy2 border-t border-white/[0.06] py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-2xl tracking-widest mb-8 text-center">More Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {allPosts.map(related => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="card p-5 hover:border-teal/40 transition-all duration-200 group">
                    <span className="font-condensed text-[10px] tracking-widest uppercase bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded mb-3 inline-block">
                      {related.category}
                    </span>
                    <h3 className="font-condensed text-sm tracking-wide text-white group-hover:text-teal transition-colors leading-snug">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
