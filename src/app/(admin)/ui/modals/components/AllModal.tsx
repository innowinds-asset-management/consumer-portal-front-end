'use client'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import useModal from '@/hooks/useModal'
import useToggle from '@/hooks/useToggle'
import { toSentenceCase } from '@/utils/change-casing'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'

const BootstrapModals = () => {
  const { isTrue: isStandardOpen, toggle: toggleStandard } = useToggle()
  const { isOpen, size, className, scroll, toggleModal, openModalWithSize, openModalWithClass, openModalWithScroll } = useModal()
  return (
    <ComponentContainerCard title="Bootstrap Modals" description={<>A rendered modal with header, body, and set of actions in the footer.</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleStandard}>
          Standard Modal
        </Button>
        <Button variant="info" onClick={() => openModalWithSize('lg')}>
          Large Modal
        </Button>
        <Button variant="success" onClick={() => openModalWithSize('sm')}>
          Small Modal
        </Button>
        <Button variant="primary" onClick={() => openModalWithClass('modal-full-width')}>
          Full Width Modal
        </Button>
        <Button variant="secondary" onClick={openModalWithScroll}>
          Scrollable Modal
        </Button>
      </div>

      <Modal show={isStandardOpen} onHide={toggleStandard}>
        <ModalHeader onHide={toggleStandard} closeButton>
          <ModalTitle as="h4">Modal Heading</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h5>Text in a modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          <hr />
          <h5>Overflowing text to show scroll behavior</h5>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p className="mb-0">
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
            Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={toggleStandard}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleStandard}>
            Save changes
          </Button>
        </ModalFooter>
      </Modal>

      <Modal className="fade" show={isOpen} onHide={toggleModal} dialogClassName={className} size={size} scrollable={scroll}>
        <ModalHeader onHide={toggleModal} closeButton>
          <h4 className="modal-title">Modal Heading</h4>
        </ModalHeader>
        <ModalBody>
          ...
          {scroll && (
            <>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </>
          )}
        </ModalBody>
        {scroll && (
          <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Close
            </Button>
            <Button onClick={toggleModal}>Save changes</Button>
          </ModalFooter>
        )}
      </Modal>
    </ComponentContainerCard>
  )
}

const ModalsWithPages = () => {
  const { isTrue: signUpModal, toggle: toggleSignUp } = useToggle()
  const { isTrue: signInModal, toggle: toggleSignIn } = useToggle()

  return (
    <ComponentContainerCard title="Modal with Pages" description={<>Examples of custom modals.</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleSignUp}>
          Sign Up Modal
        </Button>
        <Button variant="info" onClick={toggleSignIn}>
          Log In Modal
        </Button>
      </div>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <ModalBody>
          <div className="auth-brand text-center mt-2 mb-4 position-relative top-0">
            <Link href="" className="logo-dark">
              <span>
                <Image src={logoDark} alt="dark logo" width={122} height={22} />
              </span>
            </Link>
            <Link href="" className="logo-light">
              <span>
                <Image src={logo} alt="logo" width={122} height={22} />
              </span>
            </Link>
          </div>

          <Form className="ps-3 pe-3" action="#">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <Form.Control type="email" id="username" required placeholder="Michael Zenaty" />
            </div>
            <div className="mb-3">
              <label htmlFor="emailaddress" className="form-label">
                Email address
              </label>
              <Form.Control type="email" id="emailaddress" required placeholder="john@deo.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Form.Control type="password" required id="password" placeholder="Enter your password" />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="customCheck1" />
                <label className="form-check-label" htmlFor="customCheck1">
                  I accept <Link href="">Terms and Conditions</Link>
                </label>
              </div>
            </div>
            <div className="mb-3 text-center">
              <Button variant="primary" type="submit">
                Sign Up Free
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal className="fade" show={signInModal} onHide={toggleSignIn}>
        <ModalBody>
          <div className="auth-brand text-center mt-2 mb-4 position-relative top-0">
            <Link href="" className="logo-dark">
              <span>
                <Image src={logoDark} alt="dark logo" width={122} height={22} />
              </span>
            </Link>
            <Link href="" className="logo-light">
              <span>
                <Image src={logo} alt="logo" width={122} height={22} />
              </span>
            </Link>
          </div>
          <Form action="#" className="ps-3 pe-3">
            <div className="mb-3">
              <label htmlFor="emailaddress1" className="form-label">
                Email address
              </label>
              <Form.Control type="email" id="emailaddress1" required placeholder="john@deo.com" />
            </div>

            <div className="mb-3">
              <label htmlFor="password1" className="form-label">
                Password
              </label>
              <Form.Control type="password" required id="password1" placeholder="Enter your password" />
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="customCheck2" />
                <label className="form-check-label" htmlFor="customCheck2">
                  Remember me
                </label>
              </div>
            </div>

            <div className="mb-3 text-center">
              <button className="btn rounded-pill btn-primary" type="submit">
                Sign In
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </ComponentContainerCard>
  )
}

const ModalWithAlerts = () => {
  const { isOpen, className, toggleModal, openModalWithClass } = useModal()

  return (
    <ComponentContainerCard title="Modal based Alerts" description={<>Show different contexual alert messages using modal component</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Success Alert
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Info Alert
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Warning Alert
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Danger Alert
        </Button>
        <Modal className="fade" show={isOpen} onHide={toggleModal} size="sm">
          <div className={`modal-filled bg-${className}`}>
            <ModalBody className="p-4">
              <div className="text-center">
                <IconifyIcon icon="ri:information-line" className="h1" />
                <h4 className="mt-2">Well Done!</h4>
                <p className="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                <Button variant="light" className="my-2" onClick={toggleModal}>
                  Continue
                </Button>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </ComponentContainerCard>
  )
}

const ModalPositions = () => {
  const { isOpen, className, toggleModal, openModalWithClass } = useModal()

  return (
    <ComponentContainerCard
      title="Modal Position"
      description={
        <>
          Specify the position for the modal. You can display modal at top, bottom, center or right of page by specifying classes&nbsp;
          <code>modal-top</code>, <code>modal-bottom</code>, <code>modal-dialog-centered</code> and <code>modal-right</code>
          respectively.
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => openModalWithClass('modal-top')}>
          Top Modal
        </Button>
        <Button variant="secondary" onClick={() => openModalWithClass('modal-bottom')}>
          Bottom Modal
        </Button>
        <Button variant="secondary" onClick={() => openModalWithClass('modal-dialog-centered')}>
          Center modal
        </Button>
      </div>
      <Modal show={isOpen} onHide={toggleModal} dialogClassName={className}>
        {className != 'modal-right' && (
          <ModalHeader onHide={toggleModal} closeButton>
            <h4 className="modal-title">Modal Heading</h4>
          </ModalHeader>
        )}
        <ModalBody>
          {className === 'modal-right' ? (
            <div className="text-center">
              <h4 className="mt-0">Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              <Button variant="danger" type="button" size="sm" onClick={toggleModal} data-bs-dismiss="modal">
                Close
              </Button>
            </div>
          ) : (
            <>
              <h5>Text in a modal</h5>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            </>
          )}
        </ModalBody>
        {className != 'modal-right' && (
          <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={toggleModal}>
              Save changes
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </ComponentContainerCard>
  )
}

const ModalWithColoredHeader = () => {
  const { isOpen, className, toggleModal, openModalWithClass } = useModal()

  return (
    <ComponentContainerCard title="Colored Header Modals" description={<>A rendered modal with header having contexual background color.</>}>
      <Modal className="fade" show={isOpen} onHide={toggleModal}>
        <ModalHeader className={`modal-colored-header bg-${className}`}>
          <h4 className="modal-title text-white" id="primary-header-modalLabel">
            Modal Heading
          </h4>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">{className} Background</h5>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={toggleModal}>
            Close
          </Button>
          <Button variant={className}>Save changes</Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => openModalWithClass('primary')}>
          Primary Header
        </Button>
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Success Header
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Info Header
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Warning Header
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Danger Header
        </Button>
        <Button variant="dark" onClick={() => openModalWithClass('dark')}>
          Dark Header
        </Button>
      </div>
    </ComponentContainerCard>
  )
}

const ModalWithFilled = () => {
  const { isOpen, className, toggleModal, openModalWithClass } = useModal()

  return (
    <ComponentContainerCard title="Filled Modals" description={<>A rendered modal with header, body and footer having contexual background color.</>}>
      <Modal show={isOpen} onHide={toggleModal} className="fade">
        <div className={`modal-filled bg-${className}`}>
          <ModalHeader onHide={toggleModal} closeButton>
            <h4 className="modal-title">{toSentenceCase(className)} Filled Modal</h4>
          </ModalHeader>
          <ModalBody>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="outline-light" onClick={toggleModal}>
              Save changes
            </Button>
          </ModalFooter>
        </div>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => openModalWithClass('primary')}>
          Primary Filled
        </Button>
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Success Filled
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Info Filled
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Warning Filled
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Danger Filled
        </Button>
        <Button variant="dark" onClick={() => openModalWithClass('dark')}>
          Dark Filled
        </Button>
      </div>
    </ComponentContainerCard>
  )
}

const MultipleModal = () => {
  const { isTrue: isOpen, toggle: toggleModal } = useToggle()
  const { isTrue: isNextOpen, toggle: toggleNextModal } = useToggle()
  return (
    <ComponentContainerCard
      title="Multiple Modal"
      description={<>Display a series of modals one by one to guide your users on multiple aspects or take step wise input.</>}>
      <Modal show={isOpen} onHide={toggleModal}>
        <ModalHeader closeButton>
          <h4 className="modal-title" id="multiple-oneModalLabel">
            Modal Heading
          </h4>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">Text in a modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              toggleModal()
              toggleNextModal()
            }}>
            Next
          </Button>
        </ModalFooter>
      </Modal>
      <Modal className="fade" show={isNextOpen} onHide={toggleNextModal}>
        <ModalHeader closeButton>
          <h4 className="modal-title" id="multiple-twoModalLabel">
            Modal Heading
          </h4>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">Text in a modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={toggleNextModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleModal}>
          Multiple Modal
        </Button>
      </div>
    </ComponentContainerCard>
  )
}

const ToggleBetweenModals = () => {
  const { isTrue: isOpen, toggle: toggleModal } = useToggle()
  const { isTrue: isNextOpen, toggle: toggleNextModal } = useToggle()
  return (
    <ComponentContainerCard
      title="Toggle Between Modals"
      description={
        <>
          Toggle between multiple modals with some clever placement of the <code>data-bs-target</code> and <code>data-bs-toggle</code> attributes.
        </>
      }>
      <Modal className="fade" show={isOpen} onHide={toggleModal} centered>
        <ModalHeader closeButton>
          <h5 className="modal-title">Modal 1</h5>
        </ModalHeader>
        <ModalBody className="modal-body">Show a second modal and hide this one with the button below.</ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              toggleModal()
              toggleNextModal()
            }}>
            Open second modal
          </Button>
        </ModalFooter>
      </Modal>
      <Modal className="fade" show={isNextOpen} onHide={toggleNextModal} centered>
        <ModalHeader closeButton>
          <h5 className="modal-title">Modal 2</h5>
        </ModalHeader>
        <ModalBody>Hide this modal and show the first with the button below.</ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
              toggleModal()
              toggleNextModal()
            }}>
            Back to first
          </Button>
        </ModalFooter>
      </Modal>
      <Button variant="secondary" onClick={toggleModal}>
        Open First Modal
      </Button>
    </ComponentContainerCard>
  )
}

const FullscreenModal = () => {
  const sizes: string[] = ['sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down']
  const [fullscreen, setFullscreen] = useState<undefined | string>(undefined)
  const [show, setShow] = useState(false)

  const handleShow = (breakpoint: string) => {
    setFullscreen(breakpoint)
    setShow(true)
  }

  return (
    <ComponentContainerCard
      title="Fullscreen Modal"
      description={
        <>
          Another override is the option to pop up a modal that covers the user viewport, available via modifier classes that are placed on a&nbsp;
          <code>.modal-dialog</code>
        </>
      }>
      <div className="d-flex flex-wrap gap-2">
        <Button type="button" variant="primary" onClick={() => setShow(true)}>
          Fullscreen Modal
        </Button>

        {(sizes || []).map((size, idx) => (
          <Button key={idx} onClick={() => handleShow(size)}>
            Full Screen
            {typeof size === 'string' && ` Below ${size.split('-')[0]}`}
          </Button>
        ))}
      </div>
      <Modal show={show} fullscreen={fullscreen ?? true} onHide={() => setShow(false)}>
        <ModalHeader closeButton>
          <Modal.Title>Modal</Modal.Title>
        </ModalHeader>
        <ModalBody>...</ModalBody>
        <ModalFooter>
          <span role="button" className="btn btn-light waves-effect" onClick={() => setShow(false)}>
            Close
          </span>
          <Button type="button" variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>
  )
}

const StaticBackdropModal = () => {
  const { isTrue: isOpen, toggle: toggleModal } = useToggle()
  return (
    <ComponentContainerCard
      title="Static Backdrop"
      description={<>When backdrop is set to static, the modal will not close when clicking outside it. Click the button below to try it.</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="info" onClick={toggleModal}>
          Static Backdrop
        </Button>
      </div>
      <Modal className="fade" show={isOpen} onHide={toggleModal} backdrop="static" keyboard={false}>
        <ModalHeader closeButton>
          <Modal.Title as="h5">Modal title</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <p className="m-0">I will not close if you click outside me. Don&apos;t even try to press escape key.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>
  )
}

const VaryingModalContent = () => {
  const [recipient, setReceipt] = useState<string>('')
  const { isOpen, toggleModal, className, openModalWithSize } = useModal()

  return (
    <ComponentContainerCard
      title="Varying Modal Content"
      description={
        <>
          Have a bunch of buttons that all trigger the same modal with slightly different contents? Use&nbsp;
          <code>event.relatedTarget</code> and&nbsp;
          <Link href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes" target="_blank">
            HTML <code>data-bs-*</code>
            attributes
          </Link>
          to vary the contents of the modal depending on which button was clicked.
        </>
      }>
      <div className="hstack gap-2 flex-wrap">
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            openModalWithSize('lg')
            setReceipt('@mdo')
          }}>
          Open modal for @mdo
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            openModalWithSize('lg')
            setReceipt('@fat')
          }}>
          Open modal for @fat
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            openModalWithSize('lg')
            setReceipt('@getbootstrap')
          }}>
          Open modal for @getbootstrap
        </Button>
      </div>

      <Modal className="fade" tabIndex={-1} show={isOpen} onHide={toggleModal} dialogClassName={className}>
        <ModalHeader onHide={toggleModal} closeButton>
          <Modal.Title as="h5">New message to {recipient}</Modal.Title>
        </ModalHeader>
        <div className="modal-body">
          <Form>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Recipient:
              </label>
              <Form.Control type="text" className="form-control" id="recipient-name" placeholder={recipient} />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <Form.Control as={'textarea'}  className="form-control" id="message-text"></Form.Control>
            </div>
          </Form>
        </div>
        <ModalFooter>
          <Button type="button" variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button type="button" variant="primary">
            Send message
          </Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>
  )
}

const AllModal = () => {
  return (
    <>
      <Row>
        <Col xl={6}>
          <BootstrapModals />
        </Col>
        <Col xl={6}>
          <ModalsWithPages />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ModalWithAlerts />
        </Col>
        <Col xl={6}>
          <ModalPositions />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ModalWithColoredHeader />
        </Col>
        <Col xl={6}>
          <ModalWithFilled />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MultipleModal />
        </Col>
        <Col xl={6}>
          <ToggleBetweenModals />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <FullscreenModal />
        </Col>
        <Col xl={6}>
          <StaticBackdropModal />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <VaryingModalContent />
        </Col>
      </Row>
    </>
  )
}

export default AllModal
