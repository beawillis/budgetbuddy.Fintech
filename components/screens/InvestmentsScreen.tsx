'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useState } from 'react'
import { ArrowLeft, TrendingUp } from 'lucide-react'

export default function InvestmentsScreen() {
  const { setScreen } = useApp()
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSimulate = async () => {
    if (!principal || !rate || !years) return
    setLoading(true)
    setError('')
    try {
      const data = await api.simulateInvestment({ principal: Number(principal), rate: Number(rate), years: Number(years) })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to simulate investment')
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
              <p className="text-sm font-medium text-muted-foreground">Wealth building</p>
              <h1 className="text-2xl font-semibold text-foreground">Investment simulator</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#0f766e] to-[#2563eb] p-4 text-white">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} />
              <p className="text-sm font-semibold">See the future value of your money</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Test different return rates and time horizons before you invest.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="space-y-3">
            <input value={principal} onChange={(e) => setPrincipal(e.target.value)} type="number" placeholder="Principal amount" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" placeholder="Annual rate (%)" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <input value={years} onChange={(e) => setYears(e.target.value)} type="number" placeholder="Years" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={handleSimulate} disabled={loading} className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? 'Simulating…' : 'Simulate'}
            </button>
          </div>
        </section>

        {result ? (
          <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-foreground">Projected value</p>
            <div className="rounded-[20px] bg-[#f8f5ff] p-4 text-sm">
              <p className="text-2xl font-semibold text-primary">₦{Number(result.future || 0).toLocaleString()}</p>
              <p className="mt-2 text-muted-foreground">This estimate assumes compound growth over your selected timeframe.</p>
            </div>
          </section>
        ) : null}

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}
