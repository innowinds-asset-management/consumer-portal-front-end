"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { serviceRequestService, ServiceRequest } from '@/services/api/serviceRequest'
import { Location } from '@/services/api/assets'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';



export default function AssetDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('aid');

  const [asset, setAsset] = useState<Asset | null>(null);
  const [assetType, setAssetType] = useState<AssetType | null>(null);
  const [assetSubType, setAssetSubType] = useState<AssetSubType | null>(null);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [assetLocation, setAssetLocation] = useState<{ locations: Location[] } | null>(null);
  const [assetDepartment, setDepartmnet] = useState<{ department: Department } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingServiceRequests, setLoadingServiceRequests] = useState(false);
  const [loadingWarranties, setLoadingWarranties] = useState(false);
  const [serviceRequestsLoaded, setServiceRequestsLoaded] = useState(false);
  const [warrantiesLoaded, setWarrantiesLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssetDetails = async () => {
      if (!assetId) {
        setError("Asset ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Fetch asset details
        const assetData = await assetsService.getAssetById(assetId);

        setAsset(assetData);

        // Set asset type and sub-type from response data
        setAssetType(assetData.assetType || null);
        setAssetSubType(assetData.assetSubType || null);
        //fetch location details
        const locationData = { locations: assetData.locations || [] };
        setAssetLocation(locationData);
        //set department details
        const departmentData = { department: assetData.department || null };
        setDepartmnet(departmentData);

        // Warranty data will be loaded on-demand when user clicks Warranty tab

      } catch (err) {
        console.error('Error fetching asset details:', err);
        setError("Failed to load asset details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetDetails();
  }, [assetId]);


  const handleClick = (asset: Asset) => {
    router.push(`/servicerequests/create?aid=${asset.id}`);
  };

  const loadServiceRequests = async () => {
    if (!assetId || serviceRequestsLoaded) return;

    try {
      setLoadingServiceRequests(true);
      const serviceRequestData = await serviceRequestService.getServiceRequestByAssetId(assetId);
      setServiceRequests(serviceRequestData);
      setServiceRequestsLoaded(true);
    } catch (serviceRequestErr) {
      console.error('Error fetching service requests:', serviceRequestErr);
      setServiceRequests([]);
      setServiceRequestsLoaded(true);
    } finally {
      setLoadingServiceRequests(false);
    }
  };

  const loadWarranties = async () => {
    if (!assetId || warrantiesLoaded) return;

    try {
      setLoadingWarranties(true);
      const warrantyData = await warrantyService.getWarrantiesByAssetId(assetId);
      setWarranties(warrantyData);
      setWarrantiesLoaded(true);
    } catch (warrantyErr) {
      console.error('Error fetching warranty data:', warrantyErr);
      setWarranties([]);
      setWarrantiesLoaded(true);
    } finally {
      setLoadingWarranties(false);
    }
  };

  const handleTabSelect = (eventKey: string | null) => {
    if (eventKey === 'serviceRequest' && !serviceRequestsLoaded) {
      loadServiceRequests();
    }
    if (eventKey === 'warranty' && !warrantiesLoaded) {
      loadWarranties();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  if (loading) {
    return (
      <>
        <PageTitle title="Asset Details" />
        <ComponentContainerCard title="Loading Asset Details">
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading asset details...</p>
          </div>
        </ComponentContainerCard>
      </>
    );
  }

  if (error || !asset) {
    return (
      <>
        <PageTitle title="Asset Details" />
        <ComponentContainerCard title="Error">
          <Alert variant="danger">
            {error || "Asset not found"}
          </Alert>
        </ComponentContainerCard>
      </>
    );
  }



  return (
    <>
      <PageTitle title="" />

      <ComponentContainerCard
        title={`${asset.assetName}(${asset.consumerSerialNo})`}
      // description="Detailed information about the selected asset"
      >
        {/* Overview Section - Above Tabs */}
        <Row className="mb-4">
          <Col sm="12">
            <Card className="border-0">
              <CardBody>
                <Row>
                  <Col lg={6}>
                    {/* <h6 className="text-muted mb-3">Asset Information</h6> */}
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {asset.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Type:</strong> {assetType?.assetName || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Sub Type:</strong> {assetSubType?.name || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Brand:</strong> {asset.brand}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {asset.model}
                    </div>
                    {asset.subModel && (
                      <div className="mb-3">
                        <strong>Sub Model:</strong> {asset.subModel}
                      </div>
                    )}
                  </Col>
                  <Col lg={6}>
                    {/* <h6 className="text-muted mb-3">Technical Details</h6> */}
                    <div className="mb-3">
                      <strong>Part Number:</strong> {asset.partNo}
                    </div>

                    <div className="mb-3">
                      <strong> Serial No:</strong> {asset.consumerSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Serial No:</strong> {asset.supplierSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Code:</strong> {asset.supplierCode}
                    </div>
                    <div className="mb-3">
                      <strong>Status:</strong>
                      <Badge bg={asset.isActive ? 'success' : 'danger'} className="ms-2">
                        {asset.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <TabContainer defaultActiveKey="department" onSelect={handleTabSelect}>
          <Nav role="tablist" className="nav-tabs nav-bordered mb-3">
            <NavItem as="li" role="presentation">
              <NavLink eventKey="department">
                <IconifyIcon icon="tabler:building" className="fs-18 me-1" />
                Transfers
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="warranty">
                <IconifyIcon icon="tabler:shield-check" className="fs-18 me-1" />
                Warranty
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="serviceRequest">
                <IconifyIcon icon="tabler:history" className="fs-18 me-1" />
                Service Request
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent>

            {/* Warranty Tab */}
            <TabPane eventKey="warranty" id="warranty">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <h6 className="text-muted mb-3">Warranty Information</h6>
                      {loadingWarranties ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2 text-muted">Loading warranty information...</p>
                        </div>
                      ) : warranties.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted">No warranty information available</p>
                        </div>
                      ) : (
                        warranties.map((warranty, index) => (
                          <div key={warranty.warrantyId} className={index > 0 ? "mt-4" : ""}>
                            <h6 className="text-primary mb-3">Warranty #{warranty.warrantyNumber}</h6>
                            <Table responsive striped>
                              <thead>
                                <tr>
                                  <th>Field</th>
                                  <th>Value</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><strong>Warranty Type</strong></td>
                                  <td>{warranty.warrantyType.typeName}</td>
                                  <td>
                                    <Badge bg={warranty.isActive ? 'success' : 'danger'}>
                                      {warranty.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Warranty Number</strong></td>
                                  <td>{warranty.warrantyNumber}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Coverage Type</strong></td>
                                  <td>{warranty.coverageType}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Coverage Description</strong></td>
                                  <td>{warranty.coverageDescription}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Start Date</strong></td>
                                  <td>{formatDate(warranty.startDate)}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>End Date</strong></td>
                                  <td>{formatDate(warranty.endDate)}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Warranty Period</strong></td>
                                  <td>{warranty.warrantyPeriod} months</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Cost</strong></td>
                                  <td>${warranty.cost}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Auto Renewal</strong></td>
                                  <td>{warranty.autoRenewal ? 'Yes' : 'No'}</td>
                                  <td>
                                    <Badge bg={warranty.autoRenewal ? 'success' : 'secondary'}>
                                      {warranty.autoRenewal ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Supplier ID</strong></td>
                                  <td>{warranty.warrantySupplierId}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Consumer ID</strong></td>
                                  <td>{warranty.consumerId}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Terms & Conditions</strong></td>
                                  <td>{warranty.termsConditions}</td>
                                  <td>-</td>
                                </tr>
                              </tbody>
                            </Table>

                            {warranty.notifications && warranty.notifications.length > 0 && (
                              <div className="mt-3">
                                <h6 className="text-warning mb-2">Notifications</h6>
                                <Table responsive striped size="sm">
                                  <thead>
                                    <tr>
                                      <th>Type</th>
                                      <th>Message</th>
                                      <th>Sent Date</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {warranty.notifications.map((notification) => (
                                      <tr key={notification.notificationId}>
                                        <td>{notification.notificationType}</td>
                                        <td>{notification.message}</td>
                                        <td>{formatDate(notification.sentDate)}</td>
                                        <td>
                                          <Badge bg={notification.isSent ? 'success' : 'warning'}>
                                            {notification.isSent ? 'Sent' : 'Pending'}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Department Tab */}
            <TabPane eventKey="department" id="department">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <h6 className="text-muted mb-3">Location Information</h6>
                      {!assetLocation?.locations || assetLocation.locations.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted">No location information available</p>
                        </div>
                      ) : (
                        <Table responsive striped>
                          <thead>
                            <tr>
                              <th>Department Name</th>
                              <th>Building</th>
                              <th>Floor</th>
                              <th>Room</th>
                              <th>Current Location</th>
                              <th>Created Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assetLocation.locations.map((location: Location) => (
                              <tr key={location.id}>
                                <td>{location.departmentId ? (assetDepartment?.department?.deptName || '') : ''}</td>
                                <td>{location.building}</td>
                                <td>{location.floorNumber}</td>
                                <td>{location.roomNumber}</td>
                                <td>
                                  <Badge bg={location.isCurrentLocation ? 'success' : 'secondary'}>
                                    {location.isCurrentLocation ? 'Current' : 'Historical'}
                                  </Badge>
                                </td>
                                <td>{formatDate(location.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}

                      <div className="text-center mt-3">
                        <small className="text-muted">
                          Showing {assetLocation?.locations?.length || 0} location records
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Service Request Tab */}
            <TabPane eventKey="serviceRequest" id="serviceRequest">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-muted mb-0">Service History</h6>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleClick(asset)}
                        >
                          <IconifyIcon icon="tabler:plus" className="me-1" />
                          Service Request
                        </Button>
                      </div>
                      {loadingServiceRequests ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2 text-muted">Loading service requests...</p>
                        </div>
                      ) : (
                        <>
                          <Table responsive striped>
                            <thead>
                              <tr>
                                <th>Sr Number</th>
                                <th>Description</th>
                                <th>Technician Name</th>
                                <th>Service Supplier Name</th>
                                <th>Status</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {serviceRequests.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="text-center text-muted">
                                    No service requests found for this asset
                                  </td>
                                </tr>
                              ) : (
                                serviceRequests.map((record, index) => (
                                  <tr key={record.serviceRequestId || `service-request-${index}-${record.createdAt}`}>
                                    {/* <td>{record.createdAt}</td> */}
                                    <td>
                                      <span 
                                        style={{ 
                                          color: '#0d6efd', 
                                          textDecoration: 'underline', 
                                          cursor: 'pointer' 
                                        }}
                                        onClick={() => {
                                          if (record.serviceRequestId) {
                                            router.push(`/servicerequests/detail?srid=${record.serviceRequestId}`);
                                          }
                                        }}
                                      >
                                        {record.srNo}
                                      </span>
                                    </td>
                                    <td>{record.problem}</td>
                                    <td>{record.technicianName}</td>
                                    <td>{record.serviceSupplier?.name || ''}</td>
                                    <td>
                                      <Badge bg={
                                        record.srStatus === 'OPEN' ? 'primary' :
                                        record.srStatus === 'IN_PROGRESS' ? 'warning' :
                                        record.srStatus === 'PENDING' ? 'info' :
                                        record.srStatus === 'COMPLETED' ? 'success' :
                                        record.srStatus === 'CLOSED' ? 'secondary' :
                                        record.srStatus === 'CANCELLED' ? 'danger' : 'secondary'
                                      }>
                                        {record.srStatus}
                                      </Badge>
                                    </td>
                                    <td>{formatDate(record.createdAt!)}</td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </Table>
                          <div className="text-center mt-3">
                            <small className="text-muted">
                              Showing {serviceRequests.length} service request records
                            </small>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </TabContainer>
      </ComponentContainerCard>
    </>
  );
}
