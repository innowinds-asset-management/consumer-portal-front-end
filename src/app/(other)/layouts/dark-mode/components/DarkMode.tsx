'use client'
import DashboardPage from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layout/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useEffect } from 'react'


const DarkMode = () => {
  const { changeTheme } = useLayoutContext()
  useEffect(() => {
    changeTheme('dark')
  }, [])
  return (
    <VerticalLayout>
      <DashboardPage />
    </VerticalLayout>
  )
}

export default DarkMode
