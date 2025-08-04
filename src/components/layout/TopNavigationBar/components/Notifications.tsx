'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { timeSince } from '@/utils/date'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { notificationData, NotificationType } from '../data'

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>(notificationData)

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }
  return (
    <div className="topbar-item">
      <Dropdown align={'end'}>
        <DropdownToggle
          as={'button'}
          className="topbar-link drop-arrow-none"
          data-bs-toggle="dropdown"
          data-bs-offset="0,25"
          data-bs-auto-close="outside"
          aria-haspopup="false"
          aria-expanded="false">
          <Bell className="animate-ring fs-22" />
          <span className="noti-icon-badge" />
        </DropdownToggle>
        <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg" style={{ minHeight: 300 }}>
          <div className="p-2 border-bottom position-relative border-dashed">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
              </Col>
              <Col xs={'auto'}>
                <Dropdown>
                  <DropdownToggle
                    as={'a'}
                    className="drop-arrow-none link-dark"
                    data-bs-toggle="dropdown"
                    data-bs-offset="0,15"
                    aria-expanded="false">
                    <IconifyIcon icon="ri:settings-2-line" className="fs-22 align-middle" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem href="">Mark as Read</DropdownItem>
                    <DropdownItem href="">Delete All</DropdownItem>
                    <DropdownItem href="">Do not Disturb</DropdownItem>
                    <DropdownItem href="">Other Settings</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <SimplebarReactClient className="position-relative z-2 card shadow-none rounded-0" style={{ maxHeight: 300 }}>
            {notifications.map((item, idx) => (
              <div className="notification-item dropdown-item py-2 text-wrap" id="notification-1" key={idx}>
                <span className="d-flex align-items-center">
                  {item.image ? (
                    <span className="me-3 position-relative flex-shrink-0">
                      {item.image?.image && <Image src={item.image.image} className="avatar-md rounded-circle" alt="avatar1" />}
                      <span className={`position-absolute rounded-pill bg-${item.image.variant} notification-badge`}>
                        <IconifyIcon icon={item.image.icon} />
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </span>
                  ) : (
                    <div className="avatar-md flex-shrink-0 me-3">
                      <span className={`avatar-title bg-${item.icon?.variant}-subtle text-${item.icon?.variant} rounded-circle fs-22`}>
                        {item.icon?.icon && <IconifyIcon icon={item.icon.icon} />}
                      </span>
                    </div>
                  )}

                  <span className="flex-grow-1 text-muted">
                    {item.title}
                    <br />
                    <span className="fs-12">{timeSince(item.time)}</span>
                  </span>
                  <span className="notification-item-close" onClick={() => dismissNotification(item.id)}>
                    <button type="button" className="btn btn-ghost-danger rounded-circle btn-sm btn-icon" data-dismissible="#notification-1">
                      <IconifyIcon icon="tabler:x" className="fs-16" />
                    </button>
                  </span>
                </span>
              </div>
            ))}
          </SimplebarReactClient>
          <div
            style={{ height: 300 }}
            className="d-flex align-items-center justify-content-center text-center position-absolute top-0 bottom-0 start-0 end-0 z-1">
            <div>
              <IconifyIcon icon="line-md:bell-twotone-alert-loop" className="fs-80 text-secondary mt-2" />
              <h4 className="fw-semibold mb-0 fst-italic lh-base mt-3">
                Hey! 👋 <br />
                You have no any notifications
              </h4>
            </div>
          </div>
          <Link
            href=""
            className="dropdown-item notification-item position-fixed z-2 bottom-0 text-center text-reset text-decoration-underline link-offset-2 fw-bold notify-item border-top border-light py-2">
            View All
          </Link>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notifications
