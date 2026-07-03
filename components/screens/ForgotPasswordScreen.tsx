'use client'

import { useApp } from '@/lib/AppContext'
import { useState } from 'react'
import { ChevronLeft, Lock, Shield, Eye, EyeOff } from 'lucide-react'

interface ForgotPasswordScreenProps {
  stepNumber: number
}

export default function ForgotPasswordScreen({ stepNumber }: ForgotPasswordScreenProps) {
  const { setScreen } = useApp()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleNext = () => {
    if (stepNumber === 1) {
      setScreen('forgotPassword2')
    } else if (stepNumber === 2) {
      setScreen('forgotPassword3')
    } else {
      setScreen('loginSuccess')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button onClick={() => setScreen('signin')} className="p-2">
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <span className="text-sm text-muted-foreground">Step {stepNumber} of 3</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        {stepNumber === 1 && (
          <>
            <Lock className="text-primary mb-4" size={32} />
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Forgot Password</h1>
            <p className="text-gray-600 mb-8 text-base">Reset your password to regain access to your account</p>

            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              We&apos;ll send a 6-digit code to this email address
            </p>

            <button
              onClick={handleNext}
              disabled={!email}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Code
            </button>
          </>
        )}

        {stepNumber === 2 && (
          <>
            <Shield className="text-primary mb-4" size={32} />
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Enter Verification Code</h1>
            <p className="text-gray-600 mb-8 text-base">We&apos;ve sent a 6-digit code to you. Please verify your identity</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">Received code in 02:04</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.slice(0, 6))}
                maxLength={6}
                placeholder="000000"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
              />
            </div>

            <button
              onClick={() => setScreen('forgotPassword3')}
              className="text-sm text-primary hover:underline mb-8"
            >
              Resend code in 1:52
            </button>

            <p className="text-sm text-muted-foreground mb-6 p-4 bg-secondary rounded-lg">
              <span className="font-semibold">BudgetBuddy Street</span><br/>
              Bitcoin Wallet
            </p>

            <button
              onClick={handleNext}
              disabled={code.length !== 6}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify & Continue
            </button>
          </>
        )}

        {stepNumber === 3 && (
          <>
            <Shield className="text-primary mb-4" size={32} />
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Secure your account</h1>
            <p className="text-gray-600 mb-8 text-base">Set a new password for your account</p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <div className="flex gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">At least 8 characters</p>
                  <p className="text-sm text-green-700">Includes numbers and symbols</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={newPassword.length < 8 || newPassword !== confirmPassword}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>

            <button
              onClick={() => setScreen('signin')}
              className="w-full text-center text-primary py-3 font-semibold hover:underline"
            >
              Need help? Contact BudgetBuddy Support
            </button>
          </>
        )}
      </div>
    </div>
  )
}
