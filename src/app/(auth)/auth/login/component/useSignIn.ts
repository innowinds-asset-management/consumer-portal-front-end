'use client'
import { useNotificationContext } from '@/context/useNotificationContext'
import { useAuth } from '@/stores/authStore'
import { debugUtils } from '@/utils/debug'

import useQueryParams from '@/hooks/useQueryParams'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { authService } from '@/services/api/auth'


const useSignIn = () => {
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();
  const searchParams = useSearchParams()
  const { showNotification } = useNotificationContext()

  const { login: authLogin } = useAuth()

  const queryParams = useQueryParams()

  const loginFormSchema = yup.object({
    userId: yup.string().required('Please enter your user ID'),
    password: yup.string().required('Please enter your password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  type LoginFormFields = yup.InferType<typeof loginFormSchema>

  const performLogin = async (values: LoginFormFields) => {
    setLoading(true)
    setError(null) // Clear any previous errors
    
    try {
      // Use authService instead of NextAuth
      const response = await authService.login({
        userId: values.userId,
        password: values.password,
      })
      
      // LoginResponse contains: success, message, data: { token, refreshToken, user }
      if (response.success && response.data?.user && response.data?.token) {
        // Use auth context to update global state (this also stores in localStorage)
        await authLogin({
          userId: values.userId,
          password: values.password,
        })        
        // Get redirectTo param from URL
        const redirectTo = searchParams.get('redirectTo')
        router.replace(redirectTo || '/dashboard') // Use replace to avoid going back to login
        showNotification({ 
          message: 'Successfully logged in. Redirecting....', 
          variant: 'success' 
        })
      }
    } catch (error: any) {
      // Handle specific error types
      let errorMessage = 'Invalid username or password.'
      
      // Check for specific error types
      if (error?.statusCode === 429 || error?.message?.includes('Too many requests')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.'
      } else if (error?.statusCode === 401 || error?.statusCode === 403) {
        errorMessage = 'Invalid credentials. Please check your user ID and password.'
      } else if (error?.statusCode === 500 || error?.statusCode === 502 || error?.statusCode === 503) {
        errorMessage = 'Server error. Please try again later.'
      } else if (error?.message && !error.message.includes('Invalid credentials')) {
        // Use server error message if it's not already "Invalid credentials"
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const login = handleSubmit(performLogin)

  // Manual reset function for debugging
  const resetLoginState = () => {
    setLoading(false)
    debugUtils.clearAuthStorage()
    showNotification({
      message: 'Login state reset. You can try logging in again.',
      variant: 'info'
    })
  }

  return { loading, login, control, error, resetLoginState }
}

export default useSignIn
