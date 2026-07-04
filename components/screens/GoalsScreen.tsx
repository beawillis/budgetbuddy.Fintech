'use client'

import { useApp } from '@/lib/AppContext'
import { useState } from 'react'
import { Plus, Sparkles, Target, ChevronRight } from 'lucide-react'

export default function GoalsScreen() {
  const { setScreen, goals } = useApp()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredGoals = goals.filter((goal) => {
    if (filter === 'active') return !goal.isCompleted
    if (filter === 'completed') return goal.isCompleted
    return true
  })

  const totalGoals = goals.length
  const totalTargetValue = goals.reduce((sum, g) => sum + g.targetAmount, 0)

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Your savings plan</p>
              <h1 className="text-2xl font-semibold text-foreground">My goals</h1>
            </div>
            <button onClick={() => setScreen('createGoal')} className="rounded-full bg-primary p-2.5 text-white shadow-lg shadow-purple-200">
              <Plus size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[20px] bg-[#f8f5ff] p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total goals</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{totalGoals}</p>
            </div>
            <div className="rounded-[20px] bg-[#f8f5ff] p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Target value</p>
              <p className="mt-1 text-xl font-semibold text-foreground">₦{(totalTargetValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                  filter === f ? 'bg-primary text-white shadow-sm' : 'bg-[#f8fafc] text-muted-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-3">
          {filteredGoals.length === 0 ? (
            <div className="rounded-[28px] border border-border bg-white p-6 text-center shadow-sm">
              <div className="mb-3 flex justify-center text-3xl text-primary">
                <Sparkles size={24} />
              </div>
              <p className="text-base font-semibold text-foreground">No {filter === 'all' ? '' : filter} goals yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Create your first goal and keep your savings on track.</p>
              <button onClick={() => setScreen('createGoal')} className="mt-4 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
                Create a goal
              </button>
            </div>
          ) : (
            filteredGoals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              return (
                <div key={goal.id} className="rounded-[24px] border border-border bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-[#f8f5ff] p-2 text-xl">{goal.icon}</div>
                      <div>
                        <p className="font-semibold text-foreground">{goal.name}</p>
                        <p className="text-xs text-muted-foreground">{goal.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{Math.round(progress)}%</p>
                      <p className="text-[11px] text-muted-foreground">Complete</p>
                    </div>
                  </div>

                  <div className="mb-3 h-2.5 w-full rounded-full bg-[#f1f5f9]">
                    <div className={`h-2.5 rounded-full ${goal.isCompleted ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>

                  <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>₦{goal.currentAmount.toLocaleString()} saved</span>
                    <span>Goal ₦{goal.targetAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target size={14} />
                      <span>Due {new Date(goal.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <button onClick={() => setScreen('saveMore')} className="flex items-center gap-1 text-sm font-semibold text-primary">
                      Save more <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
