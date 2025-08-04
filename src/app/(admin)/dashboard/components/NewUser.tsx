'use client'
import Avatar1 from '@/assets/images/users/avatar-1.jpg'
import Avatar2 from '@/assets/images/users/avatar-2.jpg'
import Avatar3 from '@/assets/images/users/avatar-3.jpg'
import Avatar4 from '@/assets/images/users/avatar-4.jpg'
import Avatar5 from '@/assets/images/users/avatar-5.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { ArrowBigDown, ArrowBigUp, Images, MessageCircle, Rocket, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, Row, Table } from 'react-bootstrap'

const NewUser = () => {
  return (
    <>
      <Row>
        <Col xxl={4}>
          <Card>
            <CardHeader className="d-flex flex-wrap align-items-center gap-2">
              <h4 className="header-title me-auto">Recent New Users</h4>
              <div className="d-flex gap-2 justify-content-end text-end">
                <Link href="" className="btn btn-sm btn-light">
                  Import <IconifyIcon icon="ri:download-line" className="ms-1" />
                </Link>
                <Link href="" className="btn btn-sm btn-primary">
                  Export <IconifyIcon icon="ri:reset-right-line" className=" ms-1" />
                </Link>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="bg-light bg-opacity-50 py-1 text-center">
                <p className="m-0">
                  <b>895k</b> Active users out of <span className="fw-medium">965k</span>
                </p>
              </div>
              <div className="table-responsive">
                <Table className="table-custom table-centered table-sm table-nowrap table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-md flex-shrink-0 me-2">
                            <span className="avatar-title bg-primary-subtle rounded-circle">
                              <Image src={Avatar1} alt="" height={26} className="rounded-circle" />
                            </span>
                          </div>
                          <div>
                            <h5 className="fs-14 mt-1">John Doe</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">Administrator</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">
                          <IconifyIcon icon="ri:circle-fill" className="fs-12 text-success" /> Active
                        </h5>
                      </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle
                            href=""
                            as={Link}
                            className="text-muted drop-arrow-none card-drop p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="">View Profile</DropdownItem>
                            <DropdownItem href="">Deactivate</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-md flex-shrink-0 me-2">
                            <span className="avatar-title bg-info-subtle rounded-circle">
                              <Image src={Avatar2} alt="" height={26} className="rounded-circle" />
                            </span>
                          </div>
                          <div>
                            <h5 className="fs-14 mt-1">Jane Smith</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">Editor</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">
                          <IconifyIcon icon="ri:circle-fill" className="fs-12 text-warning" /> Pending
                        </h5>
                      </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle
                            href=""
                            as={Link}
                            className="text-muted drop-arrow-none card-drop p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="">View Profile</DropdownItem>
                            <DropdownItem href="">Activate</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-md flex-shrink-0 me-2">
                            <span className="avatar-title bg-secondary-subtle rounded-circle">
                              <Image src={Avatar3} alt="" height={26} className="rounded-circle" />
                            </span>
                          </div>
                          <div>
                            <h5 className="fs-14 mt-1">Michael Brown</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">Viewer</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">
                          <IconifyIcon icon="ri:circle-fill" className="fs-12 text-danger" /> Inactive
                        </h5>
                      </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle
                            href=""
                            as={Link}
                            className="text-muted drop-arrow-none card-drop p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="">Activate</DropdownItem>
                            <DropdownItem href="">Delete</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-md flex-shrink-0 me-2">
                            <span className="avatar-title bg-warning-subtle rounded-circle">
                              <Image src={Avatar4} alt="" height={26} className="rounded-circle" />
                            </span>
                          </div>
                          <div>
                            <h5 className="fs-14 mt-1">Emily Davis</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">Manager</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">
                          <IconifyIcon icon="ri:circle-fill" className="fs-12 text-success" /> Active
                        </h5>
                      </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle
                            href=""
                            as={Link}
                            className="text-muted drop-arrow-none card-drop p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="">View Profile</DropdownItem>
                            <DropdownItem href="">Deactivate</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-md flex-shrink-0 me-2">
                            <span className="avatar-title bg-danger-subtle rounded-circle">
                              <Image src={Avatar5} alt="" height={26} className="rounded-circle" />
                            </span>
                          </div>
                          <div>
                            <h5 className="fs-14 mt-1">Robert Taylor</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">Support</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 mt-1 fw-normal">
                          <IconifyIcon icon="ri:circle-fill" className=" fs-12 text-warning" /> Pending
                        </h5>
                      </td>
                      <td style={{ width: 30 }}>
                        <Dropdown>
                          <DropdownToggle
                            href="#"
                            as={Link}
                            className="text-muted drop-arrow-none card-drop p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <IconifyIcon icon="ri:more-2-fill" />
                          </DropdownToggle>
                          <div className="dropdown-menu dropdown-menu-end">
                            <DropdownItem href="">View Profile</DropdownItem>
                            <DropdownItem href="">Activate</DropdownItem>
                          </div>
                        </Dropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
            <CardFooter>
              <div className="align-items-center justify-content-between row text-center text-sm-start">
                <div className="col-sm">
                  <div className="text-muted">
                    Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">2596</span> Users
                  </div>
                </div>
                <div className="col-sm-auto mt-3 mt-sm-0">
                  <Pagination className="pagination-boxed pagination-sm mb-0 justify-content-center">
                    <Pagination.Item className=" disabled">
                      <IconifyIcon icon="ri:arrow-left-s-line" />
                    </Pagination.Item>
                    <Pagination.Item className=" active">
                      1
                    </Pagination.Item>
                    <Pagination.Item>
                      2
                    </Pagination.Item>
                    <Pagination.Item>
                      <IconifyIcon icon="ri:arrow-right-s-line" />
                    </Pagination.Item>
                  </Pagination>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col xxl={4}>
          <Card>
            <div className="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
              <h4 className="header-title">Transactions</h4>
              <Link href="" className="btn btn-sm btn-light">
                Add New <IconifyIcon icon="ri:add-line" className="ms-1" />
              </Link>
            </div>
            <SimplebarReactClient className="card-body" style={{ height: 400 }}>
              <div className="timeline-alt py-0">
                <div className="timeline-item">
                  <span className="bg-info-subtle text-info timeline-icon">
                    <ShoppingBag />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      You sold an item
                    </Link>
                    <span className="mb-1">Paul Burgess just purchased “My - Admin Dashboard”!</span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">5 minutes ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-primary-subtle text-primary timeline-icon">
                    <Rocket />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      Product on the Theme Market
                    </Link>
                    <span className="mb-1">
                      Reviewer added
                      <span className="fw-medium">Admin Dashboard</span>
                    </span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">30 minutes ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-info-subtle text-info timeline-icon">
                    <MessageCircle />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      Robert Delaney
                    </Link>
                    <span className="mb-1">
                      Send you message
                      <span className="fw-medium">"Are you there?"</span>
                    </span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">2 hours ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-primary-subtle text-primary timeline-icon">
                    <Images />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      Audrey Tobey
                    </Link>
                    <span className="mb-1">
                      Uploaded a photo
                      <span className="fw-medium">"Error.jpg"</span>
                    </span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">14 hours ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-info-subtle text-info timeline-icon">
                    <ShoppingBag />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      You sold an item
                    </Link>
                    <span className="mb-1">Paul Burgess just purchased “My - Admin Dashboard”!</span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">16 hours ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-primary-subtle text-primary timeline-icon">
                    <Rocket />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      Product on the Bootstrap Market
                    </Link>
                    <span className="mb-1">
                      Reviewer added
                      <span className="fw-medium">Admin Dashboard</span>
                    </span>
                    <p className="mb-0 pb-3">
                      <small className="text-muted">22 hours ago</small>
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="bg-info-subtle text-info timeline-icon">
                    <MessageCircle />
                  </span>
                  <div className="timeline-item-info">
                    <Link href="" className="link-reset fw-semibold mb-1 d-block">
                      Robert Delaney
                    </Link>
                    <span className="mb-1">
                      Send you message
                      <span className="fw-medium">"Are you there?"</span>
                    </span>
                    <p className="mb-0 pb-2">
                      <small className="text-muted">2 days ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </SimplebarReactClient>
          </Card>
        </Col>
        <Col xxl={4}>
          <Card>
            <CardHeader className="d-flex flex-wrap align-items-center gap-2 border-bottom border-dashed">
              <h4 className="header-title me-auto">Transactions Uses</h4>
              <div className="d-flex gap-2 justify-content-end text-end">
                <Link href="" className="btn btn-sm btn-primary">
                  Refresh <IconifyIcon icon="ri:reset-right-line" className="ms-1" />
                </Link>
              </div>
            </CardHeader>
            <SimplebarReactClient style={{ height: 400 }}>
              <ul className="list-unstyled transaction-list mb-0">
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Advertising</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">07/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigUp className="fs-20 text-danger" />
                  <span className="tran-text">Support licence</span>
                  <span className="text-danger tran-price">-$965</span>
                  <span className="text-muted ms-auto">07/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Extended licence</span>
                  <span className="text-success tran-price">+$830</span>
                  <span className="text-muted ms-auto">07/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Advertising</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">05/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigUp className="fs-20 text-danger" />
                  <span className="tran-text">New plugins added</span>
                  <span className="text-danger tran-price">-$452</span>
                  <span className="text-muted ms-auto">05/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Google Inc.</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">04/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigUp className="fs-20 text-danger" />
                  <span className="tran-text">Facebook Ad</span>
                  <span className="text-danger tran-price">-$364</span>
                  <span className="text-muted ms-auto">03/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">New sale</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">03/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Advertising</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">29/08/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigUp className="fs-20 text-danger" />
                  <span className="tran-text">Support licence</span>
                  <span className="text-danger tran-price">-$854</span>
                  <span className="text-muted ms-auto">27/08/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">Google Inc.</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">04/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigUp className="fs-20 text-danger" />
                  <span className="tran-text">Facebook Ad</span>
                  <span className="text-danger tran-price">-$364</span>
                  <span className="text-muted ms-auto">03/09/2017</span>
                </li>
                <li className="px-3 py-2 d-flex align-items-center">
                  <ArrowBigDown className="fs-20 text-success" />
                  <span className="tran-text">New sale</span>
                  <span className="text-success tran-price">+$230</span>
                  <span className="text-muted ms-auto">03/09/2017</span>
                </li>
              </ul>
            </SimplebarReactClient>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default NewUser
