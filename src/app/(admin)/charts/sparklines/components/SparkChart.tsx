'use client'
import { currency } from '@/context/constants'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row, Table } from 'react-bootstrap'
import {
  chart1Opts,
  chart2Opts,
  chart3Opts,
  chart4Opts,
  chart5Opts,
  chart6Opts,
  chart7Opts,
  chart8Opts,
  spark1ChartOpts,
  spark2ChartOpts,
  spark3ChartOpts,
} from '../data'

const ChangeChart1 = () => {
  return (
    <Col md={4}>
      <ReactApexChart height={160} options={spark1ChartOpts} series={spark1ChartOpts.series} type="area" className="apex-charts" />
    </Col>
  )
}
const ChangeChart2 = () => {
  return (
    <Col md={4}>
      <ReactApexChart height={160} options={spark2ChartOpts} series={spark2ChartOpts.series} type="area" className="apex-charts" />
    </Col>
  )
}
const ChangeChart3 = () => {
  return (
    <Col md={4}>
      <ReactApexChart height={160} options={spark3ChartOpts} series={spark3ChartOpts.series} type="area" className="apex-charts" />
    </Col>
  )
}

const SparkChart = () => {
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardBody>
            <Row dir="ltr">
              <ChangeChart1 />
              <ChangeChart2 />
              <ChangeChart3 />
            </Row>
          </CardBody>
          <Row>
            <Col xs={12}>
              <div className="table-responsive">
                <Table className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">Total Value</th>
                      <th>Percentage of Portfolio</th>
                      <th>Last 10 days</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-3">{currency}32,554</td>
                      <td>15%</td>
                      <td>
                        <ReactApexChart height={40} width={140} options={chart1Opts} series={chart1Opts.series} type="line" />
                      </td>
                      <td>
                        <ReactApexChart height={60} width={100} options={chart5Opts} series={chart5Opts.series} type="bar" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">{currency}23,533</td>
                      <td>7%</td>
                      <td>
                        <ReactApexChart height={40} width={140} options={chart2Opts} series={chart2Opts.series} type="line" />
                      </td>
                      <td>
                        <ReactApexChart height={60} width={100} options={chart6Opts} series={chart6Opts.series} type="bar" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">{currency}54,276</td>
                      <td>9%</td>
                      <td>
                        <ReactApexChart height={40} width={140} options={chart3Opts} series={chart3Opts.series} type="line" />
                      </td>
                      <td>
                        <ReactApexChart height={60} width={100} options={chart7Opts} series={chart7Opts.series} type="bar" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">{currency}11,533</td>
                      <td>2%</td>
                      <td>
                        <ReactApexChart height={40} width={140} options={chart4Opts} series={chart4Opts.series} type="line" />
                      </td>
                      <td>
                        <ReactApexChart height={60} width={100} options={chart8Opts} series={chart8Opts.series} type="bar" />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default SparkChart
