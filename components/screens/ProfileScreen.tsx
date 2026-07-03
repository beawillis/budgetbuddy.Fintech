'use client'

import { useApp } from '@/lib/AppContext'
import { Edit3, Bell, Lock, Download, LogOut, ChevronRight, User } from 'lucide-react'

export default function ProfileScreen() {
  const { setScreen } = useApp()

  return (
    <div className="bg-background min-h-screen">
      {/* Header with Profile */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <button
              onClick={() => setScreen('editProfile')}
              className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90"
            >
              <Edit3 size={20} />
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
              TD
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Oluwanifemi Chibike</h2>
              <p className="text-muted-foreground">BudgetBuddy Member</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-xs text-muted-foreground mt-1">Goals Created</p>
            </div>
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">₦2.4M</p>
              <p className="text-xs text-muted-foreground mt-1">Total Saved</p>
            </div>
            <div className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6 space-y-4">
        {/* Personal Information */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-secondary">
            <h3 className="font-bold text-foreground text-sm">Personal Information</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Full Name</p>
                  <p className="text-xs text-muted-foreground">Oluwanifemi Chibike</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Email Address</p>
                  <p className="text-xs text-muted-foreground">emmaugliano@gmail.com</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone Number</p>
                  <p className="text-xs text-muted-foreground">+234 803 345 6789</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Location</p>
                  <p className="text-xs text-muted-foreground">Lagos, Nigeria</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-secondary">
            <h3 className="font-bold text-foreground text-sm">Preferences</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-green-500" />
                <span className="text-sm font-semibold text-foreground">Push Notification</span>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-green-500" />
                <span className="text-sm font-semibold text-foreground">Email Digest</span>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-green-500" />
                <span className="text-sm font-semibold text-foreground">Daily Reminder</span>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-green-500" />
                <span className="text-sm font-semibold text-foreground">Savings Reports</span>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-secondary">
            <h3 className="font-bold text-foreground text-sm">Security</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Change Password</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Two-Step Authentication</span>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Fingerprint Login</span>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-secondary">
            <h3 className="font-bold text-foreground text-sm">Account Management</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Download size={20} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Export Data</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <LogOut size={20} className="text-destructive" />
                <span className="text-sm font-semibold text-destructive">Delete Account</span>
              </div>
              <ChevronRight size={20} className="text-destructive" />
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full bg-white border border-destructive text-destructive py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
          <LogOut size={20} className="inline mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
