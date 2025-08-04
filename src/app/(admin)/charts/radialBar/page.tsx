import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllRadialBarChart from './components/AllRadialBarChart'

export const metadata: Metadata = { title: 'Apex RadialBar Charts' }

const RadialBar = () => {
  return (
    <>
      <PageTitle title="RadialBar Charts" subTitle="Apex" />
      <AllRadialBarChart />
    </>
  )
}

export default RadialBar
