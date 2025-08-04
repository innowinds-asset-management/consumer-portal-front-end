import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllValidation from './components/AllValidation'

export const metadata: Metadata = { title: 'Form Validation' }

const ValidationPage = () => {
  return (
    <>
      <PageTitle title="Form Validation" subTitle="Forms" />
      <AllValidation />
    </>
  )
}

export default ValidationPage
