'use client'

import { useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { mapTransaction, Transaction, useApp } from '@/lib/AppContext'
import { ArrowDownLeft, ArrowUpRight, Plus, RefreshCw, Trash2, Wallet } from 'lucide-react'

type TransactionType = Transaction['type']

const transactionTypes: TransactionType[] = ['deposit', 'income', 'expense']

export default function TransactionsScreen() {
  const { transactions, setTransactions, addTransaction, removeTransaction, refreshData, walletBalance, monthlyIncome, monthlyExpense, isLoading } = useApp()
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('General')
  const [type, setType] = useState<TransactionType>('expense')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | TransactionType>('all')

  const totals = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => {
  const matchesSearch =
    transaction.title.toLowerCase().includes(search.toLowerCase()) ||
    transaction.category.toLowerCase().includes(search.toLowerCase())

  const matchesFilter =
    filter === 'all' || transaction.type === filter

  return matchesSearch && matchesFilter
})
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'expense') acc.expense += transaction.amount
        if (transaction.type === 'income') acc.income += transaction.amount
        if (transaction.type === 'deposit') acc.deposit += transaction.amount
        return acc
      },
      { income: 0, expense: 0, deposit: 0 },
    )
  }, [transactions])
  const filteredTransactions = transactions.filter((transaction) =>
  transaction.title.toLowerCase().includes(search.toLowerCase()) ||
  transaction.category.toLowerCase().includes(search.toLowerCase())
)

  const handleCreate = async () => {
    const numericAmount = Number(amount)
    if (!title.trim() || !numericAmount || numericAmount <= 0) return

    setSaving(true)
    setStatus('')

    try {
      const result = await api.createTransaction({
        description: title.trim(),
        title: title.trim(),
        amount: numericAmount,
        category: category.trim() || 'General',
        type,
        date: new Date().toISOString(),
      })
      const resultRecord = result && typeof result === 'object' && !Array.isArray(result) ? result as Record<string, unknown> : null
      const transactionPayload = resultRecord?.transaction || resultRecord?.item || resultRecord?.result || result

      addTransaction(mapTransaction(transactionPayload || {
        title: title.trim(),
        amount: numericAmount,
        category: category.trim() || 'General',
        type,
        date: new Date().toISOString(),
      }))
      setTitle('')
      setAmount('')
      setCategory('General')
      setType('expense')
      await refreshData()
      setStatus('Transaction saved.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Unable to save transaction.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (transaction: Transaction) => {
    const currentTransactions = transactions
    removeTransaction(transaction.id)
    setStatus('')

    try {
      await api.deleteTransaction(transaction.backendId || transaction.id)
      await refreshData()
      setStatus('Transaction deleted.')
    } catch (err) {
      setTransactions(currentTransactions)
      setStatus(err instanceof Error ? err.message : 'Unable to delete transaction.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Money movement</p>
              <h1 className="text-2xl font-semibold text-foreground">Transactions</h1>
            </div>
            <button
              onClick={() => void refreshData()}
              disabled={isLoading}
              className="rounded-full bg-[#f2ebff] p-2.5 text-primary disabled:opacity-60"
              aria-label="Refresh transactions"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        <section className="rounded-[28px] bg-linear-to-br from-[#111827] via-[#334155] to-[#0f766e] p-5 text-white shadow-xl shadow-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/75">Wallet balance</p>
              <p className="mt-2 text-3xl font-semibold">NGN {walletBalance.toLocaleString()}</p>
            </div>
            <div className="rounded-full bg-white/15 p-2.5">
              <Wallet size={18} />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: 'Income', value: monthlyIncome || totals.income, color: 'text-emerald-100' },
              { label: 'Expenses', value: monthlyExpense || totals.expense, color: 'text-rose-100' },
              { label: 'Saved', value: totals.deposit, color: 'text-sky-100' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 px-2 py-3 text-center">
                <p className="text-[10px] uppercase text-white/65">{item.label}</p>
                <p className={`mt-1 text-sm font-semibold ${item.color}`}>NGN {item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Add transaction</p>
              <p className="text-xs text-muted-foreground">Saved directly to the backend</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
              <Plus size={16} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#f8fafc] p-1">
              {transactionTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`rounded-xl px-2 py-2 text-xs font-semibold capitalize ${
                    type === item ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Description"
              className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Amount"
                className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Category"
                className="w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={saving || !title.trim() || !amount}
              className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Saving' : 'Save transaction'}
            </button>
            {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">All transactions</p>
            <p className="text-xs font-semibold text-muted-foreground">{filteredTransactions.length} total</p>
          </div>
          <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="🔍 Search transactions..."
  className="mb-4 w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            <div className="mb-4 flex gap-2 overflow-x-auto">
  <button
    onClick={() => setFilter('all')}
    className={`rounded-full px-4 py-2 text-sm ${
      filter === 'all'
        ? 'bg-primary text-white'
        : 'bg-gray-100'
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter('income')}
    className={`rounded-full px-4 py-2 text-sm ${
      filter === 'income'
        ? 'bg-primary text-white'
        : 'bg-gray-100'
    }`}
  >
    Income
  </button>

  <button
    onClick={() => setFilter('expense')}
    className={`rounded-full px-4 py-2 text-sm ${
      filter === 'expense'
        ? 'bg-primary text-white'
        : 'bg-gray-100'
    }`}
  >
    Expense
  </button>

  <button
    onClick={() => setFilter('deposit')}
    className={`rounded-full px-4 py-2 text-sm ${
      filter === 'deposit'
        ? 'bg-primary text-white'
        : 'bg-gray-100'
    }`}
  >
    Deposit
  </button>
</div>
/>

          
          <div className="space-y-2">
            {filteredTransactions.length ? filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-[20px] border border-gray-100 bg-white px-4 py-4 shadow-sm hover:shadow-md transition"
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`rounded-full p-2 ${
                    transaction.type === 'expense' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {transaction.type === 'expense' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{transaction.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{transaction.category} / {transaction.date}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <p className={`text-sm font-semibold ${transaction.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {transaction.type === 'expense' ? '-' : '+'}NGN {transaction.amount.toLocaleString()}
                  </p>
                  <button
                    onClick={() => void handleDelete(transaction)}
                    className="rounded-full bg-white p-2 text-muted-foreground shadow-sm"
                    aria-label={`Delete ${transaction.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="rounded-[18px] bg-[#f8fafc] px-3 py-6 text-center">
                <p className="text-sm font-semibold text-foreground">
  No matching transactions found
</p>
                <p className="mt-1 text-xs text-muted-foreground"> Try another search or add a new transaction. .</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
