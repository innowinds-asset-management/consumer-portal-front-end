'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap'
import { candlestickLineChartOpts, categoryChartChartOpts, simpleCandlestickChartOpts } from '../data'

const SimpleCandlestickChart = () => {
  return (
    <ComponentContainerCard title="Simple Candlestick Chart">
      <div dir="ltr">
        <ReactApexChart
          height={400}
          options={simpleCandlestickChartOpts}
          series={simpleCandlestickChartOpts.series}
          type="candlestick"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const CategoryChart = () => {
  return (
    <ComponentContainerCard title="Category X-Axis">
      <div dir="ltr">
        <ReactApexChart
          height={400}
          options={categoryChartChartOpts}
          series={categoryChartChartOpts.series}
          type="candlestick"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const CandlestickLineChart = () => {
  return (
    <ComponentContainerCard title="Candlestick with Line">
      <div dir="ltr">
        <ReactApexChart
          height={380}
          options={candlestickLineChartOpts}
          series={candlestickLineChartOpts.series}
          type="line"
          className="apex-charts"
        />
      </div>
    </ComponentContainerCard>
  )
}

const AllCandlestick = () => {
  return (
    <div>
      <Row>
        <Col xl={6}>
          <SimpleCandlestickChart />
        </Col>
        <Col xl={6}>
          <CategoryChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <CandlestickLineChart />
        </Col>
      </Row>
    </div>
  )
}

export default AllCandlestick
