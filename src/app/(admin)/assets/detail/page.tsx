"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ServiceRequestTab from '@/components/ServiceRequestTab'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button, Modal, Form } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { assetStatusService, AssetStatus } from '@/services/api/assetStatus'
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
  const [assetLocation, setAssetLocation] = useState<{ locations: Location[] } | null>(null);
  const [assetDepartment, setDepartmnet] = useState<{ department: Department } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingWarranties, setLoadingWarranties] = useState(false);
  const [warrantiesLoaded, setWarrantiesLoaded] = useState(false);
  const [error, setError] = useState("");
  
  // Modal and Asset Status states
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [assetStatuses, setAssetStatuses] = useState<any[]>([]);
  const [loadingAssetStatuses, setLoadingAssetStatuses] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Message states
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

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

        // Set warranties from asset response data for immediate warranty status calculation
        setWarranties((assetData as any).warranties || []);
        setWarrantiesLoaded(true);

        // Warranty data will be loaded on-demand when user clicks Warranty tab (for detailed view)

      } catch (err) {
        console.error('Error fetching asset details:', err);
        setError("Failed to load asset details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const initializePage = async () => {
      await fetchAssetDetails();
      await fetchAssetStatuses(); // Fetch asset statuses on page load
    };

    initializePage();
  }, [assetId]);




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
    if (eventKey === 'warranty' && !warrantiesLoaded) {
      loadWarranties();
    }
  };

  const fetchAssetStatuses = async () => {
    try {
      setLoadingAssetStatuses(true);
      const response = await assetStatusService.getAssetStatuses();
      
      if (response.success) {
        setAssetStatuses(response.data);
      } else {
        console.error('Failed to fetch asset statuses:', response.error);
      }
    } catch (error) {
      console.error('Error fetching asset statuses:', error);
    } finally {
      setLoadingAssetStatuses(false);
    }
  };

  const handleUpdateStatusClick = () => {
    setShowUpdateStatusModal(true);
    fetchAssetStatuses();
  };

  const handleCloseModal = () => {
    setShowUpdateStatusModal(false);
    setSelectedStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      setMessage({ type: 'error', text: 'Please select a status' });
      return;
    }
    
    try {
      const response = await assetsService.updateAsset(assetId!, { status: selectedStatus });
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Asset status updated successfully!' });
        
        // Refetch asset data to get the updated information
        const updatedAssetData = await assetsService.getAssetById(assetId!);
        setAsset(updatedAssetData);
        
        // Close modal after successful update
        handleCloseModal();
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to update asset status' });
      }
    } catch (error) {
      console.error('Error updating asset status:', error);
      setMessage({ type: 'error', text: 'Error updating asset status' });
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
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>{`${asset.assetName}(${asset.consumerSerialNo})`}</span>
            {(
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleUpdateStatusClick}
              >
                Edit Status
              </Button>
            )}
          </div>
        }
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
                    <div className="mb-3">
                      <strong>Part Number:</strong> {asset.partNo}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Status:</strong>
                        <Badge bg={
                          (() => {
                            if (!asset.status) return 'warning';
                            const statusData = assetStatuses.find(s => s.statusCode === asset.status);
                            if (!statusData) return 'warning';                            
                            // Use group from assetStatuses to determine badge color
                            switch (statusData.group) {
                              case 'ACTIVE':
                                return 'success';
                              case 'PRE_ACTIVE':
                                return 'primary';
                              case 'RETIRED':
                                return 'secondary';
                              default:
                                return 'warning';
                            }
                          })()
                        } className="ms-2">
                          {asset.status ? 
                            (() => {
                              const statusData = assetStatuses.find(s => s.statusCode === asset.status);
                              return statusData ? statusData.displayName : 'N/A';
                            })() : 
                            'N/A'
                          }
                      </Badge>

                    </div>
                  </Col>
                  <Col lg={6}>
                    {/* <h6 className="text-muted mb-3">Technical Details</h6> */}
                    <div className="mb-3">
                      <strong>Serial No:</strong> {asset.consumerSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Name:</strong> {asset.supplier?.name || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Serial No:</strong> {asset.supplierSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Department:</strong> {asset.department?.deptName || 'N/A'}
                    </div>
                    <div className="mb-3">
                      <strong>Warranty Status:</strong>
                      <Badge bg={
                        (() => {
                          // Check if warranties array exists and has items
                          if (warranties && warranties.length > 0) {
                            // Get the most recent active warranty
                            const activeWarranties = warranties.filter((w: Warranty) => w.isActive);
                            if (activeWarranties.length > 0) {
                              const currentDate = new Date();
                              const startDate = new Date(activeWarranties[0].startDate);
                              const endDate = new Date(activeWarranties[0].endDate);
                              
                              if (currentDate < startDate) return 'warning';
                              if (currentDate > endDate) return 'danger';
                              return 'success';
                            }
                          }
                          return 'secondary';
                        })()
                      } className="ms-2">
                        {(() => {
                          // Check if warranties array exists and has items
                          if (warranties && warranties.length > 0) {
                            // Get the most recent active warranty
                            const activeWarranties = warranties.filter((w: Warranty) => w.isActive);
                            if (activeWarranties.length > 0) {
                              const currentDate = new Date();
                              const startDate = new Date(activeWarranties[0].startDate);
                              const endDate = new Date(activeWarranties[0].endDate);
                              
                              if (currentDate < startDate) return 'Not Started';
                              if (currentDate > endDate) return 'Expired';
                              return 'Active';
                            }
                          }
                          return 'No Warranty';
                        })()}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <strong>Last Service Date:</strong> {
                        (() => {
                          // Get the most recent service request based on updatedAt
                          if (asset.serviceRequests && asset.serviceRequests.length > 0) {
                            const sortedRequests = [...asset.serviceRequests].sort((a, b) => 
                              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                            );
                            return formatDate(sortedRequests[0].updatedAt);
                          }
                          // Fallback to lastServiceDate if no service requests
                          return asset.lastServiceDate ? formatDate(asset.lastServiceDate) : 'N/A';
                        })()
                      }
                    </div>
                    <div className="mb-3">
                      <strong>Asset Condition:</strong> {
                        typeof asset.assetCondition === 'object' && asset.assetCondition?.name 
                          ? asset.assetCondition.name 
                          : (typeof asset.assetCondition === 'string' ? asset.assetCondition : 'N/A')
                      }
                    </div>
                    <div className="mb-3">
                      <strong>AMC:</strong>
                      <Badge bg={asset.isAmc ? 'success' : 'secondary'} className="ms-2">
                        {asset.isAmc ? 'Yes' : 'No'}
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
                                  <td>{warranty.warrantyType?.typeName || 'N/A'}</td>
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
                                  <td>{warranty.coverageDescription || 'N/A'}</td>
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
                                  <td>{warranty.warrantySupplierId || 'N/A'}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Consumer ID</strong></td>
                                  <td>{warranty.consumerId}</td>
                                  <td>-</td>
                                </tr>
                                <tr>
                                  <td><strong>Terms & Conditions</strong></td>
                                  <td>{warranty.termsConditions || 'N/A'}</td>
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
              <ServiceRequestTab 
                assetId={assetId!} 
                asset={asset}
                showCreateButton={true}
                title="Service History"
              />
            </TabPane>
          </TabContent>
        </TabContainer>
      </ComponentContainerCard>

      {/* Message Display */}
      {message.type && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`} 
             style={{ top: '20px', right: '20px', zIndex: 9999, minWidth: '300px' }}>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: null, text: '' })}></button>
        </div>
      )}

      {/* Update Status Modal */}
      <Modal show={showUpdateStatusModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Asset Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingAssetStatuses ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading asset statuses...</p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Asset Status</Form.Label>
                <Form.Select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Choose a status...</option>
                  {assetStatuses.map((status) => (
                    <option key={status.statusCode} value={status.statusCode}>
                      {status.displayName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleStatusUpdate}
            disabled={!selectedStatus || loadingAssetStatuses}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
