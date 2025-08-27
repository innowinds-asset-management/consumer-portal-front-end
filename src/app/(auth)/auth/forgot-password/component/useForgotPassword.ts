'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/api/auth'
import { useNotificationContext } from '@/context/useNotificationContext'

interface ForgotPasswordFormData {
  email: string
}

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
})

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { showNotification } = useNotificationContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      setError(null) // Clear any previous errors
      
      await authService.forgotPassword(values.email)
      
      showNotification({
        title: 'Success',
        message: 'Reset password link has been sent to your email',
        variant: 'success',
      })
      
      // Redirect to login page after successful submission
      router.push('/auth/login')
    } catch (error: any) {
      let errorMessage = 'An error occurred while processing your request'
      
      if (error.message) {
        if (error.message.includes('User not found') || error.message.includes('404')) {
          errorMessage = 'No account found with this email address'
        } else if (error.message.includes('400')) {
          errorMessage = 'Please enter a valid email address'
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    error,
    errors,
  }
}
