import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllLineChart from './components/AllLineChart'

export const metadata: Metadata = { title: 'Apex Line Charts' }

const LineChart = () => {
  return (
    <>
      <PageTitle title="Line Charts" subTitle="Apex" />
      <AllLineChart />
    </>
  )
}

export default LineChart
