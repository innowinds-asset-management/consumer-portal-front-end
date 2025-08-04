import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllPagination from './components/AllPagination'

export const metadata: Metadata = { title: 'Pagination}' }

const Pagination = () => {
  return (
    <>
      <PageTitle title="Pagination" subTitle="Base UI" />
      <AllPagination />
    </>
  )
}

export default Pagination
