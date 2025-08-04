import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllBarChart from './components/AllBarChart'

export const metadata: Metadata = { title: 'Apex Bar Charts' }

const BarChart = () => {
  return (
    <>
      <PageTitle title="Bar Charts" subTitle="Apex" />
      <AllBarChart />
    </>
  )
}

export default BarChart
