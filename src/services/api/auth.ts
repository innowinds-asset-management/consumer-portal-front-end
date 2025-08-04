import { http, apiUtils } from '../http'
import { API_CONFIG } from '@/utils/constants'
import { 
  LoginCredentials, 
  LoginResponse, 
  User, 
  ApiResponse,
  RefreshResponse 
} from '@/types/admin'

// Authentication API service
export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await http.post<ApiResponse<LoginResponse>>(
      API_CONFIG.endpoints.auth.login,
      credentials
    )    
    return apiUtils.handleApiResponse<LoginResponse>(response)
  },

  // Logout user
  async logout(): Promise<void> {
    await http.post<ApiResponse<void>>(API_CONFIG.endpoints.auth.logout)
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await http.get<ApiResponse<User>>(
      API_CONFIG.endpoints.auth.profile
    )
    return apiUtils.handleApiResponse<User>(response)
  },

  // Refresh access token
  async refreshToken(): Promise<RefreshResponse> {
    const response = await http.post<ApiResponse<RefreshResponse>>(
      API_CONFIG.endpoints.auth.refresh
    )
    return apiUtils.handleApiResponse<RefreshResponse>(response)
  },

  // Register new user
  async register(userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }): Promise<LoginResponse> {
    const response = await http.post<ApiResponse<LoginResponse>>(
      API_CONFIG.endpoints.auth.register,
      userData
    )
    return apiUtils.handleApiResponse<LoginResponse>(response)
  },

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await http.post<ApiResponse<{ message: string }>>(
      '/auth/forgot-password',
      { email }
    )
    return apiUtils.handleApiResponse<{ message: string }>(response)
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await http.post<ApiResponse<{ message: string }>>(
      '/auth/reset-password',
      { token, password }
    )
    return apiUtils.handleApiResponse<{ message: string }>(response)
  },

  // Change password
  async changePassword(data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<{ message: string }> {
    const response = await http.post<ApiResponse<{ message: string }>>(
      '/auth/change-password',
      data
    )
    return apiUtils.handleApiResponse<{ message: string }>(response)
  },

  // Update profile
  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await http.put<ApiResponse<User>>(
      API_CONFIG.endpoints.auth.profile,
      profileData
    )
    return apiUtils.handleApiResponse<User>(response)
  },

  // Verify email
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await http.post<ApiResponse<{ message: string }>>(
      '/auth/verify-email',
      { token }
    )
    return apiUtils.handleApiResponse<{ message: string }>(response)
  },

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await http.post<ApiResponse<{ message: string }>>(
      '/auth/resend-verification',
      { email }
    )
    return apiUtils.handleApiResponse<{ message: string }>(response)
  },
} 