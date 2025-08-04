'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { bubble3DChartOpts, simpleBubbleChartOpts } from '../data'

const SimpleBubbleChart = () => {
  return (
    <ComponentContainerCard title="Simple Bubble Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={simpleBubbleChartOpts} series={simpleBubbleChartOpts.series} type="bubble" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const Bubble3DChart = () => {
  return (
    <ComponentContainerCard title="3D Bubble Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={bubble3DChartOpts} series={bubble3DChartOpts.series} type="bubble" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllBubbleChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <SimpleBubbleChart />
        </Col>
        <Col xl={6}>
          <Bubble3DChart />
        </Col>
      </Row>
    </>
  )
}

export default AllBubbleChart
