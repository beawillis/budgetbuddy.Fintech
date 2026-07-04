'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useState } from 'react'
import { ArrowLeft, BadgeDollarSign } from 'lucide-react'

export default function LoansScreen() {
  const { setScreen } = useApp()
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [term, setTerm] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleCalculate = async () => {
    if (!amount || !interestRate || !term) return
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const data = await api.calculateLoan({ amount: Number(amount), interestRate: Number(interestRate), term: Number(term) })
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to calculate loan')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result) return
    try {
      await api.saveLoan({ amount: Number(amount), interestRate: Number(interestRate), term: Number(term) })
      setMessage('Loan plan saved successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save loan')
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
              <p className="text-sm font-medium text-muted-foreground">Borrowing tools</p>
              <h1 className="text-2xl font-semibold text-foreground">Loan calculator</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#2563eb] to-[#0f766e] p-4 text-white">
            <div className="flex items-center gap-2">
              <BadgeDollarSign size={18} />
              <p className="text-sm font-semibold">Understand repayment clearly</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Calculate monthly payments before taking a loan.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="space-y-3">
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Loan amount" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <input value={interestRate} onChange={(e) => setInterestRate(e.target.value)} type="number" placeholder="Interest rate (%)" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <input value={term} onChange={(e) => setTerm(e.target.value)} type="number" placeholder="Term (years)" className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={handleCalculate} disabled={loading} className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? 'Calculating…' : 'Calculate'}
            </button>
          </div>
        </section>

        {result ? (
          <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-foreground">Repayment summary</p>
            <div className="space-y-2 rounded-[20px] bg-[#f8f5ff] p-4 text-sm">
              <div className="flex items-center justify-between"><span>Monthly payment</span><span className="font-semibold text-primary">₦{Number(result.monthly || 0).toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Total repayment</span><span className="font-semibold text-foreground">₦{Number(result.total || 0).toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Total interest</span><span className="font-semibold text-foreground">₦{Number(result.interest || 0).toLocaleString()}</span></div>
            </div>
            <button onClick={handleSave} className="mt-3 w-full rounded-2xl border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary">
              Save this plan
            </button>
          </section>
        ) : null}

        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  )
}
