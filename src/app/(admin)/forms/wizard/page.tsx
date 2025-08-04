import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import AllWizard from './components/AllWizard'

export const metadata: Metadata = { title: 'Form Wizard' }

const WizardPage = () => {
  return (
    <>
      <PageTitle title="Form Validation" subTitle="Forms" />
      <AllWizard />
    </>
  )
}

export default WizardPage
