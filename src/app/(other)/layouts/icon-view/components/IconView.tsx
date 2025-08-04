'use client'
import DashboardPage from '@/app/(admin)/dashboard/page'
import VerticalLayout from '@/components/layout/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useEffect } from 'react'

const IconView = () => {
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('condensed')
  }, [])
  return (
    <>
      <VerticalLayout>
        <DashboardPage />
      </VerticalLayout>
    </>
  )
}

export default IconView
