'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { ArrowLeft, Coins, Plus, Sparkles } from 'lucide-react'

export default function SavingsScreen() {
  const { setScreen } = useApp()
  const [status, setStatus] = useState<any>(null)
  const [target, setTarget] = useState('')
  const [deposit, setDeposit] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadStatus = async () => {
    try {
      const data = await api.getSavingsStatus()
      setStatus(data)
    } catch {
      setStatus(null)
    }
  }

  useEffect(() => {
    void loadStatus()
  }, [])

  const handleStart = async () => {
    if (!target) return
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const result = await api.startSavingsPlan(Number(target))
      setStatus(result)
      setMessage('Savings plan started successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start plan')
    } finally {
      setLoading(false)
    }
  }

  const handleDeposit = async () => {
    if (!deposit) return
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const result = await api.depositSavings(Number(deposit))
      setStatus(result)
      setMessage('Deposit recorded successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to deposit')
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
              <p className="text-sm font-medium text-muted-foreground">Financial growth</p>
              <h1 className="text-2xl font-semibold text-foreground">Savings plans</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#7c3aed] to-[#4c1d95] p-4 text-white">
            <div className="flex items-center gap-2">
              <Coins size={18} />
              <p className="text-sm font-semibold">Smart savings engine</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Create a plan, track progress, and keep your streak alive.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Active plan</p>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {status ? 'Live' : 'Idle'}
            </span>
          </div>

          {status ? (
            <div className="space-y-3 rounded-[20px] bg-[#f8f5ff] p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Target</p>
                <p className="text-sm font-semibold text-primary">₦{Number(status.target || 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Saved</p>
                <p className="text-sm font-semibold text-foreground">₦{Number(status.saved || 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Progress</p>
                <p className="text-sm font-semibold text-foreground">{status.progress || 0}%</p>
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-border p-4 text-sm text-muted-foreground">
              No active savings plan yet. Start one below to begin building momentum.
            </div>
          )}
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">Start a new plan</p>
          <div className="space-y-3">
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              type="number"
              placeholder="Target amount"
              className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={handleStart} disabled={loading} className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? 'Working…' : 'Start plan'}
            </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">Quick deposit</p>
          <div className="space-y-3">
            <input
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              type="number"
              placeholder="Deposit amount"
              className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={handleDeposit} disabled={loading} className="w-full rounded-2xl border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary disabled:opacity-60">
              {loading ? 'Saving…' : 'Deposit now'}
            </button>
          </div>
        </section>

        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}
