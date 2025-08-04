import { currentYear, developedBy } from '@/context/constants'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="page-container">
        <Row>
          <Col md={6} className="text-center text-md-start">
            {currentYear} © Abstack - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{developedBy}</span>
          </Col>
          <Col md={6}>
            <div className="text-md-end footer-links d-none d-md-block">
              <Link href="">About</Link>
              <Link href="">Support</Link>
              <Link href="">Contact Us</Link>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
