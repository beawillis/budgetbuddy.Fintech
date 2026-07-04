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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#a855f7] via-[#c084fc] to-[#ede9fe] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%)]" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mb-6">
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white/15 shadow-[0_25px_70px_rgba(124,58,237,0.25)]">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/10">
              <Image src="/logo.png" alt="BudgetBuddy logo" width={112} height={112} priority className="h-full w-full object-contain" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">BudgetBuddy</h1>
        <p className="mt-3 max-w-xs text-center text-base text-white/85 sm:text-lg">Your Financial Accountability Partner</p>
      </div>
    </div>
  )
}
