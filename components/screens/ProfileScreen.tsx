'use client'

import { useApp } from '@/lib/AppContext'
import { Bell, ChevronRight, Download, Edit3, Lock, LogOut, ShieldCheck, User, DollarSign } from 'lucide-react'

export default function ProfileScreen() {
  const { setScreen, user, goals, walletBalance, currency, logout } = useApp()

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Your account</p>
              <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
            </div>
            <button onClick={() => setScreen('editProfile')} className="rounded-full bg-primary p-2.5 text-white shadow-lg shadow-purple-200">
              <Edit3 size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-[24px] bg-[#f8f5ff] p-3">
            <div className="relative h-14 w-14 rounded-full overflow-hidden bg-linear-to-br from-[#7c3aed] to-[#4c1d95] text-lg font-semibold text-white">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white">
                  {user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">{user?.name || 'BudgetBuddy user'}</p>
              <p className="text-sm text-muted-foreground">{user?.email || 'BudgetBuddy member'}</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-[18px] bg-[#f8fafc] p-2 text-center">
              <p className="text-sm font-semibold text-foreground">{goals.length}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Goals</p>
            </div>
            <div className="rounded-[18px] bg-[#f8fafc] p-2 text-center">
              <p className="text-sm font-semibold text-foreground">₦{walletBalance.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
            </div>
            <div className="rounded-[18px] bg-[#f8fafc] p-2 text-center">
              <p className="text-sm font-semibold text-foreground">7</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Streak</p>
            </div>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-3 shadow-sm">
          <div className="mb-2 px-1 py-2 text-sm font-semibold text-foreground">Personal information</div>
          <div className="space-y-2">
            {[
              { label: 'Full name', value: user?.name || 'BudgetBuddy user', icon: User },
              { label: 'Email address', value: user?.email || 'budgetbuddy@example.com', icon: User },
              { label: 'Occupation', value: user?.financialProfile?.occupation || 'Not provided', icon: ShieldCheck },
              { label: 'Location', value: user?.financialProfile?.region || 'Not provided', icon: User },
              { label: 'Currency', value: currency || 'USD', icon: DollarSign },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setScreen('editProfile')}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#f8fafc] px-3 py-3 text-left transition hover:bg-[#eef2ff]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white p-2 text-muted-foreground">
                    <item.icon size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-3 shadow-sm">
          <div className="mb-2 px-1 py-2 text-sm font-semibold text-foreground">Preferences</div>
          <div className="space-y-2">
            {['Push notifications', 'Email digest', 'Daily reminder', 'Savings reports'].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-[18px] bg-[#f8fafc] px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white p-2 text-primary">
                    <Bell size={15} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </div>
                <input type="checkbox" defaultChecked={index < 3} className="h-4 w-4 rounded border-border" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-3 shadow-sm">
          <div className="mb-2 px-1 py-2 text-sm font-semibold text-foreground">Security</div>
          <div className="space-y-2">
            {[
              { label: 'Change password', action: 'changePassword' },
              { label: 'Biometric login', action: 'biometricLogin' },
              { label: 'Two-step verification', action: 'twoStepVerification' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setScreen(item.action as any)}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#f8fafc] px-3 py-3 text-left transition hover:bg-[#eef2ff]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white p-2 text-muted-foreground">
                    <Lock size={15} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        <button onClick={logout} className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          <LogOut size={16} className="mr-2 inline" />
          Sign out
        </button>
      </div>
    </div>
  )
}
