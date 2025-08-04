'use client'
import { useAuth } from '@/stores/authStore'
import { useNotificationContext } from '@/context/useNotificationContext'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const useLogout = () => {
  const { logout } = useAuth()
  const { showNotification } = useNotificationContext()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const lastLogoutRef = useRef<number>(0)

  const handleLogout = async (redirectTo?: string) => {
    // Prevent multiple logout calls
    if (isLoggingOut) {
      console.log('⚠️ Logout already in progress, ignoring duplicate call')
      return
    }
    
    // Rate limiting: 2 seconds between logout attempts
    const now = Date.now()
    const timeSinceLastLogout = now - lastLogoutRef.current
    if (timeSinceLastLogout < 2000) {
      console.log(`⚠️ Logout rate limited: ${2000 - timeSinceLastLogout}ms remaining`)
      showNotification({
        message: 'Please wait a moment before logging out again',
        variant: 'warning'
      })
      return
    }
    
    lastLogoutRef.current = now
    setIsLoggingOut(true)
    console.log('🔄 Starting logout process...')
    
    try {
      await logout()
      showNotification({
        message: 'Successfully logged out',
        variant: 'success'
      })
      router.replace(redirectTo || '/auth/login')
    } catch (error) {
      showNotification({
        message: 'Logout failed. Please try again.',
        variant: 'danger'
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    handleLogout,
    isLoggingOut
  }
}

export default useLogout 