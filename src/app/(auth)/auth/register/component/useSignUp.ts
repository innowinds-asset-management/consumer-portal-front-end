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

const useSignUp = () => {
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();
  const searchParams = useSearchParams()
  const { showNotification } = useNotificationContext()

  const { login: authLogin } = useAuth()

  const queryParams = useQueryParams()

  const signUpFormSchema = yup.object({
    name: yup.string().required('Please enter your full name'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    company: yup.string().required('Please enter your company name'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .required('Please enter your password'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
    },
  })

  type SignUpFormFields = yup.InferType<typeof signUpFormSchema>

  const performSignUp = async (values: SignUpFormFields) => {
    setLoading(true)
    setError(null) // Clear any previous errors
    
    try {
      // Use authService for registration
      const response = await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        company: values.company,
      })
      
      // RegistrationResponse contains: success, message, data: { token, refreshToken, user }
      if (response.success && response.data?.user && response.data?.token) {
        // Use auth context to update global state (this also stores in localStorage)
        await authLogin({
          userId: values.email, // Use email as userId for login
          password: values.password,
        })        
        // Get redirectTo param from URL
        const redirectTo = searchParams.get('redirectTo')
        router.replace(redirectTo || '/dashboard') // Use replace to avoid going back to register
        showNotification({ 
          message: 'Account created successfully! Redirecting....', 
          variant: 'success' 
        })
      }
    } catch (error: any) {
      // Handle specific error types
      let errorMessage = 'Registration failed. Please try again.'
      
      // Check for specific error types
      if (error?.statusCode === 429 || error?.message?.includes('Too many requests')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.'
      } else if (error?.statusCode === 409 || error?.message?.includes('already exists')) {
        errorMessage = 'An account with this email already exists.'
      } else if (error?.statusCode === 400) {
        errorMessage = 'Invalid registration data. Please check your information.'
      } else if (error?.statusCode === 500 || error?.statusCode === 502 || error?.statusCode === 503) {
        errorMessage = 'Server error. Please try again later.'
      } else if (error?.message && !error.message.includes('Registration failed')) {
        // Use server error message if it's not already "Registration failed"
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = handleSubmit(performSignUp)

  // Manual reset function for debugging
  const resetSignUpState = () => {
    setLoading(false)
    setError(null)
    debugUtils.clearAuthStorage()
    showNotification({
      message: 'Sign up state reset. You can try registering again.',
      variant: 'info'
    })
  }

  return { loading, register, control, error, resetSignUpState }
}

export default useSignUp
