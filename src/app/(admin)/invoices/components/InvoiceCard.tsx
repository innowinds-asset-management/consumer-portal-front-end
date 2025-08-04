'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { getAllInvoices } from '@/helpers/data'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardFooter, CardHeader, Table } from 'react-bootstrap'
import CustomPagination from './CustomPagination'
import { useFetchData } from '@/hooks/useFetchData'

const InvoicesCard =  () => {
  const invoiceData = useFetchData(getAllInvoices)
  return (
    <Card>
      <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
        <div className="flex-grow-1">
          <h4 className="header-title">Invoices</h4>
        </div>
        <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
          <div className="flex-shrink-0 d-flex align-items-center gap-2">
            <div className="position-relative">
              <input type="text" className="form-control ps-4" placeholder="Search Here..." />
              <IconifyIcon icon="ti:search" className="ti position-absolute top-50 translate-middle-y start-0 ms-2" />
            </div>
          </div>
          <Link href="/invoices/create-invoices" className="btn btn-primary">
            <IconifyIcon icon="ri:add-line " className="me-1" />
            Add Invoice
          </Link>
        </div>
      </CardHeader>
      <div className="table-responsive">
        <Table className="table-hover text-nowrap mb-0">
          <thead className="bg-light-subtle">
            <tr>
              <th className="ps-3" style={{ width: 50 }}>
                <input type="checkbox" className="form-check-input" id="customCheck1" />
              </th>
              <th className="fs-12 text-uppercase text-muted">Invoice ID</th>
              <th className="fs-12 text-uppercase text-muted">Category </th>
              <th className="fs-12 text-uppercase text-muted">Created On</th>
              <th className="fs-12 text-uppercase text-muted">Invoice To</th>
              <th className="fs-12 text-uppercase text-muted">Amount</th>
              <th className="fs-12 text-uppercase text-muted">Due Date</th>
              <th className="fs-12 text-uppercase text-muted">Status</th>
              <th className="text-center fs-12 text-uppercase text-muted" style={{ width: 120 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="ps-3">
                    <input type="checkbox" className="form-check-input" id="customCheck2" />
                  </td>
                  <td>
                    <span className="text-muted fw-semibold">#{item.id}</span>
                  </td>
                  <td>{item.products?.category}</td>
                  <td>
                    <span className="fs-15 text-muted">{item.date.toLocaleString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="avatar-sm">
                        {item.users?.avatar && <Image src={item.users?.avatar} alt="avatar" className="img-fluid rounded-circle" />}
                      </div>
                      <h6 className="fs-14 mb-0">{item.users?.name}</h6>
                    </div>
                  </td>
                  <td>${item.products?.amount}</td>
                  <td>
                    <span className="fs-15 text-muted">
                      {item.products?.date.toLocaleString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${item.products?.status == 'Overdue' ? 'warning' : item.products?.status == 'Pending' ? 'primary' : item.products?.status == 'Cancelled' ? 'danger' : 'success'}-subtle text-${item.products?.status == 'Overdue' ? 'warning' : item.products?.status == 'Pending' ? 'primary' : item.products?.status == 'Cancelled' ? 'danger' : 'success'} fs-12 p-1`}>
                      {item.products?.status}
                    </span>
                  </td>
                  <td className="pe-3">
                    <div className="hstack gap-1 justify-content-end">
                      <Button variant="soft-primary" size="sm" className="btn-icon rounded-circle">
                        <IconifyIcon icon="ri:eye-line"></IconifyIcon>
                      </Button>
                      <Button variant="soft-success" size="sm" className="btn-icon rounded-circle">
                        <IconifyIcon icon="ri:edit-box-line" className=" fs-16" />
                      </Button>
                      <Button variant="soft-danger" size="sm" className="btn-icon rounded-circle">
                        <IconifyIcon icon="ri:delete-bin-line" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <CardFooter>
        <div className="d-flex justify-content-end">
          <CustomPagination />
        </div>
      </CardFooter>
    </Card>
  )
}

export default InvoicesCard
