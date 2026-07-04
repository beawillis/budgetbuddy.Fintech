'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { ArrowUpRight, Download, FileText, Mail, RefreshCw, Sparkles, TrendingUp } from 'lucide-react'

type ReportPeriod = 'weekly' | 'monthly' | 'yearly'

function readNumber(source: Record<string, unknown> | null, keys: string[], fallback = 0) {
  if (!source) return fallback

  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value)
  }

  return fallback
}

export default function AnalyticsScreen() {
  const { goals, walletBalance, monthlyIncome, monthlyExpense, transactions } = useApp()
  const [period, setPeriod] = useState<ReportPeriod>('monthly')
  const [report, setReport] = useState<Record<string, unknown> | null>(null)
  const [loadingReport, setLoadingReport] = useState(false)
  const [reportError, setReportError] = useState('')
  const [actionStatus, setActionStatus] = useState('')
  const [actionLoading, setActionLoading] = useState<'pdf' | 'email' | null>(null)

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const completedGoals = goals.filter((g) => g.isCompleted).length
  const activeGoals = goals.filter((g) => !g.isCompleted).length
  const performanceScore = totalTarget ? Math.round((totalSaved / totalTarget) * 100) : 0

  const reportIncome = readNumber(report, ['income', 'monthlyIncome', 'totalIncome'], monthlyIncome)
  const reportExpense = readNumber(report, ['expense', 'monthlyExpense', 'totalExpense'], monthlyExpense)
  const reportSavings = readNumber(report, ['savings', 'totalSaved', 'balance'], totalSaved || walletBalance)
  const reportTransactions = readNumber(report, ['transactionCount', 'transactionsCount', 'totalTransactions'], transactions.length)

  const weeklyProgress = useMemo(() => {
    const raw = report?.weeklyProgress || report?.progress
    if (Array.isArray(raw)) {
      return raw.slice(0, 4).map((item, index) => {
        if (typeof item === 'number') return { label: `Week ${index + 1}`, value: Math.min(100, Math.max(0, item)) }
        if (item && typeof item === 'object') {
          const record = item as Record<string, unknown>
          return {
            label: String(record.label || record.week || `Week ${index + 1}`),
            value: Math.min(100, Math.max(0, Number(record.value || record.percentage || 0))),
          }
        }
        return { label: `Week ${index + 1}`, value: 0 }
      })
    }

    return [
      { label: 'Week 1', value: Math.min(100, Math.max(10, performanceScore - 24)) },
      { label: 'Week 2', value: Math.min(100, Math.max(20, performanceScore - 12)) },
      { label: 'Week 3', value: Math.min(100, Math.max(30, performanceScore - 6)) },
      { label: 'Week 4', value: Math.min(100, Math.max(40, performanceScore)) },
    ]
  }, [performanceScore, report])

  const categoryData = useMemo(() => {
    const totals = goals.reduce<Record<string, number>>((acc, goal) => {
      acc[goal.category] = (acc[goal.category] || 0) + goal.currentAmount
      return acc
    }, {})

    const colors = ['bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500']
    const entries = Object.entries(totals)

    if (!entries.length) {
      return [{ name: 'Savings', amount: reportSavings, color: colors[0] }]
    }

    return entries.map(([name, amount], index) => ({
      name,
      amount,
      color: colors[index % colors.length],
    }))
  }, [goals, reportSavings])

  const loadReport = useCallback(async () => {
    setLoadingReport(true)
    setReportError('')

    try {
      const data = await api.getReportSummary(period)
      setReport(data && typeof data === 'object' ? data : null)
    } catch (err) {
      setReport(null)
      setReportError(err instanceof Error ? err.message : 'Unable to load report')
    } finally {
      setLoadingReport(false)
    }
  }, [period])

  const handleDownloadPdf = async () => {
    setActionLoading('pdf')
    setActionStatus('')

    try {
      const blob = await api.downloadReportPdf(period)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `budgetbuddy-${period}-report.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      setActionStatus('PDF report downloaded.')
    } catch (err) {
      setActionStatus(err instanceof Error ? err.message : 'Unable to download PDF report.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleEmailReport = async () => {
    setActionLoading('email')
    setActionStatus('')

    try {
      const result = await api.emailReport(period)
      setActionStatus(result?.message || 'Report sent to your email.')
    } catch (err) {
      setActionStatus(err instanceof Error ? err.message : 'Unable to email report.')
    } finally {
      setActionLoading(null)
    }
  }

  useEffect(() => {
    void loadReport()
  }, [loadReport])

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Your progress snapshot</p>
              <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
            </div>
            <button
              onClick={loadReport}
              disabled={loadingReport}
              className="rounded-full bg-[#f2ebff] p-2.5 text-primary disabled:opacity-60"
              aria-label="Refresh report"
            >
              <RefreshCw size={18} className={loadingReport ? 'animate-spin' : ''} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#f8fafc] p-1">
            {(['weekly', 'monthly', 'yearly'] as ReportPeriod[]).map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold capitalize transition-colors ${
                  period === item ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Report actions</p>
              <p className="text-xs text-muted-foreground">Download a PDF or send it by email</p>
            </div>
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <FileText size={16} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={actionLoading !== null}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              <Download size={16} />
              {actionLoading === 'pdf' ? 'Preparing' : 'PDF'}
            </button>
            <button
              onClick={handleEmailReport}
              disabled={actionLoading !== null}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-[#f8fafc] px-3 py-3 text-sm font-semibold text-foreground disabled:opacity-60"
            >
              <Mail size={16} />
              {actionLoading === 'email' ? 'Sending' : 'Email'}
            </button>
          </div>
          {actionStatus ? <p className="mt-3 text-sm text-muted-foreground">{actionStatus}</p> : null}
          {reportError ? <p className="mt-3 text-sm text-red-600">{reportError}</p> : null}
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Overall performance</p>
              <p className="text-xs text-muted-foreground">Consistency is paying off</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-semibold text-foreground">{performanceScore}%</p>
              <p className="mt-1 text-sm text-muted-foreground">{activeGoals} active / {completedGoals} complete</p>
            </div>
            <div className="rounded-[20px] bg-[#f8f5ff] px-3 py-2 text-sm font-semibold text-primary">{reportTransactions} txns</div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {[
            { label: 'Income', value: reportIncome, tone: 'text-emerald-600' },
            { label: 'Expenses', value: reportExpense, tone: 'text-rose-600' },
            { label: 'Saved', value: reportSavings, tone: 'text-primary' },
          ].map((item) => (
            <div key={item.label} className="rounded-[22px] border border-border bg-white p-3 text-center shadow-sm">
              <p className="text-[11px] font-semibold text-muted-foreground">{item.label}</p>
              <p className={`mt-1 text-sm font-semibold ${item.tone}`}>NGN {item.value.toLocaleString()}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Weekly progress</p>
            <div className="flex items-center gap-1 text-sm font-semibold text-primary">
              <Sparkles size={14} />
              <span>On track</span>
            </div>
          </div>
          <div className="space-y-3">
            {weeklyProgress.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-semibold text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#f1f5f9]">
                  <div className="h-2.5 rounded-full bg-primary" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Goal allocation</p>
            <p className="text-sm font-semibold text-primary">NGN {walletBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-3">
            {categoryData.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className="font-semibold text-muted-foreground">NGN {item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#f1f5f9]">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.amount ? Math.max(15, (item.amount / Math.max(totalSaved, 1)) * 100) : 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Report totals</p>
            <button onClick={loadReport} className="text-sm font-semibold text-primary">Refresh</button>
          </div>
          <div className="space-y-2">
            {[
              { title: 'Income', amount: `+NGN ${reportIncome.toLocaleString()}`, date: `${period} report` },
              { title: 'Expenses', amount: `-NGN ${reportExpense.toLocaleString()}`, date: `${period} report` },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs capitalize text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  {item.amount}
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
