import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllRadarChart from './components/AllRadarChart'

export const metadata: Metadata = { title: 'Apex Radar Charts' }

const RadarChart = () => {
  return (
    <>
      <PageTitle title="Radar Charts" subTitle="Apex" />
      <AllRadarChart />
    </>
  )
}

export default RadarChart
