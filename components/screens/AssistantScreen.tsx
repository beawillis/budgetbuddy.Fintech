'use client'

import { useApp } from '@/lib/AppContext'
import { useState, useEffect } from 'react'
import { ArrowLeft, Bot, Send, Sparkles } from 'lucide-react'

export default function AssistantScreen() {
  const { setScreen, goals, walletBalance, monthlyIncome, monthlyExpense, user } = useApp()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hey ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your BudgetBuddy AI Assistant. I can help you with financial guidance, goal strategies, budget optimization, and answering questions about your savings. What would you like to know today?`,
    },
  ])
  const [loading, setLoading] = useState(false)

  // Generate AI-powered financial advice based on user data
  const generateAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Analyze user data for insights
    const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
    const savingsPercentage = Math.round((totalSaved / totalTarget) * 100) || 0
    const activeGoals = goals.filter((g) => !g.isCompleted).length
    const completedGoals = goals.filter((g) => g.isCompleted).length
    const monthlySpend = monthlyExpense || 0
    const monthlySave = monthlyIncome || 0

    // Financial advice based on keywords
    if (
      lowerMessage.includes('goal') ||
      lowerMessage.includes('savings') ||
      lowerMessage.includes('target')
    ) {
      return `Great question! 🎯 You currently have ${activeGoals} active goals with a total target of ₦${totalTarget.toLocaleString()}. You've saved ₦${totalSaved.toLocaleString()} so far (${savingsPercentage}%). To accelerate your progress, I recommend:\n\n1. Set up automatic deposits to your goals\n2. Focus on your highest-priority goal first\n3. Celebrate small wins along the way\n\nWhich goal would you like help with?`
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('spend')) {
      return `Let's optimize your budget! 💰 I see you're spending ₦${monthlySpend.toLocaleString()} monthly and saving ₦${monthlySave.toLocaleString()}. Here are some tips:\n\n1. Track every expense to find patterns\n2. Create spending categories and set limits\n3. Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings\n4. Review your budget weekly\n\nWould you like specific advice on cutting expenses?`
    }

    if (lowerMessage.includes('challenge') || lowerMessage.includes('motivation')) {
      return `You're doing amazing! 🌟 You've completed ${completedGoals} goals and are on track with ${activeGoals} active goals. Here's my motivation for you:\n\n✨ Consistency beats perfection - save what you can, when you can\n✨ Every small deposit counts\n✨ Track your progress - seeing growth is motivating!\n✨ Celebrate milestones\n\nWhat's stopping you from reaching your goals faster? Let's tackle it together!`
    }

    if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('how') ||
      lowerMessage.includes('tip')
    ) {
      return `I'm here to help! 🤝 I can assist with:\n\n📊 Goal Analysis - Review your goals and strategy\n💰 Budget Optimization - Improve your spending habits\n📈 Savings Tips - Accelerate your progress\n🎯 Goal Setting - Create better financial goals\n🏆 Motivation - Get inspired to reach your goals\n⚡ Quick Wins - Find easy ways to save more\n\nJust ask me anything about your finances!`
    }

    if (
      lowerMessage.includes('progress') ||
      lowerMessage.includes('status') ||
      lowerMessage.includes('how am i doing')
    ) {
      const streak = completedGoals + activeGoals
      return `Let me review your financial progress! 📈\n\n✅ Total Saved: ₦${totalSaved.toLocaleString()}\n🎯 Active Goals: ${activeGoals}\n🏆 Completed Goals: ${completedGoals}\n📊 Overall Progress: ${savingsPercentage}%\n💰 Monthly Income: ₦${monthlySave.toLocaleString()}\n\nYou're on an amazing journey! Keep maintaining your discipline and you'll reach all your goals. What would you like to focus on next?`
    }

    // Default helpful response
    return `Great question! 💡 Based on your profile, I'd recommend focusing on your top-priority goal. You're doing well with ₦${totalSaved.toLocaleString()} saved so far!\n\nHere's what I suggest:\n1. Automate your savings\n2. Review your budget weekly\n3. Look for ways to increase your income\n4. Celebrate progress regularly\n\nWould you like specific advice on any of these areas?`
  }

  const handleSend = async () => {
    if (!message.trim()) return
    const userMessage = message.trim()
    setChat((current) => [...current, { role: 'user', text: userMessage }])
    setMessage('')
    setLoading(true)

    // Simulate AI processing with a slight delay
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(userMessage)
      setChat((current) => [...current, { role: 'assistant', text: assistantResponse }])
      setLoading(false)
    }, 800)
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
              <div key={`${entry.role}-${index}`} className={`rounded-[20px] p-3 text-sm whitespace-pre-wrap ${entry.role === 'assistant' ? 'bg-[#f8f5ff] text-foreground' : 'bg-[#f8fafc] text-foreground'}`}>
                <p className="font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground">{entry.role === 'assistant' ? 'Assistant' : 'You'}</p>
                <p className="mt-1">{entry.text}</p>
              </div>
            ))}
          </div>

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
