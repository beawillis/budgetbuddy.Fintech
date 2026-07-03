'use client'

import { ChevronRight, LogOut, Edit2, Bell, Lock, Trash2, Download } from 'lucide-react'
import { useState } from 'react'

export default function Profile() {
  const [showSettings, setShowSettings] = useState(false)

  const userProfile = {
    name: 'Olalekan Oramisi',
    email: 'oramisi@gmail.com',
    phone: '+234 803 543 5508',
    location: 'Lagos, Nigeria',
    totalSavings: '₦3,150,500',
    avatar: '👤',
  }

  const menuItems = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: 'Olalekan Oramisi', icon: '👤' },
        { label: 'Email Address', value: 'oramisi@gmail.com', icon: '📧' },
        { label: 'Phone Number', value: '+234 803 543 5508', icon: '📱' },
        { label: 'Location', value: 'Lagos, Nigeria', icon: '📍' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Push Notifications', icon: '🔔', type: 'toggle', enabled: true },
        { label: 'App Notifications', icon: '🔔', type: 'toggle', enabled: false },
        { label: 'Daily Reminders', icon: '⏰', type: 'toggle', enabled: true },
        { label: 'Weekly Digest', icon: '📋', type: 'toggle', enabled: true },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Change Password', icon: '🔐', type: 'button' },
        { label: 'Two-step Authentication', icon: '🔒', type: 'toggle', enabled: true },
        { label: 'Trusted Devices', icon: '📱', type: 'button' },
      ],
    },
    {
      title: 'Account Management',
      items: [
        { label: 'Export Data', icon: '⬇️', type: 'button', color: 'text-blue-600' },
        { label: 'Delete Account', icon: '🗑️', type: 'button', color: 'text-red-600' },
      ],
    },
  ]

  if (showSettings) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-6 sticky top-0 border-b border-gray-200 flex items-center gap-3">
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          <button className="ml-auto text-purple-600 font-semibold">
            <span className="text-sm">Save</span>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-5xl mb-4">
              {userProfile.avatar}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
            <p className="text-sm text-gray-500 mt-1">0% Profile complete</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Total Savings</p>
              <p className="text-4xl font-bold text-purple-600">{userProfile.totalSavings}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={userProfile.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={userProfile.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue={userProfile.phone}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                defaultValue={userProfile.location}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-6">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-4xl">
              {userProfile.avatar}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{userProfile.name}</h2>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Total Savings Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200 mb-6">
          <p className="text-sm font-semibold text-gray-700">Total Savings</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{userProfile.totalSavings}</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6 pb-6">
        {menuItems.map((section, sectionIdx) => (
          <div key={sectionIdx} className="px-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                      {item.type === 'button' || !item.type ? (
                        item.value && <p className="text-xs text-gray-500">{item.value}</p>
                      ) : null}
                    </div>
                  </div>
                  {item.type === 'toggle' && (
                    <div
                      className={`w-12 h-6 rounded-full transition-colors ${
                        item.enabled ? 'bg-purple-600' : 'bg-gray-300'
                      } flex items-center`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                  )}
                  {(item.type === 'button' || !item.type) && (
                    <ChevronRight size={20} className={item.color || 'text-gray-400'} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="px-6 pb-24">
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-lg transition-colors border border-red-200">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>

      <div className="h-8" />
    </div>
  )
}
