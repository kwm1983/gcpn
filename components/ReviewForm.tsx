'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function ReviewForm({ proId, proName }: { proId: string, proName: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [projectType, setProjectType] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const supabase = createClient()

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a star rating'); return }
    if (!name.trim()) { setError('Please enter your name'); return }
    if (!body.trim()) { setError('Please write a review'); return }

    setLoading(true)
    setError('')

    const { error: err } = await supabase.from('reviews').insert({
      pro_id: proId,
      reviewer_name: name.trim(),
      reviewer_company: company.trim() || null,
      project_type: projectType.trim() || null,
      rating,
      body: body.trim(),
    })

    if (err) {
      setError('Failed to submit review. Please try again.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="mt-6 p-5 bg-teal/10 border border-teal/30 rounded-xl text-center">
        <div className="text-3xl mb-2">⭐</div>
        <p className="text-teal font-semibold">Review submitted!</p>
        <p className="text-muted text-sm mt-1">Thanks for your feedback.</p>
      </div>
    )
  }

  if (!showForm) {
    return (
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="btn-outline w-full text-center font-condensed tracking-widest uppercase text-sm py-3"
        >
          + Leave a Review
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 border-t border-white/[0.06] pt-6">
      <h3 className="font-condensed text-xs tracking-[3px] uppercase text-teal mb-4">Leave a Review for {proName}</h3>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="label mb-2 block">Rating *</label>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl transition-colors"
              style={{ color: star <= (hover || rating) ? '#FFB800' : 'rgba(255,255,255,0.2)' }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label">Your Name *</label>
          <input
            className="input"
            placeholder="John Smith"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Company (optional)</label>
          <input
            className="input"
            placeholder="Acme Productions"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="label">Project Type (optional)</label>
        <input
          className="input"
          placeholder="e.g. Corporate video, wedding, live event..."
          value={projectType}
          onChange={e => setProjectType(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="label">Your Review *</label>
        <textarea
          className="input min-h-[100px] resize-none"
          placeholder="Share your experience working with this professional..."
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>

      {error && <p className="text-coral text-sm bg-coral/10 rounded-lg px-4 py-3 mb-4">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-teal font-condensed tracking-widest uppercase px-6 py-2"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="text-muted text-sm hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
