'use client'

import { useApp } from '@/lib/AppContext'
import { CheckCircle2 } from 'lucide-react'

export default function DepositSuccessScreen() {
  const { setScreen } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 mx-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Deposit Successful!</h1>
          <p className="text-muted-foreground mb-8">
            You&apos;ve added ₦110,000 towards your New MacBook Air goal.
          </p>

          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Current Progress</p>
            <p className="text-3xl font-bold text-primary">₦860,000</p>
            <p className="text-sm text-muted-foreground mt-1">of ₦1,000,000 saved</p>
            <div className="w-full bg-border rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '86%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">🎯 Just 8 days remaining!</p>
          </div>

          <button
            onClick={() => setScreen('dashboard')}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
