import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import { Metadata } from 'next'
import Image from 'next/image'
import Timer from './components/Timer'
import { currentYear, developedBy } from '@/context/constants'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Coming Soon' }

const ComingSoonPage = () => {
  return (
    <>
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={3} lg={4} md={6}>
            <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3">
              <Link href="/" className="auth-brand mb-3">
                <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
                <Image src={logo} alt="logo light" height={26} className="logo-light" />
              </Link>
              <div>
                <h3 className="fw-semibold mb-2">Coming Soon: Stay Tuned!</h3>
                <p className="text-muted mb-0">Something exciting is coming your way soon</p>
              </div>
              <Timer />
              <Row className="justify-content-center">
                <Col xs={12}>
                  <div className="position-relative mb-3">
                    <form className="m-0">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control rounded border w-100 px-2 py-2"
                        placeholder="Enter Your Email"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary position-absolute top-50 translate-middle-y translate-middle-x end-0 fw-semibold me-1">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
              <p className="text-muted">Sign up now to get early launch notification of our launch date !</p>
            </Card>
            <p className="text-center mb-0">
              {currentYear} © Abstack - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{developedBy}</span>
            </p>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ComingSoonPage
