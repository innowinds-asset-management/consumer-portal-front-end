import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Starter' }

const StarterPage = () => {
  return <PageTitle title="Starter" subTitle="Pages" />
}

export default StarterPage
