'use client'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useAuth } from '@/stores/authStore'
import useLogout from '@/hooks/useLogout'
import Image from 'next/image'
import Link from 'next/link'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

const ProfileDropdown = () => {
  const { user } = useAuth()
  const { handleLogout, isLoggingOut } = useLogout()

  return (
    <div className="topbar-item nav-user">
      <Dropdown>
        <DropdownToggle
          as={'a'}
          className="topbar-link drop-arrow-none px-2"
          data-bs-toggle="dropdown"
          data-bs-offset="0,19"
          type="button"
          aria-haspopup="false"
          aria-expanded="false">
          <Image src={avatar3} width={32} className="rounded-circle me-lg-2 d-flex" alt="user-image" />
          <span className="d-lg-flex flex-column gap-1 d-none">
            <span className="fw-semibold">{user?.name || 'User'}</span>
          </span>
          <IconifyIcon icon="ri:arrow-down-s-line" className="d-none d-lg-block align-middle ms-2" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownHeader className="noti-title">
            <h6 className="text-overflow m-0">Welcome {user?.name || 'User'}!</h6>
          </DropdownHeader>
          <DropdownItem>
            <IconifyIcon icon="ri:account-circle-line" className=" me-1 fs-16 align-middle" />
            <span className="align-middle">My Account</span>
          </DropdownItem>
          <DropdownItem>
            <IconifyIcon icon="ri:wallet-3-line" className="me-1 fs-16 align-middle" />
            <span className="align-middle">
              Wallet : <span className="fw-semibold">$985.25</span>
            </span>
          </DropdownItem>
          <DropdownItem>
            <IconifyIcon icon="ri:settings-2-line" className=" me-1 fs-16 align-middle" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
          <DropdownItem>
            <IconifyIcon icon="ri:question-line" className=" me-1 fs-16 align-middle" />
            <span className="align-middle">Support</span>
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem as={Link} href="/auth/lock-screen">
            <IconifyIcon icon="ri:lock-line" className="me-1 fs-16 align-middle" />
            <span className="align-middle">Lock Screen</span>
          </DropdownItem>
          <DropdownItem 
            onClick={() => handleLogout()}
            className="active fw-semibold text-danger"
            disabled={isLoggingOut}
          >
            <IconifyIcon icon="ri:logout-box-line" className="me-1 fs-16 align-middle" />
            <span className="align-middle">
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ProfileDropdown
