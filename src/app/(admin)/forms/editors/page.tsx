import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllEditors from './components/AllEditors'

export const metadata: Metadata = { title: 'Editors' }

const EditorsPage = () => {
  return (
    <>
      <PageTitle title="Editors" subTitle="Forms" />
      <AllEditors />
    </>
  )
}

export default EditorsPage
