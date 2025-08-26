
import { Metadata } from 'next'
import AllWizard from './components/AllWizard'

export const metadata: Metadata = { title: 'Form Wizard' }

const WizardPage = () => {
  return (
    <>
  
      <AllWizard />
    </>
  )
}

export default WizardPage
