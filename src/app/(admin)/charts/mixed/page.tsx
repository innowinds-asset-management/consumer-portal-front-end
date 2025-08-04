import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllMixedChart from './components/AllMixedChart'

export const metadata: Metadata = { title: 'Apex Mixed Charts' }

const MixedChart = () => {
  return (
    <>
      <PageTitle title="Mixed Charts" subTitle="Apex" />
      <AllMixedChart />
    </>
  )
}

export default MixedChart
