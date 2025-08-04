import PageTitle from '@/components/PageTitle'
import AllTabs from './components/AllTabs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tabs' }

const Tabs = () => {
  return (
    <>
      <PageTitle title="Tabs" subTitle="Base UI" />
      <AllTabs />
    </>
  )
}

export default Tabs
