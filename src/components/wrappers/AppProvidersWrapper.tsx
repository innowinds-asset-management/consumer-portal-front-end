'use client'
import { NotificationProvider } from '@/context/useNotificationContext'
import { AuthProvider } from '@/stores/authStore'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import { ChildrenType } from '../../types/component-props'

const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  return (
    <>
      <AuthProvider>
        <LayoutProvider>
          <NotificationProvider>
            {children}
            <ToastContainer theme="colored" />
          </NotificationProvider>
        </LayoutProvider>
      </AuthProvider>
    </>
  )
}
export default AppProvidersWrapper
