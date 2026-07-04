'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function CreateGoalScreen() {
  const { setScreen, addGoal } = useApp()
  const [goalName, setGoalName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')

  const icons = ['💻', '✈️', '🎓', '🏠', '🚗', '💍', '⌚', '📱']
  const categories = ['Gadgets', 'Travel', 'Education', 'Savings', 'Shopping', 'Entertainment', 'Health']
  const [selectedIcon, setSelectedIcon] = useState('💻')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateGoal = async () => {
    if (!goalName || !targetAmount || !dueDate || !category) return
    setLoading(true)
    setError('')
    try {
      const result = await api.createGoal({ name: goalName, target: Number(targetAmount), deadline: dueDate })
      addGoal({
        id: result._id || result.id || Date.now().toString(),
        name: goalName,
        targetAmount: Number(targetAmount),
        currentAmount: 0,
        category,
        dueDate,
        icon: selectedIcon,
        color: 'bg-blue-500',
        isCompleted: false,
      })
      setScreen('goalCreated')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create goal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create A New Goal</h1>
          <button onClick={() => setScreen('dashboard')} className="p-2">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Suggested Goals */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">Suggested For You</p>
          <div className="space-y-2">
            {['Emergency Fund', 'School Fees'].map(goal => (
              <button
                key={goal}
                onClick={() => setGoalName(goal)}
                className="w-full text-left p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <p className="text-sm font-semibold text-foreground">{goal}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Goal Name</label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., Summer Trip"
              className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Target Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">₦</span>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Target Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Goal Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {icons.map(icon => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`text-3xl p-3 rounded-lg border-2 transition-colors ${
                    selectedIcon === icon
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Financial Projection */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">💚</span>
              <div>
                <p className="font-semibold text-green-900">Financial Projection</p>
                <p className="text-sm text-green-700 mt-1">
                  To reach your goal by the deadline, you should save ₦{targetAmount ? Math.round(parseInt(targetAmount) / 12).toLocaleString() : '0'} monthly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setScreen('dashboard')}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleCreateGoal}
            disabled={loading || !goalName || !targetAmount || !dueDate || !category}
            className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating…' : 'Create Goal'}
          </button>
        </div>
      </div>
    </div>
  )
}
