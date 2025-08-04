import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import SparkChart from './components/SparkChart'

export const metadata: Metadata = { title: 'Apex Sparklines Charts' }

const SparkLinesChart = () => {
  return (
    <>
      <PageTitle title="Sparklines Charts" subTitle="Apex" />
      <SparkChart />
    </>
  )
}

export default SparkLinesChart
