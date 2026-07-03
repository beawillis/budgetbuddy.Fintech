'use client'

import { useApp } from '@/lib/AppContext'
import { ChevronLeft, Save } from 'lucide-react'

export default function EditProfileScreen() {
  const { setScreen } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4">
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
          <button onClick={() => setScreen('profile')} className="p-2">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              OC
            </div>
            <button className="text-primary text-sm font-semibold hover:underline">
              Change Profile Picture
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Oluwanifemi Chibike"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="emmaugliano@gmail.com"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+234 803 345 6789"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                defaultValue="Lagos, Nigeria"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                defaultValue="Passionate about financial growth and saving habits"
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Monthly Savings Target</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">₦</span>
                <input
                  type="number"
                  defaultValue="100000"
                  className="w-full pl-8 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8 sticky bottom-0 bg-white pt-4">
          <button
            onClick={() => setScreen('profile')}
            className="flex-1 py-3 px-4 border border-border rounded-lg text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setScreen('profile')}
            className="flex-1 py-3 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
