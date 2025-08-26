
import { Metadata } from 'next'
import AllTreemap from './components/AllTreemap'

export const metadata: Metadata = { title: 'Apex Treemap Charts' }

const page = () => {
  return (
    <>
  
      <AllTreemap />
    </>
  )
}

export default page
