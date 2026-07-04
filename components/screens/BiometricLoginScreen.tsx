'use client'

import { useState, useEffect } from 'react'
import { useApp } from '@/lib/AppContext'
import { ArrowLeft, Fingerprint, Check, AlertCircle } from 'lucide-react'

export default function BiometricLoginScreen() {
  const { setScreen } = useApp()
  const [biometricAvailable, setBiometricAvailable] = useState(false)
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Check if WebAuthn is available
  useEffect(() => {
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((available) => {
        setBiometricAvailable(available)
        // Check if already registered
        const stored = localStorage.getItem('budgetbuddy.biometric')
        setEnabled(!!stored)
        if (stored) {
          try {
            const data = JSON.parse(stored)
            setBiometricType(data.type)
          } catch (err) {
            console.error('Failed to parse biometric data:', err)
          }
        }
      })
    }
  }, [])

  const handleRegisterBiometric = async () => {
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn is not supported on this device')
      }

      const credentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: {
          name: 'BudgetBuddy',
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: localStorage.getItem('budgetbuddy.email') || 'user@budgetbuddy.app',
          displayName: localStorage.getItem('budgetbuddy.userName') || 'BudgetBuddy User',
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'preferred',
        },
        timeout: 60000,
        attestation: 'direct',
      }

      const credential = (await navigator.credentials.create({
        publicKey: credentialCreationOptions,
      })) as PublicKeyCredential | null

      if (!credential) {
        throw new Error('Failed to create biometric credential')
      }

      // Determine biometric type
      let type: 'fingerprint' | 'face' = 'fingerprint'
      if (credential.response instanceof AuthenticatorAttestationResponse) {
        const attestationObject = new Uint8Array(credential.response.attestationObject)
        // This is a simplified check - in production, you'd parse the CBOR data properly
        type = 'fingerprint' // Default to fingerprint
      }

      // Store credential ID locally
      const credentialData = {
        id: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(credential.rawId)))),
        type,
        enabled: true,
        registeredAt: new Date().toISOString(),
      }

      localStorage.setItem('budgetbuddy.biometric', JSON.stringify(credentialData))

      setEnabled(true)
      setBiometricType(type)
      setSuccessMessage('Biometric login successfully registered!')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to register biometric'
      setErrorMessage(errorMsg)
      console.error('Biometric registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveBiometric = async () => {
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      localStorage.removeItem('budgetbuddy.biometric')
      setEnabled(false)
      setBiometricType(null)
      setSuccessMessage('Biometric login has been removed')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to remove biometric')
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
            <h1 className="text-2xl font-semibold text-foreground">Biometric Login</h1>
            <p className="text-sm text-muted-foreground">Faster, more secure sign-in</p>
          </div>
        </header>

        <section className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Fingerprint size={32} className="text-blue-600" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Status: {enabled ? 'Enabled' : 'Disabled'}</h2>

            {!biometricAvailable ? (
              <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-amber-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-amber-900">Biometric Not Available</p>
                    <p className="mt-1 text-xs text-amber-800">
                      Your device doesn't support fingerprint or face recognition. This feature requires a compatible device with Windows Hello, Touch ID, or
                      similar technology.
                    </p>
                  </div>
                </div>
              </div>
            ) : enabled ? (
              <div>
                <div className="mb-6 rounded-[16px] border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-2">
                    <Check size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-900">Biometric Enabled</p>
                      <p className="mt-1 text-xs text-green-800">
                        You can now sign in using your {biometricType === 'face' ? 'face' : 'fingerprint'}.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleRemoveBiometric}
                  disabled={loading}
                  className="w-full rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {loading ? 'Removing...' : 'Remove Biometric Login'}
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-6 text-sm text-muted-foreground">
                  Set up biometric authentication to quickly and securely sign in to your account. Your biometric data is stored locally on your device and is never sent
                  to our servers.
                </p>
                <button
                  onClick={handleRegisterBiometric}
                  disabled={loading}
                  className="mb-4 w-full rounded-[16px] bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {loading ? 'Setting up...' : 'Register Biometric'}
                </button>
              </div>
            )}
          </div>
        </section>

        {errorMessage && (
          <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="rounded-[16px] border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-semibold text-green-600">✓ {successMessage}</p>
          </div>
        )}

        <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-foreground">How It Works</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Your biometric data is stored locally on your device</li>
            <li>• Only verified fingerprint/face can unlock your account</li>
            <li>• You can still sign in with your password anytime</li>
            <li>• Disable anytime from this screen</li>
          </ul>
        </section>

        {biometricAvailable && (
          <section className="rounded-[28px] border border-border bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Security Note</h3>
            <p className="text-xs text-muted-foreground">
              Biometric authentication is optional. You can always sign in with your email and password. For maximum security, consider enabling both biometric login and two-step verification.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
