'use client'

import { Bell, Wallet, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const user = {
    name: 'Temmiy',
    status: 'Good progress today. You&apos;re saving smart!',
  }

  const savingsGoal = {
    amount: '₦2,450,500',
    percentage: 78,
    text: '78% saved this month',
  }

  const quickActions = [
    { label: 'Quick Deposit', icon: '💰' },
    { label: 'Send Money', icon: '📤' },
    { label: 'Loan Tracker', icon: '📊' },
  ]

  const activeGoal = {
    name: 'New MacBook Air',
    amount: '₦750,000',
    target: '₦1,000,000',
    percentage: 75,
    daysRemaining: '5 days',
    date: 'June 15, 2026',
  }

  const dailyHabits = [
    {
      name: '7 Day Streak 🔥',
      description: 'You&apos;re on fire! Keep it up',
      status: 'active',
    },
    {
      name: 'Next Reminder',
      time: '6:00 PM',
      status: 'scheduled',
    },
  ]

  const recentActivity = [
    { name: 'Daily Habit Save', amount: '+₦2,500', date: 'Today, 8:30 AM', color: 'bg-blue-100' },
    { name: 'One-time Boost', amount: '+₦15,000', date: 'Yesterday, 2:15 PM', color: 'bg-blue-100' },
    { name: 'Groceries', amount: '-₦32,000', date: 'Oct 12, 2:20 PM', color: 'bg-blue-100' },
    { name: 'TV Console', amount: '-₦320,000', date: 'Oct 10, 2:35 PM', color: 'bg-blue-100' },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-6 flex items-center justify-between">
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-800 mb-1">💰 BudgetBuddy</div>
          <div className="text-gray-600 text-sm flex items-center gap-2">
            <span>Good morning {user.name}</span>
            <span>😊</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">{user.status}</div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={24} className="text-gray-600" />
        </button>
      </div>

      {/* 7 Day Break Badge */}
      <div className="bg-white px-6 pt-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 inline-block text-sm font-semibold text-orange-700">
          7 Day Break
        </div>
      </div>

      {/* Main Savings Card */}
      <div className="bg-white px-6 py-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-4">
          <div className="text-sm opacity-90 mb-1">Total Savings</div>
          <div className="text-3xl font-bold mb-4">{savingsGoal.amount}</div>
          <div className="text-xs opacity-75">{savingsGoal.text}</div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="flex-1 flex flex-col items-center justify-center py-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 hover:from-purple-200 hover:to-purple-100 transition-colors"
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Goal Section */}
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Active Goal</h3>
          <a href="#" className="text-purple-600 text-sm font-semibold">
            View All
          </a>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-800">📱 {activeGoal.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {activeGoal.amount} of {activeGoal.target}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{activeGoal.percentage}%</div>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${activeGoal.percentage}%` }} />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>📅 {activeGoal.date}</span>
            <span>⏱️ {activeGoal.daysRemaining}</span>
          </div>
        </div>
      </div>

      {/* Daily Habit */}
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Daily Habit</h3>
          <a href="#" className="text-purple-600 text-sm font-semibold">
            View Calendar
          </a>
        </div>

        <div className="space-y-3">
          {dailyHabits.map((habit, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{habit.name}</p>
                <p className="text-xs text-gray-500">{habit.description || habit.time}</p>
              </div>
              {habit.status === 'active' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
          <a href="#" className="text-purple-600 text-sm font-semibold">
            View All
          </a>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                  <Wallet size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{activity.name}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-800">{activity.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  )
}
