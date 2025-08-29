'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { departmentService } from '@/services/api/departments'
import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

const DepartmentStats = () => {
  const router = useRouter()
  const [departmentCount, setDepartmentCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDepartmentCount = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const count = await departmentService.getDepartmentCountByConsumerId()
        setDepartmentCount(count)
      } catch (err) {
        console.error('Error fetching department count:', err)
        setError('Failed to load department statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchDepartmentCount()
  }, [])

  // Click handler for card navigation
  const handleCardClick = () => {
    router.push('/departments')
  }

  if (loading) {
    return (
      <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h2 className="text-dark fs-13 fw-bold text-uppercase">Loading...</h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1">-</h2>
                  <p className="mb-0 fw-bold">Loading department data...</p>
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
        {/* Total Departments Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow text-bg-primary bg-gradient" 
            onClick={handleCardClick}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
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
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Total Departments">
                    Total Departments
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{departmentCount || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:building-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Active
                    </span>
                    <span className="text-nowrap">Organizational units</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:building-bold-duotone" />
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

export default DepartmentStats
