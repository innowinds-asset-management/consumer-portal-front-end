'use client'
import React, { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from 'react'
import { User, AuthState } from '@/types/admin'
import { authService, LoginCredentials } from '@/services/api/auth'
import { STORAGE_KEYS } from '@/utils/constants'

// Backend user response type
interface BackendUser {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  consumerId: string
  userId: string
  createdAt: string
  updatedAt: string
  consumer?: {
    id: string
    email: string | null
    phone: string | null
    company: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    country: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER_START' }
  | { type: 'LOAD_USER_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_FAILURE' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    
    case 'LOAD_USER_START':
      return {
        ...state,
        loading: true,
      }
    
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      }
    
    case 'LOAD_USER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    
    default:
      return state
  }
}

// Context interface
interface AuthContextType extends AuthState {
  login: (credentials: { userId: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  loadUser: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  clearError: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const lastApiCallRef = useRef<number>(0)

  // Rate limiting helper
  const isRateLimited = () => {
    const now = Date.now()
    const timeSinceLastCall = now - lastApiCallRef.current
    const minInterval = 1000 // 1 second between API calls
    
    if (timeSinceLastCall < minInterval) {
      console.log(`⚠️ Rate limiting: ${minInterval - timeSinceLastCall}ms remaining`)
      return true
    }
    
    lastApiCallRef.current = now
    return false
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.authToken)
    if (token) {
      // Only load user if we're not on login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
        // Define loadUser function inline to avoid dependency issues
        const loadUserFromStorage = async () => {
          if (isRateLimited()) return
          
          try {
            dispatch({ type: 'LOAD_USER_START' })
            
            // Use the real profile endpoint
            const user: BackendUser = await authService.getProfile()

            // console.log('user', user)
            
            // Transform the backend user data to match frontend User type
            const transformedUser: User = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role.toLowerCase() as 'admin' | 'user',
              status: user.isActive ? 'active' as const : 'inactive' as const,
              avatar: '',
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              preferences: {
                theme: 'light' as const,
                language: 'en',
                timezone: 'UTC',
                notifications: {
                  email: true,
                  push: true,
                  sms: false,
                  frequency: 'immediate' as const,
                },
              },
            }
            
            dispatch({ type: 'LOAD_USER_SUCCESS', payload: transformedUser })
          } catch (error) {
            console.error('Failed to load user:', error)
            
            // Clear invalid tokens
            localStorage.removeItem(STORAGE_KEYS.authToken)
            localStorage.removeItem(STORAGE_KEYS.refreshToken)
            
            dispatch({ type: 'LOAD_USER_FAILURE' })
          }
        }
        loadUserFromStorage()
      } else {
        // If on login page, still mark as not loading
        dispatch({ type: 'LOAD_USER_FAILURE' })
      }
    } else {
      // No token found, mark as not loading
      dispatch({ type: 'LOAD_USER_FAILURE' })
    }
  }, [])

  // Login function
  const login = async (credentials: { userId: string; password: string }) => {
    if (isRateLimited()) {
      throw new Error('Please wait a moment before trying again')
    }
    
    try {
      dispatch({ type: 'LOGIN_START' })
      
      const response = await authService.login(credentials)
      
      // Store token in localStorage
      localStorage.setItem(STORAGE_KEYS.authToken, response.data.token)
      // localStorage.setItem(STORAGE_KEYS.refreshToken, response.data.refreshToken)
      // localStorage.setItem(STORAGE_KEYS.consumerId, JSON.stringify((response.data.user as any).consumerId || 'cons_it_dept'))
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: response.data.user, token: response.data.token } 
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage })
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    if (isRateLimited()) {
      console.log('⚠️ Logout rate limited, skipping API call')
      // Still clear localStorage and update state
      localStorage.removeItem(STORAGE_KEYS.authToken)
      localStorage.removeItem(STORAGE_KEYS.refreshToken)
      dispatch({ type: 'LOGOUT' })
      return
    }
    
    console.log('🔄 Logout called from:', new Error().stack?.split('\n')[2]?.trim() || 'unknown location')
    try {
      // await authService.logout()
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.authToken)
      localStorage.removeItem(STORAGE_KEYS.refreshToken)
      
      dispatch({ type: 'LOGOUT' })
      console.log('✅ Logout completed successfully')
    }
  }

  // Load user function
  const loadUser = async () => {
    try {
      dispatch({ type: 'LOAD_USER_START' })
      
      const user: BackendUser = await authService.getProfile()
      
      // Transform the backend user data to match frontend User type
      const transformedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase() as 'admin' | 'user',
        status: user.isActive ? 'active' as const : 'inactive' as const,
        avatar: '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            push: true,
            sms: false,
            frequency: 'immediate' as const,
          },
        },
      }
      
      dispatch({ type: 'LOAD_USER_SUCCESS', payload: transformedUser })
    } catch (error) {
      console.error('Failed to load user:', error)
      
      // Clear invalid tokens
      localStorage.removeItem(STORAGE_KEYS.authToken)
      localStorage.removeItem(STORAGE_KEYS.refreshToken)
      
      dispatch({ type: 'LOAD_USER_FAILURE' })
    }
  }

  // Update user function
  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(userData)
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    loadUser,
    updateUser,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 