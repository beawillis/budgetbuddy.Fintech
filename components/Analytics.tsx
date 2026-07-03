'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

export default function Analytics() {
  const stats = [
    { label: 'Total Goals', value: '4', icon: '🎯' },
    { label: 'Total Target Value', value: '₦3,245', icon: '💰', subtext: 'Across all goals' },
  ]

  const performance = {
    score: 85,
    trend: '+24.8%',
    trendText: 'Since last month',
  }

  const habitsScore = {
    label: 'Habit Score',
    value: 85,
    color: 'text-green-600',
  }

  const weeklyData = [
    { day: 'Mon', value: 45, max: 100 },
    { day: 'Tue', value: 62, max: 100 },
    { day: 'Wed', value: 38, max: 100 },
    { day: 'Thu', value: 75, max: 100 },
    { day: 'Fri', value: 50, max: 100 },
    { day: 'Sat', value: 88, max: 100 },
    { day: 'Sun', value: 65, max: 100 },
  ]

  const goalCategories = [
    { name: 'Travel', amount: '₦450,000', percentage: 35, color: 'bg-purple-600' },
    { name: 'Education', amount: '₦1,200,000', percentage: 45, color: 'bg-blue-600' },
    { name: 'Emergency Fund', amount: '₦500,000', percentage: 20, color: 'bg-green-600' },
  ]

  const contributionHistory = [
    { name: 'Daily Habit Save', amount: '+₦2,500', date: 'Today, 8:30 AM' },
    { name: 'John Doe', amount: '+₦15,000', date: 'Yesterday, 2:15 PM' },
    { name: 'Weekly Goal Boost', amount: '+₦8,000', date: 'Oct 11, 9:45 AM' },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Financial Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">Your savings at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="p-6 space-y-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            {stat.subtext && <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>}
          </div>
        ))}
      </div>

      {/* Performance Card */}
      <div className="px-6 pb-4">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-2">Your Performance</p>
              <p className="text-4xl font-bold">{performance.score}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 bg-green-400 bg-opacity-20 px-2 py-1 rounded-lg">
                <ArrowUp size={16} />
                <span className="text-sm font-semibold">{performance.trend}</span>
              </div>
              <p className="text-xs opacity-75 mt-2">{performance.trendText}</p>
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${performance.score}%` }} />
          </div>
        </div>
      </div>

      {/* Habit Score */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{habitsScore.label}</h3>
            <p className={`text-3xl font-bold ${habitsScore.color}`}>{habitsScore.value}</p>
          </div>
          <p className="text-sm text-gray-600">You&apos;re consistent with your saving habits</p>
        </div>
      </div>

      {/* Weekly Habits Chart */}
      <div className="px-6 pb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Weekly Habits</h3>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-end justify-around h-32 gap-2 mb-4">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg" style={{ height: '100px', maxHeight: `${(data.value / data.max) * 100}px` }}>
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all"
                      style={{ height: `${(data.value / data.max) * 100}px` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{data.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Categories */}
      <div className="px-6 pb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Goal Categories</h3>
        <div className="space-y-3">
          {goalCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-800">{category.name}</p>
                <p className="text-sm font-semibold text-gray-600">{category.amount}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${category.color} h-2 rounded-full`} style={{ width: `${category.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Contributions */}
      <div className="px-6 pb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Contributions</h3>
        <div className="space-y-3">
          {contributionHistory.map((contribution, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-800 text-sm">{contribution.name}</p>
                <p className="text-xs text-gray-500">{contribution.date}</p>
              </div>
              <p className="font-semibold text-green-600">{contribution.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  )
}
