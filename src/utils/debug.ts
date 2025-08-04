// Debug utility for troubleshooting
export const debugUtils = {
  // Clear all auth-related localStorage
  clearAuthStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      console.log('✅ Cleared auth storage')
    }
  },

  // Check current auth state
  checkAuthState() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('auth_token')
      const refreshToken = localStorage.getItem('refresh_token')
      console.log('🔍 Auth State:', {
        authToken: authToken ? 'exists' : 'missing',
        refreshToken: refreshToken ? 'exists' : 'missing',
        timestamp: new Date().toISOString()
      })
    }
  },

  // Log API request details
  logApiRequest(endpoint: string, data?: any) {
    console.log('📡 API Request:', {
      endpoint,
      data: data ? { ...data, password: '[HIDDEN]' } : undefined,
      timestamp: new Date().toISOString()
    })
  },

  // Log API response
  logApiResponse(response: any, error?: any) {
    if (error) {
      console.log('❌ API Error:', {
        error,
        timestamp: new Date().toISOString()
      })
    } else {
      console.log('✅ API Success:', {
        response: response ? { ...response, token: '[HIDDEN]' } : undefined,
        timestamp: new Date().toISOString()
      })
    }
  },

  // Complete reset function
  resetEverything() {
    if (typeof window !== 'undefined') {
      // Clear localStorage
      this.clearAuthStorage()
      
      // Clear sessionStorage
      sessionStorage.clear()
      
      // Reload page to reset all state
      window.location.reload()
      
      console.log('🔄 Complete reset performed. Page will reload.')
    }
  }
}

// Make debugUtils available globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).debugUtils = debugUtils
  console.log('🔧 Debug utils available. Use: debugUtils.resetEverything() to reset everything.')
} 