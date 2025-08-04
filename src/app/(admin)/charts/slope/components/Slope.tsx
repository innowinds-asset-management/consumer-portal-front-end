'use client'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const Slope = () => {
  const slopeChartOpts: ApexOptions = {
    series: [
      {
        name: 'Blue',
        data: [
          {
            x: 'Jan',
            y: 43,
          },
          {
            x: 'Feb',
            y: 58,
          },
        ],
      },
      {
        name: 'Green',
        data: [
          {
            x: 'Jan',
            y: 33,
          },
          {
            x: 'Feb',
            y: 38,
          },
        ],
      },
      {
        name: 'Red',
        data: [
          {
            x: 'Jan',
            y: 55,
          },
          {
            x: 'Feb',
            y: 21,
          },
        ],
      },
    ],
    colors: ["#39afd1"],
    chart: {
      height: 350,
      width: 400,
      type: 'line',
    },
    plotOptions: {
      line: {
        isSlopeChart: true,
      },
    }
  }
  const MultipleSlopeChartOpts: ApexOptions = {
    series: [
      {
          name: 'Blue',
          data: [
              {
                  x: 'Category 1',
                  y: 503,
              },
              {
                  x: 'Category 2',
                  y: 580,
              },
              {
                  x: 'Category 3',
                  y: 135,
              },
          ],
      },
      {
          name: 'Green',
          data: [
              {
                  x: 'Category 1',
                  y: 733,
              },
              {
                  x: 'Category 2',
                  y: 385,
              },
              {
                  x: 'Category 3',
                  y: 715,
              },
          ],
      },
      {
          name: 'Orange',
          data: [
              {
                  x: 'Category 1',
                  y: 255,
              },
              {
                  x: 'Category 2',
                  y: 211,
              },
              {
                  x: 'Category 3',
                  y: 441,
              },
          ],
      },
      {
          name: 'Red',
          data: [
              {
                  x: 'Category 1',
                  y: 428,
              },
              {
                  x: 'Category 2',
                  y: 749,
              },
              {
                  x: 'Category 3',
                  y: 559,
              },
          ],
      },
  ],
  chart: {
      height: 350,
      width: 600,
      type: 'line',
  },
  plotOptions: {
      line: {
          isSlopeChart: true,
      },
  },
  tooltip: {
      followCursor: true,
      intersect: false,
      shared: true,
  },
  dataLabels: {
      background: {
          enabled: true,
      },
      formatter(val, opts) {
          const seriesName = opts.w.config.series[opts.seriesIndex].name
          return val !== null ? seriesName : ''
      },
  },
  colors: ["#45bbe0","#f9bc0b","#777edd","#0acf97"],
  yaxis: {
      show: true,
      labels: {
          show: true,
      },
  },
  xaxis: {
      position: 'bottom',
  },
  legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
  },
  stroke: {
      width: [2, 3, 4, 2],
      dashArray: [0, 0, 5, 2],
      curve: 'smooth',
  }
  }
  return (
    <Row>
      <Col xl={6}>
        <Card>
          <CardBody>
            <h4 className="header-title mb-4">Basic Slope Chart</h4>
            <div dir="ltr">
              <ReactApexChart height={350} width={400} options={slopeChartOpts} series={slopeChartOpts.series} type="line" className="apex-charts" />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl={6}>
        <Card>
          <CardBody>
            <h4 className="header-title mb-4">Multiple Slop Chart</h4>
            <div dir="ltr">
              <ReactApexChart height={350} options={MultipleSlopeChartOpts} series={MultipleSlopeChartOpts.series} type="line" className="apex-charts" />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Slope