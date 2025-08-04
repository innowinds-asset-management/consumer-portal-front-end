'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ReactApexChart from 'react-apexcharts'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { customerschart, porfitChart, productChart, salesChart } from '../data'

const Stat = () => {
  return (
    <>
      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Revenue">
                    Total Revenue
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">$1.25M</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      15.34%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-success-subtle text-success rounded fs-28">
                    <IconifyIcon icon="solar:wallet-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
            <div className="apex-charts" id="chart-revenue">
              <ReactApexChart options={salesChart} series={salesChart.series} height={45} type="area" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Products Sold">
                    Products Sold
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">48.7k</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      10.12%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-info-subtle text-info rounded fs-28">
                    <IconifyIcon icon="solar:cart-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
            <div className="apex-charts" id="chart-products">
              <ReactApexChart options={productChart} series={productChart.series} height={45} type="area" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="New Customers">
                    New Customers
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">1.2k</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-danger me-1">
                      <IconifyIcon icon="ri:arrow-down-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      5.47%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle text-warning rounded fs-28">
                    <IconifyIcon icon="solar:user-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
            <div className="apex-charts" id="chart-customers">
              <ReactApexChart options={customerschart} series={customerschart.series} height={45} type="area" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Profit Margin">
                    Profit Margin
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">38.5%</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      8.21%
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-primary-subtle text-primary rounded fs-28">
                    <IconifyIcon icon="solar:graph-up-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
            <div className="apex-charts" id="chart-profit">
              <ReactApexChart options={porfitChart} series={porfitChart.series} height={45} type="area" />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Stat
