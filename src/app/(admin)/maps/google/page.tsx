import PageTitle from '@/components/PageTitle'
import AllGoogleMap from './components/AllGoogleMap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Google Maps' }

const GoogleMaps = () => {
  return (
    <>
      <PageTitle title="Google Maps" subTitle="Maps" />
      <AllGoogleMap />
    </>
  )
}

export default GoogleMaps
