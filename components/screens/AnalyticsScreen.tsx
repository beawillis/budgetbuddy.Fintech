'use client'

import { useApp } from '@/lib/AppContext'
import { TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react'

export default function AnalyticsScreen() {
  const { goals, walletBalance, monthlyIncome, monthlyExpense } = useApp()

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const completedGoals = goals.filter((g) => g.isCompleted).length
  const activeGoals = goals.filter((g) => !g.isCompleted).length
  const performanceScore = Math.round((totalSaved / totalTarget) * 100)

  const weeklyProgress = [
    { label: 'Week 1', value: 60 },
    { label: 'Week 2', value: 72 },
    { label: 'Week 3', value: 81 },
    { label: 'Week 4', value: 92 },
  ]

  const categoryData = [
    { name: 'Gadgets', amount: 750000, color: 'bg-violet-500' },
    { name: 'Travel', amount: 0, color: 'bg-sky-500' },
    { name: 'Education', amount: 300000, color: 'bg-emerald-500' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-muted-foreground">Your progress snapshot</p>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        </header>

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
              <p className="mt-1 text-sm text-muted-foreground">{activeGoals} active • {completedGoals} complete</p>
            </div>
            <div className="rounded-[20px] bg-[#f8f5ff] px-3 py-2 text-sm font-semibold text-primary">+12% vs last month</div>
          </div>
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
            <p className="text-sm font-semibold text-primary">₦{walletBalance.toLocaleString()}</p>
          </div>
          <div className="space-y-3">
            {categoryData.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className="font-semibold text-muted-foreground">₦{item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#f1f5f9]">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.amount ? Math.max(15, (item.amount / totalSaved) * 100) : 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Recent contributions</p>
            <button className="text-sm font-semibold text-primary">View all</button>
          </div>
          <div className="space-y-2">
            {[
              { title: 'Monthly income', amount: `+₦${monthlyIncome.toLocaleString()}`, date: 'Current month' },
              { title: 'Monthly expenses', amount: `-₦${monthlyExpense.toLocaleString()}`, date: 'Current month' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
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
