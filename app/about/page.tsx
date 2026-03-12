import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Gulf Coast Production Network',
  description: 'Gulf Coast Production Network is the Gulf Coast\'s premier directory connecting video, photo, and media production professionals with clients from Tallahassee to New Orleans.',
  alternates: { canonical: 'https://gulfcoastproductionnetwork.com/about' },
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 px-4">

      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-coral" />
          <span className="font-condensed text-xs tracking-[4px] uppercase text-teal">Our Story</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl tracking-widest mb-6">
          BUILT FOR THE<br /><span className="text-teal">GULF COAST</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          Gulf Coast Production Network was built to solve a simple problem — finding talented local media professionals shouldn't require hours of searching Facebook groups and cold DMing strangers.
        </p>
      </div>

      {/* MISSION */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        <div className="card p-8">
          <div className="text-4xl mb-4">🎬</div>
          <h2 className="font-display text-2xl tracking-widest mb-3">OUR MISSION</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            To connect the Gulf Coast's talented media and production professionals with the clients who need them — creating more opportunities for local creatives and making it easier for businesses to find the right talent, fast.
          </p>
        </div>
        <div className="card p-8">
          <div className="text-4xl mb-4">🌊</div>
          <h2 className="font-display text-2xl tracking-widest mb-3">WHY GULF COAST</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            From Tallahassee to New Orleans, the Gulf Coast is home to thousands of talented videographers, photographers, audio engineers, drone operators, and media professionals. We built the platform they deserve.
          </p>
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-display text-3xl tracking-widest text-center mb-10">WHAT WE DO</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: 'Directory', desc: 'A searchable directory of Gulf Coast media pros — filter by specialty, city, availability, and budget.' },
            { icon: '📋', title: 'Job Board', desc: 'Clients post production jobs, pros apply. From wedding shoots to commercial productions.' },
            { icon: '⭐', title: 'Reviews', desc: 'Real reviews from real clients help you find trusted professionals with proven track records.' },
          ].map(item => (
            <div key={item.title} className="text-center p-6">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display text-xl tracking-widest mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* REGION */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-display text-3xl tracking-widest text-center mb-8">OUR REGION</h2>
        <div className="card p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              'Tallahassee, FL', 'Pensacola, FL', 'Panama City, FL', 'Mobile, AL',
              'Gulf Shores, AL', 'Biloxi, MS', 'Gulfport, MS', 'New Orleans, LA',
              'Baton Rouge, LA', 'Lafayette, LA',
            ].map(city => (
              <div key={city} className="py-2">
                <span className="text-sm text-white/70">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="font-display text-3xl tracking-widest mb-4">GET IN TOUCH</h2>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          Have a question, want to partner with us, or just want to say hello? We'd love to hear from you.
        </p>
        <div className="card p-8 text-left space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-teal text-lg">✉</span>
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">General Inquiries</p>
              <a href="mailto:hello@gulfcoastproductionnetwork.com" className="text-white hover:text-teal transition-colors text-sm">hello@gulfcoastproductionnetwork.com</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal text-lg">🛠</span>
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Support</p>
              <a href="mailto:support@gulfcoastproductionnetwork.com" className="text-white hover:text-teal transition-colors text-sm">support@gulfcoastproductionnetwork.com</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal text-lg">🤝</span>
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Partnerships</p>
              <a href="mailto:partners@gulfcoastproductionnetwork.com" className="text-white hover:text-teal transition-colors text-sm">partners@gulfcoastproductionnetwork.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl tracking-widest mb-4">READY TO JOIN?</h2>
        <p className="text-white/60 text-sm mb-8">Whether you're a pro looking to get discovered or a client looking for talent — GCPN is free to join.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth?mode=signup&type=pro" className="btn-teal font-display tracking-widest px-8 py-3">JOIN AS A PRO</Link>
          <Link href="/browse" className="btn-outline font-display tracking-widest px-8 py-3">FIND TALENT</Link>
        </div>
      </div>

    </div>
  )
}
