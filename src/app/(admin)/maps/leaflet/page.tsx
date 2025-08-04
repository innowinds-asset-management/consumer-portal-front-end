import PageTitle from '@/components/PageTitle'
import React from 'react'
import AllLeaflet from './components/AllLeaflet'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leaflet Maps' }

const LeafletMaps = () => {
  return (
    <>
      <PageTitle title="Leaflet Maps" subTitle="Maps" />
      <AllLeaflet />
    </>
  )
}

export default LeafletMaps
