'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'

export type AppScreen = 
  | 'splash'
  | 'onboarding1'
  | 'onboarding2'
  | 'onboarding3'
  | 'signin'
  | 'signup'
  | 'forgotPassword1'
  | 'forgotPassword2'
  | 'forgotPassword3'
  | 'loginSuccess'
  | 'accountCreated'
  | 'dashboard'
  | 'goals'
  | 'goalCreated'
  | 'analytics'
  | 'profile'
  | 'editProfile'
  | 'changePassword'
  | 'biometricLogin'
  | 'twoStepVerification'
  | 'notifications'
  | 'createGoal'
  | 'saveMore'
  | 'newDeposit'
  | 'reviewDeposit'
  | 'depositSuccess'
  | 'goalCelebrate'
  | 'premiumInfo'
  | 'savings'
  | 'challenge'
  | 'emergency'
  | 'loans'
  | 'investments'
  | 'assistant'

export interface User {
  _id?: string
  id?: string
  name: string
  email: string
  avatar?: string
  totalSaved?: number
  monthlyTarget?: number
  preferences?: { currency?: string; notifications?: boolean }
  financialProfile?: { occupation?: string; education?: string; region?: string; creditScore?: number }
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  category: string
  dueDate: string
  icon: string
  color: string
  isCompleted: boolean
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense' | 'deposit'
  date: string
  category: string
  icon: string
}

interface AppContextType {
  screen: AppScreen
  setScreen: (screen: AppScreen) => void
  user: User | null
  setUser: (user: User | null) => void
  goals: Goal[]
  setGoals: (goals: Goal[]) => void
  addGoal: (goal: Goal) => void
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  currentGoal: Goal | null
  setCurrentGoal: (goal: Goal | null) => void
  walletBalance: number
  monthlyIncome: number
  monthlyExpense: number
  currency: string
  setCurrency: (currency: string) => void
  refreshData: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('splash')
  const [user, setUser] = useState<User | null>(null)
  const [currency, setCurrency] = useState<string>('USD')
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'New MacBook Air',
      targetAmount: 1000000,
      currentAmount: 750000,
      category: 'Gadgets',
      dueDate: '2026-09-15',
      icon: '💻',
      color: 'bg-blue-500',
      isCompleted: false,
    },
    {
      id: '2',
      name: 'Dubai Trip',
      targetAmount: 500000,
      currentAmount: 0,
      category: 'Travel',
      dueDate: '2026-12-01',
      icon: '✈️',
      color: 'bg-purple-500',
      isCompleted: false,
    },
    {
      id: '3',
      name: 'Master\'s Degree',
      targetAmount: 1200000,
      currentAmount: 300000,
      category: 'Education',
      dueDate: '2027-06-30',
      icon: '🎓',
      color: 'bg-green-500',
      isCompleted: false,
    },
    {
      id: '4',
      name: 'Emergency Fund',
      targetAmount: 500000,
      currentAmount: 500000,
      category: 'Savings',
      dueDate: '2026-05-24',
      icon: '🛟',
      color: 'bg-green-500',
      isCompleted: true,
    },
  ])
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Daily Habit Save',
      amount: 12500,
      type: 'deposit',
      date: 'Today, 9:30 AM',
      category: 'Savings',
      icon: '💜',
    },
    {
      id: '2',
      title: 'One-time Boost',
      amount: 15000,
      type: 'deposit',
      date: 'Yesterday, 7:15 PM',
      category: 'Savings',
      icon: '⚡',
    },
    {
      id: '3',
      title: 'Groceries',
      amount: 32000,
      type: 'expense',
      date: 'Oct 12, 2:30 PM',
      category: 'Shopping',
      icon: '🛒',
    },
    {
      id: '4',
      title: 'TV Console',
      amount: 320000,
      type: 'expense',
      date: 'Oct 11',
      category: 'Shopping',
      icon: '🛒',
    },
  ])
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpense, setMonthlyExpense] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const syncProfile = async () => {
    try {
      const profile = await api.getProfile()
      if (profile && typeof profile === 'object') {
        const nextUser = profile as User & {
          fullName?: string
          occupation?: string
          region?: string
          avatar?: { url?: string } | string
          preferences?: { currency?: string; notifications?: boolean }
        }
        setUser({
          id: nextUser._id || nextUser.id || 'current-user',
          name: nextUser.name || nextUser.fullName || 'BudgetBuddy User',
          email: nextUser.email || 'user@budgetbuddy.app',
          avatar: typeof nextUser.avatar === 'object' ? nextUser.avatar?.url : nextUser.avatar,
          preferences: nextUser.preferences,
          financialProfile: {
            occupation: nextUser.occupation || nextUser.financialProfile?.occupation,
            education: nextUser.financialProfile?.education,
            region: nextUser.region || nextUser.financialProfile?.region,
            creditScore: nextUser.financialProfile?.creditScore,
          },
        })
        if (nextUser.preferences?.currency) {
          setCurrency(nextUser.preferences.currency)
        }
      }
    } catch {
      // ignore profile errors until auth has completed
    }
  }

  const refreshData = async () => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('budgetbuddy.token') : null
    if (!token) return

    setIsLoading(true)
    try {
      const [dashboard, wallet, transactionsData, goalsData] = await Promise.all([
        api.getDashboard().catch(() => null),
        api.getWalletSummary().catch(() => null),
        api.getTransactions().catch(() => []),
        api.listGoals().catch(() => []),
      ])

      const nextWalletData = (wallet && typeof wallet === 'object' ? wallet : null) as {
        balance?: number
        totalBalance?: number
        availableBalance?: number
        income?: number
        monthlyIncome?: number
        expense?: number
        monthlyExpense?: number
      } | null

      if (nextWalletData) {
        setWalletBalance(Number(nextWalletData.balance ?? nextWalletData.totalBalance ?? nextWalletData.availableBalance ?? 0))
        setMonthlyIncome(Number(nextWalletData.income ?? nextWalletData.monthlyIncome ?? 0))
        setMonthlyExpense(Number(nextWalletData.expense ?? nextWalletData.monthlyExpense ?? 0))
      }

      if (dashboard && typeof dashboard === 'object') {
        const dashboardData = dashboard as {
          wallet?: { balance?: number; income?: number; expense?: number }
          balance?: number
          income?: number
          expense?: number
        }
        const dashboardWallet = dashboardData.wallet
        if (dashboardWallet) {
          setWalletBalance(Number(dashboardWallet.balance ?? dashboardData.balance ?? 0))
          setMonthlyIncome(Number(dashboardWallet.income ?? dashboardData.income ?? 0))
          setMonthlyExpense(Number(dashboardWallet.expense ?? dashboardData.expense ?? 0))
        }
      }

      if (Array.isArray(goalsData)) {
        const mappedGoals = goalsData.map((goal: any) => ({
          id: goal._id || goal.id,
          name: goal.name,
          targetAmount: goal.target || goal.targetAmount || 0,
          currentAmount: goal.saved || goal.currentAmount || 0,
          category: goal.category || 'Savings',
          dueDate: goal.deadline || new Date().toISOString(),
          icon: '🎯',
          color: 'bg-purple-500',
          isCompleted: goal.status === 'completed',
        }))
        setGoals(mappedGoals)
      }

      if (Array.isArray(transactionsData)) {
        const mappedTransactions = transactionsData.map((tx: any) => ({
          id: tx._id || tx.id,
          title: tx.description || tx.category || 'Transaction',
          amount: tx.amount || 0,
          type: tx.type === 'income' ? 'income' : tx.type === 'expense' ? 'expense' : 'deposit',
          date: tx.date ? new Date(tx.date).toLocaleString() : 'Recent',
          category: tx.category || 'General',
          icon: '💸',
        }))
        setTransactions(mappedTransactions)
      }

      await syncProfile()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('budgetbuddy.token')
      const storedUser = window.localStorage.getItem('budgetbuddy.user')
      
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setUser(user)
          setScreen('dashboard')
          void refreshData()
        } catch (err) {
          console.error('Failed to restore user session:', err)
          window.localStorage.removeItem('budgetbuddy.token')
          window.localStorage.removeItem('budgetbuddy.user')
        }
      }
    }
  }, [])

  const addGoal = (goal: Goal) => {
    setGoals((currentGoals) => [...currentGoals, goal])
  }

  const addTransaction = (transaction: Transaction) => {
    setTransactions((currentTransactions) => [transaction, ...currentTransactions])
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('budgetbuddy.token')
      window.localStorage.removeItem('budgetbuddy.user')
    }
    setUser(null)
    setGoals([])
    setTransactions([])
    setCurrentGoal(null)
    setWalletBalance(0)
    setMonthlyIncome(0)
    setMonthlyExpense(0)
    setCurrency('USD')
    setScreen('signin')
  }

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        user,
        setUser,
        goals,
        setGoals,
        addGoal,
        transactions,
        addTransaction,
        currentGoal,
        setCurrentGoal,
        walletBalance,
        monthlyIncome,
        monthlyExpense,
        currency,
        setCurrency,
        refreshData,
        logout,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
