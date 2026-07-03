'use client'

import { useApp } from '@/lib/AppContext'
import { ChevronLeft, TrendingUp } from 'lucide-react'

export default function SaveMoreScreen() {
  const { setScreen } = useApp()

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
          Boost your progress towards your New MacBook Air goal.
        </p>

        <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">New MacBook Air</h2>
          <p className="text-sm text-muted-foreground mb-4">Gadgets</p>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Current Progress</p>
              <p className="font-bold text-foreground">75%</p>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ₦750,000 of ₦1,000,000 saved
            </p>
          </div>

          <p className="text-xs text-purple-700">🏁 5 days remaining to reach your goal!</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-2 text-sm">Quick Save</h3>
            <div className="grid grid-cols-3 gap-2">
              {['₦50K', '₦100K', '₦250K'].map(amount => (
                <button
                  key={amount}
                  onClick={() => setScreen('reviewDeposit')}
                  className="py-2 px-3 bg-white border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-3 text-sm">Custom Amount</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">₦</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setScreen('reviewDeposit')}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 mb-3"
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
