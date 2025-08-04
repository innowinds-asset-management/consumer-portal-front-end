import Image from 'next/image'
import React from 'react'
import error404 from '@/assets/images/error/error-404.png'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: '404 Error' }

const Error404Alt = () => {
  return (
    <>
      <PageTitle title="404 Error" />
      <Row className="justify-content-center">
        <Col lg={4}>
          <div className="text-center">
            <Image src={error404} height={230} alt="File not found Image" />
            <h4 className="text-uppercase text-danger mt-3">Page Not Found</h4>
            <p className="text-muted mt-3">
              It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. Here's a little tip that might help you
              get back on track.
            </p>
            <Link className="btn btn-info mt-3" href="/">
              <IconifyIcon icon="tabler:home" className="me-1" /> Return Home
            </Link>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Error404Alt
