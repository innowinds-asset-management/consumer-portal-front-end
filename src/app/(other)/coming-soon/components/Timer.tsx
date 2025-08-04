'use client'
import useCountdown from '@/hooks/useCountdown'
import { Col, Row } from 'react-bootstrap'

const Timer = () => {
  const { days, hours, minutes, seconds } = useCountdown()
  return (
    <>
      <Row className="text-center justify-content-center my-4 g-2">
        <Col xs={6} sm={4} md={3} className="col-lg">
          <div className="bg-body-secondary border border-primary-subtle border-dashed p-2 rounded">
            <h3 id="days" className="fw-bold text-primary fs-35">
              {days}
            </h3>
            <p className="fw-semibold fs-12 mb-0">Days</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={3} className="col-lg">
          <div className="bg-body-secondary border border-primary-subtle border-dashed p-2 rounded">
            <h3 id="hours" className="fw-bold text-primary fs-35">
              {hours}
            </h3>
            <p className="fw-semibold fs-12 mb-0">Hours</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={3} className="col-lg">
          <div className="bg-body-secondary border border-primary-subtle border-dashed p-2 rounded">
            <h3 id="minutes" className="fw-bold text-primary fs-35">
              {minutes}
            </h3>
            <p className="fw-semibold fs-12 mb-0">Minutes</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={3} className="col-lg">
          <div className="bg-body-secondary border border-primary-subtle border-dashed p-2 rounded">
            <h3 id="seconds" className="fw-bold text-primary fs-35">
              {seconds}
            </h3>
            <p className="fw-semibold fs-12 mb-0">Seconds</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Timer
