'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { basicPolarChartOpts, MonochromePolarChartOpts } from '../data'

const BasicPolarChart = () => {
  return (
    <ComponentContainerCard title="Basic Polar Area Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={basicPolarChartOpts} series={basicPolarChartOpts.series} type="polarArea" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const MonochromePolarChart = () => {
  return (
    <ComponentContainerCard title="Monochrome Polar Area">
      <div dir="ltr">
        <div id="monochrome-polar-area" className="apex-charts" data-colors="#6c757d" />
        <ReactApexChart
          height={380}
          options={MonochromePolarChartOpts}
          series={MonochromePolarChartOpts.series}
          type="polarArea"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AllPolarChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicPolarChart />
        </Col>
        <Col xl={6}>
          <MonochromePolarChart />
        </Col>
      </Row>
    </>
  )
}

export default AllPolarChart
