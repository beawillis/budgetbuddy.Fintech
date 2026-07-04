const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://budgetbuddy-backend-production-81d7.up.railway.app'

async function request<T>(path: string, options: RequestInit = {}, auth = true): Promise<T> {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('budgetbuddy.token') : null
  const headers: Record<string, string> = {}

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth && !token) {
    throw new Error('Authentication required. Please sign in.')
  }

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text().catch(() => null)

  if (!response.ok) {
    let message = 'Request failed'
    
    if (response.status === 401) {
      message = 'Session expired. Please sign in again.'
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('budgetbuddy.token')
        window.localStorage.removeItem('budgetbuddy.user')
      }
    } else if (data && typeof data === 'object' && 'message' in data) {
      message = String((data as { message?: unknown }).message)
    }
    
    throw new Error(message)
  }

  return data as T
}

export const api = {
  health: () => request<{ success?: boolean; message?: string }>('/health'),

  register: (payload: { name: string; email: string; password: string }) =>
    request<{ user: unknown; token: string }>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  login: (payload: { email: string; password: string }) =>
    request<{ user: unknown; token: string }>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  forgotPassword: (payload: { email: string }) =>
    request<{ message: string }>('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  verifyResetCode: (payload: { email: string; code: string }) =>
    request<{ message: string }>('/api/v1/auth/verify-reset-code', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  resetPassword: (payload: { email: string; code: string; newPassword: string }) =>
    request<{ message: string }>('/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  getProfile: () => request('/api/v1/users/profile'),
  updateProfile: (payload: Record<string, unknown>) =>
    request('/api/v1/users/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  uploadAvatar: (formData: FormData) =>
    request('/api/v1/users/avatar', {
      method: 'POST',
      body: formData,
    }),

  changePassword: (payload: { currentPassword: string; newPassword: string }) =>
    request<{ message: string }>('/api/v1/users/change-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Two-Factor Authentication
  setupTwoFactor: () =>
    request<{ secret: string; qrCode: string; backupCodes: string[] }>('/api/v1/auth/2fa/setup', {
      method: 'POST',
    }),

  enableTwoFactor: (payload: { secret: string; verificationCode: string; backupCodes: string[] }) =>
    request<{ message: string }>('/api/v1/auth/2fa/enable', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  disableTwoFactor: (payload: { password: string }) =>
    request<{ message: string }>('/api/v1/auth/2fa/disable', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  verifyTwoFactor: (payload: { token: string; secret: string; backupCodes: string[] }) =>
    request<{ success: boolean; type: string }>('/api/v1/auth/2fa/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getTwoFactorStatus: () =>
    request<{ enabled: boolean }>('/api/v1/auth/2fa/status', {
      method: 'GET',
    }),

  getDashboard: () => request('/api/v1/dashboard'),
  getWalletSummary: () => request('/api/v1/wallet/summary'),

  getTransactions: () => request('/api/v1/transactions'),
  createTransaction: (payload: Record<string, unknown>) =>
    request('/api/v1/transactions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  deleteTransaction: (id: string) => request(`/api/v1/transactions/${id}`, { method: 'DELETE' }),

  getCategories: () => request('/api/v1/categories'),
  createCategory: (payload: { name: string }) =>
    request('/api/v1/categories', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  deleteCategory: (id: string) => request(`/api/v1/categories/${id}`, { method: 'DELETE' }),

  listGoals: () => request('/api/v1/goals'),
  createGoal: (payload: { name: string; target: number; deadline?: string }) =>
    request('/api/v1/goals', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  depositGoal: (id: string, amount: number) =>
    request(`/api/v1/goals/${id}/deposit`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),

  startChallenge: (expense: number) =>
    request('/api/v1/challenge/start', {
      method: 'POST',
      body: JSON.stringify({ expense }),
    }),
  getChallenge: () => request('/api/v1/challenge'),

  getEmergency: () => request('/api/v1/emergency'),

  startSavingsPlan: (target: number) =>
    request('/api/v1/savings/start', {
      method: 'POST',
      body: JSON.stringify({ target }),
    }),
  depositSavings: (amount: number) =>
    request('/api/v1/savings/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),
  getSavingsStatus: () => request('/api/v1/savings/status'),

  calculateLoan: (payload: { amount: number; interestRate: number; term: number }) =>
    request('/api/v1/loans/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),
  saveLoan: (payload: { amount: number; interestRate: number; term: number }) =>
    request('/api/v1/loans/save', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  simulateInvestment: (payload: { principal: number; rate: number; years: number }) =>
    request('/api/v1/investments/simulate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, false),

  getNotifications: () => request('/api/v1/notifications'),

  getAnalyticsSummary: () => request('/api/v1/analytics/summary'),

  assistantChat: (message: string) =>
    request('/api/v1/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
}
