"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { useSearchParams } from 'next/navigation'

// Mock service request data
const mockServiceHistory = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'Preventive Maintenance',
    description: 'Regular cleaning and inspection',
    technician: 'John Smith',
    status: 'Completed',
    cost: 150.00
  },
  {
    id: '2',
    date: '2023-12-10',
    type: 'Repair',
    description: 'Replaced faulty component',
    technician: 'Mike Johnson',
    status: 'Completed',
    cost: 450.00
  },
  {
    id: '3',
    date: '2023-11-05',
    type: 'Inspection',
    description: 'Annual safety inspection',
    technician: 'Sarah Wilson',
    status: 'Completed',
    cost: 75.00
  }
];

export default function AssetDetailPage() {
  const searchParams = useSearchParams();
  const assetId = searchParams.get('id');
  
  const [asset, setAsset] = useState<Asset | null>(null);
  const [assetType, setAssetType] = useState<AssetType | null>(null);
  const [assetSubType, setAssetSubType] = useState<AssetSubType | null>(null);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);
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
        
        // Fetch asset type details
        const assetTypes = await assetTypesService.getActiveAssetTypes();
        const foundAssetType = assetTypes.find(at => at.id === assetData.assetTypeId);
        setAssetType(foundAssetType || null);
        
        // Fetch asset sub-type details
        const assetSubTypes = await assetSubTypesService.getActiveAssetSubTypes();
        const foundAssetSubType = assetSubTypes.find(ast => ast.id === assetData.assetSubTypeId);
        setAssetSubType(foundAssetSubType || null);
        
        // Fetch warranty details
        const warrantyData = await warrantyService.getWarrantiesByAssetId(assetId);
        setWarranties(warrantyData);
        
      } catch (err) {
        console.error('Error fetching asset details:', err);
        setError("Failed to load asset details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetDetails();
  }, [assetId]);

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
      <PageTitle title="Asset Details" />
      
      <ComponentContainerCard 
        title={`Asset: ${asset.assetName}`}
        description="Detailed information about the selected asset"
      >
        {/* Overview Section - Above Tabs */}
        <Row className="mb-4">
          <Col sm="12">
            <Card className="border-0">
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <h6 className="text-muted mb-3">Asset Information</h6>
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
                    <h6 className="text-muted mb-3">Technical Details</h6>
                    <div className="mb-3">
                      <strong>Part Number:</strong> {asset.partNo}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Serial No:</strong> {asset.supplierSerialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Consumer Serial No:</strong> {asset.consumerSerialNo}
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

        <TabContainer defaultActiveKey="warranty">
          <Nav role="tablist" className="nav-tabs nav-bordered mb-3">
            <NavItem as="li" role="presentation">
              <NavLink eventKey="warranty">
                <IconifyIcon icon="tabler:shield-check" className="fs-18 me-1" />
                Warranty
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="department">
                <IconifyIcon icon="tabler:building" className="fs-18 me-1" />
                Department
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="serviceHistory">
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
                      {warranties.length === 0 ? (
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
                      <h6 className="text-muted mb-3">Department Information</h6>
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
                            <td><strong>Building Number</strong></td>
                            <td>
                              <span className="text-muted">Not specified</span>
                            </td>
                            <td>
                              <Badge bg="secondary">Not Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Department</strong></td>
                            <td>
                              <span className="text-muted">Not specified</span>
                            </td>
                            <td>
                              <Badge bg="secondary">Not Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Floor Number</strong></td>
                            <td>
                              <span className="text-muted">Not specified</span>
                            </td>
                            <td>
                              <Badge bg="secondary">Not Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Room Number</strong></td>
                            <td>
                              <span className="text-muted">Not specified</span>
                            </td>
                            <td>
                              <Badge bg="secondary">Not Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>GRN ID</strong></td>
                            <td>{asset.grnId}</td>
                            <td>
                              <Badge bg="success">Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>GRN Item ID</strong></td>
                            <td>{asset.grnItemId}</td>
                            <td>
                              <Badge bg="success">Available</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Asset ID</strong></td>
                            <td>{asset.id}</td>
                            <td>
                              <Badge bg="success">Available</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Service History Tab */}
            <TabPane eventKey="serviceHistory" id="serviceHistory">
              <Row>
                <Col sm="12">
                  <Card className="border-0">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-muted mb-0">Service History</h6>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => {
                            // TODO: Implement service request functionality
                            console.log('Service request button clicked for asset:', asset?.id);
                          }}
                        >
                          <IconifyIcon icon="tabler:plus" className="me-1" />
                          Service Request
                        </Button>
                      </div>
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Technician</th>
                            <th>Status</th>
                            <th>Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockServiceHistory.map((record) => (
                            <tr key={record.id}>
                              <td>{formatDate(record.date)}</td>
                              <td>{record.type}</td>
                              <td>{record.description}</td>
                              <td>{record.technician}</td>
                              <td>
                                <Badge bg="success">{record.status}</Badge>
                              </td>
                              <td>${record.cost.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div className="text-center mt-3">
                        <small className="text-muted">
                          Showing last 3 service history records
                        </small>
                      </div>
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
