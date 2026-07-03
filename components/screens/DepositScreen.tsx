'use client'

import { useApp } from '@/lib/AppContext'
import { X } from 'lucide-react'

export default function DepositScreen() {
  const { setScreen } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">New Deposit</h1>
          <button onClick={() => setScreen('dashboard')} className="p-2">
            <X size={24} className="text-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Saving Towards</label>
            <select className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Select goal</option>
              <option>New MacBook Air</option>
              <option>Dubai Trip</option>
              <option>Master's Degree</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">₦</span>
              <input
                type="number"
                placeholder="0.00"
                defaultValue=""
                className="w-full pl-8 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Current Balance: ₦50,000</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
            <select className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bank Transfer</option>
              <option>Card Payment</option>
              <option>Mobile Money</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 Every savings contribution moves you closer to your goal. Keep your momentum going!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setScreen('dashboard')}
            className="flex-1 py-3 px-4 border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setScreen('reviewDeposit')}
            className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
