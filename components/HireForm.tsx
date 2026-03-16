'use client'
import { useState } from 'react'

export default function HireForm({ proName, proEmail }: { proName: string, proEmail: string }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectType, setProjectType] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message')
      return
    }
    setError('')

    const subject = `Project Inquiry via GCPN — ${projectType || 'General Inquiry'}`
    const body = `Hi ${proName},\n\nYou have a new project inquiry through Gulf Coast Production Network!\n\nFROM: ${name}\nEMAIL: ${email}\nPHONE: ${phone || 'Not provided'}\nPROJECT TYPE: ${projectType || 'Not specified'}\nDATE: ${date || 'Not specified'}\nBUDGET: ${budget || 'Not specified'}\n\nMESSAGE:\n${message}\n\n---\nReply directly to ${email} to connect with this client.\nThis inquiry was sent via gulfcoastproductionnetwork.com`

    window.location.href = `mailto:${proEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSuccess(true)
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
        <h3 className="font-display text-xl tracking-widest mb-2">Almost Done!</h3>
        <p className="text-muted text-sm">Your email app opened with the inquiry pre-filled. Just hit send to contact {proName}!</p>
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
        {error && <p className="text-coral text-sm bg-coral/10 rounded-lg px-4 py-3">{error}</p>}
        <div className="flex gap-3 mt-1">
          <button onClick={handleSubmit} className="btn-teal font-condensed tracking-widest uppercase px-6 py-2 flex-1">
            Send Inquiry
          </button>
          <button onClick={() => setOpen(false)} className="text-muted text-sm hover:text-white transition-colors">
            Cancel
          </button>
        </div>
        <p className="text-muted text-xs text-center">This will open your email app with the inquiry pre-filled.</p>
      </div>
    </div>
  )
}
