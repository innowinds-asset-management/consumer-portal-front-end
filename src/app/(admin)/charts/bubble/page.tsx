import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllBubbleChart from './components/AllBubbleChart'

export const metadata: Metadata = { title: 'Apex Bubble Charts' }

const BubbleChart = () => {
  return (
    <>
      <PageTitle title="Bubble Charts" subTitle="Apex" />
      <AllBubbleChart />
    </>
  )
}

export default BubbleChart
