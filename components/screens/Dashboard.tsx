'use client'

import { useApp } from '@/lib/AppContext'
import { Bell, ArrowUpRight, Zap, TrendingDown, Flame, Clock } from 'lucide-react'

export default function Dashboard() {
  const { setScreen, transactions, goals, user } = useApp()

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const savingsPercentage = Math.round((totalSaved / totalTarget) * 100) || 0

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-muted-foreground">Good morning</h2>
            <h1 className="text-2xl font-bold text-foreground">Tennyson 👋</h1>
          </div>
          <button
            onClick={() => setScreen('notifications')}
            className="p-3 bg-secondary rounded-full relative hover:bg-opacity-80"
          >
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* 7 Day Streak */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="font-bold text-foreground">7 Day Break</p>
              <p className="text-sm text-muted-foreground">Great efforts today! Do it tomorrow</p>
            </div>
          </div>
        </div>

        {/* Savings Overview Card */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full opacity-20 -mr-20 -mt-20" />
          <div className="relative z-10">
            <p className="text-sm opacity-90 mb-2">Total Savings</p>
            <h3 className="text-4xl font-bold mb-4">₦2,450,500</h3>
            <p className="text-sm opacity-75">12% vs last month</p>
          </div>
          <div className="absolute bottom-4 right-6">
            <div className="w-16 h-16 bg-purple-500 rounded-full opacity-10" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setScreen('newDeposit')}
            className="bg-white border border-border rounded-lg p-4 text-center hover:bg-secondary transition-colors"
          >
            <div className="text-2xl mb-2">💰</div>
            <p className="text-xs font-semibold text-foreground">Quick Deposit</p>
          </button>
          <button className="bg-white border border-border rounded-lg p-4 text-center hover:bg-secondary transition-colors">
            <div className="text-2xl mb-2">💸</div>
            <p className="text-xs font-semibold text-foreground">Send Money</p>
          </button>
          <button className="bg-white border border-border rounded-lg p-4 text-center hover:bg-secondary transition-colors">
            <div className="text-2xl mb-2">🏦</div>
            <p className="text-xs font-semibold text-foreground">Loan Tracker</p>
          </button>
        </div>

        {/* Active Goal */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Active Goal</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>

          {goals.filter(g => !g.isCompleted).length > 0 && (
            <div className="bg-white border border-border rounded-xl p-4">
              {goals
                .filter(g => !g.isCompleted)
                .slice(0, 1)
                .map(goal => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100
                  return (
                    <div key={goal.id}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-2xl mb-1">{goal.icon}</p>
                          <h4 className="font-bold text-foreground">{goal.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            ₦{goal.currentAmount.toLocaleString()} of ₦{goal.targetAmount.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                      <div className="w-full bg-border rounded-full h-2 mb-3">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        📅 Jun 15, 2026 • 🏁 5 days remaining
                      </p>
                    </div>
                  )
                })}
            </div>
          )}
        </div>

        {/* Daily Habit */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Daily Habit</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View Calendar</button>
          </div>

          <div className="space-y-2">
            <div className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="text-orange-500" size={20} />
                <div>
                  <p className="font-semibold text-foreground">7 Day Streak 🔥</p>
                  <p className="text-xs text-muted-foreground">You&apos;re on fire! Keep it up</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-purple-500" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Next Reminder</p>
                  <p className="text-xs text-muted-foreground">6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Recent Activity</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 4).map(transaction => (
              <div key={transaction.id} className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div>
                    <p className="font-semibold text-foreground">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-bold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-foreground'}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
