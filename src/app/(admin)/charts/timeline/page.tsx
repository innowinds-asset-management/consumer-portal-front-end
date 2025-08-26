
import { Metadata } from 'next'
import AllTimeLineChart from './components/AllTimeLineChart'

export const metadata: Metadata = { title: 'Apex Timeline Chart' }

const TimelineChart = () => {
  return (
    <>
  
      <AllTimeLineChart />
    </>
  )
}

export default TimelineChart
