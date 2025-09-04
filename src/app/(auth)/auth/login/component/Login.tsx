'use client'
import { currentYear } from '@/context/constants'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'
import useSignIn from './useSignIn'
import TextFormInput from '@/components/form/TextFormInput'
import PasswordFormInput from '@/components/form/PasswordFormInput'

const Login = () => {
  const { loading, login, control, error } = useSignIn()
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
            <h4 className="fw-semibold mb-2 fs-18">Log in to your account</h4>
            {/* <p className="text-muted mb-4">Enter your user Id and password to access admin panel.</p> */}
            <form onSubmit={login} action="/" className="text-start mb-3">
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="userId"
                  placeholder="Enter your userId"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="User Id"
                />
              </div>
              <div className="mb-3">
                <PasswordFormInput
                  control={control}
                  name="password"
                  placeholder="Enter your password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Password"
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                  <label className="form-check-label" htmlFor="checkbox-signin">
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-muted border-bottom border-dashed">
                  Forgot Password ?
                </Link>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <div className="d-grid">
                <button disabled={loading} className="btn btn-primary fw-semibold" type="submit">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
            <p className="text-muted fs-14 mb-2">
              Don't have an account?
              <Link href="/auth/register" className="fw-semibold text-danger ms-1">
                Sign Up !
              </Link>
            </p>
            <p className="text-muted fs-14 mb-1">
              Contact Support - support@assetnix.com
            </p>
          </Card>
          <p className=" mt-4 text-center mb-0">
            {currentYear} © AssetNix
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default Login
