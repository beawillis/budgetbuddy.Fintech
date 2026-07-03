'use client'

import { useApp } from '@/lib/AppContext'
import { CheckCircle2 } from 'lucide-react'

interface SuccessScreenProps {
  type: 'login' | 'signup'
}

export default function SuccessScreen({ type }: SuccessScreenProps) {
  const { setScreen } = useApp()

  const handleContinue = () => {
    setScreen('dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-500" size={48} />
        </div>

        {type === 'login' ? (
          <>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mb-4 text-lg">
              Loading your dashboard...
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Account Created Successfully! 🎉</h1>
            <p className="text-muted-foreground mb-8">
              Welcome to BudgetBuddy. Your savings journey starts today!
            </p>

            <div className="bg-secondary rounded-lg p-6 mb-8 w-full max-w-sm">
              <p className="text-sm text-muted-foreground mb-2">💡 Pro Tip</p>
              <p className="text-foreground">
                For access to your account on this device, you&apos;re tracked money on BudgetBuddy. You can manage settings in your profile.
              </p>
            </div>
          </>
        )}

        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90"
        >
          {type === 'login' ? 'Continue to Dashboard' : 'Create My First Goal'}
        </button>

        {type === 'signup' && (
          <button
            onClick={() => setScreen('dashboard')}
            className="w-full max-w-sm mt-3 text-center text-primary font-semibold hover:underline"
          >
            Maybe Later
          </button>
        )}
      </div>
    </div>
  )
}
