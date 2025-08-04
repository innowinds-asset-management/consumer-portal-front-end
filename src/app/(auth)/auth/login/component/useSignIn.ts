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
  const router = useRouter();
  const searchParams = useSearchParams()
  const { showNotification } = useNotificationContext()

  const { login: authLogin } = useAuth()

  const queryParams = useQueryParams()

  const loginFormSchema = yup.object({
    userId: yup.string().required('Please enter your user Id'),
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
    
    // Debug: Check auth state before login
    debugUtils.checkAuthState()
    debugUtils.logApiRequest('/auth/login', values)
    
    try {
      // Use authService instead of NextAuth
      const response = await authService.login({
        userId: values.userId,
        password: values.password,
      })
      
      // LoginResponse contains: user, token, refreshToken, expiresAt
      if (response.user && response.token) {
        debugUtils.logApiResponse(response)
        
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
      debugUtils.logApiResponse(null, error) // Debug logging
      
      // Handle specific error types
      let errorMessage = 'Login failed. Please try again.'
      
      if (error?.message) {
        errorMessage = error.message
      } else if (error?.error) {
        errorMessage = error.error
      }
      
      // Handle rate limiting - show message but don't auto-retry
      if (error?.statusCode === 429 || errorMessage.includes('Too many requests')) {
        errorMessage = 'Too many requests. Please wait a moment and try again manually.'
        console.log('Rate limited. Please try again manually.') // Debug logging
      }
      
      showNotification({ 
        message: errorMessage, 
        variant: 'danger' 
      })
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

  return { loading, login, control, resetLoginState }
}

export default useSignIn
