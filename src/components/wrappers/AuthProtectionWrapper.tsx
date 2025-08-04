'use client'
import { useAuth } from '@/stores/authStore'
import type { ChildrenType } from '@/types/component-props'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'
import FallbackLoading from '../FallbackLoading'

const AuthProtectionWrapper = ({ children }: ChildrenType) => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasCheckedAuthRef = useRef(false)

  useEffect(() => {
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
    }

    // Check if we have a token in localStorage
    const token = localStorage.getItem('auth_token')
    const hasToken = !!token

    // If we have a token but auth is not loaded yet, wait for loading to complete
    if (hasToken && loading) {
      console.log('🔄 AuthProtectionWrapper: Token found, waiting for auth to load...')
      return
    }

    // Debug logging
    console.log('AuthProtectionWrapper Debug:', {
      loading,
      isAuthenticated,
      hasToken,
      pathname,
      shouldRedirect: !loading && !isAuthenticated && !pathname.includes('/auth/') && !hasToken
    })

    // Only redirect if:
    // 1. Not loading anymore
    // 2. Not authenticated
    // 3. Not on auth pages
    // 4. No token in localStorage (or token is invalid)
    if (!loading && !isAuthenticated && !pathname.includes('/auth/') && !hasToken) {
      // Add 500ms delay to prevent rapid redirects
      redirectTimeoutRef.current = setTimeout(() => {
        console.log('🔄 AuthProtectionWrapper: No token found, redirecting to login')
        router.replace(`/auth/login?redirectTo=${pathname}`)
      }, 500)
    }

    // Cleanup timeout on unmount
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [isAuthenticated, loading, pathname, router])

  // Show loading while auth is being checked
  if (loading) {
    return <FallbackLoading />
  }

  // Don't show loading if on auth pages
  if (!isAuthenticated && !pathname.includes('/auth/')) {
    return <FallbackLoading />
  }

  return <Suspense>{children}</Suspense>
}

export default AuthProtectionWrapper
