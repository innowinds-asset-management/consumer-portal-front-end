import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllSlider from './components/AllSlider'

export const metadata: Metadata = { title: 'Range Slider' }

const RangeSlider = () => {
  return (
    <>
      <PageTitle title="Range Slider" subTitle="Forms" />
      <AllSlider />
    </>
  )
}

export default RangeSlider
