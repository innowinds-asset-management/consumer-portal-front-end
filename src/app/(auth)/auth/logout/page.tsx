'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { currentYear, developedBy } from '@/context/constants'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

const LogoutPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  // Don't auto-logout. User should only logout when they click logout button
  // This page just shows the logout confirmation

  return (
    <div className="h-100">
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={3} lg={4} md={6}>
            <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3 mb-0">
              <Link href="/" className="auth-brand mb-4">
                <Image src={logoDark} alt="dark logo" height={26} className="logo-dark" />
                <Image src={logo} alt="logo light" height={26} className="logo-light" />
              </Link>
              <h4 className="fw-semibold mb-2 fs-18">You are Logged Out</h4>
              <div className="d-flex align-items-center gap-2 my-3 mx-auto">
                <Image src={avatar1} alt="avatar1" className="avatar-lg rounded-circle img-thumbnail" />
                <div>
                  <h4 className="fw-semibold text-dark">Hi ! {user?.name || 'User'}</h4>
                </div>
              </div>
              <div className="mb-3 text-start">
                <div className="bg-success-subtle p-3 rounded fst-italic fw-medium mb-0" role="alert">
                  <p className="mb-0 text-success">
                    You have been successfully logged out of your account. To continue using our services, please log in again with your credentials.
                    If you encounter any issues, feel free to contact our support team for assistance.
                  </p>
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary fw-semibold" type="submit">
                  Support Center
                </button>
              </div>
              <p className="text-muted fs-14 my-3">
                Back to
                <Link href="/auth/login" className="text-danger fw-semibold ms-1">
                  Login !
                </Link>
              </p>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} © Abstack - By <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">{developedBy}</span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LogoutPage
