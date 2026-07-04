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
  | 'transactions'
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
  _id?: string
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
  backendId?: string
  title: string
  amount: number
  type: 'income' | 'expense' | 'deposit'
  date: string
  category: string
  icon: string
}

type TransactionType = Transaction['type']

export interface DepositDraft {
  goalId: string
  backendGoalId: string
  goalName: string
  amount: number
  currentAmount: number
  targetAmount: number
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
  setTransactions: (transactions: Transaction[]) => void
  addTransaction: (transaction: Transaction) => void
  removeTransaction: (id: string) => void
  currentGoal: Goal | null
  setCurrentGoal: (goal: Goal | null) => void
  pendingDeposit: DepositDraft | null
  setPendingDeposit: (deposit: DepositDraft | null) => void
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

function getRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}

function getArray(value: unknown, keys: string[]) {
  if (Array.isArray(value)) return value

  const record = getRecord(value)
  if (!record) return []

  for (const key of keys) {
    const nextValue = record[key]
    if (Array.isArray(nextValue)) return nextValue

    const nested = getRecord(nextValue)
    if (nested) {
      for (const nestedKey of keys) {
        const nestedValue = nested[nestedKey]
        if (Array.isArray(nestedValue)) return nestedValue
      }
    }
  }

  return []
}

function readNumber(source: Record<string, unknown> | null, keys: string[], fallback = 0) {
  if (!source) return fallback

  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value)
  }

  return fallback
}

function readString(source: Record<string, unknown> | null, keys: string[], fallback = '') {
  if (!source) return fallback

  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.trim() !== '') return value
    if (typeof value === 'number') return String(value)
  }

  return fallback
}

function normalizeTransactionType(value: unknown): TransactionType {
  const type = String(value || '').toLowerCase()
  if (type === 'income' || type === 'credit') return 'income'
  if (type === 'expense' || type === 'debit' || type === 'withdrawal') return 'expense'
  return 'deposit'
}

function formatTransactionDate(value: unknown) {
  if (typeof value !== 'string' && typeof value !== 'number') return 'Recent'

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString()
}

function makeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function mapTransaction(value: unknown): Transaction {
  const tx = getRecord(value)
  const type = normalizeTransactionType(tx?.type || tx?.transactionType || tx?.kind)
  const id = readString(tx, ['_id', 'id', 'transactionId'], makeId('tx'))

  return {
    id,
    backendId: readString(tx, ['_id', 'id', 'transactionId'], id),
    title: readString(tx, ['description', 'title', 'name', 'category'], 'Transaction'),
    amount: readNumber(tx, ['amount', 'value', 'total'], 0),
    type,
    date: formatTransactionDate(tx?.date || tx?.createdAt || tx?.updatedAt),
    category: readString(tx, ['category', 'categoryName'], type === 'income' ? 'Income' : 'General'),
    icon: type === 'income' ? 'in' : type === 'expense' ? 'out' : 'save',
  }
}

function mapGoal(value: unknown): Goal {
  const goal = getRecord(value)
  const targetAmount = readNumber(goal, ['target', 'targetAmount', 'amount'], 0)
  const currentAmount = readNumber(goal, ['saved', 'currentAmount', 'current', 'balance'], 0)

  return {
    id: readString(goal, ['_id', 'id', 'goalId'], makeId('goal')),
    _id: readString(goal, ['_id']) || undefined,
    name: readString(goal, ['name', 'title'], 'Savings Goal'),
    targetAmount,
    currentAmount,
    category: readString(goal, ['category'], 'Savings'),
    dueDate: readString(goal, ['deadline', 'dueDate', 'targetDate'], new Date().toISOString()),
    icon: 'target',
    color: 'bg-purple-500',
    isCompleted: String(goal?.status || '').toLowerCase() === 'completed' || currentAmount >= targetAmount && targetAmount > 0,
  }
}

function extractWalletData(wallet: unknown, dashboard: unknown) {
  const walletRecord = getRecord(wallet)
  const dashboardRecord = getRecord(dashboard)
  const dashboardWallet = getRecord(dashboardRecord?.wallet)
  const dashboardSummary = getRecord(dashboardRecord?.summary)
  const sources = [walletRecord, dashboardWallet, dashboardSummary, dashboardRecord].filter(Boolean) as Record<string, unknown>[]

  return {
    balance: sources.reduce((value, source) => value || readNumber(source, ['balance', 'totalBalance', 'availableBalance', 'walletBalance', 'currentBalance'], 0), 0),
    income: sources.reduce((value, source) => value || readNumber(source, ['income', 'monthlyIncome', 'totalIncome', 'credits'], 0), 0),
    expense: sources.reduce((value, source) => value || readNumber(source, ['expense', 'monthlyExpense', 'totalExpense', 'expenses', 'debits'], 0), 0),
  }
}

const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'New MacBook Air',
    targetAmount: 1000000,
    currentAmount: 750000,
    category: 'Gadgets',
    dueDate: '2026-09-15',
    icon: 'laptop',
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
    icon: 'plane',
    color: 'bg-purple-500',
    isCompleted: false,
  },
  {
    id: '3',
    name: "Master's Degree",
    targetAmount: 1200000,
    currentAmount: 300000,
    category: 'Education',
    dueDate: '2027-06-30',
    icon: 'school',
    color: 'bg-green-500',
    isCompleted: false,
  },
]

const initialTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Daily Habit Save',
    amount: 12500,
    type: 'deposit',
    date: 'Today, 9:30 AM',
    category: 'Savings',
    icon: 'save',
  },
  {
    id: '2',
    title: 'One-time Boost',
    amount: 15000,
    type: 'deposit',
    date: 'Yesterday, 7:15 PM',
    category: 'Savings',
    icon: 'save',
  },
  {
    id: '3',
    title: 'Groceries',
    amount: 32000,
    type: 'expense',
    date: 'Oct 12, 2:30 PM',
    category: 'Shopping',
    icon: 'out',
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('splash')
  const [user, setUser] = useState<User | null>(null)
  const [currency, setCurrency] = useState<string>('USD')
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null)
  const [pendingDeposit, setPendingDeposit] = useState<DepositDraft | null>(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpense, setMonthlyExpense] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const syncProfile = async () => {
    try {
      const profile = await api.getProfile()
      const nextUser = getRecord(profile)
      if (!nextUser) return

      const avatar = nextUser.avatar
      const avatarRecord = getRecord(avatar)
      const preferences = getRecord(nextUser.preferences) as User['preferences']
      const financialProfile = getRecord(nextUser.financialProfile)

      setUser({
        id: readString(nextUser, ['_id', 'id'], 'current-user'),
        name: readString(nextUser, ['name', 'fullName'], 'BudgetBuddy User'),
        email: readString(nextUser, ['email'], 'user@budgetbuddy.app'),
        avatar: typeof avatar === 'string' ? avatar : readString(avatarRecord, ['url']),
        preferences,
        financialProfile: {
          occupation: readString(nextUser, ['occupation'], readString(financialProfile, ['occupation'])),
          education: readString(financialProfile, ['education']),
          region: readString(nextUser, ['region'], readString(financialProfile, ['region'])),
          creditScore: readNumber(financialProfile, ['creditScore']),
        },
      })

      if (preferences?.currency) {
        setCurrency(preferences.currency)
      }
    } catch {
      // Profile can fail before auth has fully settled.
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
        api.getTransactions().catch(() => null),
        api.listGoals().catch(() => null),
      ])

      const nextWalletData = extractWalletData(wallet, dashboard)
      setWalletBalance(nextWalletData.balance)
      setMonthlyIncome(nextWalletData.income)
      setMonthlyExpense(nextWalletData.expense)

      if (goalsData !== null) {
        const goalList = getArray(goalsData, ['goals', 'items', 'results', 'docs', 'data'])
        setGoals(goalList.map(mapGoal))
      }

      if (transactionsData !== null) {
        const transactionList = getArray(transactionsData, ['transactions', 'items', 'results', 'docs', 'data'])
        setTransactions(transactionList.map(mapTransaction))
      }

      await syncProfile()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const token = window.localStorage.getItem('budgetbuddy.token')
    const storedUser = window.localStorage.getItem('budgetbuddy.user')
    if (!token || !storedUser) return

    try {
      const savedUser = JSON.parse(storedUser)
      setUser(savedUser)

      const splashDelay = 30000
      const restoreTimer = window.setTimeout(() => {
        setScreen('dashboard')
        void refreshData()
      }, splashDelay)

      return () => window.clearTimeout(restoreTimer)
    } catch (err) {
      console.error('Failed to restore user session:', err)
      window.localStorage.removeItem('budgetbuddy.token')
      window.localStorage.removeItem('budgetbuddy.user')
    }
  }, [])

  const addGoal = (goal: Goal) => {
    setGoals((currentGoals) => [...currentGoals, goal])
  }

  const addTransaction = (transaction: Transaction) => {
    setTransactions((currentTransactions) => [transaction, ...currentTransactions])
  }

  const removeTransaction = (id: string) => {
    setTransactions((currentTransactions) => currentTransactions.filter((transaction) => transaction.id !== id))
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
    setPendingDeposit(null)
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
        setTransactions,
        addTransaction,
        removeTransaction,
        currentGoal,
        setCurrentGoal,
        pendingDeposit,
        setPendingDeposit,
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
