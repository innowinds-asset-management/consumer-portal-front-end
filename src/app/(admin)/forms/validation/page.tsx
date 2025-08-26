
import { Metadata } from 'next'
import AllValidation from './components/AllValidation'

export const metadata: Metadata = { title: 'Form Validation' }

const ValidationPage = () => {
  return (
    <>
  
      <AllValidation />
    </>
  )
}

export default ValidationPage
