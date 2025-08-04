import error400 from '@/assets/images/error/error-400.png'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { currentYear, developedBy } from '@/context/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: 'Error 400' }

const Error400page = () => {
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={3} lg={4} md={6}>
          <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3 mb-0">
            <Link href="/" className="auth-brand mb-4">
              <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
              <Image src={logo} alt="logo light" height={26} className="logo-light" />
            </Link>
            <div className="mx-auto text-center">
              <Image src={error400} alt="error 400 img" height={230} />
              <h2 className="fw-bold mt-3 text-primary lh-base">Bed Request ! </h2>
              <h4 className="fw-medium mt-2 text-dark lh-base">Your browser sent an invalid request</h4>
              <p className="text-muted mb-3">
                The server could not understand the request due to invalid syntax. Please check your input and try again.
              </p>
              <Link href="/" className="btn btn-primary">
                Back To Home <IconifyIcon icon="tabler:home" className="ms-1" />
              </Link>
            </div>
          </Card>
          <p className="mt-3 text-center mb-0">
            {currentYear} © Abstack - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{developedBy}</span>
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default Error400page
