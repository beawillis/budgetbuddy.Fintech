'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useState } from 'react'
import { ChevronLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react'

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  const { setScreen } = useApp()

  return (
    <button
      type="button"
      onClick={() => setScreen('loginSuccess')}
      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-white py-3 text-sm font-semibold text-foreground"
    >
      {icon}
      {label}
    </button>
  )
}

export default function SignInScreen() {
  const { setScreen, setUser, refreshData } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      const result = await api.login({ email, password })
      const userData = {
        id: (result.user as any)?._id || (result.user as any)?.id || 'current-user',
        name: (result.user as any)?.name || 'BudgetBuddy User',
        email: (result.user as any)?.email || email,
        preferences: (result.user as any)?.preferences,
        financialProfile: (result.user as any)?.financialProfile,
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('budgetbuddy.token', result.token)
        window.localStorage.setItem('budgetbuddy.user', JSON.stringify(userData))
      }
      setUser(userData)
      await refreshData()
      setScreen('loginSuccess')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in right now')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen('onboarding1')} className="rounded-full bg-[#f2ebff] p-2.5 text-primary">
            <ChevronLeft size={20} />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            B
          </div>
        </div>

        <div className="mt-8 flex-1">
          <div className="mb-6 rounded-[24px] bg-linear-to-br from-[#7c3aed] to-[#4c1d95] p-5 text-white">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <ShieldCheck size={22} />
            </div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-white/80">Continue building your financial future</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
                Remember me
              </label>
              <button onClick={() => setScreen('forgotPassword1')} className="text-sm font-semibold text-primary">
                Forgot password?
              </button>
            </div>
          </div>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button onClick={handleSignIn} disabled={loading} className="mt-6 w-full rounded-2xl bg-primary py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-200 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex gap-3">
            <SocialButton
              label="Google"
              icon={
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              }
            />
            <SocialButton
              label="Apple"
              icon={<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.8 12.2c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.7-1.7-3.3-1.7-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.2 1.7 2.5 2.9 2.5 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.3 1.3-2.6 1.3-2.6-.1 0-2.5-.9-2.5-3.6zM14.7 5.5c.6-.8 1.1-1.8 1-2.8-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8.9.1 2-.5 2.7-1.4z" /></svg>}
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button onClick={() => setScreen('signup')} className="font-semibold text-primary">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
