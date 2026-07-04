'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { useApp } from '@/lib/AppContext'
import { ChevronLeft } from 'lucide-react'

export default function ReviewDepositScreen() {
  const { setScreen, pendingDeposit, setPendingDeposit, refreshData } = useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentAmount = pendingDeposit?.currentAmount || 0
  const targetAmount = pendingDeposit?.targetAmount || 0
  const depositAmount = pendingDeposit?.amount || 0
  const nextAmount = currentAmount + depositAmount
  const currentProgress = targetAmount ? Math.min(100, Math.round((currentAmount / targetAmount) * 100)) : 0
  const nextProgress = targetAmount ? Math.min(100, Math.round((nextAmount / targetAmount) * 100)) : 0

  const handleConfirm = async () => {
    if (!pendingDeposit) {
      setError('No deposit selected.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await api.depositGoal(pendingDeposit.backendGoalId, pendingDeposit.amount)
      await refreshData()
      setScreen('depositSuccess')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to confirm deposit.')
    } finally {
      setLoading(false)
    }
  }

  if (!pendingDeposit) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
          <h1 className="text-2xl font-bold text-foreground">Review Deposit</h1>
          <p className="mt-3 text-muted-foreground">Choose a goal and amount before reviewing a deposit.</p>
          <button onClick={() => setScreen('newDeposit')} className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold">
            Start deposit
          </button>
        </div>
      </div>
    )
  }

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
          <h2 className="text-5xl font-bold mb-4">NGN {depositAmount.toLocaleString()}</h2>

          <div className="space-y-3 bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span>Saving Towards</span>
              <span className="text-right font-semibold">{pendingDeposit.goalName}</span>
            </div>
            <div className="border-t border-white border-opacity-20" />
            <div className="flex items-center justify-between text-sm">
              <span>Current Progress</span>
              <span>{currentProgress}% Completed</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-lg p-4 mb-6">
          <h3 className="font-bold text-foreground mb-3">Progress Preview</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Progress</span>
              <span className="font-bold text-foreground">NGN {currentAmount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${currentProgress}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">After Contribution</span>
              <span className="font-bold text-foreground">NGN {nextAmount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${nextProgress}%` }} />
            </div>
          </div>
        </div>

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setScreen('newDeposit')}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm Deposit'}
          </button>
        </div>

        <button
          onClick={() => {
            setPendingDeposit(null)
            setScreen('dashboard')
          }}
          className="w-full text-center text-primary font-semibold hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
