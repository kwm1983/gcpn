'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function JobManager({ jobs }: { jobs: any[] }) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const markFilled = async (id: string) => {
    setLoading(id)
    await supabase.from('job_postings').update({ status: 'filled' }).eq('id', id)
    router.refresh()
    setLoading(null)
  }

  const deleteJob = async (id: string) => {
    setLoading(id)
    await supabase.from('job_postings').delete().eq('id', id)
    setConfirmDelete(null)
    router.refresh()
    setLoading(null)
  }

  if (!jobs || jobs.length === 0) return (
    <p className="text-muted text-sm">No job postings yet.</p>
  )

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((j: any) => (
        <div key={j.id} className="bg-navy/40 rounded-xl p-4 border border-white/[0.04]">
          <div className="flex justify-between items-start gap-2 mb-1">
            <span className="font-semibold text-sm text-white">{j.title}</span>
            <span className={`font-condensed text-[10px] tracking-widest uppercase px-2 py-0.5 rounded flex-shrink-0 ${
              j.status === 'open' ? 'bg-green-500/20 text-green-400' :
              j.status === 'filled' ? 'bg-teal/20 text-teal' :
              'bg-muted/20 text-muted'
            }`}>{j.status}</span>
          </div>
          <p className="text-muted text-xs mb-3">{j.city} · {j.role_needed} · {j.production_type}</p>

          {/* Action buttons */}
          {confirmDelete === j.id ? (
            <div className="flex gap-2 items-center">
              <span className="text-xs text-coral">Are you sure?</span>
              <button
                onClick={() => deleteJob(j.id)}
                disabled={loading === j.id}
                className="font-condensed text-[10px] tracking-widest uppercase bg-coral/20 text-coral border border-coral/30 px-3 py-1 rounded hover:bg-coral/30 transition-colors"
              >
                {loading === j.id ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="font-condensed text-[10px] tracking-widest uppercase text-muted hover:text-white px-3 py-1 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {j.status === 'open' && (
                <button
                  onClick={() => markFilled(j.id)}
                  disabled={loading === j.id}
                  className="font-condensed text-[10px] tracking-widest uppercase bg-teal/10 text-teal border border-teal/30 px-3 py-1 rounded hover:bg-teal/20 transition-colors disabled:opacity-50"
                >
                  {loading === j.id ? 'Updating...' : '✓ Mark as Filled'}
                </button>
              )}
              <button
                onClick={() => setConfirmDelete(j.id)}
                className="font-condensed text-[10px] tracking-widest uppercase bg-coral/10 text-coral border border-coral/20 px-3 py-1 rounded hover:bg-coral/20 transition-colors"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
