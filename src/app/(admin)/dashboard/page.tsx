import PageTitle from '@/components/PageTitle'
import NewUser from './components/NewUser'
import Stat from './components/Stat'
import Statistics from './components/Statistics'

const DashboardPage = () => {
  return (
    <>
      <PageTitle title="Dashboard" subTitle="" />
        <Stat />
        <Statistics />
        <NewUser />
    </>
  )
}

export default DashboardPage
