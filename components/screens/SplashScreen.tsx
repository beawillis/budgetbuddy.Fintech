'use client'

import { useApp } from '@/lib/AppContext'
import { useEffect } from 'react'

export default function SplashScreen() {
  const { setScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('onboarding1')
    }, 2000)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-purple-400 flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="currentColor" />
            <text x="24" y="28" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7C3AED">B</text>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3">BudgetBuddy</h1>
        <p className="text-lg opacity-90">Your Personal Accountability Partner</p>
      </div>
    </div>
  )
}
