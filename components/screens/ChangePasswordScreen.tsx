'use client'

import { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function ChangePasswordScreen() {
  const { setScreen } = useApp()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    if (!currentPassword.trim()) {
      setErrorMessage('Current password is required')
      return false
    }
    if (!newPassword.trim()) {
      setErrorMessage('New password is required')
      return false
    }
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters')
      return false
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return false
    }
    if (currentPassword === newPassword) {
      setErrorMessage('New password must be different from current password')
      return false
    }
    return true
  }

  const handleChangePassword = async () => {
    setErrorMessage('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await api.changePassword({
        currentPassword,
        newPassword,
      })
      setSuccessMessage('Password changed successfully!')
      setTimeout(() => {
        setScreen('profile')
      }, 1500)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-4 pb-24">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <header className="flex items-center gap-3">
          <button
            onClick={() => setScreen('profile')}
            className="rounded-full bg-white p-2.5 text-foreground shadow-sm hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Change Password</h1>
            <p className="text-sm text-muted-foreground">Update your account security</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
                    setErrorMessage('')
                  }}
                  placeholder="Enter your current password"
                  className="w-full rounded-[16px] border border-border bg-white px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setErrorMessage('')
                  }}
                  placeholder="Enter your new password"
                  className="w-full rounded-[16px] border border-border bg-white px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">At least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setErrorMessage('')
                  }}
                  placeholder="Confirm your new password"
                  className="w-full rounded-[16px] border border-border bg-white px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 rounded-[16px] border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-semibold text-green-600">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="mt-6 w-full rounded-[16px] bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-primary/90 disabled:bg-gray-300 disabled:shadow-none"
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => setScreen('profile')}
            disabled={loading}
            className="mt-2 w-full rounded-[16px] border border-border bg-white px-4 py-3 font-semibold text-foreground transition hover:bg-gray-50 disabled:bg-gray-100"
          >
            Cancel
          </button>
        </section>

        {/* Password Requirements Info */}
        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Password Tips</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Use at least 6 characters</li>
            <li>• Mix uppercase and lowercase letters</li>
            <li>• Include numbers or special characters</li>
            <li>• Avoid using common words or patterns</li>
            <li>• Never reuse old passwords</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
