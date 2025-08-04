import React from 'react'
import Faqs from './components/Faqs'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'FAQ' }

const FaqsPage = () => {
  return (
    <>
      <PageTitle title="FAQ" subTitle="Pages" />
      <Faqs />
    </>
  )
}

export default FaqsPage
