import Link from 'next/link'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import { faqData } from '../data'

const GeneralFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="general">
          General FAQ&apos;s
        </CardTitle>
        <Accordion id="accordionExample" defaultActiveKey={'0'}>
          {faqData.General.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}

const IntegrationFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="integration">
          Integration
        </CardTitle>
        <Accordion id="accordionExample2" defaultActiveKey={'0'}>
          {faqData.Integration.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}

const PaymentFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="payment">
          Payment
        </CardTitle>
        <Accordion id="accordionExample3" defaultActiveKey={'0'}>
          {faqData.Payments.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}

const ShippingFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="shipping">
          Shipping
        </CardTitle>
        <Accordion id="accordionExample4" defaultActiveKey={'0'}>
          {faqData.Shipping.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}

const ReturnFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="return">
          Return
        </CardTitle>
        <Accordion id="accordionExample5" defaultActiveKey={'0'}>
          {faqData.Return.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  )
}

const Faqs = () => {
  return (
    <>
      <Row>
        <Col xl={3}>
          <div className="bg-body-secondary shadow rounded docs-nav">
            <ul className="nav bg-transparent flex-column fs-15 ps-2">
              <li className="nav-item">
                <Link href="#general" className="nav-link">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#integration" className="nav-link">
                  Integration
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#payment" className="nav-link">
                  Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#shipping" className="nav-link">
                  Shipping
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#return" className="nav-link">
                  Return
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xl={9}>
          <GeneralFaq />
          <IntegrationFaq />
          <PaymentFaq />
          <ShippingFaq />
          <ReturnFaq />
        </Col>
      </Row>
    </>
  )
}

export default Faqs
