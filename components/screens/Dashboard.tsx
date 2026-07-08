'use client'

import Image from 'next/image'
import { useApp } from '@/lib/AppContext'
import { getTimeBasedGreeting, getTimeEmoji } from '@/lib/greetings'
import { ArrowUpRight, Bell, Clock, PiggyBank, Sparkles, Target, Wallet } from 'lucide-react'

export default function Dashboard() {
  const { setScreen, transactions, goals, user, walletBalance, monthlyIncome, monthlyExpense } = useApp()
  const greeting = getTimeBasedGreeting(user?.name)

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const savingsPercentage =
  totalTarget > 0
    ? Math.min(100, Math.round((totalSaved / totalTarget) * 100))
    : 0
  const activeGoal = goals.find((goal) => !goal.isCompleted) || goals[0] || null

  const quickActions = [
    { label: 'Deposit', icon: '💰', onClick: () => setScreen('newDeposit') },
    { label: 'Goals', icon: '🎯', onClick: () => setScreen('goals') },
    { label: 'Activity', icon: 'TX', onClick: () => setScreen('transactions') },
    { label: 'Analytics', icon: '📈', onClick: () => setScreen('analytics') },
    { label: 'Savings', icon: '🏦', onClick: () => setScreen('savings') },
    { label: 'Challenge', icon: '🏁', onClick: () => setScreen('challenge') },
    { label: 'Emergency', icon: '🛟', onClick: () => setScreen('emergency') },
    { label: 'Loans', icon: '💳', onClick: () => setScreen('loans') },
    { label: 'Invest', icon: '📈', onClick: () => setScreen('investments') },
    { label: 'Assistant', icon: '🤖', onClick: () => setScreen('assistant') },
  ]

  const recentActivity = transactions.slice(0, 3)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-4 pb-24">
      <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-purple-200 bg-white shadow-sm">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <Image src="/logo.png" alt="BudgetBuddy logo" width={40} height={40} className="h-full w-full object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{greeting}</p>
              <h1 className="text-2xl font-semibold text-foreground">BudgetBuddy</h1>
            </div>
          </div>
          <button onClick={() => setScreen('notifications')} className="rounded-full bg-[#f2ebff] p-2.5 text-primary">
            <Bell size={20} />
          </button>
        </div>
      </header>

      <section className="rounded-[28px] bg-linear-to-br from-[#7c3aed] via-[#6d28d9] to-[#4c1d95] p-5 text-white shadow-xl shadow-purple-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-white/80">Total savings</p>
            <p className="mt-2 text-3xl font-semibold">₦{walletBalance.toLocaleString()}</p>
          </div>
          <div className="rounded-full bg-white/15 p-2.5">
            <PiggyBank size={18} />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm text-white/90">
          <Sparkles size={16} />
          {savingsPercentage}% of your monthly goal is already saved
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Saved this month</p>
            <p className="mt-1 text-sm font-semibold">₦{monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Daily streak</p>
            <p className="mt-1 text-sm font-semibold">{goals.filter((goal) => goal.isCompleted).length} goals</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Goal progress</p>
            <p className="mt-1 text-sm font-semibold">{savingsPercentage}%</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2">
        {quickActions.map((action) => (
          <button key={action.label} onClick={action.onClick} className="rounded-[22px] border border-border bg-white p-3 text-center shadow-sm">
            <div className="mb-2 flex justify-center text-xl">{action.icon}</div>
            <p className="text-xs font-semibold text-foreground">{action.label}</p>
          </button>
        ))}
      </section>

      <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Active goal</p>
            <p className="text-xs text-muted-foreground">{activeGoal?.name || 'No active goal'}</p>
          </div>
          <button onClick={() => setScreen('goals')} className="text-sm font-semibold text-primary">
            View all
          </button>
        </div>
        <div className="rounded-[22px] bg-[#f8f5ff] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Target size={16} />
              </div>
              <div>
                <p className="font-semibold text-foreground">₦{(activeGoal?.currentAmount || 0).toLocaleString()} of ₦{(activeGoal?.targetAmount || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Due {activeGoal ? new Date(activeGoal.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'soon'}</p>
              </div>
            </div>
             <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
  {Math.min(
    100,
    Math.round(
      ((activeGoal?.currentAmount || 0) /
        Math.max(activeGoal?.targetAmount || 1, 1)) *
        100
    )
  )}%
</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white">
            <div className="h-2.5 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, Math.round(((activeGoal?.currentAmount || 0) / Math.max(activeGoal?.targetAmount || 1, 1)) * 100))}%` }} />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Today&apos;s focus</p>
          <span className="text-xs font-semibold text-primary">7 day streak</span>
        </div>
        <div className="flex items-center justify-between rounded-[20px] bg-[#f8fafc] p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2 text-amber-600">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Next Reminder</p>
              <p className="text-xs text-muted-foreground">{monthlyExpense > 0 ? `Review your spending • ₦${Math.round(monthlyExpense / 10).toLocaleString()}` : 'Keep your streak alive'}</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-primary">Set</button>
        </div>
      </section>

      <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Recent activity</p>
          <button onClick={() => setScreen('transactions')} className="text-sm font-semibold text-primary">
            View all
          </button>
        </div>
        <div className="space-y-2">
          {recentActivity.length === 0 && (
  <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
    No recent transactions yet.
  </div>
)}
          {recentActivity.map((item) => (
  <div
    key={item.id}
    className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-4 py-3 hover:bg-[#f3f4f6] transition"
  >
    <div className="flex items-center gap-3">
      <div
        className={`rounded-full p-3 ${
          item.type === 'deposit'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
        }`}
      >
        {item.type === 'deposit' ? (
          <PiggyBank size={18} />
        ) : (
          <Wallet size={18} />
        )}
      </div>

      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="text-xs text-gray-500">{item.date}</p>
      </div>
    </div>

    <div className="text-right">
      <p
        className={`font-bold ${
          item.type === 'deposit'
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {item.type === 'deposit' ? '+' : '-'}₦
        {item.amount.toLocaleString()}
      </p>

      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
        Completed
      </span>
    </div>
  </div>
))}
            
        </div>
      </section>
      <section className="rounded-[28px] bg-gradient-to-r from-indigo-500 to-blue-600 p-5 text-white shadow-sm">
  <div className="flex items-center gap-3">
    <div className="rounded-full bg-white/20 p-2">
      <Sparkles size={18} />
    </div>

    <div>
      <h3 className="font-semibold">AI Financial Insight</h3>
      <p className="mt-1 text-sm text-white/90">
        Great job! You have saved {savingsPercentage}% of your target.
        Keep saving consistently to achieve your financial goal.
      </p>
    </div>
  </div>
</section>
    </div>
  )
}
