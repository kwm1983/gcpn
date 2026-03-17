'use client'
import { useState } from 'react'
import Turnstile from '@/components/Turnstile'

export default function HireForm({ proName, proEmail }: { proName: string, proEmail: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectType, setProjectType] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message')
      return
    }
    if (!turnstileToken) {
      setError('Please complete the human verification')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proName, proEmail,
          fromName: name, fromEmail: email, fromPhone: phone,
          projectType, date, budget, message, turnstileToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send. Please try again.')
    }
    setLoading(false)
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary w-full text-center font-display tracking-widest">
        Hire {proName}
      </button>
    )
  }

  if (success) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-3">📬</div>
        <h3 className="font-display text-xl tracking-widest mb-2">Message Sent!</h3>
        <p className="text-muted text-sm">{proName} will receive your inquiry and reply directly to your email.</p>
        <button onClick={() => { setOpen(false); setSuccess(false) }} className="text-teal text-sm mt-4 hover:underline">Close</button>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <h3 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4 pb-2 border-b border-white/[0.06]">
        Contact {proName}
      </h3>
      <div className="flex flex-col gap-3">
        <div>
          <label className="label">Your Name *</label>
          <input className="input" placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label className="label">Your Email *</label>
          <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Phone (optional)</label>
          <input className="input" type="tel" placeholder="(850) 555-0000" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="label">Project Type</label>
          <select className="select" value={projectType} onChange={e => setProjectType(e.target.value)}>
            <option value="">Select...</option>
            {['Wedding Video & Photo','Commercial / Ad','Corporate Video','Event Coverage','Social Media Content','Documentary','Music Video','Real Estate','Broadcast / News','Film / Narrative','Other'].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Project Date</label>
          <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label className="label">Budget Range</label>
          <select className="select" value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="">Select...</option>
            {['$250–500','$500–1,500','$1,500–5K','$5K–15K','$15K+','Negotiable'].map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Message *</label>
          <textarea className="input resize-none min-h-[80px]" placeholder="Describe your project..." value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <Turnstile onVerify={setTurnstileToken} />
        {error && <p className="text-coral text-sm bg-coral/10 rounded-lg px-4 py-3">{error}</p>}
        <div className="flex gap-3 mt-1">
          <button onClick={handleSubmit} disabled={loading} className="btn-teal font-condensed tracking-widest uppercase px-6 py-2 flex-1">
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
          <button onClick={() => setOpen(false)} className="text-muted text-sm hover:text-white transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  )
}
