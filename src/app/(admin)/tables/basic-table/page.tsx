import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Col, ProgressBar, Row, Table } from 'react-bootstrap'
import { expandableRecords, nestedRecords, records } from '../data'

export const metadata: Metadata = { title: 'Basic Tables' }

const BasicTable = () => {
  return (
    <ComponentContainerCard
      title="My Table"
      description={
        <>
          For basic styling—light padding and only horizontal dividers—add the base class <code>.table</code> to any <code>&lt;table&gt;</code>.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.phoneNo}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    {item.active ? (
                      <>
                        <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                        <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    ) : (
                      <>
                        <input type="checkbox" id="switch04" data-switch="success" />
                        <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const InverseTable = () => {
  return (
    <ComponentContainerCard
      title="Inverse Table"
      description={
        <>
          You can also invert the colors—with light text on dark backgrounds—with <code>.table-dark</code>.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-dark mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.phoneNo}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    {item.active ? (
                      <>
                        <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                        <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    ) : (
                      <>
                        <input type="checkbox" id="switch04" data-switch="success" />
                        <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const StripedRowTable = () => {
  return (
    <ComponentContainerCard
      title="Striped Rows"
      description={
        <>
          Use <code>.table-striped</code> to add zebra-striping to any table row within the <code>&lt;tbody&gt;</code>.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-striped mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Account No.</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(records || []).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td className="table-user">
                    <Image src={record.image} alt="table-user" className="me-2 rounded-circle avatar-sm" />
                    &nbsp;{record.name}
                  </td>
                  <td>{record.accountNo}</td>
                  <td>{record.dob}</td>
                  <td>
                    <Link href="" className="text-reset fs-16 px-1">
                      <IconifyIcon icon="tabler:pencil" />
                    </Link>
                    <Link href="" className="text-reset fs-16 px-1">
                      <IconifyIcon icon="tabler:trash" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const StripedColumnsTable = () => {
  return (
    <ComponentContainerCard
      title="Striped Columns"
      description={
        <>
          Use <code>.table-striped-columns</code> to add zebra-striping to any table column.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-striped-columns mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Account No.</th>
              <th>Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {(records || []).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <Image src={record.image} alt="table-user" className="me-2 avatar-sm rounded-circle" />
                    &nbsp;{record.name}
                  </td>
                  <td>{record.accountNo}</td>
                  <td>{record.dob}</td>
                  <td className="text-muted text-center">
                    <Link href="" className="link-reset fs-20 p-1">
                      <IconifyIcon icon="tabler:pencil" />
                    </Link>
                    <Link href="" className="link-reset fs-20 p-1">
                      <IconifyIcon icon="tabler:trash" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const TableHeadOptions = () => {
  return (
    <ComponentContainerCard
      title="Table Head Options"
      description={
        <>
          Use one of two modifier classes to make <code>&lt;thead&gt;</code>s appear light or dark gray.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Courier</th>
              <th>Process</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.product}</td>
                  <td>{item.courier}</td>
                  <td>
                    <ProgressBar now={item.now} variant={item.variant} className="progress-sm" />
                  </td>
                  <td>
                    <IconifyIcon icon="tabler:circle" className={`text-${item.variant}`} /> {item.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const TableHeadOptions2 = () => {
  return (
    <ComponentContainerCard
      title="Table Head Options"
      description={
        <>
          Use one of two modifier classes to make <code>&lt;thead&gt;</code>s appear light or dark gray.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Courier</th>
              <th>Process</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.product}</td>
                  <td>{item.courier}</td>
                  <td>
                    <ProgressBar now={item.now} variant={item.variant} className="progress-sm" />
                  </td>
                  <td>
                    <IconifyIcon icon="tabler:circle" className={`text-${item.variant}`} /> {item.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const HoverableRows = () => {
  return (
    <ComponentContainerCard
      title="Hoverable Rows"
      description={
        <>
          Add <code>.table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-hover mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>{record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity} Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const InverseHoverableRows = () => {
  return (
    <ComponentContainerCard
      title="Inverse Hoverable Rows"
      description={
        <>
          Add <code>.table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>{record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity} Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const BorderedTable = () => {
  return (
    <ComponentContainerCard
      title="Bordered Table"
      description={
        <>
          Add <code>.table-bordered</code> for borders on all sides of the table and cells.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-bordered mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Account No.</th>
              <th>Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => {
              return (
                <tr key={idx}>
                  <td className="table-user">
                    <Image src={record.image} alt="table-user" className="me-2 avatar-sm rounded-circle" />
                    &nbsp;{record.name}
                  </td>
                  <td>{record.accountNo}</td>
                  <td>{record.dob}</td>
                  <td className="text-center text-muted">
                    <Link href="" className="link-reset fs-20 p-1">
                      <IconifyIcon icon="tabler:trash" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const BorderedColorTable = () => {
  return (
    <ComponentContainerCard
      title="Bordered Color Table"
      description={
        <>
          Add <code>.table-bordered</code> &amp; <code>.border-primary</code> can be added to change colors.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-bordered border-secondary mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Account No.</th>
              <th>Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => {
              return (
                <tr key={idx}>
                  <td className="table-user">
                    <Image src={record.image} alt="table-user" className="me-2 avatar-sm rounded-circle" />
                    &nbsp;{record.name}
                  </td>
                  <td>{record.accountNo}</td>
                  <td>{record.dob}</td>
                  <td className="text-center text-muted">
                    <Link href="" className="link-reset fs-20 p-1">
                      <IconifyIcon icon="tabler:trash" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const AlwaysResponsive = () => {
  return (
    <ComponentContainerCard
      title="Always Responsive"
      description={
        <>
          Across every breakpoint, use
          <code>.table-responsive</code> for horizontally scrolling tables. Use
          <code>
            .table-responsive{'{'}-sm|-md|-lg|-xl{'}'}
          </code>
          as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not
          scroll horizontally.
        </>
      }>
      <div className="table-responsive">
        <Table className="mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            {records.slice(0, 3).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.id}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                  <td>{record.cell}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const BasicBorderlessTable = () => {
  return (
    <ComponentContainerCard
      title="Basic Borderless Example"
      description={
        <>
          Add <code>.table-borderless</code> for a table without borders.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-borderless mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.phoneNo}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    {item.active ? (
                      <>
                        <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                        <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    ) : (
                      <>
                        <input type="checkbox" id="switch04" data-switch="success" />
                        <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const InverseBorderlessTable = () => {
  return (
    <ComponentContainerCard
      title="Inverse Borderless Table"
      description={
        <>
          Add <code>.table-borderless</code> for a table without borders.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-dark table-borderless mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.phoneNo}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    {item.active ? (
                      <>
                        <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                        <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    ) : (
                      <>
                        <input type="checkbox" id="switch04" data-switch="success" />
                        <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const ActiveTables = () => {
  return (
    <ComponentContainerCard
      title="Active Tables"
      description={
        <>
          Highlight a table row or cell by adding a <code>.table-active</code> class.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => {
              return (
                <tr className={record.activeClass ? record.activeClass : ''} key={idx}>
                  <td>{record.name}</td>
                  <td>{record.phoneNo}</td>
                  <td>{record.dob}</td>
                  <td>{record.country}</td>
                </tr>
              )
            })}
            <tr>
              <td>Risa D. Pearson</td>
              <td>336-508-2157</td>
              <td>July 24, 1950</td>
              <td>Belgium</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const NestingTable = () => {
  return (
    <ComponentContainerCard title="Nesting" description={<>Border styles, active styles, and table variants are not inherited by nested tables.</>}>
      <div className="table-responsive-sm">
        <Table className="table-striped mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            {nestedRecords.map((record, idx) => {
              return record.children ? (
                <Fragment key={idx}>
                  <tr>
                    <td>{record.name}</td>
                    <td>{record.phoneNo}</td>
                    <td>{record.dob}</td>
                    <td>
                      <div>
                        {record.active ? (
                          <>
                            <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                            <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                          </>
                        ) : (
                          <>
                            <input type="checkbox" id="switch04" data-switch="success" />
                            <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr key={idx}>
                    <td colSpan={4}>
                      <Table className="table-sm mb-0">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Date of Birth</th>
                            <th>Country</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(record.children || []).map((record, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{record.name}</td>
                                <td>{record.phoneNo}</td>
                                <td>{record.dob}</td>
                                <td>
                                  <div>
                                    {record.active ? (
                                      <>
                                        <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                                        <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                                      </>
                                    ) : (
                                      <>
                                        <input type="checkbox" id="switch04" data-switch="success" />
                                        <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </Fragment>
              ) : (
                <tr key={idx}>
                  <td>{record.name}</td>
                  <td>{record.phoneNo}</td>
                  <td>{record.dob}</td>
                  <td>
                    <div>
                      {record.active ? (
                        <>
                          <input type="checkbox" id="switch01" defaultChecked data-switch="success" />
                          <label htmlFor="switch01" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                        </>
                      ) : (
                        <>
                          <input type="checkbox" id="switch04" data-switch="success" />
                          <label htmlFor="switch04" data-on-label="Yes" data-off-label="No" className="mb-0 d-block" />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const SmallTable = () => {
  return (
    <ComponentContainerCard
      title="Small Table"
      description={
        <>
          Add <code>.table-sm</code> to make tables more compact by cutting cell padding in half.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="table-sm mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>{record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity}&nbsp;Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const TableFoot = () => {
  return (
    <ComponentContainerCard
      title="Table Foot"
      description={
        <>
          Add <code>.table-sm</code> to make tables more compact by cutting cell padding in half.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>${record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity}&nbsp;Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Footer</th>
              <td>Footer</td>
              <td>Footer</td>
              <td>Footer</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const CaptionsTable = () => {
  return (
    <ComponentContainerCard
      title="Captions"
      description={
        <>
          Add <code>.table-sm</code> to make tables more compact by cutting cell padding in half.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>{record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity}&nbsp;Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const CaptionTopTable = () => {
  return (
    <ComponentContainerCard
      title="Caption Top"
      description={
        <>
          Add <code>.table-sm</code> to make tables more compact by cutting cell padding in half.
        </>
      }>
      <div className="table-responsive-sm">
        <Table className="mb-0 caption-top">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expandableRecords.slice(0, 4).map((record, idx) => {
              return (
                <tr key={idx}>
                  <td>{record.product}</td>
                  <td>{record.price}</td>
                  <td>
                    <span className="badge bg-primary">{record.Quantity}&nbsp;Pcs</span>
                  </td>
                  <td>${record.Amount}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </ComponentContainerCard>
  )
}

const BasicTables = () => {
  return (
    <>
      <PageTitle title="Basic Tables" subTitle="Tables" />
      <Row>
        <Col xl={6}>
          <BasicTable />
        </Col>
        <Col xl={6}>
          <InverseTable />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <StripedRowTable />
        </Col>
        <Col xl={6}>
          <StripedColumnsTable />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <TableHeadOptions />
        </Col>
        <Col xl={6}>
          <TableHeadOptions2 />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <HoverableRows />
        </Col>
        <Col xl={6}>
          <InverseHoverableRows />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BorderedTable />
        </Col>
        <Col xl={6}>
          <BorderedColorTable />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AlwaysResponsive />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <BasicBorderlessTable />
        </Col>
        <Col xl={6}>
          <InverseBorderlessTable />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ActiveTables />
        </Col>
        <Col xl={6}>
          <NestingTable />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <SmallTable />
        </Col>
        <Col xl={6}>
          <TableFoot />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <CaptionsTable />
        </Col>
        <Col xl={6}>
          <CaptionTopTable />
        </Col>
      </Row>
    </>
  )
}

export default BasicTables
