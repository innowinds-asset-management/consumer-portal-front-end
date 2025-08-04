import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllDragula from './components/AllDragula'

export const metadata: Metadata = { title: 'Dragula' }

const Dragula = () => {
  return (
    <>
      <PageTitle title="Dragula" subTitle="Extended UI" />
      <AllDragula />
    </>
  )
}

export default Dragula
