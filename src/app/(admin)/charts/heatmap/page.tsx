import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllHeatmapChart from './components/AllHeatmapChart'

export const metadata: Metadata = { title: 'Apex Heatmap Charts' }

const HeatmapChart = () => {
  return (
    <>
      <PageTitle title="Heatmap Charts" subTitle="Apex" />
      <AllHeatmapChart />
    </>
  )
}

export default HeatmapChart
