'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { ArrowLeft, Trophy } from 'lucide-react'

export default function ChallengeScreen() {
  const { setScreen } = useApp()
  const [expense, setExpense] = useState('')
  const [challenge, setChallenge] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadChallenge = async () => {
    try {
      const data = await api.getChallenge()
      setChallenge(data)
    } catch {
      setChallenge(null)
    }
  }

  useEffect(() => {
    void loadChallenge()
  }, [])

  const handleStart = async () => {
    if (!expense) return
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const result = await api.startChallenge(Number(expense))
      setChallenge(result)
      setMessage('Challenge created successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start challenge')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <button onClick={() => setScreen('dashboard')} className="rounded-full bg-[#f2ebff] p-2.5 text-primary">
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Savings challenge</p>
              <h1 className="text-2xl font-semibold text-foreground">Spend less, save more</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#4f46e5] to-[#7c3aed] p-4 text-white">
            <div className="flex items-center gap-2">
              <Trophy size={18} />
              <p className="text-sm font-semibold">Weekly challenge</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Create a simple challenge that nudges you to save a percentage of your spending.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">Start a new challenge</p>
          <input
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            type="number"
            placeholder="Monthly expense"
            className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button onClick={handleStart} disabled={loading} className="mt-3 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? 'Creating…' : 'Start challenge'}
          </button>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">Current challenge</p>
          {challenge ? (
            <div className="rounded-[20px] bg-[#f8f5ff] p-4">
              <p className="text-sm font-semibold text-foreground">Target: ₦{Number(challenge.target || 0).toLocaleString()}</p>
              <p className="mt-2 text-sm text-muted-foreground">Your challenge is active and ready to track.</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No challenge has been created yet.</p>
          )}
        </section>

        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}
