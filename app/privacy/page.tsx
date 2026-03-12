import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Gulf Coast Production Network',
  description: 'Privacy Policy for Gulf Coast Production Network.',
}

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl tracking-widest mb-2">PRIVACY POLICY</h1>
      <p className="text-muted text-sm mb-10">Last updated: March 2026</p>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-white/80">

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">1. WHO WE ARE</h2>
          <p>Gulf Coast Production Network ("GCPN," "we," "us," or "our") operates gulfcoastproductionnetwork.com, an online directory connecting media and production professionals with clients across the Gulf Coast region. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">2. INFORMATION WE COLLECT</h2>
          <p className="mb-3">We collect the following information when you create an account or use our services:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Information:</strong> Your name, email address, password, city, and account type (Pro or Client).</li>
            <li><strong>Profile Information (Pros):</strong> Your specialty, skills, equipment, day rate, bio, portfolio items, and profile photo.</li>
            <li><strong>Job Postings:</strong> Job titles, descriptions, budgets, and contact preferences you submit.</li>
            <li><strong>Usage Data:</strong> Pages visited, search queries, and general site activity.</li>
            <li><strong>Communications:</strong> Messages sent through our platform between users.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">3. HOW WE USE YOUR INFORMATION</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To create and manage your account</li>
            <li>To display your professional profile to potential clients</li>
            <li>To connect clients with production professionals</li>
            <li>To send account-related emails (confirmation, password reset)</li>
            <li>To improve our platform and user experience</li>
            <li>To respond to support requests</li>
          </ul>
          <p className="mt-3">We do <strong>not</strong> sell your personal information to third parties. Ever.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">4. DATA STORAGE & SECURITY</h2>
          <p>Your data is stored securely using Supabase, a trusted cloud database provider. We use industry-standard encryption for data transmission and storage. While we take reasonable precautions to protect your information, no internet transmission is 100% secure.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">5. PUBLIC INFORMATION</h2>
          <p>If you create a Pro profile, the following information will be publicly visible to anyone visiting the site: your name, photo, city, specialty, skills, bio, portfolio, and day rate. Please only share information you are comfortable making public.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">6. COOKIES</h2>
          <p>We use essential cookies to keep you logged in and maintain your session. We do not use advertising or tracking cookies.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">7. YOUR RIGHTS</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Update or correct your information via your dashboard</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of non-essential communications</li>
          </ul>
          <p className="mt-3">To request account deletion or a copy of your data, email us at <a href="mailto:privacy@gulfcoastproductionnetwork.com" className="text-teal hover:underline">privacy@gulfcoastproductionnetwork.com</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">8. CHILDREN'S PRIVACY</h2>
          <p>Our services are not directed to anyone under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us immediately.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">9. CHANGES TO THIS POLICY</h2>
          <p>We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">10. CONTACT US</h2>
          <p>If you have questions about this Privacy Policy, contact us at:<br />
          <a href="mailto:privacy@gulfcoastproductionnetwork.com" className="text-teal hover:underline">privacy@gulfcoastproductionnetwork.com</a></p>
        </section>

      </div>
    </div>
  )
}
