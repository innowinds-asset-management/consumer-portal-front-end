'use client'

import { useResetPassword } from '@/app/(auth)/auth/reset-password/component/useResetPassword'
import TextFormInput from '@/components/form/TextFormInput'
import { Card, Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { currentYear } from '@/context/constants'

export default function ResetPassword() {
  const { control, handleSubmit, onSubmit, isLoading, token } = useResetPassword()

  if (!token) {
    return (
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={3} lg={4} md={6}>
            <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3 mb-0">
              <div className="text-center py-4">
                <div className="text-danger mb-4">
                  <i className="fas fa-exclamation-triangle fa-3x"></i>
                </div>
                <h4 className="fw-semibold mb-2 fs-18">Invalid Reset Link</h4>
                <p className="text-muted mb-4">
                  The password reset link is invalid or has expired. Please request a new one.
                </p>
                <Link href="/auth/forgot-password" className="btn btn-outline-primary">
                  Back to Forgot Password
                </Link>
              </div>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} © AssetNix
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={3} lg={4} md={6}>
          <Card className="overflow-hidden text-center rounded-4 p-xxl-4 p-3 mb-0">
            <Link href="/" className="auth-brand mb-4">
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {/* AN Logo Circle */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#212166',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #212166'
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      fontFamily: 'sans-serif',
                      letterSpacing: '0.5px'
                    }}
                  >
                    AN
                  </span>
                </div>
                {/* AssetNix Text */}
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#212166',
                    fontFamily: 'sans-serif',
                    letterSpacing: '0.5px'
                  }}
                >
                  AssetNix
                </span>
              </div>
            </Link>
            <h4 className="fw-semibold mb-2 fs-18">Reset Password</h4>
            <p className="text-muted mb-4">Enter your new password below.</p>
            <form onSubmit={handleSubmit(onSubmit)} action="/" className="text-start mb-3">
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="password"
                  placeholder="Enter your new password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="New Password"
                  type="password"
                />
              </div>
              
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Confirm Password"
                  type="password"
                />
              </div>
              
              <div className="d-grid">
                <button disabled={isLoading} className="btn btn-primary fw-semibold" type="submit">
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
            <p className="text-muted fs-14 mb-4">
              Remember your password?
              <Link href="/auth/login" className="fw-semibold text-danger ms-1">
                Back to Login
              </Link>
            </p>
          </Card>
          <p className="mt-4 text-center mb-0">
            {currentYear} © AssetNix
          </p>
        </Col>
      </Row>
    </div>
  )
}
