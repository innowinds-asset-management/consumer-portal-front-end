
import { Metadata } from 'next'
import SparkChart from './components/SparkChart'

export const metadata: Metadata = { title: 'Apex Sparklines Charts' }

const SparkLinesChart = () => {
  return (
    <>
  
      <SparkChart />
    </>
  )
}

export default SparkLinesChart
