'use client'
import React, { ReactNode } from 'react'
import { AuthProvider } from './authStore'
import { UIProvider } from './uiStore'
import { DashboardProvider } from './dashboardStore'

// Combined provider props
interface AppProvidersProps {
  children: ReactNode
}

// Combined provider that wraps all stores
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </UIProvider>
    </AuthProvider>
  )
}

// Export all hooks for easy access
export { useAuth } from './authStore'
export { useUI } from './uiStore'
export { useDashboard } from './dashboardStore' 