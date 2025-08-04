import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllTreemap from './components/AllTreemap'

export const metadata: Metadata = { title: 'Apex Treemap Charts' }

const page = () => {
  return (
    <>
      <PageTitle title="Treemap Charts" subTitle="Apex" />
      <AllTreemap />
    </>
  )
}

export default page
