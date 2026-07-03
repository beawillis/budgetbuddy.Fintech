'use client'

import { useApp } from '@/lib/AppContext'
import { useState } from 'react'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'

export default function SignUpScreen() {
  const { setScreen } = useApp()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const passwordStrength = password.length > 0 ? Math.min(password.length / 2, 3) : 0
  const passwordValid = password.length >= 8 && password === confirmPassword

  const handleSignUp = () => {
    if (fullName && email && passwordValid && agreedToTerms) {
      setScreen('accountCreated')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button onClick={() => setScreen('signin')} className="p-2">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          B
        </div>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col overflow-y-auto pb-40">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Create your BudgetBuddy account.</h1>
        <p className="text-gray-600 mb-8 text-base">Start building smarter saving habits</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < Math.ceil(passwordStrength)
                          ? 'bg-green-500'
                          : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {passwordStrength < 2 && 'Weak password'}
                  {passwordStrength >= 2 && passwordStrength < 3 && 'Good password'}
                  {passwordStrength >= 3 && 'Strong password'}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 rounded border-gray-400 mt-1"
            />
            <span className="text-sm text-gray-700 font-medium">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
        </div>

        <button
          onClick={handleSignUp}
          disabled={!passwordValid || !agreedToTerms || !fullName || !email}
          className="w-full bg-purple-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          Create Account
        </button>

        <p className="text-center text-gray-700 font-medium">
          Already have an account?{' '}
          <button onClick={() => setScreen('signin')} className="text-purple-600 font-bold hover:text-purple-700">
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
