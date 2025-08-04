import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Alert, Col, Row } from 'react-bootstrap'
import LiveAlert from './components/LiveAlert'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Alerts' }

const DefaultAlert = () => {
  return (
    <ComponentContainerCard
      title="Default Alert"
      description={
        <>
          For proper styling, use one of the eight&nbsp;
          <strong>required</strong> contextual classes (e.g.,&nbsp;
          <code>.alert-success</code>). For background color use class&nbsp;
          <code>.bg-* </code>, <code>.text-white </code>
        </>
      }>
      <Alert variant="primary" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:bell-bing-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Primary - </strong> A simple primary alert — check it out!
        </div>
      </Alert>
      <Alert variant="secondary" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:bicycling-round-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Secondary - </strong> A simple secondary alert — check it out!
        </div>
      </Alert>
      <Alert variant="success" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:check-read-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Success - </strong> A simple success alert — check it out!
        </div>
      </Alert>
      <Alert variant="danger" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:danger-triangle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Error - </strong> A simple danger alert — check it out!
        </div>
      </Alert>
      <Alert variant="warning" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:shield-warning-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Warning - </strong> A simple warning alert—check it out!
        </div>
      </Alert>
      <Alert variant="info" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:info-circle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Info - </strong> A simple info alert—check it out!
        </div>
      </Alert>
      <Alert variant="light" className="d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:atom-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Light - </strong> A simple light alert—check it out!
        </div>
      </Alert>
      <Alert variant="dark" className="d-flex align-items-center mb-0" role="alert">
        <IconifyIcon icon="solar:balloon-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Dark - </strong> A simple dark alert—check it out!
        </div>
      </Alert>
    </ComponentContainerCard>
  )
}

const DismissingAlert = () => {
  return (
    <ComponentContainerCard
      title="Dismissing Alert"
      description={
        <>
          Add a dismiss button and the <code>.alert-dismissible</code> class, which adds extra padding to the right of the alert and positions the
          <code>.btn-close</code> button.
        </>
      }>
      <Alert variant="primary" closeVariant="white" dismissible className="text-bg-primary d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:bell-bing-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Primary - </strong> A simple primary alert — check it out!
        </div>
      </Alert>
      <Alert variant="secondary" closeVariant="white" dismissible className="text-bg-secondary  d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:bicycling-round-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Secondary - </strong> A simple secondary alert — check it out!
        </div>
      </Alert>
      <Alert variant="success" closeVariant="white" dismissible className="text-bg-success d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:check-read-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Success - </strong> A simple success alert — check it out!
        </div>
      </Alert>
      <Alert variant="danger" closeVariant="white" dismissible className="text-bg-danger d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:danger-triangle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Error - </strong> A simple danger alert — check it out!
        </div>
      </Alert>
      <Alert variant="warning" closeVariant="white" dismissible className="text-bg-warning d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:shield-warning-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Warning - </strong> A simple warning alert—check it out!
        </div>
      </Alert>
      <Alert variant="info" closeVariant="white" dismissible className="text-bg-info d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:info-circle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Info - </strong> A simple info alert—check it out!
        </div>
      </Alert>
      <Alert variant="light" closeVariant="black" dismissible className="text-bg-light d-flex align-items-center" role="alert">
        <IconifyIcon icon="solar:atom-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Light - </strong> A simple light alert—check it out!
        </div>
      </Alert>
      <Alert variant="dark" closeVariant="white" dismissible className="text-bg-dark d-flex align-items-center mb-0" role="alert">
        <IconifyIcon icon="solar:balloon-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Dark - </strong> A simple dark alert—check it out!
        </div>
      </Alert>
    </ComponentContainerCard>
  )
}

const LinkColor = () => {
  return (
    <ComponentContainerCard
      title="Link Color"
      description={
        <>
          Use the <code>.alert-link</code> utility class to quickly provide matching colored links within any alert.
        </>
      }>
      <Alert variant="primary" role="alert">
        A simple primary alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="secondary" role="alert">
        A simple secondary alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="success" role="alert">
        A simple success alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="danger" role="alert">
        A simple danger alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="warning" role="alert">
        A simple warning alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="info" role="alert">
        A simple info alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="light" role="alert">
        A simple light alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
      <Alert variant="dark" role="alert">
        A simple dark alert with
        <Link href="" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </Alert>
    </ComponentContainerCard>
  )
}

const CustomAlerts = () => {
  return (
    <ComponentContainerCard
      title="Custom Alerts"
      description={
        <>
          Display alert with transparent background and with contextual text color. Use classes
          <code>.bg-white</code>, and <code>.text-*</code>. E.g. <code>bg-white text-primary</code>.
        </>
      }>
      <Alert variant="primary" dismissible className="alert-dismissible d-flex align-items-center border-2 border border-primary" role="alert">
        <IconifyIcon icon="solar:bell-bing-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Primary - </strong> A simple primary alert — check it out!
        </div>
      </Alert>
      <Alert variant="secondary" dismissible className="alert-dismissible d-flex align-items-center border-2 border border-secondary" role="alert">
        <IconifyIcon icon="solar:bicycling-round-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Secondary - </strong> A simple secondary alert — check it out!
        </div>
      </Alert>
      <Alert variant="success" dismissible className="alert-dismissible d-flex align-items-center border-2 border border-success" role="alert">
        <IconifyIcon icon="solar:check-read-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Success - </strong> A simple success alert — check it out!
        </div>
      </Alert>
      <Alert variant="danger" dismissible className="alert-dismissible d-flex align-items-center border-2 border border-danger" role="alert">
        <IconifyIcon icon="solar:danger-triangle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Error - </strong> A simple danger alert — check it out!
        </div>
      </Alert>
      <Alert variant="warning" dismissible className="alert-dismissible d-flex align-items-center border border-warning" role="alert">
        <IconifyIcon icon="solar:shield-warning-line-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Warning - </strong> A simple warning alert—check it out!
        </div>
      </Alert>
      <Alert variant="info" dismissible className="alert-dismissible d-flex align-items-center border border-info" role="alert">
        <IconifyIcon icon="solar:info-circle-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Info - </strong> A simple info alert—check it out!
        </div>
      </Alert>
      <Alert variant="light" dismissible className="alert-dismissible d-flex align-items-center border border-light" role="alert">
        <IconifyIcon icon="solar:atom-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Light - </strong> A simple light alert—check it out!
        </div>
      </Alert>
      <Alert variant="dark" dismissible className="alert-dismissible d-flex align-items-center border border-dark mb-0" role="alert">
        <IconifyIcon icon="solar:balloon-bold-duotone" className="fs-20 me-1" />
        <div className="lh-1">
          <strong>Dark - </strong> A simple dark alert—check it out!
        </div>
      </Alert>
    </ComponentContainerCard>
  )
}

const AdditionalContent = () => {
  return (
    <ComponentContainerCard
      title="Additional Content"
      description={<> Alerts can also contain additional HTML elements like headings, paragraphs and dividers.</>}>
      <Alert variant="success" className="p-3" role="alert">
        <h4 className="alert-heading">Well done!</h4>
        <p>
          Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing
          within an alert works with this kind of content.
        </p>
        <hr className="border-success border-opacity-25" />
        <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </Alert>
      <Alert variant="secondary" className="p-3 d-flex" role="alert">
        <span>
          <IconifyIcon height={32} width={32} icon="solar:bell-bing-bold-duotone" className="fs-1 me-2" />
        </span>
        <div>
          <h4 className="alert-heading">Well done!</h4>
          <p>
            Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr className="border-secondary border-opacity-25" />
          <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
      </Alert>
      <Alert variant="primary" className="d-flex p-3 mb-0" role="alert">
        <span>
          <IconifyIcon height={32} width={32} icon="solar:atom-bold-duotone" className="fs-1 me-2" />
        </span>
        <div>
          <h4 className="alert-heading">Thank you!</h4>
          <p>
            Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <button type="button" className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </Alert>
    </ComponentContainerCard>
  )
}

const AlertsPage = () => {
  return (
    <>
      <PageTitle title="Alerts" subTitle="Base UI" />
      <Row>
        <Col xl={6}>
          <DefaultAlert />
        </Col>
        <Col xl={6}>
          <DismissingAlert />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <LinkColor />
        </Col>
        <Col xl={6}>
          <CustomAlerts />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <AdditionalContent />
        </Col>
        <Col xl={6}>
          <LiveAlert />
        </Col>
      </Row>
    </>
  )
}

export default AlertsPage
