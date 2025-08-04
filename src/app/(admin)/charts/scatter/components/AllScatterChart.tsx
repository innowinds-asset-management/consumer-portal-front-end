'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { dateTimeScatterChartOpts, scatterChartOpts, scatterImagesChartOpts } from '../data'

const ScatterChart = () => {
  return (
    <ComponentContainerCard title="Scatter (XY) Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={scatterChartOpts} series={scatterChartOpts.series} type="scatter" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ScatterDatetimeChart = () => {
  return (
    <ComponentContainerCard title="Scatter Chart - Datetime">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={dateTimeScatterChartOpts}
          series={dateTimeScatterChartOpts.series}
          type="scatter"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const ScatterImagesChart = () => {
  return (
    <ComponentContainerCard title="Scatter - Images">
      <div dir="ltr">
        <ReactApexChart height={380} options={scatterImagesChartOpts} series={scatterImagesChartOpts.series} type="scatter" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllScatterChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <ScatterChart />
        </Col>
        <Col xl={6}>
          <ScatterDatetimeChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ScatterImagesChart />
        </Col>
      </Row>
    </>
  )
}

export default AllScatterChart
