import Image from 'next/image'
import React from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import signature from '@/assets/images/png/signature.png'
import qrCode from '@/assets/images/png/qr-code.png'
import { invoiceProductData } from './data'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PrintButton from './PrintButton'
import { Button, Card, CardBody, Col, Row, Table } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'View Invoice' }

const ViewInvoice = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <Image src={logoDark} alt="dark logo" height={24} />
                </div>
                <div className="text-end">
                  <span className="badge bg-success-subtle text-success px-1 fs-12 mb-3">Paid</span>
                  <h3 className="m-0 fw-bolder fs-20">Invoice: #INV7896</h3>
                </div>
              </div>
              <Row>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Invoice From : </h5>
                    <h6 className="fs-14 mb-2">Chris Keller</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      1055 Station Street Fremont, <br /> CA - 94539
                    </h6>
                    <h6 className="fs-14 text-muted mb-0">Phone: 510-875-0005</h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Invoice Date : </h5>
                    <h6 className="fs-14 text-muted">12 Apr 2024</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Bill To : </h5>
                    <h6 className="fs-14 mb-2">Lucian Obrien</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      1147 Rohan Drive Suite, <br />
                      Burlington, VT / 82021
                    </h6>
                    <h6 className="fs-14 text-muted mb-0">Phone: 904-966-2836</h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Due Date : </h5>
                    <h6 className="fs-14 text-muted">28 Apr 2024</h6>
                  </div>
                </Col>
                <Col xs={4} className="text-end">
                  <Image src={qrCode} alt="qr-code-image" height={100} />
                </Col>
              </Row>
            </CardBody>
            <div className="mt-4">
              <div className="table-responsive">
                <Table className="text-center table-nowrap align-middle mb-0">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="border-0" scope="col" style={{ width: 50 }}>
                        #
                      </th>
                      <th className="text-start border-0" scope="col">
                        Product Details
                      </th>
                      <th className="border-0" scope="col">
                        Quantity
                      </th>
                      <th className="border-0" scope="col">
                        Unit price
                      </th>
                      <th className="text-end border-0" scope="col">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody id="products-list">
                    {invoiceProductData.map((item, idx) => (
                      <tr key={idx}>
                        <th scope="row">0{idx + 1}</th>
                        <td className="text-start">
                          <div className="d-flex align-items-center gap-2">
                            <IconifyIcon icon={item.icon} className="fs-22" />
                            <div>
                              <span className="fw-medium">{item.title}</span>
                              <p className="text-muted mb-0">({item.description})</p>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td className="text-end">${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <Table className="table-nowrap align-middle mb-0 ms-auto" style={{ width: 335 }}>
                  <tbody>
                    <tr>
                      <td className="fw-medium">Subtotal</td>
                      <td className="text-end">$2,599.00</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Shipping <small className="text-muted">(Free)</small>
                      </td>
                      <td className="text-end">-</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Discount <small className="text-muted">(10%)</small>
                      </td>
                      <td className="text-end">-$259.90</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Tax <small className="text-muted">(5%)</small>
                      </td>
                      <td className="text-end">$116.95</td>
                    </tr>
                    <tr className="border-top border-top-dashed fs-16">
                      <td className="fw-bold">Total Amount</td>
                      <td className="fw-bold text-end">$2456.05</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <CardBody>
              <div className="bg-body p-2 rounded-2 mt-4">
                <p className="mb-0">
                  <span className="fs-12 fw-bold text-uppercase">Note : </span>Payment for all accounts is due within 7 days from the date of invoice
                  receipt. Payments can be made via cheque, credit card, or direct online payment. Failure to settle the account within 7 days will
                  result in the agreed quoted fee, as noted above, being charged against the credit details provided as confirmation of the work
                  undertaken.
                </p>
              </div>
              <div className="mt-4">
                <p className="mb-2 pb-2">
                  <b>Congratulations on your recent purchase!</b> It has been our pleasure to serve you, and we hope we see you again soon.
                </p>
                <div className="d-inline-block">
                  <Image src={signature} alt="signature" height={32} />
                  <h5 className="mb-0 mt-2">Authorized Sign</h5>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="d-print-none mb-5">
            <div className="d-flex justify-content-center gap-2">
              <PrintButton />
              <Button variant="secondary">
                <IconifyIcon icon="tabler:send" className="me-1" /> Send
              </Button>
              <Button variant="info">
                <IconifyIcon icon="tabler:download" className="me-1" /> Download
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ViewInvoice
