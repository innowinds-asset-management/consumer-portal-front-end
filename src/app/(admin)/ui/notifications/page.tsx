import PageTitle from '@/components/PageTitle'
import React from 'react'
import AllNotifications from './components/AllNotifications'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Notifications' }

const Notifications = () => {
  return (
    <>
      <PageTitle title="Notifications" subTitle="Base UI" />
      <AllNotifications />
    </>
  )
}

export default Notifications
