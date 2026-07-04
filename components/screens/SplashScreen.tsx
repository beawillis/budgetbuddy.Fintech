'use client'

import Image from 'next/image'
import { useApp } from '@/lib/AppContext'
import { useEffect } from 'react'

export default function SplashScreen() {
  const { setScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('onboarding1')
    }, 30000)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#d7c7ff] via-[#c7b3f4] to-[#f4f6fb]">
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="relative flex h-36 w-64 items-center justify-center sm:h-40 sm:w-72">
          <Image
            src="/logo.png"
            alt="BudgetBuddy logo"
            width={288}
            height={160}
            priority
            className="h-full w-full object-contain"
          />
        </div>
        <p className="mt-4 max-w-xs text-base font-medium text-[#4c1d95]/75 sm:text-lg">Your Financial Accountability Partner</p>
      </div>
    </div>
  )
}
