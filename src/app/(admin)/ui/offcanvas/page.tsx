import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllOffcanvas from './components/AllOffcanvas'

export const metadata: Metadata = { title: 'OffCanvas' }

const Offcanvas = () => {
  return (
    <>
      <PageTitle title="Offcanvas" subTitle="Base UI" />
      <AllOffcanvas />
    </>
  )
}

export default Offcanvas
