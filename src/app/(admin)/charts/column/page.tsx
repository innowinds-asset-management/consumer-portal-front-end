import PageTitle from '@/components/PageTitle'
import AllColumnChart from './Components/AllColumnChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Column Charts' }

const ColumnChart = () => {
  return (
    <>
      <PageTitle title="Candlestick Charts" subTitle="Apex" />
      <AllColumnChart />
    </>
  )
}

export default ColumnChart
