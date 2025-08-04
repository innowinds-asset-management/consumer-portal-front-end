'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import {
  basicColumnChartOpts,
  columnGroupChartOpts,
  columnMarkersChartOpts,
  datalabelsColumnChartOpts,
  distributedColumnChartOpts,
  fullStackedColumnChartOpts,
  negativeColumnChartOpts,
  rangeColumnChartOpts,
  rotateColumnChartOpts,
  stackedColumnChartOpts,
} from '../data'

const BasicColumnChart = () => {
  return (
    <ComponentContainerCard title="Basic Column Chart">
      <div dir="ltr">
        <ReactApexChart height={396} options={basicColumnChartOpts} series={basicColumnChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const DatalabelsChart = () => {
  return (
    <ComponentContainerCard title="Column Chart with Datalabels">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={datalabelsColumnChartOpts}
          series={datalabelsColumnChartOpts.series}
          type="bar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const StackedColumnChart = () => {
  return (
    <ComponentContainerCard title="Stacked Column Chart">
      <div dir="ltr">
        <ReactApexChart height={396} options={stackedColumnChartOpts} series={stackedColumnChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const FullStackedColumnChart = () => {
  return (
    <ComponentContainerCard title="100% Stacked Column Chart">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={fullStackedColumnChartOpts}
          series={fullStackedColumnChartOpts.series}
          type="bar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const ColumnMarkersChart = () => {
  return (
    <ComponentContainerCard title="Column with Markers">
      <div dir="ltr">
        <ReactApexChart height={380} options={columnMarkersChartOpts} series={columnMarkersChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ColumnGroupChart = () => {
  return (
    <ComponentContainerCard title="Column with Group Label">
      <div dir="ltr">
        <ReactApexChart height={396} options={columnGroupChartOpts} series={columnGroupChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ColumnRotatedChart = () => {
  return (
    <ComponentContainerCard title="Column Chart with rotated labels &amp; Annotations">
      <div dir="ltr">
        <ReactApexChart height={396} options={rotateColumnChartOpts} series={rotateColumnChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ColumnNegativeValuesChart = () => {
  return (
    <ComponentContainerCard title="Column Chart with negative values">
      <div dir="ltr">
        <ReactApexChart height={396} options={negativeColumnChartOpts} series={negativeColumnChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const DistributedColumnChart = () => {
  return (
    <ComponentContainerCard title="Distributed Column Chart">
      <div dir="ltr">
        <ReactApexChart
          height={396}
          options={distributedColumnChartOpts}
          series={distributedColumnChartOpts.series}
          type="bar"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const RangeColumnChart = () => {
  return (
    <ComponentContainerCard title="Range Column Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={rangeColumnChartOpts} series={rangeColumnChartOpts.series} type="rangeBar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllColumnChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicColumnChart />
        </Col>
        <Col xl={6}>
          <DatalabelsChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <StackedColumnChart />
        </Col>
        <Col xl={6}>
          <FullStackedColumnChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ColumnMarkersChart />
        </Col>
        <Col xl={6}>
          <ColumnGroupChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ColumnRotatedChart />
        </Col>
        <Col xl={6}>
          <ColumnNegativeValuesChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <DistributedColumnChart />
        </Col>
        <Col xl={6}>
          <RangeColumnChart />
        </Col>
      </Row>
    </>
  )
}

export default AllColumnChart
