import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllCandlestick from './components/AllCandlestick'

export const metadata: Metadata = { title: 'Apex Candlestick Charts' }

const Candlestick = () => {
  return (
    <>
      <PageTitle title="Candlestick Charts" subTitle="Apex" />
      <AllCandlestick />
    </>
  )
}

export default Candlestick
