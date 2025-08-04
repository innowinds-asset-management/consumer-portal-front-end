import small1 from '@/assets/images/small/small-1.jpg'
import small2 from '@/assets/images/small/small-2.jpg'
import small4 from '@/assets/images/small/small-4.jpg'
import small7 from '@/assets/images/small/small-7.jpg'
import avatar10 from '@/assets/images/users/avatar-10.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Timeline' }

const TimelinePage = () => {
  const timeLine3 = [avatar4, avatar5, avatar6, avatar7]
  const timeLine4 = [small7, small4, small1, small2]
  return (
    <>
      <PageTitle title="Timeline" subTitle="Pages" />
      <Row className="justify-content-center">
        <Col xxl={10}>
          <div className="timeline" dir="ltr">
            <div className="timeline-show mb-3 text-center">
              <h5 className="m-0 time-show-name">Today</h5>
            </div>
            <div className="timeline-lg-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:check-circle-bold-duotone" className="text-success fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">01</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">23 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2 text-dark fw-semibold fs-16">Project Completed: Achievements and Outcomes</p>
                      <p className="mb-0">1hr Ago</p>
                    </div>
                    <p className="mb-1">
                      <IconifyIcon icon="tabler:check" className="text-success me-1 fs-16" />
                      Successfully met all project goals and objectives within the stipulated timeline.
                    </p>
                    <p className="mb-0">
                      <IconifyIcon icon="tabler:check" className="text-success me-1 fs-16" />
                      Delivered high-quality outputs that meet or exceed the expectations of stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-lg-item timeline-item-right">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:user-bold-duotone" className="text-primary fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">02</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">23 May 2024</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center  gap-2 my-3">
                    <Image src={avatar10} alt="avatar" className="avatar-lg rounded-circle border border-light border-2" />
                    <div>
                      <p className="text-dark fw-medium fs-15 mb-0">Sara Johnson</p>
                      <p className="mb-0">srajhnson@yeti.com</p>
                    </div>
                    <div className="ms-auto">
                      <p className="mb-0">2hr Ago</p>
                    </div>
                  </div>
                  <p className="mb-2 text-dark fw-semibold fs-16">Join as a full stack developers</p>
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">html</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">CSS</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">JavaScript</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">NodeJS</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">ExpressJS</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">ExpressJS</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">Django</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12">MySQL</span>&nbsp;
                  <span className="badge bg-light-subtle border text-dark fw-medium px-2 py-1 fs-12 my-1">PostgreSQL</span>&nbsp;
                </div>
              </div>
            </div>
            <div className="timeline-lg-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:document-add-bold-duotone" className="text-warning fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">03</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">23 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2 text-dark fw-semibold fs-16">Started Company Meeting</p>
                      <p className="mb-0">2hr Ago</p>
                    </div>
                    <div className="d-flex flex-wrap align-items-center my-1 gap-1">
                      <div className="avatar-group">
                        {timeLine3.map((img, idx) => (
                          <div className="avatar" key={idx}>
                            <Image src={img} alt="avatar" className="rounded-circle avatar-sm" />
                          </div>
                        ))}
                        <div className="avatar">
                          <div className="avatar-sm">
                            <span className="avatar-title bg-dark text-white fs-18 rounded-circle">
                              <IconifyIcon icon="tabler:plus" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mb-0 ms-1 fs-14">+23 Employee Join Meeting </p>
                    </div>
                    <p className="mb-0 mt-3 text-dark fw-semibold">
                      Topic : <span className="text-muted fw-medium">New project and admin dashboard</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-lg-item timeline-item-right">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:graph-new-up-bold-duotone" className="text-success fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">04</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">23 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h4 className="text-dark mb-0 fw-semibold">
                        New Admin Release In Bootstrap <span className="badge bg-success-subtle text-success px-2 py-1 fs-11 ms-1">New Release</span>
                      </h4>
                      <p className="mb-0">3hr Ago</p>
                    </div>
                    <p>Get started with our company of web components and interactive elements built on top of Bootstrap.</p>
                    <div className="timeline-album mb-3">
                      {timeLine4.map((img, idx) => (
                        <Link href="" key={idx}>
                          <Image src={img} alt="avatar" className="rounded-3" />
                        </Link>
                      ))}
                    </div>
                    <Button variant="primary" size="sm">
                      Show More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-lg-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:presentation-graph-bold-duotone" className="text-primary fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">05</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">23 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center  gap-2 my-3">
                      <Image src={avatar5} alt="avatar" className="avatar-lg rounded-circle border border-light border-2" />
                      <div>
                        <h4 className="text-dark  fw-semibold"> Assigned to serve as the project&apos;s director</h4>
                        <span className="text-dark">
                          <small>
                            by
                            <Link href="" className="text-primary">
                              John N. Ward.
                            </Link>
                          </small>
                        </span>
                      </div>
                      <div className="ms-auto">
                        <p className="mb-0">3hr Ago</p>
                      </div>
                    </div>
                    <p className="mb-0">
                      I&apos;ve come across your posts and found some favorable deals on your page. I&apos;ve added a load of products to the cart and
                      I don&apos;t know the payment options you avail. Also, can you enlighten me about any discount
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-show my-3 text-center">
              <h5 className="m-0 time-show-name">Yesterday</h5>
            </div>
            <div className="timeline-lg-item timeline-item-right">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:code-circle-bold-duotone" className="text-warning fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">01</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">22 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h4 className="text-dark mb-0  fw-semibold"> We have achieved 5.6k sales in our themes.</h4>
                      <p className="mb-0">1day Ago</p>
                    </div>
                    <p className="mb-0">
                      As we celebrate this achievement, we remain focused on our mission to deliver top-notch themes that meet the evolving needs of
                      our users. We are excited about the future and are dedicated to reaching new heights, expanding our offerings, and maintaining
                      the high standards that have earned us this success
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-lg-item timeline-item-left">
              <div className="timeline-desk">
                <div className="timeline-box">
                  <span className="arrow-alt shadow-none" />
                  <span className="timeline-icon avatar-lg">
                    <span className="avatar-title bg-light rounded-circle">
                      <IconifyIcon icon="solar:book-bookmark-bold-duotone" className="text-success fs-28" />
                    </span>
                  </span>
                  <div className="d-flex justify-content-between gap-2">
                    <h4 className="fw-bold text-dark mb-0">02</h4>
                    <div className="text-end">
                      <p className="mb-0 fw-medium">22 May 2024</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="avatar-lg">
                        <span className="avatar-title bg-light rounded-circle">
                          <IconifyIcon icon="solar:monitor-bold" className="text-primary fs-28" />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-dark mb-0  fw-semibold"> Website Launched</h4>
                        <p className="text-muted fw-medium fs-14 mt-1 mb-0">
                          <span className="text-dark">Name : </span> Ocen
                        </p>
                      </div>
                    </div>
                    <p className="mb-0 mt-2">
                      Creating a simple Bootstrap website involves using the Bootstrap framework to style and layout your HTML content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default TimelinePage
