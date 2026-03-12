import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Gulf Coast Production Network',
  description: 'Terms of Service for Gulf Coast Production Network.',
}

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl tracking-widest mb-2">TERMS OF SERVICE</h1>
      <p className="text-muted text-sm mb-10">Last updated: March 2026</p>

      <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-white/80">

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">1. ACCEPTANCE OF TERMS</h2>
          <p>By accessing or using Gulf Coast Production Network ("GCPN") at gulfcoastproductionnetwork.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">2. WHO CAN USE GCPN</h2>
          <p>You must be at least 18 years old to create an account. By registering, you confirm that the information you provide is accurate and that you have the legal capacity to enter into these terms.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">3. YOUR ACCOUNT</h2>
          <p>You are responsible for maintaining the security of your account and password. You are responsible for all activity that occurs under your account. Notify us immediately of any unauthorized use at <a href="mailto:support@gulfcoastproductionnetwork.com" className="text-teal hover:underline">support@gulfcoastproductionnetwork.com</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">4. PRO LISTINGS</h2>
          <p className="mb-3">If you create a Pro profile, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate information about your skills, experience, and services</li>
            <li>Only list services you are qualified and legally able to provide</li>
            <li>Keep your profile information current and up to date</li>
            <li>Not impersonate another person or business</li>
            <li>Not post false reviews or manipulate ratings</li>
          </ul>
          <p className="mt-3">GCPN does not guarantee any amount of work, leads, or income to Pro members.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">5. JOB POSTINGS</h2>
          <p className="mb-3">If you post a job, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Post only legitimate, real production opportunities</li>
            <li>Provide accurate descriptions of the work, timeline, and compensation</li>
            <li>Not post spam, misleading, or illegal job listings</li>
            <li>Respond to professionals who contact you in good faith</li>
          </ul>
          <p className="mt-3">GCPN reserves the right to remove any job posting that violates these terms without notice.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">6. PROHIBITED CONDUCT</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the platform for any unlawful purpose</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Post spam, unsolicited advertisements, or malicious content</li>
            <li>Scrape, copy, or redistribute our directory data without permission</li>
            <li>Attempt to gain unauthorized access to any part of the platform</li>
            <li>Use GCPN to solicit users to move transactions off-platform in bad faith</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">7. CONTENT OWNERSHIP</h2>
          <p>You retain ownership of the content you post on GCPN, including your profile photos, bio, and portfolio. By posting content, you grant GCPN a non-exclusive license to display that content on the platform for the purpose of operating the service.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">8. GCPN IS A DIRECTORY, NOT A PARTY TO CONTRACTS</h2>
          <p>GCPN connects clients with production professionals but is not a party to any agreement, contract, or transaction between users. Any disputes, payment issues, or disagreements between clients and professionals are solely between those parties. GCPN is not responsible for the quality of work, payment disputes, or any other outcome of engagements made through the platform.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">9. DISCLAIMER OF WARRANTIES</h2>
          <p>GCPN is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access, error-free operation, or that the platform will meet your specific needs. We do not verify the credentials, licenses, or qualifications of listed professionals.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">10. LIMITATION OF LIABILITY</h2>
          <p>To the fullest extent permitted by law, GCPN shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to lost profits, lost data, or business interruption.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">11. TERMINATION</h2>
          <p>We reserve the right to suspend or terminate any account that violates these Terms of Service, at our sole discretion and without prior notice. You may also delete your account at any time from your dashboard.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">12. GOVERNING LAW</h2>
          <p>These Terms shall be governed by the laws of the State of Florida, without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">13. CHANGES TO TERMS</h2>
          <p>We may update these Terms from time to time. Continued use of the platform after changes are posted constitutes your acceptance of the new terms.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-widest text-white mb-3">14. CONTACT</h2>
          <p>Questions about these Terms? Contact us at:<br />
          <a href="mailto:support@gulfcoastproductionnetwork.com" className="text-teal hover:underline">support@gulfcoastproductionnetwork.com</a></p>
        </section>

      </div>
    </div>
  )
}
