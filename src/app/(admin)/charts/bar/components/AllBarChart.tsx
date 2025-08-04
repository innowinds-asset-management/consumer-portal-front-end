'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import {
  basicBarChartOpts,
  DataLabelsChartOpts,
  fullStackedBarChartOpts,
  groupedChartOpts,
  imageBarChartOpts,
  markersBarChartOpts,
  negativeBarChartOpts,
  patternBarChartOpts,
  reversedBarChartOpts,
  stackedBarChartOpts,
} from '../data'

const BasicBarChart = () => {
  return (
    <ComponentContainerCard title="Basic Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={basicBarChartOpts} series={basicBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const GroupedBarChart = () => {
  return (
    <ComponentContainerCard title="Grouped Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={groupedChartOpts} series={groupedChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const StackedBarChart = () => {
  return (
    <ComponentContainerCard title="Stacked Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={stackedBarChartOpts} series={stackedBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}
const Stacked100BarChart = () => {
  return (
    <ComponentContainerCard title="100% Stacked Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={fullStackedBarChartOpts} series={fullStackedBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const NegativeValuesBarChart = () => {
  return (
    <ComponentContainerCard title="Bar with Negative Values">
      <div dir="ltr">
        <ReactApexChart height={380} options={negativeBarChartOpts} series={negativeBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ReversedBarChart = () => {
  return (
    <ComponentContainerCard title="Reversed Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={reversedBarChartOpts} series={reversedBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ImageBarChart = () => {
  return (
    <ComponentContainerCard title="Bar with Image Fill">
      <div dir="ltr">
        <ReactApexChart height={450} options={imageBarChartOpts} series={imageBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const DataLabelsBarChart = () => {
  return (
    <ComponentContainerCard title="Custom DataLabels Bar">
      <div dir="ltr">
        <ReactApexChart height={450} options={DataLabelsChartOpts} series={DataLabelsChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const PatternedBarChart = () => {
  return (
    <ComponentContainerCard title="Patterned Bar Chart">
      <div dir="ltr">
        <ReactApexChart height={380} options={patternBarChartOpts} series={patternBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const MarkersChart = () => {
  return (
    <ComponentContainerCard title="Bar with Markers">
      <div dir="ltr">
        <ReactApexChart height={380} options={markersBarChartOpts} series={markersBarChartOpts.series} type="bar" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllBarChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicBarChart />
        </Col>
        <Col xl={6}>
          <GroupedBarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <StackedBarChart />
        </Col>
        <Col xl={6}>
          <Stacked100BarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <NegativeValuesBarChart />
        </Col>
        <Col xl={6}>
          <ReversedBarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ImageBarChart />
        </Col>
        <Col xl={6}>
          <DataLabelsBarChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PatternedBarChart />
        </Col>
        <Col xl={6}>
          <MarkersChart />
        </Col>
      </Row>
    </>
  )
}

export default AllBarChart
