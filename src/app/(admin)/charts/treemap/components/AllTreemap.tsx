'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { basicTreemapChartOpts, colorTreemapChartOpts, distributedTreemapChartOpts, multipleTreemapChartOpts } from '../data'

const BasicTreemap = () => {
  return (
    <ComponentContainerCard title="Basic Treemap">
      <div dir="ltr">
        <ReactApexChart height={350} options={basicTreemapChartOpts} series={basicTreemapChartOpts.series} type="treemap" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}
const MultipleTreemap = () => {
  return (
    <ComponentContainerCard title="Treemap Multiple Series">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={multipleTreemapChartOpts}
          series={multipleTreemapChartOpts.series}
          type="treemap"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const DistributedTreemap = () => {
  return (
    <ComponentContainerCard title="Distributed Treemap">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={distributedTreemapChartOpts}
          series={distributedTreemapChartOpts.series}
          type="treemap"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const ColorTreemap = () => {
  return (
    <ComponentContainerCard title="Color Range Treemap">
      <div dir="ltr">
        <ReactApexChart height={350} options={colorTreemapChartOpts} series={colorTreemapChartOpts.series} type="treemap" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const AllTreemap = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicTreemap />
        </Col>
        <Col xl={6}>
          <MultipleTreemap />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <DistributedTreemap />
        </Col>
        <Col xl={6}>
          <ColorTreemap />
        </Col>
      </Row>
    </>
  )
}

export default AllTreemap
