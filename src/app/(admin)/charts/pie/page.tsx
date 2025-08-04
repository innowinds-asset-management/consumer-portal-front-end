import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllPieChart from './components/AllPieChart'

export const metadata: Metadata = { title: 'Apex Pie Charts' }

const PieChart = () => {
  return (
    <>
      <PageTitle title="Pie Charts" subTitle="Apex" />
      <AllPieChart />
    </>
  )
}

export default PieChart
