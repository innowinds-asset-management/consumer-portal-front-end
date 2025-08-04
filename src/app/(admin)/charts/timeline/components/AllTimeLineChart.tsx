'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import {
  advancedTimelineChartOpts,
  basicTimelineChartOpts,
  distributedTimelineChartOpts,
  groupTimelineChartOpts,
  multiSeriesTimelineChartOpts,
} from '../data'

const BasicTimeline = () => {
  return (
    <ComponentContainerCard title="Basic Timeline">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={basicTimelineChartOpts}
          series={basicTimelineChartOpts.series}
          type="rangeBar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const DistributedTimeline = () => {
  return (
    <ComponentContainerCard title="Distributed Timeline">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={distributedTimelineChartOpts}
          series={distributedTimelineChartOpts.series}
          type="rangeBar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const MultiSeriesTimeline = () => {
  return (
    <ComponentContainerCard title="Multi Series Timeline">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={multiSeriesTimelineChartOpts}
          series={multiSeriesTimelineChartOpts.series}
          type="rangeBar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AdvancedTimeline = () => {
  return (
    <ComponentContainerCard title="Advanced Timeline">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={advancedTimelineChartOpts}
          series={advancedTimelineChartOpts.series}
          type="rangeBar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const MultipleGroupTimeline = () => {
  return (
    <ComponentContainerCard title="Multiple Series - Group Rows">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={groupTimelineChartOpts}
          series={groupTimelineChartOpts.series}
          type="rangeBar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AllTimeLineChart = () => {
  return (
    <div>
      <Row>
        <Col xl={6}>
          <BasicTimeline />
        </Col>
        <Col xl={6}>
          <DistributedTimeline />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MultiSeriesTimeline />
        </Col>
        <Col xl={6}>
          <AdvancedTimeline />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MultipleGroupTimeline />
        </Col>
      </Row>
    </div>
  )
}

export default AllTimeLineChart
