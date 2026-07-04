'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useState } from 'react'
import { ArrowLeft, Bot, Send } from 'lucide-react'

export default function AssistantScreen() {
  const { setScreen } = useApp()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'I can help you review your budget, goals, and savings habits.' },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async () => {
    if (!message.trim()) return
    const nextMessage = message.trim()
    setChat((current) => [...current, { role: 'user', text: nextMessage }])
    setMessage('')
    setLoading(true)
    setError('')
    try {
      const result = await api.assistantChat(nextMessage)
      const reply = typeof result === 'string' ? result : result?.message || 'I can help with that.'
      setChat((current) => [...current, { role: 'assistant', text: reply }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to contact assistant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <button onClick={() => setScreen('dashboard')} className="rounded-full bg-[#f2ebff] p-2.5 text-primary">
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI guidance</p>
              <h1 className="text-2xl font-semibold text-foreground">BudgetBuddy assistant</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#7c3aed] to-[#4c1d95] p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <p className="text-sm font-semibold">Ask anything about your money</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Get tips for savings, spending, and reaching your goals faster.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {chat.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`rounded-[20px] p-3 text-sm ${entry.role === 'assistant' ? 'bg-[#f8f5ff] text-foreground' : 'bg-[#f8fafc] text-foreground'}`}>
                <p className="font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground">{entry.role === 'assistant' ? 'Assistant' : 'You'}</p>
                <p className="mt-1">{entry.text}</p>
              </div>
            ))}
          </div>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <div className="mt-4 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your budget"
              className="flex-1 rounded-2xl border border-border bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={handleSend} disabled={loading} className="rounded-2xl bg-primary p-3 text-white disabled:opacity-60">
              <Send size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
