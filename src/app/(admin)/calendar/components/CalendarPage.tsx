'use client'
import { Card, CardBody, Col } from 'react-bootstrap'
import useCalendar from '../useCalendar'
import AddEditEvent from './AddEditEvent'
import Calendar from './Calendar'
import SidePanel from './SidePanel'

const CalendarPage = () => {
  const {
    createNewEvent,
    eventData,
    events,
    isEditable,
    onAddEvent,
    onCloseModal,
    onDateClick,
    onDrop,
    onEventClick,
    onEventDrop,
    onRemoveEvent,
    onUpdateEvent,
    show,
  } = useCalendar()

  return (
    <>
      <Col xl={3}>
        <Card>
          <CardBody>
            <SidePanel createNewEvent={createNewEvent} />
          </CardBody>
        </Card>
      </Col>

      <Col xl={9}>
        <Card>
          <CardBody>
            <Calendar events={events} onDateClick={onDateClick} onDrop={onDrop} onEventClick={onEventClick} onEventDrop={onEventDrop} />
          </CardBody>
        </Card>
      </Col>

      <AddEditEvent
        eventData={eventData}
        isEditable={isEditable}
        onAddEvent={onAddEvent}
        onRemoveEvent={onRemoveEvent}
        onUpdateEvent={onUpdateEvent}
        open={show}
        toggle={onCloseModal}
      />
    </>
  )
}

export default CalendarPage
