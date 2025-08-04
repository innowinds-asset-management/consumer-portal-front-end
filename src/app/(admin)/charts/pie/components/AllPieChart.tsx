'use client'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Button, Col, Row } from 'react-bootstrap'
import {
  donutUpdateOpts,
  gradientDonutChartOpts,
  imagePieChartOpts,
  monochromePieChartOpts,
  patternedDonutChartOpts,
  simpleDonutChartOpts,
  simplePieChartOpts,
} from '../data'

const SimplePieChart = () => {
  return (
    <ComponentContainerCard title="Simple Pie Chart">
      <div dir="ltr">
        <ReactApexChart height={320} options={simplePieChartOpts} series={simplePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const SimpleDonutChart = () => {
  return (
    <ComponentContainerCard title="Simple Donut Chart">
      <div dir="ltr">
        <ReactApexChart height={320} options={simpleDonutChartOpts} series={simpleDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const MonochromePieChart = () => {
  return (
    <ComponentContainerCard title="Monochrome Pie Chart">
      <div dir="ltr">
        <ReactApexChart height={320} options={monochromePieChartOpts} series={monochromePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const GradientDonutChart = () => {
  return (
    <ComponentContainerCard title="Gradient Donut Chart">
      <div dir="ltr">
        <ReactApexChart height={320} options={gradientDonutChartOpts} series={gradientDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const PatternedDonutChart = () => {
  return (
    <ComponentContainerCard title="Patterned Donut Chart">
      <div dir="ltr">
        <ReactApexChart height={320} options={patternedDonutChartOpts} series={patternedDonutChartOpts.series} type="donut" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const ImagePieChart = () => {
  return (
    <ComponentContainerCard title="Pie Chart with Image fill">
      <div dir="ltr">
        <ReactApexChart height={320} options={imagePieChartOpts} series={imagePieChartOpts.series} type="pie" className="apex-charts" />
      </div>
    </ComponentContainerCard>
  )
}

const DonutUpdateChart = () => {
  const [data, setData] = useState([44, 55, 13, 33])

  function appendData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    return setData(arr)
  }

  function removeData() {
    const arr = data.map(function () {
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1
    })
    arr.pop()
    return setData(arr)
  }

  function randomize() {
    return setData(
      data.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      }),
    )
  }

  function reset() {
    return setData([44, 55, 13, 33])
  }
  return (
    <ComponentContainerCard title="Donut Update">
      <ReactApexChart height={320} options={donutUpdateOpts} series={data} type="donut" />
      <div className="text-center mt-2 flex-centered gap-1">
        <Button variant="primary" size="sm" onClick={randomize}>
          RANDOMIZE
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={appendData}>
          ADD
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={removeData}>
          REMOVE
        </Button>
        &nbsp;
        <Button variant="primary" size="sm" onClick={reset}>
          RESET
        </Button>
      </div>
    </ComponentContainerCard>
  )
}

const AllPieChart = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <SimplePieChart />
        </Col>
        <Col xl={6}>
          <SimpleDonutChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MonochromePieChart />
        </Col>
        <Col xl={6}>
          <GradientDonutChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <PatternedDonutChart />
        </Col>
        <Col xl={6}>
          <ImagePieChart />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <DonutUpdateChart />
        </Col>
      </Row>
    </>
  )
}

export default AllPieChart
