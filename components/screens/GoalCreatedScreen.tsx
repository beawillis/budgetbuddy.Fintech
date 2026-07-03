'use client'

import { useApp } from '@/lib/AppContext'
import { CheckCircle2 } from 'lucide-react'

export default function GoalCreatedScreen() {
  const { setScreen } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 mx-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Goal Created Successfully! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            Start saving towards your New MacBook Air goal. Track your progress with insights.
          </p>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Goal Details</p>
            <p className="text-lg font-bold text-foreground">New MacBook Air</p>
            <p className="text-sm text-muted-foreground mt-1">₦750,000 of ₦1,000,000 saved</p>
            <div className="w-full bg-border rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <button
            onClick={() => {
              setScreen('dashboard')
            }}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 mb-3"
          >
            View My Goal
          </button>
          <button
            onClick={() => setScreen('dashboard')}
            className="w-full text-center text-primary font-semibold hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
