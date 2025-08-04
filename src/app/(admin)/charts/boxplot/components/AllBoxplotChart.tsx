'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { basicBoxplotChartOpts, horizontalBoxPlotChartOpts, scatterBoxplotChartOpts } from '../data'

const BasicBoxplot = () => {
  return (
    <ComponentContainerCard title="Basic Boxplot">
      <div dir="ltr">
        <ReactApexChart height={350} options={basicBoxplotChartOpts} series={basicBoxplotChartOpts.series} type="boxPlot" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ScatterBoxplot = () => {
  return (
    <ComponentContainerCard title="Scatter Boxplot">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={scatterBoxplotChartOpts}
          series={scatterBoxplotChartOpts.series}
          type="boxPlot"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const HorizontalBoxPlot = () => {
  return (
    <ComponentContainerCard title="Horizontal BoxPlot">
      <div dir="ltr">
        <ReactApexChart
          height={350}
          options={horizontalBoxPlotChartOpts}
          series={horizontalBoxPlotChartOpts.series}
          type="boxPlot"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AllBoxplotChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BasicBoxplot />
        </Col>
        <Col xl={6}>
          <ScatterBoxplot />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <HorizontalBoxPlot />
        </Col>
      </Row>
    </>
  )
}

export default AllBoxplotChart
