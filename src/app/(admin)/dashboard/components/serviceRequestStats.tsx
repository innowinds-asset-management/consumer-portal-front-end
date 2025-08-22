'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { serviceRequestService } from '@/services/api/serviceRequest'
import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

interface ServiceRequestCounts {
  cancelled: number;
  closed: number;
  completed: number;
  open: number;
  inProgress: number;
  pending: number;
}

const ServiceRequestStats = () => {
  const router = useRouter()
  const [serviceRequestCounts, setServiceRequestCounts] = useState<ServiceRequestCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServiceRequestCounts = async () => {
      try {
        setLoading(true)
        setError(null)
        const counts = await serviceRequestService.getServiceRequestCountByStatus()
        setServiceRequestCounts(counts)
      } catch (err) {
        console.error('Error fetching service request counts:', err)
        setError('Failed to load service request statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchServiceRequestCounts()
  }, [])

  // Click handlers for card navigation
  const handleCardClick = (status: string) => {
    const statusMap: Record<string, string> = {
      'open': 'open',
      'inProgress': 'inprogress',
      'completed': 'completed',
      'closed': 'closed',
      'cancelled': 'cancelled',
      'pending': 'pending'
    }
    
    const serviceStatus = statusMap[status]
    if (serviceStatus) {
      router.push(`/servicerequests?status=${serviceStatus}`)
    }
  }

  if (loading) {
    return (
      <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Col key={i}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start gap-2 justify-content-between">
                  <div>
                    <h2 className="text-dark fs-13 fw-bold text-uppercase">Loading...</h2>
                    <h2 className="mt-2 mb-1 fw-bold fs-1">-</h2>
                    <p className="mb-0 fw-bold">Loading service request data...</p>
                  </div>
                  <div className="avatar-lg flex-shrink-0">
                    <span className="avatar-title bg-light text-muted rounded fs-28">
                      <IconifyIcon icon="ri:loader-4-line" />
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (error) {
    return (
      <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
        <Col>
          <Card>
            <CardBody>
              <div className="text-center text-danger">
                <IconifyIcon icon="ri:error-warning-line" className="fs-48 mb-2" />
                <h5>Error Loading Data</h5>
                <p className="text-muted">{error}</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
        {/* Open Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('open')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Open Service Requests">
                    Open Service Requests
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.open || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:time-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Pending
                    </span>
                    <span className="text-nowrap">Awaiting action</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:clock-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* In Progress Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('inProgress')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="In Progress Service Requests">
                    In Progress
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.inProgress || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:tools-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Working
                    </span>
                    <span className="text-nowrap">Under repair</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:settings-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Completed Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('completed')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Completed Service Requests">
                    Completed
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.completed || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:check-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Finished
                    </span>
                    <span className="text-nowrap">Successfully resolved</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:check-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Closed Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('closed')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Closed Service Requests">
                    Closed
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.closed || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:lock-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Closed
                    </span>
                    <span className="text-nowrap">Request finalized</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:lock-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Cancelled Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('cancelled')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Cancelled Service Requests">
                    Cancelled
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.cancelled || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:close-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Cancelled
                    </span>
                    <span className="text-nowrap">Request terminated</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:close-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Pending Service Requests Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow" 
            onClick={() => handleCardClick('pending')}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Pending Service Requests">
                    Pending
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{serviceRequestCounts?.pending || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:time-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Waiting
                    </span>
                    <span className="text-nowrap">Awaiting approval</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:clock-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ServiceRequestStats
