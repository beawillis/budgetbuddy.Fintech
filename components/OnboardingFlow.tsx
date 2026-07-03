'use client'

import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'

interface OnboardingFlowProps {
  onComplete: () => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Save for what matters most.',
      description: 'Create personalized savings goals and turn dreams into achievable milestones.',
      icon: '💎',
      color: 'bg-gradient-to-br from-purple-400 to-pink-400',
    },
    {
      title: 'Consistency beats intensity.',
      description: 'Build financial habits with streaks, reminders, and daily motivation.',
      icon: '🎯',
      color: 'bg-gradient-to-br from-blue-400 to-purple-400',
    },
    {
      title: 'See every naira move you closer.',
      description: 'Track your progress with beautiful insights and milestone celebrations.',
      icon: '📊',
      color: 'bg-gradient-to-br from-teal-400 to-blue-400',
    },
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">BudgetBuddy</h1>

        {/* Step Content */}
        <div className="bg-white rounded-3xl p-8 mb-8">
          <div className={`${currentStepData.color} rounded-2xl p-8 text-center mb-8 text-white`}>
            <div className="text-6xl mb-4">{currentStepData.icon}</div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{currentStepData.title}</h2>
          <p className="text-gray-600 text-center mb-8">{currentStepData.description}</p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <span>Get Started</span>
                <Check size={20} />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ChevronRight size={20} />
              </>
            )}
          </button>

          {currentStep === 0 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full mt-3 text-purple-600 font-semibold py-2 px-6 rounded-full hover:bg-purple-50 transition-colors"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
