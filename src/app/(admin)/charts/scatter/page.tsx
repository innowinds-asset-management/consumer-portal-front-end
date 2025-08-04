import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllScatterChart from './components/AllScatterChart'

export const metadata: Metadata = { title: 'Apex Scatter Charts' }

const ScatterChart = () => {
  return (
    <>
      <PageTitle title="Scatter Charts" subTitle="Apex" />
      <AllScatterChart />
    </>
  )
}

export default ScatterChart
