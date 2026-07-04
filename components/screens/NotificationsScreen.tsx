'use client'

import { useApp } from '@/lib/AppContext'
import { Bell, CheckCircle2, TrendingUp, AlertCircle, Zap, Clock } from 'lucide-react'

export default function NotificationsScreen() {
  const { setScreen } = useApp()

  const notifications = [
    {
      id: 1,
      icon: Clock,
      title: 'Time to live!',
      message: 'Your "Dream vacation" goal is ready for its weekly top-up. Keep saving!',
      time: 'just now',
      type: 'reminder',
      isRead: false,
    },
    {
      id: 2,
      icon: Zap,
      title: 'Streak at risk',
      message: 'You haven\'t logged in today. Keep your momentum and log in to continue your streak.',
      time: '2 days ago',
      type: 'warning',
      isRead: true,
    },
    {
      id: 3,
      icon: CheckCircle2,
      title: 'Goal reached!',
      message: 'Congratulations! You\'ve completed your "Emergency Fund" goal. Celebrate this win!',
      time: '1 week ago',
      type: 'success',
      isRead: true,
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'New insights ready',
      message: 'Your monthly spending report is generated. Take a look at your savings progress.',
      time: 'Oct 15',
      type: 'info',
      isRead: true,
    },
  ]

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <button onClick={() => setScreen('dashboard')} className="text-primary text-sm font-semibold hover:underline">
            Mark all
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map(notif => {
            const Icon = notif.icon

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-secondary ${
                  notif.isRead ? 'bg-white border-border' : 'bg-primary bg-opacity-5 border-primary'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    notif.type === 'success' ? 'bg-green-100 text-green-600' :
                    notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    notif.type === 'reminder' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground text-sm">{notif.title}</h3>
                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => setScreen('dashboard')}
          className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
