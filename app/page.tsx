'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Goals from '@/components/Goals'
import Analytics from '@/components/Analytics'
import Profile from '@/components/Profile'
import OnboardingFlow from '@/components/OnboardingFlow'
import { Home, Target, TrendingUp, User, Plus } from 'lucide-react'

type Screen = 'onboarding' | 'dashboard' | 'goals' | 'analytics' | 'profile'

export default function Page() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [hasOnboarded, setHasOnboarded] = useState(false)

  const handleOnboardingComplete = () => {
    setHasOnboarded(true)
    setScreen('dashboard')
  }

  if (!hasOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard />
      case 'goals':
        return <Goals />
      case 'analytics':
        return <Analytics />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto">
          <button
            onClick={() => setScreen('dashboard')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
              screen === 'dashboard'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setScreen('goals')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
              screen === 'goals'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Target size={24} />
            <span className="text-xs mt-1">Goals</span>
          </button>
          <button
            className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-primary text-white hover:bg-opacity-90 transform -translate-y-6"
            onClick={() => setScreen('goals')}
          >
            <Plus size={32} />
          </button>
          <button
            onClick={() => setScreen('analytics')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
              screen === 'analytics'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <TrendingUp size={24} />
            <span className="text-xs mt-1">Analytics</span>
          </button>
          <button
            onClick={() => setScreen('profile')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
              screen === 'profile'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
