import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'react-bootstrap'
import { pricingTwoData, PricingTwoType } from './data'

export const metadata: Metadata = { title: 'Pricing' }

const PricingCard = ({ description, features, price, title, popular }: PricingTwoType) => {
  return (
    <Card className="h-100">
      <CardHeader className={` p-3 ${popular ? 'text-bg-success' : 'text-bg-primary'}  text-center`}>
        <h4 className="fw-bold fs-24">{title}</h4>
        <h5 className="mt-2 mb-0 fw-normal text-white text-opacity-50">{description}.</h5>
      </CardHeader>
      <CardBody className="p-3">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted fs-3 fw-semibold">$</span>
          <h1 className="display-5 fw-semibold mb-0"> {price}</h1>
          <div className="d-block">
            <p className=" fw-semibold fs-5 mb-0">One-time payment</p>
            <p className="text-muted fs-5 mb-0">+plus local taxes</p>
          </div>
        </div>
        <h5 className="text-primary fw-semibold my-3">What's Included :</h5>
        <ul className="d-flex flex-column gap-2 list-unstyled fs-15">
          {features.map((item, idx) => (
            <li key={idx}>
              <IconifyIcon icon="ri-check-line" className="text-primary fs-4 align-middle me-1" />
              &nbsp;
              {item}
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Link href="" className={`btn btn-${popular ? 'danger' : 'outline-primary'} btn-lg fw-semibold w-100`}>
          Buy Now
        </Link>
      </CardFooter>
      {popular && (
        <span className="position-absolute top-0 translate-middle start-50 bg-warning-subtle px-3 py-1 text-warning rounded-pill fw-semibold">
          Most Popular
        </span>
      )}
    </Card>
  )
}

const Pricing = () => {
  return (
    <>
      <PageTitle title="Pricing" subTitle="Pages" />
      <Row className="justify-content-center">
        <Col xxl={9}>
          <div className="text-center">
            <h3 className="mb-2">Our Plans and Pricing</h3>
            <p className="text-muted w-50 m-auto">
              We have plans and prices that fit your business perfectly. Make your client site a success with our products.
            </p>
          </div>
          <Row className="mt-sm-4 align-items-end justify-content-center my-3">
            {pricingTwoData.map((item, idx) => (
              <Col lg={4} key={idx}>
                <PricingCard {...item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Pricing
