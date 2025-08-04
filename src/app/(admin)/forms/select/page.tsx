import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllSelect from './components/AllSelect'

export const metadata: Metadata = { title: 'Form Select' }

const SelectForm = () => {
  return (
    <>
      <PageTitle title="Form Select" subTitle="Forms" />
      <AllSelect />
    </>
  )
}

export default SelectForm
