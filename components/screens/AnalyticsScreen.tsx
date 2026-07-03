'use client'

import { useApp } from '@/lib/AppContext'
import { TrendingUp, Activity } from 'lucide-react'

export default function AnalyticsScreen() {
  const { goals, transactions } = useApp()

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const completedGoals = goals.filter(g => g.isCompleted).length
  const activeGoals = goals.filter(g => !g.isCompleted).length

  const categoryData = [
    { name: 'Gadgets', amount: 750000, color: 'bg-blue-500' },
    { name: 'Travel', amount: 0, color: 'bg-purple-500' },
    { name: 'Education', amount: 300000, color: 'bg-green-500' },
    { name: 'Savings', amount: 500000, color: 'bg-green-600' },
  ]

  const performanceScore = Math.round((totalSaved / totalTarget) * 100)

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10 px-6 py-5">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-7 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-3 font-medium">Total Goals</p>
            <p className="text-3xl font-bold text-foreground">{goals.length}</p>
            <p className="text-xs text-muted-foreground mt-3">
              {activeGoals} active • {completedGoals} completed
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-3 font-medium">Total Target Value</p>
            <p className="text-3xl font-bold text-foreground">₦{(totalTarget / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground mt-3">All goals combined</p>
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-white border border-border rounded-xl p-6">
          <p className="text-xs text-muted-foreground mb-4 font-medium tracking-wide">Overall Performance</p>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-5xl font-bold text-foreground">{performanceScore}%</h3>
            <TrendingUp className="text-green-500" size={36} />
          </div>
          <p className="text-sm text-green-600 font-semibold">
            ↑ {Math.round((totalSaved / totalTarget) * 100 - 50)}% vs last period
          </p>
        </div>

        {/* Habit Score */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 font-semibold mb-2 tracking-wide">Habit Score</p>
              <h3 className="text-5xl font-bold text-purple-900">85</h3>
              <p className="text-xs text-purple-600 mt-3">Excellent streak consistency</p>
            </div>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-purple-300">
              <span className="text-3xl font-bold text-purple-900">85</span>
            </div>
          </div>
        </div>

        {/* Goal Progress Chart */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg text-foreground mb-5">Savings Progress</h3>
          <div className="space-y-3">
            {[
              { label: 'Week 1', value: 60, color: 'bg-blue-500' },
              { label: 'Week 2', value: 70, color: 'bg-indigo-500' },
              { label: 'Week 3', value: 75, color: 'bg-purple-500' },
              { label: 'Week 4', value: 85, color: 'bg-pink-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}%</p>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Categories Breakdown */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-4">Goal Categories</h3>
          <div className="space-y-4">
            {categoryData.map((category, i) => {
              const percentage = (category.amount / totalSaved) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <p className="text-sm text-foreground">{category.name}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      ₦{category.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${percentage || 5}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Contributions */}
        <div className="bg-white border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-4">Recent Contributions</h3>
          <div className="space-y-3">
            {[
              { title: 'Daily Habit Save', date: 'Today, 9:30 AM', amount: '+₦12,500' },
              { title: 'One-time Boost', date: 'Yesterday, 7:15 PM', amount: '+₦15,000' },
              { title: 'Weekly Bonus', date: 'Oct 10, 3:45 PM', amount: '+₦25,000' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <p className="text-sm font-bold text-green-500">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
