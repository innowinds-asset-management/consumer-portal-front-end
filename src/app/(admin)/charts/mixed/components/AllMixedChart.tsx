'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { allMixedChartOpts, lineAreaChartOpts, lineColumnMixedChartOpts, multipleChartOpts } from '../data'

const LineColumnChart = () => {
  return (
    <ComponentContainerCard title="Line &amp; Column Chart">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={lineColumnMixedChartOpts}
          series={lineColumnMixedChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const MultipleChart = () => {
  return (
    <ComponentContainerCard title="Multiple Y-Axis Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={multipleChartOpts} series={multipleChartOpts.series} type="line" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const LineAreaChart = () => {
  return (
    <ComponentContainerCard title="Line &amp; Area Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={lineAreaChartOpts} series={lineAreaChartOpts.series} type="line" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const LineColumnAreaChart = () => {
  return (
    <ComponentContainerCard title="Line, Column &amp; Area Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={allMixedChartOpts} series={allMixedChartOpts.series} type="line" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllMixedChart = () => {
  return (
    <div>
      <Row>
        <Col xl={6}>
          <LineColumnChart />
        </Col>
        <Col xl={6}>
          <MultipleChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <LineAreaChart />
        </Col>
        <Col xl={6}>
          <LineColumnAreaChart />
        </Col>
      </Row>
    </div>
  )
}

export default AllMixedChart
