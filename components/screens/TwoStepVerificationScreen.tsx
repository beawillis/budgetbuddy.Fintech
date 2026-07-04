'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/AppContext'
import { api } from '@/lib/api'
import { ArrowLeft, Copy, Check, Download } from 'lucide-react'

export default function TwoStepVerificationScreen() {
  const { setScreen } = useApp()
  const [step, setStep] = useState<'menu' | 'setup' | 'verify' | 'backup'>('menu')
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Check 2FA status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await api.getTwoFactorStatus()
        setEnabled(status.enabled)
      } catch (err) {
        console.error('Failed to check 2FA status:', err)
      }
    }
    checkStatus()
  }, [])

  const handleSetupTwoFactor = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const result = await api.setupTwoFactor()
      setQrCode(result.qrCode)
      setSecret(result.secret)
      setBackupCodes(result.backupCodes)
      setStep('verify')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to setup 2FA')
    } finally {
      setLoading(false)
    }
  }

  const handleEnableTwoFactor = async () => {
    setLoading(true)
    setErrorMessage('')
    if (!verificationCode.trim()) {
      setErrorMessage('Please enter the 6-digit code from your authenticator app')
      setLoading(false)
      return
    }
    try {
      await api.enableTwoFactor({
        secret,
        verificationCode,
        backupCodes,
      })
      setSuccessMessage('Two-step verification enabled successfully!')
      setStep('backup')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleDisableTwoFactor = async () => {
    setLoading(true)
    setErrorMessage('')
    if (!password.trim()) {
      setErrorMessage('Please enter your password')
      setLoading(false)
      return
    }
    try {
      await api.disableTwoFactor({ password })
      setEnabled(false)
      setSuccessMessage('Two-step verification disabled')
      setTimeout(() => setStep('menu'), 1500)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to disable 2FA')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const downloadBackupCodes = () => {
    const content = `BudgetBuddy Two-Step Verification Backup Codes\n\nSave these codes in a safe place. Each code can be used once if you lose access to your authenticator app.\n\n${backupCodes.map((code, i) => `${i + 1}. ${code}`).join('\n')}`
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute('download', 'budgetbuddy-backup-codes.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            <h1 className="text-2xl font-semibold text-foreground">Two-Step Verification</h1>
            <p className="text-sm text-muted-foreground">Enhance your account security</p>
          </div>
        </header>

        {/* Menu State */}
        {step === 'menu' && (
          <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Status: {enabled ? 'Enabled' : 'Disabled'}</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                {enabled
                  ? 'Your account is protected with two-step verification'
                  : 'Add an extra layer of security to your account'}
              </p>

              {!enabled ? (
                <button
                  onClick={handleSetupTwoFactor}
                  disabled={loading}
                  className="w-full rounded-[16px] bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-primary/90 disabled:bg-gray-300"
                >
                  {loading ? 'Setting up...' : 'Enable Two-Step Verification'}
                </button>
              ) : (
                <button
                  onClick={() => setStep('verify')}
                  className="w-full rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Disable Two-Step Verification
                </button>
              )}
            </div>
          </section>
        )}

        {/* Verification Code Input State */}
        {step === 'verify' && enabled === false && (
          <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Step 1: Scan QR Code</h2>
              {qrCode && (
                <div className="mb-6 flex justify-center">
                  <img src={qrCode} alt="QR Code" className="h-48 w-48 rounded-lg border border-border p-2" />
                </div>
              )}
              <p className="mb-4 text-sm text-muted-foreground">
                Use an authenticator app (Google Authenticator, Microsoft Authenticator, Authy, etc.) to scan this QR code.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Step 2: Enter Code</h2>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  setErrorMessage('')
                }}
                placeholder="000000"
                maxLength={6}
                className="w-full rounded-[16px] border border-border bg-white px-4 py-3 text-center text-2xl font-mono tracking-widest text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="mt-2 text-xs text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={handleEnableTwoFactor}
              disabled={loading || verificationCode.length !== 6}
              className="mb-2 w-full rounded-[16px] bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-primary/90 disabled:bg-gray-300 disabled:shadow-none"
            >
              {loading ? 'Verifying...' : 'Verify & Enable'}
            </button>

            <button
              onClick={() => {
                setStep('menu')
                setVerificationCode('')
                setErrorMessage('')
              }}
              className="w-full rounded-[16px] border border-border bg-white px-4 py-3 font-semibold text-foreground transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </section>
        )}

        {/* Backup Codes State */}
        {step === 'backup' && (
          <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
            <div className="mb-6 rounded-[16px] border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">⚠️ Save Your Backup Codes</p>
              <p className="mt-1 text-xs text-amber-800">
                If you lose access to your authenticator app, you'll need these codes to access your account.
              </p>
            </div>

            <div className="mb-6 space-y-2">
              {backupCodes.map((code) => (
                <div key={code} className="flex items-center justify-between rounded-[12px] bg-gray-100 px-3 py-2">
                  <code className="font-mono text-sm font-semibold text-foreground">{code}</code>
                  <button
                    onClick={() => copyToClipboard(code)}
                    className="rounded p-1 hover:bg-gray-200"
                  >
                    {copiedCode === code ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-500" />}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={downloadBackupCodes}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-[16px] border border-border bg-white px-4 py-3 font-semibold text-foreground transition hover:bg-gray-50"
            >
              <Download size={18} />
              Download Backup Codes
            </button>

            <button
              onClick={() => {
                setEnabled(true)
                setStep('menu')
                setSuccessMessage('Two-step verification is now active!')
              }}
              className="w-full rounded-[16px] bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-primary/90"
            >
              Done
            </button>
          </section>
        )}

        {/* Disable State */}
        {step === 'verify' && enabled && (
          <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
            <div className="mb-6 rounded-[16px] border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-900">⚠️ Disable Two-Step Verification</p>
              <p className="mt-1 text-xs text-red-800">
                Disabling this will make your account less secure. You'll only need your password to sign in.
              </p>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-foreground">Enter Password to Confirm</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrorMessage('')
                }}
                placeholder="Enter your password"
                className="w-full rounded-[16px] border border-border bg-white px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={handleDisableTwoFactor}
              disabled={loading || !password.trim()}
              className="mb-2 w-full rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-500"
            >
              {loading ? 'Disabling...' : 'Disable Two-Step Verification'}
            </button>

            <button
              onClick={() => setStep('menu')}
              className="w-full rounded-[16px] border border-border bg-white px-4 py-3 font-semibold text-foreground transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </section>
        )}

        {successMessage && (
          <div className="rounded-[16px] border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-semibold text-green-600">✓ {successMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
