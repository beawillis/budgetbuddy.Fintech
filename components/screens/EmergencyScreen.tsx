'use client'

import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function EmergencyScreen() {
  const { setScreen } = useApp()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await api.getEmergency()
        setData(result)
      } catch {
        setData(null)
      }
    }

    void load()
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <button onClick={() => setScreen('dashboard')} className="rounded-full bg-[#f2ebff] p-2.5 text-primary">
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Preparedness</p>
              <h1 className="text-2xl font-semibold text-foreground">Emergency fund</h1>
            </div>
          </div>

          <div className="rounded-[24px] bg-linear-to-br from-[#0f766e] to-[#14b8a6] p-4 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <p className="text-sm font-semibold">Stay protected</p>
            </div>
            <p className="mt-2 text-sm text-white/80">Track your emergency fund progress and build resilience over time.</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          {data ? (
            <div className="space-y-4">
              <div className="rounded-[20px] bg-[#f8f5ff] p-4">
                <p className="text-sm font-semibold text-foreground">Target</p>
                <p className="mt-1 text-2xl font-semibold text-primary">₦{Number(data.target || 0).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[20px] bg-[#f8fafc] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Current</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">₦{Number(data.current || 0).toLocaleString()}</p>
                </div>
                <div className="rounded-[20px] bg-[#f8fafc] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Progress</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{Number(data.progress || 0)}%</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No emergency fund data is available yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
