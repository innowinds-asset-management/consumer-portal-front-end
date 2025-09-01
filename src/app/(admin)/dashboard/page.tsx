
import AssetStats from './components/assetStats'
import ServiceRequestStats from './components/serviceRequestStats'
import DepartmentStats from './components/departmentStats'
import SupplierStats from './components/supplierStats'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const DashboardPage = () => {
  return (
    <>
  
      
      {/* Asset Management Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <h4 className="mb-0 fw-bold text-primary bg-gradient">
                  <i className="ri-database-2-line me-2"></i>
                  Assets
                </h4>
              </div>
              <AssetStats />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Service Request Management Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <h4 className="mb-0 fw-bold text-success">
                  <i className="ri-customer-service-2-line me-2"></i>
                  Service Requests
                </h4>
              </div>
              <ServiceRequestStats />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Department Management Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <h4 className="mb-0 fw-bold text-info">
                  <i className="ri-building-line me-2"></i>
                  Departments
                </h4>
              </div>
              <DepartmentStats />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Supplier Management Section */}
      <Row className="mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <h4 className="mb-0 fw-bold text-warning">
                  <i className="ri-user-star-line me-2"></i>
                  Suppliers
                </h4>
              </div>
              <SupplierStats />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage
