import React from 'react'
import AllModal from './components/AllModal'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Modals' }

const Modals = () => {
  return (
    <>
      <PageTitle title="Modals" subTitle="Base UI" />
      <AllModal />
    </>
  )
}

export default Modals
