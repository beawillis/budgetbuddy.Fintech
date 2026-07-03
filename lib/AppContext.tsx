'use client'

import React, { createContext, useContext, useState } from 'react'

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
  | 'notifications'
  | 'createGoal'
  | 'saveMore'
  | 'newDeposit'
  | 'reviewDeposit'
  | 'depositSuccess'
  | 'goalCelebrate'
  | 'premiumInfo'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  totalSaved: number
  monthlyTarget: number
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
  setUser: (user: User) => void
  goals: Goal[]
  setGoals: (goals: Goal[]) => void
  addGoal: (goal: Goal) => void
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  currentGoal: Goal | null
  setCurrentGoal: (goal: Goal | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('splash')
  const [user, setUser] = useState<User | null>(null)
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

  const addGoal = (goal: Goal) => {
    setGoals([...goals, goal])
  }

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions])
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
