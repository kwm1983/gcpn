'use client'
import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AvatarUpload({ userId, currentUrl }: { userId: string; currentUrl?: string }) {
  const supabase = createClient()
  const router = useRouter()
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.')
      return
    }

    setError('')
    setUploading(true)

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    // Upload to Supabase Storage — timestamp prevents browser caching
    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    // Save to profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)

    if (updateError) {
      setError(updateError.message)
    } else {
      setPreview(publicUrl)
      router.refresh()
    }

    setUploading(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar preview */}
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 hover:border-teal/60 transition-colors cursor-pointer overflow-hidden bg-navy2 flex items-center justify-center relative group"
        onClick={() => fileInput.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Profile photo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-condensed tracking-widest uppercase">Change</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-3xl mb-1">👤</div>
            <div className="text-[10px] font-condensed tracking-widest uppercase text-muted">Add Photo</div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-navy/80 flex items-center justify-center rounded-full">
            <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        disabled={uploading}
        className="font-condensed text-xs tracking-widest uppercase text-teal hover:text-white transition-colors disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : preview ? 'Change Photo' : 'Upload Photo'}
      </button>

      {error && <p className="text-coral text-xs text-center">{error}</p>}
      <p className="text-muted text-[10px] text-center">JPG, PNG or GIF · Max 5MB</p>
    </div>
  )
}
