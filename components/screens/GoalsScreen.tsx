'use client'

import { useApp } from '@/lib/AppContext'
import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'

export default function GoalsScreen() {
  const { setScreen, goals } = useApp()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.isCompleted
    if (filter === 'completed') return goal.isCompleted
    return true
  })

  const totalGoals = goals.length
  const totalTargetValue = goals.reduce((sum, g) => sum + g.targetAmount, 0)

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">My Goals</h1>
            <button
              onClick={() => setScreen('createGoal')}
              className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Goals</p>
              <p className="text-xl font-bold text-foreground">{totalGoals}</p>
              <p className="text-xs text-muted-foreground mt-1">3 active • 1 completed</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Target Value</p>
              <p className="text-xl font-bold text-foreground">₦{(totalTargetValue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground mt-1">All goals combined</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-opacity-80'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="px-6 py-6 space-y-4">
        {filteredGoals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No {filter === 'all' ? '' : filter} goals yet</p>
            <button
              onClick={() => setScreen('createGoal')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          filteredGoals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100
            return (
              <div
                key={goal.id}
                className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setScreen('goalCreated')
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-3xl">{goal.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{goal.name}</h3>
                        {goal.isCompleted && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">📌 {goal.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
                    <p className="text-xs text-muted-foreground">Complete</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-border rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      goal.isCompleted ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                {/* Amount Info */}
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">
                    ₦{goal.currentAmount.toLocaleString()} / ₦{goal.targetAmount.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    {new Date(goal.dueDate).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>

                {!goal.isCompleted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setScreen('saveMore')
                    }}
                    className="mt-3 w-full text-primary text-sm font-semibold hover:underline"
                  >
                    + Save More
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
