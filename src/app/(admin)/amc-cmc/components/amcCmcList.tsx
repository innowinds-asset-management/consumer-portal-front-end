"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Spinner, Badge } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { serviceContractService, ServiceContract } from "@/services/api/serviceContract";
import { formatCurrency } from "@/helpers/currencyHelper";
import { ServiceContractFilter } from "./amcCmcStats";
import { FILTER_TYPES } from "@/utils/constants";

interface AmcCmcListProps {
  filter?: ServiceContractFilter;
  onClearFilter?: () => void;
}

const AmcCmsList: React.FC<AmcCmcListProps> = ({ filter, onClearFilter }) => {
  const router = useRouter();
  const [contracts, setContracts] = useState<ServiceContract[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchServiceContracts(filter);
  }, [filter]);

  // Fetch service contract data from API with optional filtering
  const fetchServiceContracts = async (currentFilter?: ServiceContractFilter) => {
    try {
      setLoading(true);
      setError("");
      
      // Convert filter to backend format
      const backendFilter = currentFilter && currentFilter.type && currentFilter.days ? {
        type: currentFilter.type,
        days: currentFilter.days
      } : undefined;
      
      const data = await serviceContractService.getServiceContracts(backendFilter);
      setMsg("Service contracts fetched successfully");
      setContracts(data.payload);
    } catch (err) {
      console.error('Error fetching service contracts:', err);
      setError("Failed to load service contracts. Please try again.");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // Add click handlers to asset names and supplier names after grid is rendered
  useEffect(() => {
    if (!loading && contracts.length > 0) {
      const addClickHandlers = () => {
        // Add click handlers for Asset Name column (1st column, index 0)
        const assetNameCells = document.querySelectorAll('td:nth-child(1)');
        if (assetNameCells.length > 0) {
          assetNameCells.forEach((cell, index) => {
            if (index < contracts.length) {
              const contract = contracts[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/assets/detail/?aid=${contract.asset.id}`);
              });
            }
          });
        }

        // Add click handlers for Supplier column (2nd column, index 1)
        const supplierCells = document.querySelectorAll('td:nth-child(2)');
        if (supplierCells.length > 0) {
          supplierCells.forEach((cell, index) => {
            if (index < contracts.length) {
              const contract = contracts[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/suppliers/detail/?sid=${contract.serviceSupplier.id}`);
              });
            }
          });
        }
      };      
      // Try immediately
      addClickHandlers();
      // Also try after a delay to ensure GridJS has rendered
      const timeoutId = setTimeout(addClickHandlers, 500);
      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [loading, contracts, router]);

  // Get filter description for display
  const getFilterDescription = (filter: ServiceContractFilter | undefined): string => {
    if (!filter || !filter.type || !filter.days) {
      return "";
    }
    
    const typeText = filter.type === FILTER_TYPES.expiring   ? FILTER_TYPES.typeText.expiring : FILTER_TYPES.typeText.expired;
    const daysText = filter.days === 1 ? FILTER_TYPES.daysText.days : `${filter.days} ${FILTER_TYPES.daysText.days}`;
    
    return `${typeText} within ${daysText}`;
  };

  // Prepare data for GridJS - only plain data, no React components
  const gridData = contracts.map((contract) => {
    return [
      contract.asset.assetName || "-",
      contract.serviceSupplier.name || "-",
      contract.contractType.typeName || "-",
      contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "-",
      contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "-"
    ];
  });

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading service contracts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        <Alert.Heading>Error Loading Service Contracts</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={() => fetchServiceContracts(filter)}>
          <IconifyIcon icon="ri:refresh-line" className="me-2" />
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
              <div className="flex-grow-1">
                <h4 className="header-title">AMC/CMC Contracts</h4>
                {filter && filter.type && filter.days && (
                  <div className="mt-2">
                    <Badge bg="primary" className="me-2">
                      <IconifyIcon icon="solar:filter-bold-duotone" className="me-1" />
                      Filtered: {getFilterDescription(filter)}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
                {filter && filter.type && filter.days && onClearFilter && (
                  <Button 
                    variant="outline-secondary" 
                    onClick={onClearFilter}
                    size="sm"
                    className="d-flex align-items-center gap-2"
                  >
                    <IconifyIcon icon="solar:close-circle-bold-duotone" />
                    Clear Filter
                  </Button>
                )}
                <Button 
                  variant="outline-primary" 
                  onClick={() => fetchServiceContracts(filter)}
                  size="sm"
                  className="d-flex align-items-center gap-2"
                >
                  <IconifyIcon icon="ri:refresh-line" />
                  Refresh Data
                </Button> 
              <Button
                variant="primary"
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => router.push('/amc-cmc/create')}
              >
                <IconifyIcon icon="ri:add-line" />
                Add AMC/CMC
              </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Showing {contracts.length} contracts</span>               
              </div>
      {contracts.length === 0 ? (
        <div className="text-center text-muted my-5">
          <IconifyIcon icon="solar:document-text-bold-duotone" className="mb-3" style={{ fontSize: '3rem' }} />
          <h5>{msg}</h5>
          <p>There are no service contracts to display at the moment.</p>          
        </div>
      ) : (
        <div className="table-responsive">
          <Grid
            data={gridData}
            columns={[
              { 
                name: "Asset Name", 
                sort: true, 
                search: true,
                width: '25%'
              },
              { 
                name: "Supplier", 
                sort: true, 
                search: true,
                width: '20%'
              },
              { 
                name: "Type", 
                sort: true, 
                search: true,
                width: '15%'
              },
              { 
                name: "Start Date", 
                sort: true, 
                search: true,
                width: '20%'
              },
              { 
                name: "End Date", 
                sort: true, 
                search: true,
                width: '20%'
              }
            ]}
            pagination={{
              limit: 50
            }}
            sort={true}
            search={true}
            resizable={true}
          />
        </div>
      )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AmcCmsList;
