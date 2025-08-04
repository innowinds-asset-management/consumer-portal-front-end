import React from 'react'
import Slope from './components/Slope'
import { Metadata } from 'next'
import PageTitle from '@/components/PageTitle'


export const metadata: Metadata = { title: 'Apex Slope Charts' }

const slopePage = () => {
  return (
    <>
      <PageTitle title="Slope Charts" subTitle="Apex" />
      <Slope />
    </>
  )
}

export default slopePage