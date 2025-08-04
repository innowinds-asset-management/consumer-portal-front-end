import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllPolarChart from './components/AllPolarChart'

export const metadata: Metadata = { title: 'Apex Polar Area Charts' }

const PolarChart = () => {
  return (
    <>
      <PageTitle title="Polar Area Charts" subTitle="Apex" />
      <AllPolarChart />
    </>
  )
}

export default PolarChart
