"use client";

import React, { useEffect, useState } from "react";
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Badge, Table, Button, Alert, Spinner } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDate } from "@/utils/date";
import { serviceContractService, ServiceContract } from "@/services/api/serviceContract";
import { getFullPath } from "@/helpers/getUrlHelper";

interface AmcCmcTabProps {
  supplierId?: string;
  assetId?: string;
  supplier?: any; // Supplier object for context
  showCreateButton?: boolean;
  title?: string;
  className?: string;
}



export default function AmcCmcTab({ 
  supplierId, 
  assetId,
  supplier, 
  showCreateButton = true, 
  title = "AMC/CMC Contracts",
  className = ""
}: AmcCmcTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [contracts, setContracts] = useState<ServiceContract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get supplier ID from URL params or props
  const currentSupplierId = supplierId || searchParams.get('sid') || supplier?.id;
  // Get asset ID from URL params or props
  const currentAssetId = assetId || searchParams.get('aid');

  
  // Use contracts directly since we're fetching the correct data based on context
  // Ensure it's always an array
  const filteredContracts = Array.isArray(contracts) ? contracts : [];

  useEffect(() => {
    const fetchContracts = async () => {
      // Don't fetch if we don't have either supplierId or assetId
      if (!currentSupplierId && !currentAssetId) {
        setContracts([]);
        return;
      }
      
      setLoading(true);
      setError(''); 
      
      try {
        let data: ServiceContract[] = [];
        
        // If we have an assetId, fetch contracts by asset
        if (currentAssetId) {
          console.log('Fetching contracts for assetId:', currentAssetId);
          data = await serviceContractService.getServiceContractsByAssetId(currentAssetId);
          console.log('Asset contracts data:', data);
        } 
        // Otherwise, if we have a supplierId, fetch contracts by supplier
        else if (currentSupplierId) {
          console.log('Fetching contracts for supplierId:', currentSupplierId);
          data = await serviceContractService.getServiceContractsBySupplierId(currentSupplierId);
          console.log('Supplier contracts data:', data);
        }
        
        // Ensure data is always an array
        if (!Array.isArray(data)) {
          console.warn('API returned non-array data:', data);
          data = [];
        }
        
        setContracts(data);
        
      } catch (err) {
        setError('Failed to load contracts');
        console.error('Error fetching contracts:', err);
        setContracts([]); // Ensure contracts is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [currentSupplierId, currentAssetId]);

  const handleCreateContract = () => {
    // Get current full path for redirection
    const fullPath = getFullPath();    
    // Build URL with parameters
    let redirectUrl = '/amc-cmc/create';
    const urlParams = new URLSearchParams();    
    if (currentAssetId) {
      urlParams.append('aid', currentAssetId);
    } else if (supplier) {
      urlParams.append('sid', supplier.id);
    }
    
    // Add returnUrl parameter (more semantic than fullPath)
    if (fullPath) {
      urlParams.append('returnUrl', encodeURIComponent(fullPath));
    }
    
    // Append parameters to URL
    if (urlParams.toString()) {
      redirectUrl += `?${urlParams.toString()}`;
    }
    
    console.log('Redirecting to:', redirectUrl);
    router.push(redirectUrl);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'danger';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  const getContractTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'AMC':
        return 'primary';
      case 'CMC':
        return 'info';
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
                    onClick={handleCreateContract}
                    className="d-flex align-items-center gap-2"
                  >
                    <IconifyIcon icon="tabler:plus" className="fs-16" />
                    Create AMC/CMC
                  </Button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mt-2 text-muted">Loading contracts...</p>
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : filteredContracts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No AMC/CMC contracts found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Contract Number</th>
                        <th>Contract Name</th>
                        <th>Type</th>
                        <th>Asset</th>
                        <th>Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContracts.map((contract: ServiceContract) => (
                        <tr key={contract.contractId}>
                          <td>{contract.contractNumber}</td>
                          <td>{contract.contractName}</td>
                          <td>
                            <Badge bg={getContractTypeBadgeColor(contract.contractType.typeName)}>
                              {contract.contractType.typeName}
                            </Badge>
                          </td>
                          <td>
                            <span 
                              className="text-primary cursor-pointer text-decoration-underline"
                              onClick={() => router.push(`/assets/detail?aid=${contract.asset.id}`)}
                              style={{ cursor: 'pointer' }}
                            >
                              {contract.asset.assetName}
                            </span>
                          </td>
                          <td>
                            {contract.amount ? `$${contract.amount.toLocaleString()}` : '-'}
                          </td>
                          <td>{formatDate(contract.startDate)}</td>
                          <td>{formatDate(contract.endDate)}</td>
                          <td>
                            <Badge bg={getStatusBadgeColor(contract.status.name)}>
                              {contract.status.name}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              {filteredContracts.length > 0 && (
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Showing {filteredContracts.length} contract{filteredContracts.length !== 1 ? 's' : ''}
                  </small>
                </div>
              )}              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
