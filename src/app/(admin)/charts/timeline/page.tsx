import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllTimeLineChart from './components/AllTimeLineChart'

export const metadata: Metadata = { title: 'Apex Timeline Chart' }

const TimelineChart = () => {
  return (
    <>
      <PageTitle title="Timeline Charts" subTitle="Apex" />
      <AllTimeLineChart />
    </>
  )
}

export default TimelineChart
