'use client'
import { currentYear } from '@/context/constants'
import Link from 'next/link'
import { Card, Col, Row } from 'react-bootstrap'
import useSignUp from './useSignUp'
import TextFormInput from '@/components/form/TextFormInput'

const Register = () => {
  const { loading, register, control, error } = useSignUp()
  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={7}>
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
            <h4 className="fw-semibold mb-2 fs-18">Create your account</h4>
            <p className="text-muted mb-4">Enter your details to create a new account.</p>
            <form onSubmit={register} action="/" className="text-start mb-3">
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="name"
                  placeholder="Enter your full name"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Full Name"
                />
              </div>
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="email"
                  placeholder="Enter your email"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Email"
                  type="email"
                />
              </div>
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="company"
                  placeholder="Enter your company name"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Company Name"
                />
              </div>

              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="password"
                  placeholder="Enter your password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Password"
                  type="password"
                />
              </div>
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Confirm Password"
                  type="password"
                />
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
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
            <p className="text-muted fs-14 mb-4">
              Already have an account?
              <Link href="/auth/login" className="fw-semibold text-danger ms-1">
                Sign In !
              </Link>
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

export default Register
