import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import CalendarPage from './components/CalendarPage'

export const metadata: Metadata = { title: 'Calender' }

const CalendarPageMain = () => {
  return (
    <>
      <PageTitle title="Calendar" />
      <Row>
        <CalendarPage />
      </Row>
    </>
  )
}

export default CalendarPageMain
