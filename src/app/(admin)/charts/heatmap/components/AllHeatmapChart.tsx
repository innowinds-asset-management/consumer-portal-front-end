'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { basicHeatmapChartOpts, HeatmapColorRangeChartOpts, HeatmapRangeShadesChartOpts, multipleSeriesHeatmapChartOpts } from '../data'

const BasicHeatmapChart = () => {
  return (
    <ComponentContainerCard title="Basic Heatmap - Single Series">
      <div dir="ltr">
        <ReactApexChart height={380} options={basicHeatmapChartOpts} series={basicHeatmapChartOpts.series} type="heatmap" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const MultipleHeatmapChart = () => {
  return (
    <ComponentContainerCard title="Heatmap - Multiple Series">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={multipleSeriesHeatmapChartOpts}
          series={multipleSeriesHeatmapChartOpts.series}
          type="heatmap"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const HeatmapColorRangeChart = () => {
  return (
    <ComponentContainerCard title="Heatmap - Color Range">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={HeatmapColorRangeChartOpts}
          series={HeatmapColorRangeChartOpts.series}
          type="heatmap"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const HeatmapRangeShadesChart = () => {
  return (
    <ComponentContainerCard title="Heatmap - Range without Shades">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={HeatmapRangeShadesChartOpts}
          series={HeatmapRangeShadesChartOpts.series}
          type="heatmap"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AllHeatmapChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicHeatmapChart />
        </Col>
        <Col xl={6}>
          <MultipleHeatmapChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <HeatmapColorRangeChart />
        </Col>
        <Col xl={6}>
          <HeatmapRangeShadesChart />
        </Col>
      </Row>
    </>
  )
}

export default AllHeatmapChart
