
import { Metadata } from 'next'
import AllRating from './components/AllRating'

export const metadata: Metadata = { title: 'Ratings' }

const Ratings = () => {
  return (
    <>
  
      <AllRating />
    </>
  )
}

export default Ratings
