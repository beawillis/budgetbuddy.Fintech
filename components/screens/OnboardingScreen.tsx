'use client'

import { useApp } from '@/lib/AppContext'
import { ChevronRight } from 'lucide-react'

interface OnboardingScreenProps {
  stepNumber: number
}

const onboardingSteps = [
  {
    step: 1,
    title: 'Save for what matters most.',
    description: 'Create personalized savings goals and turn dreams into actionable plans',
    icon: '🎯',
    gradient: 'from-purple-400 to-pink-400',
  },
  {
    step: 2,
    title: 'Consistency beats intensity',
    description: 'Build financial habits with streaks, reminders, and daily motivation',
    icon: '⚡',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    step: 3,
    title: 'See every naira move you closer.',
    description: 'Track your progress with beautiful insights and milestone celebrations',
    icon: '📊',
    gradient: 'from-blue-500 to-purple-500',
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          B
        </div>
        <span className="text-sm text-muted-foreground">Step {stepNumber} of 3</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 text-6xl`}>
          {step.icon}
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          {step.title}
        </h2>

        <p className="text-center text-muted-foreground text-lg mb-8 max-w-sm">
          {step.description}
        </p>

        {/* Dots */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === stepNumber ? 'bg-primary w-8' : 'bg-border'
              } transition-all`}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 py-3 px-4 border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          Continue <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
