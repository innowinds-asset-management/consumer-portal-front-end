'use client'
import { Col, Row } from 'react-bootstrap'
import DropExample from './DropExample'
import MoveStuff from './MoveStuff'
import MoveStuffHandle from './MoveStuffHandle'

const AllDragula = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <DropExample />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MoveStuff />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MoveStuffHandle />
        </Col>
      </Row>
    </>
  )
}

export default AllDragula
