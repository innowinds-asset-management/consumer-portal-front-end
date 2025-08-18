"use client";

import React, { useState, useEffect } from "react";
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Badge, Table, Button } from 'react-bootstrap'
import { serviceRequestService, ServiceRequest } from '@/services/api/serviceRequest'
import { useRouter } from 'next/navigation';

interface ServiceRequestTabProps {
  assetId?: string;
  supplierId?: string;
  departmentId?: string;
  asset?: any; // Asset object for creating new service requests
  supplier?: any; // Supplier object for context
  showCreateButton?: boolean;
  title?: string;
  className?: string;
}

export default function ServiceRequestTab({ 
  assetId, 
  supplierId,
  departmentId,
  asset, 
  supplier,
  showCreateButton = true, 
  title = "Service History",
  className = ""
}: ServiceRequestTabProps) {
  const router = useRouter();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadServiceRequests = async () => {
    if (loaded) return;

    try {
      setLoading(true);
      setError("");
      
      let serviceRequestData: ServiceRequest[];
      
      if (assetId) {
        // Load service requests by asset ID
        serviceRequestData = await serviceRequestService.getServiceRequestByAssetId(assetId);
      } else if (supplierId) {
        // Load service requests by supplier ID
        serviceRequestData = await serviceRequestService.getServiceRequests({ supplierId });
      } else if (departmentId) {
        // Load service requests by department ID
        serviceRequestData = await serviceRequestService.getServiceRequests({ departmentId });
      } else {
        // Load all service requests
        serviceRequestData = await serviceRequestService.getServiceRequests();
      }
      
      setServiceRequests(serviceRequestData);
      setLoaded(true);
    } catch (serviceRequestErr) {
      console.error('Error fetching service requests:', serviceRequestErr);
      setServiceRequests([]);
      setLoaded(true);
      setError("Failed to load service requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServiceRequests();
  }, [assetId, supplierId, departmentId]);

  const handleCreateServiceRequest = () => {
    if (asset) {
      router.push(`/servicerequests/create?aid=${asset.id}`);
    } else if (supplier) {
      router.push(`/servicerequests/create?sid=${supplier.id}`);
    } else if (assetId) {
      router.push(`/servicerequests/create?aid=${assetId}`);
    } else {
      router.push('/servicerequests/create');
    }
  };

  const handleServiceRequestClick = (serviceRequestId: string) => {
    router.push(`/servicerequests/detail?srid=${serviceRequestId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'primary';
      case 'IN_PROGRESS':
        return 'warning';
      case 'PENDING':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CLOSED':
        return 'secondary';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={className}>
      <Row>
        <Col sm="12">
          <Card className="border-0">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-muted mb-0">{title}</h6>
                {showCreateButton && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateServiceRequest}
                  >
                    <IconifyIcon icon="tabler:plus" className="me-1" />
                    Service Request
                  </Button>
                )}
              </div>
              
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading service requests...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-danger">{error}</p>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={loadServiceRequests}
                  >
                    Retry
                  </Button>
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
                             No service requests found
                           </td>
                         </tr>
                      ) : (
                        serviceRequests.map((record, index) => (
                          <tr key={record.serviceRequestId || `service-request-${index}-${record.createdAt}`}>
                            <td>
                              <span 
                                style={{ 
                                  color: '#0d6efd', 
                                  textDecoration: 'underline', 
                                  cursor: 'pointer' 
                                }}
                                onClick={() => {
                                  if (record.serviceRequestId) {
                                    handleServiceRequestClick(record.serviceRequestId);
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
                              <Badge bg={getStatusBadgeColor(record.serviceRequestStatus?.displayName)}>
                                {record.serviceRequestStatus?.displayName}
                              </Badge>
                            </td>
                            <td>{record.createdAt ? formatDate(record.createdAt) : 'N/A'}</td>
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
    </div>
  );
}
