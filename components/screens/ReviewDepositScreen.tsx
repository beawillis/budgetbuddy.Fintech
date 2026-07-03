'use client'

import { useApp } from '@/lib/AppContext'
import { ChevronLeft } from 'lucide-react'

export default function ReviewDepositScreen() {
  const { setScreen } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setScreen('newDeposit')} className="p-2">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Review Deposit</h1>
        </div>

        <p className="text-muted-foreground mb-6">
          Please review your savings details before confirming.
        </p>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white mb-6">
          <p className="text-sm opacity-90 mb-2">Contribution</p>
          <h2 className="text-5xl font-bold mb-4">₦110,000</h2>

          <div className="space-y-3 bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Saving Towards</span>
              <span>New MacBook Air</span>
            </div>
            <div className="border-t border-white border-opacity-20" />
            <div className="flex items-center justify-between text-sm">
              <span>Current Progress</span>
              <span>75% Completed</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-4 mb-6">
          <h3 className="font-bold text-foreground mb-3">Progress Preview</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Progress</span>
              <span className="font-bold text-foreground">₦750,000</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">After Contribution</span>
              <span className="font-bold text-foreground">₦860,000</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '86%' }} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setScreen('newDeposit')}
            className="flex-1 py-3 px-4 border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => setScreen('depositSuccess')}
            className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors"
          >
            Confirm Deposit
          </button>
        </div>

        <button onClick={() => setScreen('dashboard')} className="w-full text-center text-primary font-semibold hover:underline">
          Cancel
        </button>
      </div>
    </div>
  )
}
