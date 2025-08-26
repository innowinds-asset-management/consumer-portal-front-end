
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import CalendarPage from './components/CalendarPage'

export const metadata: Metadata = { title: 'Calender' }

const CalendarPageMain = () => {
  return (
    <>
  
      <Row>
        <CalendarPage />
      </Row>
    </>
  )
}

export default CalendarPageMain
