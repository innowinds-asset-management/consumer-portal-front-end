import React from 'react'
import FunnelChart from './components/FunnelChart'
import PageTitle from '@/components/PageTitle'

const FunnelPage = () => {
  return (
    <>
      <PageTitle title="Funnel Charts" subTitle="Apex" />
      <FunnelChart />
    </>
  )
}

export default FunnelPage