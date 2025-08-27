'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authService } from '@/services/api/auth'
import { useNotificationContext } from '@/context/useNotificationContext'

interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
})

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showNotification } = useNotificationContext()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    setToken(tokenParam)
  }, [searchParams])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!token) {
      showNotification({
        title: 'Error',
        message: 'Invalid reset token',
        variant: 'danger',
      })
      return
    }

    try {
      setIsLoading(true)
      
      await authService.resetPassword(token, values.password, values.confirmPassword)
      
      showNotification({
        title: 'Success',
        message: 'Password has been reset successfully',
        variant: 'success',
      })
      
      // Redirect to login page after successful password reset
      router.push('/auth/login')
    } catch (error: any) {
      console.error('Reset password error:', error)
      
      let errorMessage = 'An error occurred while resetting your password'
      
      if (error.message) {
        if (error.message.includes('Invalid or expired reset token')) {
          errorMessage = 'The reset link is invalid or has expired. Please request a new one.'
        } else if (error.message.includes('400')) {
          errorMessage = 'Please check your password requirements'
        } else if (error.message.includes('404')) {
          errorMessage = 'Invalid reset token. Please request a new password reset link.'
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later'
        } else {
          errorMessage = error.message
        }
      }
      
      showNotification({
        title: 'Error',
        message: errorMessage,
        variant: 'danger',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    token,
    errors,
  }
}
