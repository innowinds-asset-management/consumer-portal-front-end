import { API_URL } from '@/config/environment'
import { User } from '@/types/admin'

// Auth interfaces
export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
    user: User;
  };
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Create a separate HTTP client for auth API calls
class AuthHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = API_URL
    this.defaultHeaders = { 'Content-Type': 'application/json' }
    console.log('AuthHttpClient initialized with baseURL:', this.baseURL)
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      console.log(`Making request to: ${url}`)
      
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const res = await fetch(url, { 
        headers: this.defaultHeaders, 
        ...options,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!res.ok) {
        const errorText = await res.text()
        console.error(`HTTP error ${res.status} for ${url}:`, errorText)
        throw new Error(`HTTP error ${res.status}: ${errorText}`)
      }
      
      const data = await res.json()
      console.log(`Response from ${url}:`, data)
      return data
    } catch (error) {
      console.error(`Request failed for ${url}:`, error)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - server not responding')
      }
      throw error
    }
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'GET' }) }
  post<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }) }
  put<T>(endpoint: string, body: any) { return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }) }
  delete<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'DELETE' }) }
}

const authHttp = new AuthHttpClient()

// Auth API service
class AuthService {

  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await authHttp.post<LoginResponse>('/auth/login', credentials)
      return response
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await authHttp.post<void>('/auth/logout', {})
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    try {
      const response = await authHttp.get<User>('/auth/profile')
      return response
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  // Refresh access token
  async refreshToken(): Promise<RefreshResponse> {
    try {
      const response = await authHttp.post<RefreshResponse>('/auth/refresh', {})
      return response
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw error
    }
  }

  // Register new user
  async register(userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }): Promise<LoginResponse> {
    try {
      const response = await authHttp.post<LoginResponse>('/auth/register', userData)
      return response
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await authHttp.post<{ message: string }>('/auth/forgot-password', { email })
      return response
    } catch (error) {
      console.error('Error requesting password reset:', error)
      throw error
    }
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    try {
      const response = await authHttp.post<{ message: string }>('/auth/reset-password', { token, password })
      return response
    } catch (error) {
      console.error('Error resetting password:', error)
      throw error
    }
  }

  // Change password
  async changePassword(data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<{ message: string }> {
    try {
      const response = await authHttp.post<{ message: string }>('/auth/change-password', data)
      return response
    } catch (error) {
      console.error('Error changing password:', error)
      throw error
    }
  }

  // Update profile
  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response = await authHttp.put<User>('/auth/profile', profileData)
      return response
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await authHttp.post<{ message: string }>('/auth/verify-email', { token })
      return response
    } catch (error) {
      console.error('Error verifying email:', error)
      throw error
    }
  }

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    try {
      const response = await authHttp.post<{ message: string }>('/auth/resend-verification', { email })
      return response
    } catch (error) {
      console.error('Error resending verification email:', error)
      throw error
    }
  }
}

export const authService = new AuthService() 