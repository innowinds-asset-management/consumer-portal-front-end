import PageTitle from '@/components/PageTitle'
import React from 'react'
import AllVectorMaps from './components/AllVectorMaps'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vector Maps' }

const VectorMaps = () => {
  return (
    <>
      <PageTitle title="Vector Maps" subTitle="Maps" />
      <AllVectorMaps />
    </>
  )
}

export default VectorMaps
