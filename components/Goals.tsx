'use client'

import { useState } from 'react'
import { ChevronLeft, Plus, ArrowRight } from 'lucide-react'

export default function Goals() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all')
  const [showCreateGoal, setShowCreateGoal] = useState(false)

  const goals = [
    {
      id: 1,
      name: 'New MacBook Air',
      icon: '📱',
      amount: '₦750,000',
      target: '₦1,000,000',
      percentage: 75,
      daysRemaining: '5 days remaining',
      date: 'June 15, 2026',
      status: 'active',
    },
    {
      id: 2,
      name: 'Dubai Trip',
      icon: '✈️',
      amount: '₦450,000',
      target: '₦600,000',
      percentage: 75,
      daysRemaining: '48 days remaining',
      date: 'Aug 20, 2026',
      status: 'active',
    },
    {
      id: 3,
      name: 'Master&apos;s Degree',
      icon: '🎓',
      amount: '₦1,200,000',
      target: '₦2,000,000',
      percentage: 60,
      daysRemaining: '128 days remaining',
      date: 'Dec 10, 2026',
      status: 'active',
    },
    {
      id: 4,
      name: 'Emergency Fund',
      icon: '🚨',
      amount: '₦500,000',
      target: '₦500,000',
      percentage: 100,
      date: 'Completed on May 24, 2026',
      status: 'completed',
    },
  ]

  const filteredGoals = goals.filter(g => {
    if (activeTab === 'active') return g.status === 'active'
    if (activeTab === 'completed') return g.status === 'completed'
    return true
  })

  if (showCreateGoal) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-6 sticky top-0 border-b border-gray-200">
          <button
            onClick={() => setShowCreateGoal(false)}
            className="flex items-center gap-2 text-purple-600 font-semibold mb-4"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Create a New Goal</h1>
          <p className="text-sm text-gray-600 mt-1">Plant your future</p>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-8 text-center text-white mb-6">
            <p className="text-sm opacity-90">Plant your future</p>
            <p className="text-2xl font-bold mt-2">Your new goal starts here.</p>
            <div className="w-20 h-20 bg-yellow-300 rounded-full mx-auto mt-4 flex items-center justify-center">
              <span className="text-4xl">🌱</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
              <input
                type="text"
                placeholder="e.g., Summer Trip"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-600">₦</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-semibold text-green-800 text-sm">Financial Projection</p>
                <p className="text-xs text-green-700 mt-1">
                  To reach your goal by the deadline, you should save ₦32,000 monthly. We&apos;ll help you stay on track!
                </p>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Create Goal
            </button>

            <button className="w-full text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Goals</h1>
          <button
            onClick={() => setShowCreateGoal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-600">Stay focused. Slow consistent. Achieve more.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-4 flex gap-4 border-b border-gray-200">
        {(['all', 'active', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold transition-colors capitalize ${
              activeTab === tab
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'all' ? 'All Goals' : tab === 'active' ? 'Active' : 'Completed'}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {filteredGoals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No goals found</p>
          </div>
        ) : (
          filteredGoals.map(goal => (
            <div
              key={goal.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{goal.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{goal.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{goal.percentage}%</p>
                  {goal.status === 'completed' && (
                    <span className="text-xs font-semibold text-green-600">Completed</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{goal.amount}</span>
                  <span className="text-gray-400 text-xs">{goal.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      goal.status === 'completed' ? 'bg-green-500' : 'bg-purple-600'
                    }`}
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
                {goal.status === 'active' && (
                  <p className="text-xs text-gray-500">📅 {goal.daysRemaining}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="h-8" />
    </div>
  )
}
