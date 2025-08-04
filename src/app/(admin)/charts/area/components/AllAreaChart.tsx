'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import {
  basicChartOpts,
  dateTimeChartChartOpts,
  NegativeValuesChartOpts,
  nullValuesChartOpts,
  splineChartOpts,
  stackedChartOpts,
  timeSeriesChartOpts,
} from '../data'

const BasicAreaChart = () => {
  return (
    <ComponentContainerCard title="Basic Area Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={basicChartOpts} series={basicChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const SplineArea = () => {
  return (
    <ComponentContainerCard title="Spline Area">
      <div dir="ltr">
        <ReactApexChart height={380} options={splineChartOpts} series={splineChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const DatetimeChart = () => {
  return (
    <ComponentContainerCard title="Area Chart - Datetime X-axis">
      <div className="toolbar apex-toolbar">
        <button id="one_month" className="btn btn-sm btn-light">
          1M
        </button>
        &nbsp;
        <button id="six_months" className="btn btn-sm btn-light">
          6M
        </button>
        &nbsp;
        <button id="one_year" className="btn btn-sm btn-light active">
          1Y
        </button>
        &nbsp;
        <button id="ytd" className="btn btn-sm btn-light">
          YTD
        </button>
        &nbsp;
        <button id="all" className="btn btn-sm btn-light">
          ALL
        </button>
      </div>
      <div dir="ltr">
        <ReactApexChart height={350} options={dateTimeChartChartOpts} series={dateTimeChartChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const NegativeValuesChart = () => {
  return (
    <ComponentContainerCard title="Area with Negative Values">
      <div dir="ltr">
        <ReactApexChart height={380} options={NegativeValuesChartOpts} series={NegativeValuesChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const StackedArea = () => {
  return (
    <ComponentContainerCard title="Stacked Area">
      <div dir="ltr">
        <ReactApexChart height={422} options={stackedChartOpts} series={stackedChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const TimeSeriesChart = () => {
  return (
    <ComponentContainerCard title="Irregular TimeSeries">
      <div dir="ltr">
        <ReactApexChart height={350} options={timeSeriesChartOpts} series={timeSeriesChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const NullValuesChart = () => {
  return (
    <ComponentContainerCard title="Area Chart with Null values">
      <div dir="ltr">
        <ReactApexChart height={350} options={nullValuesChartOpts} series={nullValuesChartOpts.series} type="area" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllAreaChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicAreaChart />
        </Col>
        <Col xl={6}>
          <SplineArea />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <DatetimeChart />
        </Col>
        <Col xl={6}>
          <NegativeValuesChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <StackedArea />
        </Col>
        <Col xl={6}>
          <TimeSeriesChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <NullValuesChart />
        </Col>
      </Row>
    </>
  )
}

export default AllAreaChart
