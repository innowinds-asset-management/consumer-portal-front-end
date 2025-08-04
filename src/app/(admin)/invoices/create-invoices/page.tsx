import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import React from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import PreviewButton from './Preview'
import { Card, CardBody, Col, Form, Row, Table } from 'react-bootstrap'
import { Metadata } from 'next'
import PageTitle from '@/components/PageTitle'


export const metadata: Metadata = { title: 'Create Invoice' }

const CreateInvoicePage = () => {
  return (
    <>
      <PageTitle title='Create Invoice' subTitle='Invoices' />
      <Row>
        <Col xs={12}>
          <Card className="position-relative">
            <Form>
              <CardBody>
                <div className="d-flex align-items-start justify-content-between mb-4">
                  <div className="overflow-hidden position-relative border rounded d-flex align-items-center justify-content-start px-2" style={{ height: 60, width: 260 }}>
                    <label htmlFor="imageInput" className="position-absolute top-0 start-0 end-0 bottom-0" />
                    <input className="d-none" type="file" id="imageInput" />
                    <Image id="preview" src={logoDark} alt="Preview Image" height={28} />
                  </div>
                  <div className="text-end">
                    <Row className=" g-1 align-items-center">
                      <Col xs={'auto'}>
                        <label htmlFor="invoiceNo" className="col-form-label fs-16 fw-bold">#INV</label>
                      </Col>
                      <Col xs={'auto'}>
                        <Form.Control type="number" id="invoiceNo" className="form-control" placeholder={'00001234'} />
                      </Col>
                    </Row>
                  </div>
                </div>
                <Row>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-sm-0 mt-3">
                    <div className="mb-2">
                      <label className="form-label">Invoice Date :</label>
                      <Form.Control type="text" data-provider="flatpickr" data-date-format="d M, Y" data-deafult-date="today" placeholder="Select Date" />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Due Date :</label>
                      <Form.Control type="text" data-provider="flatpickr" data-altformat="F j, Y" placeholder="Select Date" />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="InvoicePaymentStatus" className="form-label">Payment
                        Status</label>
                      <Form.Select id="InvoicePaymentStatus">
                        <option >Select Status</option>
                        <option value="Choice 1">Paid</option>
                        <option value="Choice 2">Unpaid</option>
                        <option value="Choice 3">Cancelled</option>
                        <option value="Choice 4">Refunded</option>
                      </Form.Select>
                    </div>
                    <div>
                      <label htmlFor="InvoicePaymentMethod" className="form-label">Payment
                        Method</label>
                      <Form.Select id="InvoicePaymentMethod">
                        <option >Select Method</option>
                        <option value="Choice 1">Credit / Debit Card</option>
                        <option value="Choice 2">Bank Transfer</option>
                        <option value="Choice 3">PayPal</option>
                        <option value="Choice 4">Payoneer</option>
                        <option value="Choice 5">Cash On Delivery</option>
                        <option value="Choice 6">Wallet</option>
                        <option value="Choice 7">UPI (Gpay)</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-4">
                      <label className="form-label">Billing Address :</label>
                      <div className="mb-2 pb-1">
                        <Form.Control type="text" id="BName" placeholder="Full Name" />
                      </div>
                      <div className="mb-2 pb-1">
                        <Form.Control as="textarea" id="BAddress" rows={3} placeholder="Address" defaultValue={""} />
                      </div>
                      <div>
                        <Form.Control type="text" id="BNumber" placeholder="Phone Number" />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-sm-0 mt-3">
                    <div className="mb-4">
                      <label className="form-label">Shipping Address :</label>
                      <div className="mb-2 pb-1">
                        <Form.Control type="text" id="SName" placeholder="Full Name" />
                      </div>
                      <div className="mb-2 pb-1">
                        <Form.Control as="textarea" id="SAddress" rows={3} placeholder="Address" defaultValue={""} />
                      </div>
                      <div>
                        <Form.Control type="text" id="SNumber" placeholder="Phone Number" />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <div className="table-responsive">
                    <Table className="text-center table-nowrap align-middle mb-0">
                      <thead>
                        <tr className="bg-light bg-opacity-50">
                          <th scope="col" className="border-0" style={{ width: 70 }}>#</th>
                          <th scope="col" className="border-0 text-start">Product Details</th>
                          <th scope="col" className="border-0" style={{ width: 140 }}>Quantity
                          </th>
                          <th scope="col" className="border-0" style={{ width: 140 }}>Unit
                            price</th>
                          <th scope="col" className="border-0" style={{ width: 240 }}>Amount
                          </th>
                          <th scope="col" className="border-0" style={{ width: 50 }}>•••</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">01</th>
                          <td className="text-start">
                            <Form.Control type="text" id="product-detail-one" className=" mb-1" placeholder="Product One" />
                            <Form.Control type="text" id="product-desc-one" placeholder="Item description" />
                          </td>
                          <td>
                            <Form.Control type="number" id="product-category-one" placeholder="Quantity" />
                          </td>
                          <td>
                            <Form.Control type="number" placeholder="Price" />
                          </td>
                          <td>
                            <Form.Control type="number" className="  w-auto" placeholder="$0.00" />
                          </td>
                          <td>
                            <button type="button" className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"><IconifyIcon icon="solar:trash-bin-trash-bold-duotone" className="fs-20" /></button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">02</th>
                          <td className="text-start">
                            <Form.Control type="text" id="product-detail-two" className=" mb-1" placeholder="Product Two" />
                            <Form.Control type="text" id="product-desc-two" placeholder="Item description" />
                          </td>
                          <td>
                            <Form.Control type="number" id="product-category-two" placeholder="Quantity" />
                          </td>
                          <td>
                            <Form.Control type="number" placeholder="Price" />
                          </td>
                          <td>
                            <Form.Control type="number" className="  w-auto" placeholder="$0.00" />
                          </td>
                          <td>
                            <button type="button" className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"><IconifyIcon icon="solar:trash-bin-trash-bold-duotone" className="fs-20" /></button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="p-2">
                      <button type="button" className="btn btn-primary"><IconifyIcon icon='tabler:circle-plus' className="me-1" /> Add Products</button>
                    </div>
                  </div>
                  <div>
                    <Table className="table-sm table-borderless table-nowrap align-middle mb-0 ms-auto" style={{ width: 300 }}>
                      <tbody>
                        <tr>
                          <td className="fw-medium">Subtotal</td>
                          <td className="text-end">
                            <div className="ms-auto" style={{ width: 160 }}>
                              <Form.Control type="number" id="productSubtotal" placeholder="$0.00" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Shipping</td>
                          <td className="text-end">
                            <div className="ms-auto" style={{ width: 160 }}>
                              <Form.Control type="number" id="productShipping" placeholder="$0.00" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Discount <small className="text-muted">(10%)</small></td>
                          <td className="text-end">
                            <div className="ms-auto" style={{ width: 160 }}>
                              <Form.Control type="number" id="productDiscount" placeholder="$0.00" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Tax <small className="text-muted">(18%)</small></td>
                          <td className="text-end">
                            <div className="ms-auto" style={{ width: 160 }}>
                              <Form.Control type="number" id="productTaxes" placeholder="$0.00" />
                            </div>
                          </td>
                        </tr>
                        <tr className="fs-15">
                          <th scope="row" className="fw-bold">Total Amount</th>
                          <th className="text-end">
                            <div className="ms-auto" style={{ width: 160 }}>
                              <Form.Control type="number" id="productTotalAmount" disabled placeholder="$0.00" />
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="InvoiceNote"> Note : </label>
                  <Form.Control as="textarea" id="InvoiceNote" placeholder="Thanks for your business " rows={3} defaultValue={""} />
                </div>
              </CardBody>
            </Form>
          </Card>
          <div className="mb-5">
            <div className="d-flex justify-content-center gap-2">
              <PreviewButton />
              <a href="" className="btn btn-success gap-1"><IconifyIcon icon='tabler:device-floppy' className="fs-16" /> Save</a>
              <a href="" className="btn btn-info gap-1"><IconifyIcon icon='tabler:send' className=" fs-16" /> Send Invoice</a>
            </div>
          </div>
        </Col>
      </Row>
    </>


  )
}

export default CreateInvoicePage