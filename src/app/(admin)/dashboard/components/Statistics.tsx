'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ArrowDownLeft, ArrowUpRight, BarChart, Landmark } from 'lucide-react'
import Link from 'next/link'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { revenueChart, statisChart } from '../data'

const Statistics = () => {
  return (
    <>
      <Row>
        <Col xl={7}>
          <Card>
            <div className="d-flex card-header justify-content-between align-items-center">
              <div>
                <h4 className="header-title">Statistics</h4>
              </div>
              <Dropdown>
                <DropdownToggle as={Link} href="" className="drop-arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="">Sales Report</DropdownItem>
                  <DropdownItem href="">Export Report</DropdownItem>
                  <DropdownItem href="">Profit</DropdownItem>
                  <DropdownItem href="">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CardBody className="px-0 pt-0">
              <div className="bg-light bg-opacity-50">
                <Row className="text-center">
                  <Col md={3} xs={6}>
                    <p className="text-muted mt-3 mb-1">Monthly Income</p>
                    <h4 className="mb-3">
                      <ArrowDownLeft data-lucide="arrow-down-left" className="text-success me-1" />
                      <span>$35,200</span>
                    </h4>
                  </Col>
                  <Col md={3} xs={6}>
                    <p className="text-muted mt-3 mb-1">Monthly Expenses</p>
                    <h4 className="mb-3">
                      <ArrowUpRight data-lucide="arrow-up-right" className="text-danger me-1" />
                      <span>$18,900</span>
                    </h4>
                  </Col>
                  <Col md={3} xs={6}>
                    <p className="text-muted mt-3 mb-1">Invested Capital</p>
                    <h4 className="mb-3">
                      <BarChart data-lucide="bar-chart" className="me-1" />
                      <span>$5,200</span>
                    </h4>
                  </Col>
                  <Col md={3} xs={6}>
                    <p className="text-muted mt-3 mb-1">Available Savings</p>
                    <h4 className="mb-3">
                      <Landmark data-lucide="landmark" className="me-1" />
                      <span>$8,100</span>
                    </h4>
                  </Col>
                </Row>
              </div>
              <div dir="ltr" className="px-1 mt-2">
                <div id="revenue-chart" className="apex-charts" data-colors="#02c0ce,#777edd">
                  <ReactApexChart options={revenueChart} series={revenueChart.series} height={310} type="line" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={5}>
          <Card>
            <div className="d-flex card-header justify-content-between align-items-center">
              <div>
                <h4 className="header-title">Total Revenue</h4>
              </div>
              <Dropdown>
                <DropdownToggle as={Link} href="" className="drop-arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <IconifyIcon icon="ri:more-2-fill" className=" fs-18" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="">Sales Report</DropdownItem>
                  <DropdownItem href="">Export Report</DropdownItem>
                  <DropdownItem href="">Profit</DropdownItem>
                  <DropdownItem href="">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CardBody className="px-0 pt-0" style={{ height: '455px' }}>
              <div className="border-top border-bottom border-light border-dashed">
                <Row className="text-center align-items-center">
                  <Col md={4}>
                    <p className="text-muted mt-3 mb-1">Revenue</p>
                    <h4 className="mb-3">
                      <IconifyIcon icon="ri:arrow-left-down-box-line" className="text-success me-1" />
                      <span>$29.5k</span>
                    </h4>
                  </Col>
                  <Col md={4} className="border-start border-light border-dashed">
                    <p className="text-muted mt-3 mb-1">Expenses</p>
                    <h4 className="mb-3">
                      <IconifyIcon icon="ri:arrow-left-up-box-line" className=" text-danger me-1" />
                      <span>$15.07k</span>
                    </h4>
                  </Col>
                  <Col md={4} className="border-start border-end border-light border-dashed">
                    <p className="text-muted mt-3 mb-1">Investment</p>
                    <h4 className="mb-3">
                      <IconifyIcon icon="ri:bar-chart-line" className="me-1" />
                      <span>$3.6k</span>
                    </h4>
                  </Col>
                </Row>
              </div>
              <div dir="ltr" className="px-2">
                <div id="statistics-chart" className="apex-charts" data-colors="#0acf97,#45bbe0">
                  <ReactApexChart options={statisChart} series={statisChart.series} height={310} type="bar" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Statistics
