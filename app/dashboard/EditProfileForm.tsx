'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AvatarUpload from '@/components/AvatarUpload'

const CITIES = [
  'Tallahassee, FL','Pensacola, FL','Panama City, FL','Mobile, AL',
  'Gulf Shores, AL','Biloxi, MS','Gulfport, MS','New Orleans, LA',
  'Baton Rouge, LA','Lafayette, LA','Other Gulf Coast',
]
const SPECIALTIES = [
  'Broadcast Camera','Director / Producer','Videographer','Photographer',
  'Audio Engineering','Video Editing / Post','Motion Graphics','Graphic Artist',
  'Drone / Aerial','Social Media Creator','Wedding Video & Photo',
  'Cinematography','Lighting / Gaffer','Music / Composer','Other',
]

export default function EditProfileForm({ profile, userId, isPro }: { profile: any; userId: string; isPro: boolean }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [available, setAvailable] = useState(profile?.available ?? true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    const updates: any = {
      full_name: data.get('full_name'),
      display_name: data.get('display_name'),
      phone: data.get('phone'),
      city: data.get('city'),
      website: data.get('website'),
      updated_at: new Date().toISOString(),
    }

    if (isPro) {
      updates.bio = data.get('bio')
      updates.specialty = data.get('specialty')
      updates.years_exp = data.get('years_exp') ? parseInt(data.get('years_exp') as string) : null
      updates.day_rate = data.get('day_rate') ? parseInt(data.get('day_rate') as string) : null
      updates.available = available
      const skillsRaw = data.get('skills') as string
      updates.skills = skillsRaw ? skillsRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : []
      const equipRaw = data.get('equipment') as string
      updates.equipment = equipRaw ? equipRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : []
    }

    const { error } = await supabase.from('profiles').update(updates).eq('id', userId)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Avatar Upload */}
      <div className="flex justify-center pb-2 border-b border-white/[0.06]">
        <AvatarUpload userId={userId} currentUrl={profile?.avatar_url} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Full Name</label>
          <input name="full_name" defaultValue={profile?.full_name ?? ''} className="input text-sm" />
        </div>
        <div>
          <label className="label">Display Name</label>
          <input name="display_name" defaultValue={profile?.display_name ?? ''} className="input text-sm" placeholder="How it shows publicly" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Phone</label>
          <input name="phone" defaultValue={profile?.phone ?? ''} type="tel" className="input text-sm" />
        </div>
        <div>
          <label className="label">City</label>
          <select name="city" defaultValue={profile?.city ?? ''} className="select text-sm">
            <option value="">Select...</option>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Website / Portfolio URL</label>
        <input name="website" defaultValue={profile?.website ?? ''} type="url" className="input text-sm" placeholder="https://..." />
      </div>

      {isPro && (
        <>
          <div>
            <label className="label">Primary Specialty</label>
            <select name="specialty" defaultValue={profile?.specialty ?? ''} className="select text-sm">
              <option value="">Select...</option>
              {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Bio</label>
            <textarea name="bio" defaultValue={profile?.bio ?? ''} rows={3} className="input resize-none text-sm" placeholder="Describe your experience and what you bring to productions..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Years Experience</label>
              <input name="years_exp" defaultValue={profile?.years_exp ?? ''} type="number" className="input text-sm" min={0} max={50} />
            </div>
            <div>
              <label className="label">Day Rate ($)</label>
              <input name="day_rate" defaultValue={profile?.day_rate ?? ''} type="number" className="input text-sm" placeholder="e.g. 800" />
            </div>
          </div>
          <div>
            <label className="label">Skills (comma-separated)</label>
            <input name="skills" defaultValue={profile?.skills?.join(', ') ?? ''} className="input text-sm" placeholder="e.g. Sony FX9, Steadicam, Live TV, Broadcast" />
          </div>
          <div>
            <label className="label">Equipment (comma-separated)</label>
            <input name="equipment" defaultValue={profile?.equipment?.join(', ') ?? ''} className="input text-sm" placeholder="e.g. ARRI Alexa, DJI Ronin, RED Komodo" />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAvailable(!available)}
              className={`relative w-11 h-6 rounded-full transition-colors ${available ? 'bg-teal' : 'bg-white/20'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${available ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm text-muted">{available ? '✅ Available for work' : '⏸ Mark as unavailable'}</span>
          </div>
        </>
      )}

      <button type="submit" disabled={loading} className="btn-teal text-center">
        {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </form>
  )
}
