const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://budgetbuddy-backend-production-81d7.up.railway.app'

type ReportPeriod = 'weekly' | 'monthly' | 'yearly'

function unwrapPayload<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && !Array.isArray(payload) && 'data' in payload) {
    return (payload as { data?: T }).data as T
  }

  return payload as T
}

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
  const payload = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text().catch(() => null)

  if (!response.ok) {
    let message = 'Request failed'

    if (response.status === 401) {
      message = 'Session expired. Please sign in again.'
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('budgetbuddy.token')
        window.localStorage.removeItem('budgetbuddy.user')
      }
    } else if (payload && typeof payload === 'object' && 'message' in payload) {
      message = String((payload as { message?: unknown }).message)
    } else if (payload && typeof payload === 'object' && 'error' in payload) {
      message = String((payload as { error?: unknown }).error)
    }

    throw new Error(message)
  }

  return unwrapPayload<T>(payload)
}

async function requestBlob(path: string, options: RequestInit = {}, auth = true): Promise<Blob> {
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

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text().catch(() => null)
    const message = payload && typeof payload === 'object' && 'message' in payload
      ? String((payload as { message?: unknown }).message)
      : 'Unable to download report'

    throw new Error(message)
  }

  return response.blob()
}

async function requestWithFallback<T>(paths: string[], options: RequestInit = {}, auth = true): Promise<T> {
  let lastError: unknown

  for (const path of paths) {
    try {
      return await request<T>(path, options, auth)
    } catch (err) {
      lastError = err
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Request failed')
}

async function requestBlobWithFallback(paths: string[], options: RequestInit = {}, auth = true): Promise<Blob> {
  let lastError: unknown

  for (const path of paths) {
    try {
      return await requestBlob(path, options, auth)
    } catch (err) {
      lastError = err
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Unable to download report')
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

  getReportSummary: (period: ReportPeriod = 'monthly') =>
    requestWithFallback<Record<string, unknown>>([
      `/api/v1/reports/summary?period=${period}`,
      `/api/v1/reports?period=${period}`,
      `/api/v1/reports/${period}`,
      '/api/v1/analytics/summary',
    ]),

  downloadReportPdf: (period: ReportPeriod = 'monthly') =>
    requestBlobWithFallback([
      `/api/v1/reports/pdf?period=${period}`,
      `/api/v1/reports/download?period=${period}`,
      `/api/v1/reports/${period}/pdf`,
      `/api/v1/reports/generate-pdf?period=${period}`,
    ]),

  emailReport: (period: ReportPeriod = 'monthly') =>
    requestWithFallback<{ message?: string }>([
      `/api/v1/reports/email?period=${period}`,
      `/api/v1/reports/send-email?period=${period}`,
      `/api/v1/reports/${period}/email`,
    ], {
      method: 'POST',
      body: JSON.stringify({ period }),
    }),

  assistantChat: (message: string) =>
    request('/api/v1/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
}
