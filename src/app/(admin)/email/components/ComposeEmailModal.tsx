import amazonImg from '@/assets/images/brands/amazon.svg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

interface ComposeEmailProps {
  isOpen: boolean
  toggleComposeModal: () => void
}

const ComposeEmailModal = ({ isOpen, toggleComposeModal }: ComposeEmailProps) => {
  const [quillEditorContent, setQuillEditorContent] = useState('Writing something...')

  return (
    <>
      <Modal id="email-details-modal" className="fade" tabIndex={-1} role="dialog" aria-labelledby="email-details-modalLabel" aria-hidden="true">
        <ModalHeader className="d-flex flex-wrap gap-2 align-items-start">
          <Image className="me-2 rounded-circle" src={avatar2} alt="placeholder image" height={40} />
          <div className="flex-grow-1">
            <h6 className="fs-16">Steven Smith</h6>
            <p className="text-muted mb-0">From: jonathan@domain.com</p>
          </div>
          <div>
            <button type="button" className="btn-close" onClick={toggleComposeModal} data-bs-dismiss="modal" aria-label="Close" />
          </div>
        </ModalHeader>
        <ModalBody>
          <h5 className="fs-18">Your elite author Graphic Optimization reward is ready!</h5>
          <hr />
          <p>Hi Coderthemes!</p>
          <p>
            Clicking ‘Order Service’ on the right-hand side of the above page will present you with an order page. This service has the following
            Briefing Guidelines that will need to be filled before placing your order:
          </p>
          <ol>
            <li>Your design preferences (Color, style, shapes, Fonts, others) </li>
            <li>Tell me, why is your item different? </li>
            <li>Do you want to bring up a specific feature of your item? If yes, please tell me </li>
            <li>Do you have any preference or specific thing you would like to change or improve on your item page? </li>
            <li>
              Do you want to include your item&apos;s or your provider&apos;s logo on the page? if yes, please send it to me in vector format (Ai or
              EPS)
            </li>
            <li>Please provide me with the copy or text to display</li>
          </ol>
          <p>Filling in this form with the above information will ensure that they will be able to start work quickly.</p>
          <p>You can complete your order by putting your coupon code into the Promotional code box and clicking ‘Apply Coupon’.</p>
          <p>
            <b>Best,</b> <br /> Graphic Studio
          </p>
          <hr />
          <h5 className="mb-3">Attachments</h5>
          <Row>
            <Col xl={6}>
              <Card className="mb-1 shadow-none border border-light">
                <div className="p-2">
                  <Row className="align-items-center">
                    <Col xs={'auto'}>
                      <div className="avatar-lg">
                        <span className="avatar-title bg-soft-primary text-primary rounded">.ZIP</span>
                      </div>
                    </Col>
                    <Col className="ps-0">
                      <Link href="" className="text-muted fw-bold">
                       Abstack-admin-design.zip
                      </Link>
                      <p className="mb-0">2.3 MB</p>
                    </Col>
                    <Col xs={'auto'}>
                      <Link href="" className="btn btn-link btn-lg text-muted">
                        <IconifyIcon icon="tabler:download" />
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col xl={6}>
              <Card className="mb-1 shadow-none border border-light">
                <div className="p-2">
                  <Row className="align-items-center">
                    <Col xs={'auto'}>
                      <Image src={amazonImg} className="avatar-lg rounded" alt="file-image" />
                    </Col>
                    <Col className="ps-0">
                      <Link href="" className="text-muted fw-bold">
                        Dashboard-design.jpg
                      </Link>
                      <p className="mb-0">3.25 MB</p>
                    </Col>
                    <Col xs={'auto'}>
                      <Link href="" className="btn btn-link btn-lg text-muted">
                        <IconifyIcon icon="tabler:download" />
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="gap-1 py-2">
          <button className="btn btn-primary" data-bs-target="#email-compose-modal" data-bs-toggle="modal">
            <IconifyIcon icon="tabler:arrow-back-up" className="align-text-bottom me-1" /> Reply
          </button>
          <button className="btn btn-primary" data-bs-target="#email-compose-modal" data-bs-toggle="modal">
            <IconifyIcon icon="tabler:arrow-big-right" className="align-text-bottom me-1" /> Forward
          </button>
        </ModalFooter>
      </Modal>
      <Modal
        size="lg"
        show={isOpen}
        onHide={toggleComposeModal}
        id="email-compose-modal"
        className=" fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="email-compose-modalLabel"
        aria-hidden="true">
        <ModalHeader className="py-2">
          <ModalTitle as={'h4'} id="email-compose-modalLabel">
            New Message
          </ModalTitle>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="mb-2">
              <label htmlFor="msgto" className="form-label">
                To
              </label>
              <Form.Control type="text" id="msgto"  placeholder="Example@email.com" />
            </div>
            <div className="mb-2">
              <label htmlFor="mailsubject" className="form-label">
                Subject
              </label>
              <Form.Control type="text" id="mailsubject" placeholder="Your subject" />
            </div>
            <div>
              <label className="form-label">Message</label>
              <ReactQuill className="mb-4" theme="snow" value={quillEditorContent} onChange={setQuillEditorContent} style={{ height: 150 }} />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="py-2">
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
            Send Message
          </button>
          <button type="button" className="btn btn-light" onClick={toggleComposeModal} data-bs-dismiss="modal">
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ComposeEmailModal
