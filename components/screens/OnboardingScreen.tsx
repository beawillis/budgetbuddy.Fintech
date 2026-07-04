'use client'

import Image from 'next/image'
import { useApp } from '@/lib/AppContext'
import { ChevronRight } from 'lucide-react'

interface OnboardingScreenProps {
  stepNumber: number
}

const onboardingSteps = [
  {
    step: 1,
    title: 'Save for what matters most.',
    description: 'Create personalized savings goals and turn dreams into actionable plans.',
    icon: '🎯',
    gradient: 'from-[#7c3aed] to-[#4c1d95]',
  },
  {
    step: 2,
    title: 'Consistency beats intensity.',
    description: 'Build financial habits with streaks, reminders, and daily motivation.',
    icon: '⚡',
    gradient: 'from-[#4f46e5] to-[#7c3aed]',
  },
  {
    step: 3,
    title: 'See every amount move you closer.',
    description: 'Track your progress with beautiful insights and milestone celebrations.',
    icon: '📊',
    gradient: 'from-[#0f766e] to-[#7c3aed]',
  },
]

export default function OnboardingScreen({ stepNumber }: OnboardingScreenProps) {
  const { setScreen } = useApp()
  const step = onboardingSteps[stepNumber - 1]

  const handleNext = () => {
    if (stepNumber < 3) {
      setScreen(`onboarding${stepNumber + 1}` as any)
    } else {
      setScreen('signin')
    }
  }

  const handleSkip = () => {
    setScreen('signin')
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <div
              className="h-8 w-8 rounded-full bg-no-repeat bg-center"
              style={{ backgroundImage: "url('/logo.png')", backgroundSize: 'auto 220%', backgroundPosition: '12% center' }}
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Step {stepNumber} of 3</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-2 pb-12 pt-6 text-center">
          <div className="mb-8 flex h-32 w-32 items-center justify-center">
            <div className={`rounded-[18px] bg-white p-4 shadow-lg`}>
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[12px]">
                <Image src="/logo.png" alt="BudgetBuddy logo" width={80} height={80} className="h-full w-full object-contain" />
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-semibold text-foreground">
            {step.title}
          </h2>

          <p className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>

          <div className="mb-10 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${i === stepNumber ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSkip} className="flex-1 rounded-2xl border border-border bg-white py-3.5 text-sm font-semibold text-foreground">
            Skip
          </button>
          <button onClick={handleNext} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200">
            Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
