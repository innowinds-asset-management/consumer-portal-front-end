'use client'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const FunnelChart = () => {
  const funnelChartOpts: ApexOptions = {
    series: [
      {
        name: "Funnel Series",
        data: [1380, 1100, 990, 880, 740, 548, 330, 200],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: ["#777edd", "#0acf97", "#fd7e14", "#fa5c7c"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Recruitment Funnel',
      align: 'center',
    },
    xaxis: {
      categories: [
        'Sourced',
        'Screened',
        'Assessed',
        'HR Interview',
        'Technical',
        'Verify',
        'Offered',
        'Hired',
      ],
    },
    legend: {
      show: false,
    },
  }


  const funnelPyramidChartOpts: ApexOptions = {
    series: [
      {
          name: "",
          data: [200, 330, 548, 740, 880, 990, 1100, 1380],
      },
  ],
  chart: {
      type: 'bar',
      height: 350,
      dropShadow: {
          enabled: true,
      },
      toolbar: {
          show: false
      }
  },
  plotOptions: {
      bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: '80%',
          isFunnel: true,
      },
  },
  colors: [
      '#F44F5E',
      '#E55A89',
      '#D863B1',
      '#CA6CD8',
      '#B57BED',
      '#8D95EB',
      '#62ACEA',
      '#4BC3E6',
  ],
  dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex]
      },
      dropShadow: {
          enabled: true,
      },
  },
  title: {
      text: 'Pyramid Chart',
      align: 'center',
  },
  xaxis: {
      categories: ['Sweets', 'Processed Foods', 'Healthy Fats', 'Meat', 'Beans & Legumes', 'Dairy', 'Fruits & Vegetables', 'Grains'],
  },
  legend: {
      show: false,
  },
  }
  return (
    <Row>
      <Col xl={6}>
        <Card>
          <CardBody>
            <h4 className="header-title mb-4">Funnel Chart</h4>
            <div dir="ltr">
              <ReactApexChart height={350} options={funnelChartOpts} series={funnelChartOpts.series} type="bar" className="apex-charts" />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl={6}>
        <Card>
          <CardBody>
            <h4 className="header-title mb-4">Pyramid Chart</h4>
            <div dir="ltr">
              <ReactApexChart height={350} options={funnelPyramidChartOpts} series={funnelPyramidChartOpts.series} type="bar" className="apex-charts" />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>

  )
}

export default FunnelChart