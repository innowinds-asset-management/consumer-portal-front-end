import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllAreaChart from './components/AllAreaChart'

export const metadata: Metadata = { title: 'Apex Area Chart' }

const Area = () => {
  return (
    <>
      <PageTitle title="Area Charts" subTitle="Apex" />
      <AllAreaChart />
    </>
  )
}

export default Area
