import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Ratio video' }

const Ratio1 = () => {
  return (
    <ComponentContainerCard
      title="Responsive Ratio video 21:9"
      description={
        <>
          Use class <code>.ratio-21x9</code>
        </>
      }>
      <div className="ratio ratio-21x9">
        <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
      </div>
    </ComponentContainerCard>
  )
}

const Ratio2 = () => {
  return (
    <ComponentContainerCard
      title="Responsive Ratio video 1:1"
      description={
        <>
          Use class <code>.ratio-1x1</code>
        </>
      }>
      <div className="ratio ratio-1x1">
        <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
      </div>
    </ComponentContainerCard>
  )
}

const Ratio3 = () => {
  return (
    <ComponentContainerCard
      title="Responsive Ratio video 16:9"
      description={
        <>
          Use class <code>.ratio-16x9</code>
        </>
      }>
      <div className="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
      </div>
    </ComponentContainerCard>
  )
}
const Ratio4 = () => {
  return (
    <ComponentContainerCard
      title="Responsive Ratio video 4:3"
      description={
        <>
          Use class <code>.ratio-4x3</code>
        </>
      }>
      <div className="ratio ratio-4x3">
        <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
      </div>
    </ComponentContainerCard>
  )
}

const Ratio = () => {
  return (
    <>
      <PageTitle title="Ratio Video" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <Ratio1 />
          <Ratio2 />
        </Col>
        <Col xl={6}>
          <Ratio3 />
          <Ratio4 />
        </Col>
      </Row>
    </>
  )
}

export default Ratio
