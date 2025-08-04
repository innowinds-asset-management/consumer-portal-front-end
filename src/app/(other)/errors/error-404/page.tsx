import React from 'react'
import error404 from '@/assets/images/error/error-404.png'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import { currentYear, developedBy } from '@/context/constants'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Error 404' }

const Error404Page = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={3} lg={4} md={6}>
          <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3">
            <Link href="/" className="auth-brand mb-4">
              <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <Image src={logo} alt="logo light" height={26} className="logo-light" />
            </Link>
            <div className="mx-auto text-center">
              <Image src={error404} alt="error 403 img" height={180} className="my-3" />
              <h2 className="fw-bold mt-3 text-primary lh-base">Page Not Found !</h2>
              <h4 className="fw-medium mt-2 text-dark lh-base">Something's Missing...! This page is not available</h4>
              <p className="text-muted mb-3">Sorry, we can't find the page you're looking for We suggest you to go homepage</p>
              <Link href="/" className="btn btn-primary">
                Back to Home <IconifyIcon icon="tabler:home" className="ms-1" />
              </Link>
            </div>
          </Card>
          <p className="text-center mb-0">
            {currentYear} © Abstack - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{developedBy}</span>
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default Error404Page
