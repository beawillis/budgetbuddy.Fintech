'use client'

import { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { ChevronLeft, TrendingUp } from 'lucide-react'

export default function SaveMoreScreen() {
  const { setScreen, goals, currentGoal, setPendingDeposit } = useApp()
  const goal = currentGoal || goals.find((item) => !item.isCompleted) || goals[0] || null
  const [amount, setAmount] = useState('')
  const progress = goal?.targetAmount ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100)) : 0

  const startReview = (nextAmount: number) => {
    if (!goal || !Number.isFinite(nextAmount) || nextAmount <= 0) return

    setPendingDeposit({
      goalId: goal.id,
      backendGoalId: goal._id || goal.id,
      goalName: goal.name,
      amount: nextAmount,
      currentAmount: goal.currentAmount,
      targetAmount: goal.targetAmount,
    })
    setScreen('reviewDeposit')
  }

  if (!goal) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
          <h1 className="text-2xl font-bold text-foreground">Save More</h1>
          <p className="mt-3 text-muted-foreground">Create a goal before adding a deposit.</p>
          <button onClick={() => setScreen('createGoal')} className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold">
            Create goal
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setScreen('goals')} className="p-2">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Save More</h1>
        </div>

        <p className="text-muted-foreground mb-6">
          Boost your progress towards your {goal.name} goal.
        </p>

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{goal.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{goal.category}</p>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Current Progress</p>
              <p className="font-bold text-foreground">{progress}%</p>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              NGN {goal.currentAmount.toLocaleString()} of NGN {goal.targetAmount.toLocaleString()} saved
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-700">
            <TrendingUp size={14} />
            <span>{Math.max(goal.targetAmount - goal.currentAmount, 0).toLocaleString()} remaining</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-2 text-sm">Quick Save</h3>
            <div className="grid grid-cols-3 gap-2">
              {[50000, 100000, 250000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => startReview(quickAmount)}
                  className="py-2 px-3 bg-white border border-border rounded-lg text-sm font-semibold text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  NGN {(quickAmount / 1000).toFixed(0)}K
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-3 text-sm">Custom Amount</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">NGN</span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full pl-14 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => startReview(Number(amount))}
          disabled={!amount || Number(amount) <= 0}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 mb-3 disabled:opacity-50"
        >
          Continue
        </button>
        <button
          onClick={() => setScreen('goals')}
          className="w-full text-center text-primary font-semibold hover:underline"
        >
          Back to Goals
        </button>
      </div>
    </div>
  )
}
