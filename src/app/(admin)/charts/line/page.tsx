
import { Metadata } from 'next'
import AllLineChart from './components/AllLineChart'

export const metadata: Metadata = { title: 'Apex Line Charts' }

const LineChart = () => {
  return (
    <>
  
      <AllLineChart />
    </>
  )
}

export default LineChart
