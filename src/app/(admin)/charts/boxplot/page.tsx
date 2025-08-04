import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllBoxplotChart from './components/AllBoxplotChart'

export const metadata: Metadata = { title: 'Apex Boxplot Charts' }

const BoxplotChart = () => {
  return (
    <>
      <PageTitle title="Boxplot Charts" subTitle="Apex" />
      <AllBoxplotChart />
    </>
  )
}

export default BoxplotChart
