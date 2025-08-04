import PageTitle from '@/components/PageTitle'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/images/logo.png'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms & Conditions' }

const TermsPage = () => {
  return (
    <>
      <PageTitle title="Terms & Conditions" subTitle="Pages" />
      <div>
        <Row className=" justify-content-center">
          <Col lg={12}>
            <Card className="overflow-hidden">
              <CardHeader className="terms-bg bg-primary text-center p-4">
                <div className="mb-3">
                  <Link href="/" className="logo-light">
                    <span>
                      <Image src={logo} alt="logo" height={26} />
                    </span>
                    &nbsp;
                  </Link>
                  <span className="h4 fw-semibold text-white">- Responsive Admin &amp; Dashboard Template</span>
                </div>
                <h2 className="text-white fw-semibold">Terms &amp; Conditions</h2>
              </CardHeader>
            </Card>
            <Row>
              <Col xl={6} lg={12}>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      Agreement T0 Terms :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p>
                      These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity you
                      and Space we, concerning your access to and use of the space.com website as well as any other media form, media channel, mobile
                      website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;).
                    </p>
                    <p className="mb-0">
                      You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you
                      do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue
                      use immediately.
                    </p>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      Cookies :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser
                      from the website that you visit and are stored on your computer&apos;s hard drive
                    </p>
                    <p className="mb-0">
                      Our website uses these &quot;cookies&quot; to collection information and to improve aur Service. You have the option to either
                      accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you
                      may not be able to use some portions of our Service
                    </p>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      Contact Information :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="fs-5 fw-semibold">If you have any questions about these Terms &amp; Conditions, please contact us at :</p>
                    <ol className="ps-3 d-flex flex-column gap-1">
                      <li>
                        <p className="mb-0">
                          <span className="text-dark fw-semibold">Email : </span> <Link href="">ocenbycoderthemes@mail.com</Link>
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <span className="text-dark fw-semibold">Contact Number : </span> <Link href="">+001 364-364-000</Link>
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">
                          <span className="text-dark fw-semibold">Location : </span> <Link href="">3469 Beech Street Oakland, CA 94607</Link>
                        </p>
                      </li>
                    </ol>
                    <p className="mb-0">
                      By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6} lg={12}>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      User Representations :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="fs-5 fw-semibold">By using the Site, you represent and warrant that :</p>
                    <ol className="ps-3 d-flex flex-column gap-1">
                      <li>
                        <p className="mb-0">All registration information you submit will be true, accurate, current, and complete.</p>
                      </li>
                      <li>
                        <p className="mb-0">
                          You will maintain the accuracy of such information and promptly update such registration information as necessary.
                        </p>
                      </li>
                      <li>
                        <p className="mb-0">You have the legal capacity and you agree to comply with these Terms of Service.</p>
                      </li>
                      <li>
                        <p className="mb-0">Not a minor in the jurisdiction in which you reside.</p>
                      </li>
                      <li>
                        <p className="mb-0">
                          You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.
                        </p>
                      </li>
                    </ol>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      Information Collection and use :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="fs-5 fw-semibold">We may employ third-party companies and individuals due to the following reasons :</p>
                    <ol className="ps-3 d-flex flex-column gap-1">
                      <li>
                        <p className="mb-0">To facilitate our Service,</p>
                      </li>
                      <li>
                        <p className="mb-0">To provide the Service on our behalf,</p>
                      </li>
                      <li>
                        <p className="mb-0">To perform Service-related services; or</p>
                      </li>
                      <li>
                        <p className="mb-0">To assist us in analyzing how our Service is used</p>
                      </li>
                    </ol>
                    <p className="mb-0">
                      We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform
                      the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other
                      purpose
                    </p>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="border-bottom">
                    <CardTitle as={'h5'} className="mb-0 fw-semibold text-uppercase">
                      Limitation of Liability :
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="mb-1">
                      Coderthemes will not be liable for any damages arising from the use or inability to use our website or services. This includes
                      direct, indirect, incidental, or consequential damages.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-end text-end mb-3">
          <Col lg={6}>
            <Button variant="dark" className="fw-semibold">
              Not, Right Now
            </Button>
            <Button variant="primary" className="fw-semibold ms-1">
              I Agree With Terms
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default TermsPage
