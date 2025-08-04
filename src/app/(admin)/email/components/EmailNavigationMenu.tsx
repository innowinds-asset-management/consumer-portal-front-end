'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import { CardBody, Collapse, Offcanvas } from 'react-bootstrap'
import ComposeEmailModal from './ComposeEmailModal'
import useViewPort from '@/hooks/useViewPort'
import { useEmailContext } from '@/context/useEmailContext'

type LeftBarProps = {
  totalUnreadEmails?: number
  showAllEmails?: () => void
  showStarredEmails?: () => void
  isOpenCompose: boolean
  toggleCompose: () => void
}

const NavBar = ({ showAllEmails, showStarredEmails, isOpenCompose, toggleCompose }: LeftBarProps) => {
  const { isTrue, toggle } = useToggle(true)
  const { isTrue: isLabels, toggle: toggleLabels } = useToggle(true)
  const { composeEmail } = useEmailContext()
  return (
    // <div className="email-sidebar">
    //   <div className="offcanvas-xxl offcanvas-start" tabIndex={-1} id="email-sidebar" aria-labelledby="email-sidebarLabel">
    <>
      <CardBody className='p-3'>
        <div className="d-flex justify-content-between gap-2 align-items-center mb-2">
          <button
            type="button"
            onClick={toggleCompose}
            className="btn btn-danger fw-semibold w-100"
            data-bs-toggle="modal"
            data-bs-target="#email-compose-modal">
            Compose
          </button>
          <button
            type="button"
            className="btn btn-sm btn-icon btn-soft-danger ms-auto d-xl-none"
            data-bs-dismiss="offcanvas"
            data-bs-target="#email-sidebar"
            onClick={composeEmail.toggle}
            aria-label="Close">
            <IconifyIcon icon="tabler:x" />
          </button>
        </div>
        <div className="email-menu-list d-flex flex-column">
          <Link href="" onClick={showAllEmails}>
            <IconifyIcon icon="solar:inbox-outline" className="me-2 fs-18 text-muted" />
            <span>Inbox</span>
            <span className="badge bg-danger-subtle fs-12 text-danger ms-auto">21</span>
          </Link>
          <Link href="">
            <IconifyIcon icon="solar:map-arrow-right-outline" className="me-2 fs-18 text-muted" />
            <span>Sent</span>
          </Link>
          <Link href="" onClick={showStarredEmails}>
            <IconifyIcon icon="solar:star-outline" className="me-2 fs-18 text-muted" />
            <span>Starred</span>
          </Link>
          <Link href="">
            <IconifyIcon icon="solar:clock-circle-outline" className="me-2 fs-18 text-muted" />
            <span>Scheduled</span>
          </Link>
          <Link href="">
            <IconifyIcon icon="solar:clapperboard-edit-outline" className="me-2 fs-18 text-muted" />
            <span>Draft</span>
          </Link>
        </div>
      </CardBody>
      <CardBody className="border-top border-light p-3">
        <div
          onClick={toggle}
          className="btn-link d-flex align-items-center text-muted fw-bold fs-12 text-uppercase mb-0"
          data-bs-toggle="collapse"
          data-bs-target="#other"
          aria-expanded="false"
          aria-controls="other">
          Other <IconifyIcon icon="tabler:chevron-down" className="ms-auto" />
        </div>
        <Collapse in={isTrue}>
          <div>
            <div className="email-menu-list d-flex flex-column mt-2">
              <Link href="">
                <IconifyIcon icon="solar:mailbox-outline" className="me-2 fs-18 text-muted" />
                <span>All Mail</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:trash-bin-trash-outline" className="me-2 fs-18 text-muted" />
                <span>Trash</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:info-square-outline" className="me-2 fs-18 text-muted" />
                <span>Spam</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:chat-round-line-outline" className="me-2 fs-18 text-muted" />
                <span>Chats</span>
              </Link>
            </div>
          </div>
        </Collapse>
      </CardBody>
      <CardBody className="border-top border-light p-3">
        <div
          onClick={toggleLabels}
          className="btn-link d-flex align-items-center text-muted fw-bold fs-12 text-uppercase mb-0"
          data-bs-toggle="collapse"
          data-bs-target="#labels"
          aria-expanded="false"
          aria-controls="labels">
          Labels <IconifyIcon icon="tabler:chevron-down" className="ms-auto" />
        </div>
        <Collapse in={isLabels}>
          <div>
            <div className="email-menu-list d-flex flex-column mt-2">
              <Link href="">
                <IconifyIcon icon="solar:bolt-circle-bold-duotone" className="text-success fs-16 me-2" />
                <span>Personal</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:bolt-circle-bold-duotone" className="text-danger fs-16 me-2" />
                <span>Client</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:bolt-circle-bold-duotone" className="text-info fs-16 me-2" />
                <span>Marketing</span>
              </Link>
              <Link href="">
                <IconifyIcon icon="solar:bolt-circle-bold-duotone" className="text-secondary fs-16 me-2" />
                <span>Office</span>
              </Link>
            </div>
          </div>
        </Collapse>
      </CardBody>
      <ComposeEmailModal isOpen={isOpenCompose} toggleComposeModal={toggleCompose} />
    </>
    // </div>
    // </div>
  )
}





const EmailNavigationMenu = ({ showAllEmails, showStarredEmails, isOpenCompose, toggleCompose }: LeftBarProps) => {
  const { composeEmail } = useEmailContext()
  const { width } = useViewPort()
  return width > 1400 ? (
    <div className="email-sidebar">
      <NavBar
        showAllEmails={showAllEmails}
        showStarredEmails={showStarredEmails}
        isOpenCompose={isOpenCompose}
        toggleCompose={toggleCompose}
      />

    </div>
  ) : (
    <div className="email-sidebar">
      <Offcanvas show={composeEmail.open} onHide={composeEmail.toggle} placement="start" className="offcanvas-xl">
        <NavBar
          showAllEmails={showAllEmails}
          showStarredEmails={showStarredEmails}
          isOpenCompose={isOpenCompose}
          toggleCompose={toggleCompose}
        />
      </Offcanvas>
    </div>
  )
}

export default EmailNavigationMenu
