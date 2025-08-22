'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { assetsService } from '@/services/api/assets'
import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/navigation'


interface AssetCounts {
  active: number;
  retired: number;
  preActive: number;
  totalWithStatus: number;
  totalWithoutStatus: number;
  grandTotal: number;
}

const AssetStats = () => {
  const router = useRouter()
  const [assetCounts, setAssetCounts] = useState<AssetCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAssetCounts = async (retryCount = 0) => {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching asset counts... (attempt:', retryCount + 1, ')')
        const counts = await assetsService.getAssetCountByStatus()
        console.log('Asset counts received:', counts)
        setAssetCounts(counts)
      } catch (err) {
        console.error('Error fetching asset counts:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to load asset statistics'
        
        // Retry logic for network errors
        if (retryCount < 2 && (errorMessage.includes('Failed to fetch') || errorMessage.includes('timeout'))) {
          console.log('Retrying... (attempt:', retryCount + 2, ')')
          setTimeout(() => fetchAssetCounts(retryCount + 1), 2000) // Retry after 2 seconds
          return
        }
        
        setError(`Failed to load asset statistics: ${errorMessage}`)
      } finally {
        setLoading(false)
      }
    }

    fetchAssetCounts()
  }, [])

  // Click handlers for card navigation
  const handleCardClick = (status: string) => {
    const statusMap: Record<string, string> = {
      'active': 'active',
      'retired': 'retired', 
      'preActive': 'pre-active'
    }
    
    const groupStatus = statusMap[status]
    if (groupStatus) {
      router.push(`/assets?groupstatus=${groupStatus}`)
    }
  }



  if (loading) {
    return (
      <Row className="row-cols-xxl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
        {[1, 2, 3].map((i) => (
          <Col key={i}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start gap-2 justify-content-between">
                  <div>
                    <h5 className="text-muted fs-13 fw-bold text-uppercase">Loading...</h5>
                    <h2 className="mt-2 mb-1 fw-bold fs-1">-</h2>
                    <p className="mb-0 fw-bold">Loading asset data...</p>
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
        {/* Active Assets Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow text-bg-primary bg-gradient" 
            onClick={() => handleCardClick('active')}
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
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Active Assets">
                    Active Assets
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{assetCounts?.active || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Operational
                    </span>
                    <span className="text-nowrap">Currently in use</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-success rounded fs-28">
                    <IconifyIcon icon="solar:widget-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Retired Assets Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow text-bg-primary bg-gradient" 
            onClick={() => handleCardClick('retired')}
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
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Retired Assets">
                    Retired Assets
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{assetCounts?.retired || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:archive-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Decommissioned
                    </span>
                    <span className="text-nowrap">No longer in use</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-white text-secondary rounded fs-28">
                    <IconifyIcon icon="solar:archive-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Pre-Active Assets Card */}
        <Col>
          <Card 
            className="cursor-pointer hover-shadow text-bg-primary bg-gradient" 
            onClick={() => handleCardClick('preActive')}
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
                  <h2 className="text-white fs-13 fw-bold text-uppercase" title="Pre-Active Assets">
                    Pre-Active Assets
                  </h2>
                  <h2 className="mt-2 mb-1 fw-bold fs-1 text-white">{assetCounts?.preActive || 0}</h2>
                  <p className="mb-0 fw-bold text-white">
                    <span className="text-white me-1">
                      <IconifyIcon icon="ri:time-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      Pending
                    </span>
                    <span className="text-nowrap">Installation pending</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-primary-subtle text-primary rounded fs-28">
                    <IconifyIcon icon="solar:clock-circle-bold-duotone" />
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

export default AssetStats
