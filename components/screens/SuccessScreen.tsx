'use client'

import { useApp } from '@/lib/AppContext'
import { CheckCircle2, Sparkles } from 'lucide-react'

interface SuccessScreenProps {
  type: 'login' | 'signup'
}

export default function SuccessScreen({ type }: SuccessScreenProps) {
  const { setScreen } = useApp()

  const handleContinue = () => {
    setScreen('dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col items-center justify-center rounded-[32px] border border-white/70 bg-white/90 p-6 text-center shadow-sm backdrop-blur">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={44} />
        </div>

        {type === 'login' ? (
          <>
            <h1 className="text-3xl font-semibold text-foreground">Welcome back</h1>
            <p className="mt-3 text-base text-muted-foreground">Your dashboard is ready and waiting for you.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-foreground">Account created</h1>
            <p className="mt-3 text-base text-muted-foreground">Welcome to BudgetBuddy. Your savings journey starts today.</p>

            <div className="mt-6 w-full rounded-[24px] bg-[#f8f5ff] p-4 text-left">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles size={16} /> Pro tip
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Start with a small daily deposit and build momentum with streaks, reminders, and goal tracking.
              </p>
            </div>
          </>
        )}

        <button onClick={handleContinue} className="mt-8 w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200">
          {type === 'login' ? 'Continue to dashboard' : 'Create my first goal'}
        </button>

        {type === 'signup' && (
          <button onClick={() => setScreen('dashboard')} className="mt-3 text-sm font-semibold text-primary">
            Maybe later
          </button>
        )}
      </div>
    </div>
  )
}
