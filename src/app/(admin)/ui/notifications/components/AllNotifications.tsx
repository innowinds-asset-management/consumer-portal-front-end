'use client'
import logoSm from '@/assets/images/logo-sm.png'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import useToggle from '@/hooks/useToggle'
import Image from 'next/image'
import { useState } from 'react'
import { Col, Form, Row, Toast, ToastBody, ToastContainer, ToastContainerProps, ToastHeader } from 'react-bootstrap'

const Basic = () => {
  const { isTrue: isOpen, toggle: hide } = useToggle()
  return (
    <Col md={6}>
      <h5 className="mb-2">Basic</h5>
      <p className="text-muted">
        Toasts are as flexible as you need and have very little required markup. At a minimum, we require a single element to contain your “toasted”
        content and strongly encourage a dismiss button.
      </p>
      <div className="p-3">
        <Toast className="fade" role="alert" aria-live="assertive" aria-atomic="true" onClose={hide} show={!isOpen}>
          <ToastHeader>
            <Image src={logoSm} alt="brand-logo" height={16} className="me-1" />
            <strong className="me-auto">Admin</strong>
            <small>11 mins ago</small>
          </ToastHeader>
          <ToastBody>Hello, world! This is a toast message.</ToastBody>
        </Toast>
      </div>
    </Col>
  )
}

const Translucent = () => {
  const { isTrue: isOpenTranslucent, toggle: hideTranslucent } = useToggle(true)
  return (
    <Col md={6}>
      <h5 className="mb-2">Translucent</h5>
      <p className="text-muted">
        Toasts are slightly translucent, too, so they blend over whatever they might appear over. For browsers that support the backdrop-filter CSS
        property, we’ll also attempt to blur the elements under a toast.
      </p>
      <div className="p-3 bg-light bg-opacity-50">
        <Toast
          className="fade"
          onClose={hideTranslucent}
          autohide
          delay={8000}
          show={isOpenTranslucent}
          role="alert"
          aria-live="assertive"
          aria-atomic="true">
          <ToastHeader>
            <Image src={logoSm} alt="brand-logo" height={16} className="me-1" />
            <strong className="me-auto">Admin</strong>
            <small>11 mins ago</small>
          </ToastHeader>
          <ToastBody>Hello, world! This is a toast message.</ToastBody>
        </Toast>
      </div>
    </Col>
  )
}

const Stacking = () => {
  const { isTrue: isOpenToast1, toggle: toggleToast1 } = useToggle(true)
  const { isTrue: isOpenToast2, toggle: toggleToast2 } = useToggle(true)
  return (
    <Col md={6} className="mt-4">
      <h5 className="mb-2">Stacking</h5>
      <p className="text-muted">When you have multiple toasts, we default to vertiaclly stacking them in a readable manner.</p>
      <div className="p-3">
        <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: 200 }}>
          <ToastContainer style={{ position: 'absolute', top: 0, right: 0 }}>
            <Toast show={isOpenToast1} onClose={toggleToast1} className="fade" role="alert" aria-live="assertive" aria-atomic="true">
              <ToastHeader>
                <Image src={logoSm} alt="brand-logo" height={16} className="me-1" />
                <strong className="me-auto">Admin</strong>
                <small className="text-muted">just now</small>
              </ToastHeader>
              <ToastBody>See? Just like this.</ToastBody>
            </Toast>
            <Toast delay={2000} show={isOpenToast2} onClose={toggleToast2} className="fade" role="alert" aria-live="assertive" aria-atomic="true">
              <ToastHeader>
                <Image src={logoSm} alt="brand-logo" height={16} className="me-1" />
                <strong className="me-auto">Admin</strong>
                <small className="text-muted">2 seconds ago</small>
              </ToastHeader>
              <ToastBody>Heads up, toasts will stack automatically</ToastBody>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </Col>
  )
}

const Placement = () => {
  const { isTrue: isOpen, toggle: hide } = useToggle()
  return (
    <Col md={6} className="mt-4">
      <h5 className="mb-2">Placement</h5>
      <p className="text-muted">
        Place toasts with custom CSS as you need them. The top right is often used for notifications, as is the top middle. If you’re only ever going
        to show one toast at a time, put the positioning styles right on the <code>.toast</code>.
      </p>
      <div className="p-3">
        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
          <Toast autohide className="fade" role="alert" aria-live="assertive" aria-atomic="true" data-bs-toggle="toast" onClose={hide} show={!isOpen}>
            <ToastHeader>
              <Image src={logoSm} alt="brand-logo" height={16} className="me-1" />
              <strong className="me-auto">Admin</strong>
              <small>11 mins ago</small>
            </ToastHeader>
            <ToastBody>Hello, world! This is a toast message.</ToastBody>
          </Toast>
        </div>
      </div>
    </Col>
  )
}

const CustomContent = () => {
  const { isTrue: isOpenCustom1, setFalse: hideCustom1 } = useToggle(true)
  const { isTrue: isOpenCustom2, setFalse: hideCustom2 } = useToggle(true)
  const { isTrue: isOpenCustom3, setFalse: hideCustom3 } = useToggle(true)
  const { isTrue: isOpenCustom4, setFalse: hideCustom4 } = useToggle(true)
  return (
    <ComponentContainerCard title="Custom content" description={<>Alternatively, you can also add additional controls and components to toasts.</>}>
      <Toast
        show={isOpenCustom1}
        onClose={hideCustom1}
        delay={3000}
        autohide
        className=" align-items-center mb-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">Hello, world! This is a toast message.</div>
          <button type="button" onClick={hideCustom1} className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </Toast>
      <Toast
        show={isOpenCustom2}
        onClose={hideCustom2}
        delay={6000}
        autohide
        className=" align-items-center text-white bg-primary border-0 mb-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">Hello, world! This is a toast message.</div>
          <button type="button" onClick={hideCustom2} className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </Toast>
      <Toast show={isOpenCustom3} onClose={hideCustom3} delay={8000} autohide className=" mb-4" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          Hello, world! This is a toast message.
          <div className="mt-2 pt-2 border-top">
            <button type="button" className="btn btn-primary btn-sm">
              Take action
            </button>
            &nbsp;
            <button type="button" onClick={hideCustom3} className="btn btn-secondary btn-sm" data-bs-dismiss="toast">
              Close
            </button>
          </div>
        </div>
      </Toast>
      <Toast
        className="bg-primary"
        show={isOpenCustom4}
        onClose={hideCustom4}
        delay={10000}
        autohide
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="toast-body text-white">
          Hello, world! This is a toast message.
          <div className="mt-2 pt-2 border-top">
            <button type="button" className="btn btn-light btn-sm">
              Take action
            </button>
            &nbsp;
            <button type="button" onClick={hideCustom4} className="btn btn-secondary btn-sm" data-bs-dismiss="toast">
              Close
            </button>
          </div>
        </div>
      </Toast>
    </ComponentContainerCard>
  )
}

const PlacementToast = () => {
  const [position, setPosition] = useState<ToastContainerProps['position']>('top-start')

  return (
    <ComponentContainerCard
      title="Placement"
      description={
        <>
          Place toasts with custom CSS as you need them. The top right is often used for notifications, as is the top middle. If you’re only ever
          going to show one toast at a time, put the positioning styles right on the <code>.toast.</code>
        </>
      }>
      <Form>
        <div className="mt-3">
          <label htmlFor="selectToastPlacement" className="form-label">
            Toast placement
          </label>
          <select
            className="form-select mb-2"
            onChange={(e) => setPosition(e?.currentTarget.value as ToastContainerProps['position'])}
            id="selectToastPlacement">
            <option>Select a position...</option>
            <option value="top-start">Top left</option>
            <option value="top-center">Top center</option>
            <option value="top-end">Top right</option>
            <option value="middle-start">Middle left</option>
            <option value="middle-center">Middle center</option>
            <option value="middle-end">Middle right</option>
            <option value="bottom-start">Bottom left</option>
            <option value="bottom-center">Bottom center</option>
            <option value="bottom-end">Bottom right</option>
          </select>
        </div>
      </Form>
      <div aria-live="polite" aria-atomic="true" className="bg-light position-relative" style={{ minHeight: 350 }}>
        <ToastContainer position={position} className="position-absolute  p-3" id="toastPlacement">
          <Toast className="mb-2">
            <ToastHeader closeButton>
              <div className="auth-logo me-auto">
                <Image className="logo-dark" src={logoSm} alt="logo-dark" height={18} />
              </div>
              <div className="float-end">
                <small>11 mins ago</small>
              </div>
            </ToastHeader>
            <ToastBody>Hello, world! This is a toast message.</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
    </ComponentContainerCard>
  )
}

const AllToasts = () => {
  return (
    <>
      <div>
        <Row>
          <Col xs={12}>
            <ComponentContainerCard
              title="Bootstrap Toasts"
              description={<>Push notifications to your visitors with a toast, a lightweight and easily customizable alert message.</>}>
              <Row>
                <Basic />
                <Translucent />
              </Row>
              <Row>
                <Stacking />
                <Placement />
              </Row>
            </ComponentContainerCard>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CustomContent />
          </Col>
          <Col lg={6}>
            <PlacementToast />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AllToasts
