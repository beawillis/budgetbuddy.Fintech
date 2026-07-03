'use client'

import { useApp } from '@/lib/AppContext'
import { useState } from 'react'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'

export default function SignInScreen() {
  const { setScreen } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = () => {
    if (email && password) {
      setScreen('loginSuccess')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button onClick={() => setScreen('onboarding1')} className="p-2">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          B
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Welcome back! 👋</h1>
        <p className="text-gray-600 mb-8 text-base">Continue building your financial future</p>

        {/* Form */}
        <div className="space-y-4 mb-8">
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
                placeholder="Enter your password"
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-400" />
              <span className="text-sm font-medium text-gray-900">Remember me</span>
            </label>
            <button
              onClick={() => setScreen('forgotPassword1')}
              className="text-sm font-semibold text-purple-700 hover:text-purple-800"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-purple-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-800 mb-4"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm font-medium text-gray-700">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 py-3 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 py-3 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 21h-3.72v-5.6h-2.25V21H7.07V9.9h3.01V7.3c0-2.49 1.48-3.85 3.75-3.85 1.06 0 1.98.08 2.24.11v2.59h-1.54c-1.2 0-1.43.57-1.43 1.4v1.83h2.87l-.37 2.5h-2.5V21z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-700 font-medium">
          Don&apos;t have an account?{' '}
          <button onClick={() => setScreen('signup')} className="text-purple-700 font-bold hover:text-purple-800">
            Sign up
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border text-center text-xs text-gray-600 font-medium">
        <p>Your data is secure and encrypted</p>
      </div>
    </div>
  )
}
