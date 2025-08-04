import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllRating from './components/AllRating'

export const metadata: Metadata = { title: 'Ratings' }

const Ratings = () => {
  return (
    <>
      <PageTitle title="Ratings" subTitle="Extended UI" />
      <AllRating />
    </>
  )
}

export default Ratings
