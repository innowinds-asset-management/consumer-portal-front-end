"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Card, CardBody, CardHeader, Col, Row, Spinner, Badge } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { warrantyService, Warranty } from "@/services/api/warranty";
import { WarrantyFilter } from "../page";
import { FILTER_TYPES } from "@/utils/constants"; 

interface WarrantyListProps {
  filter?: WarrantyFilter;
  onClearFilter?: () => void;
}

const WarrantyList: React.FC<WarrantyListProps> = ({ filter, onClearFilter }) => {
  const router = useRouter(); 
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  // Fetch warranty data from API with optional filtering
  const fetchWarranties = async (currentFilter?: WarrantyFilter) => {
    try {
      setLoading(true);
      setError("");
      
      // Convert filter to backend format
      const backendFilter = currentFilter && currentFilter.type && currentFilter.days ? {
        type: currentFilter.type,
        days: currentFilter.days
      } : undefined;
      
      const data = await warrantyService.getWarranties(backendFilter);
      setMsg(data.msg);
      setWarranties(data.payload);
    } catch (err) {
      console.error('Error fetching warranties:', err);
      setError("Failed to load warranties. Please try again.");
      setWarranties([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch when filter changes
  useEffect(() => {
    fetchWarranties(filter);
  }, [filter]);

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string | null) => {
    if (!status) return "secondary";
    
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'installed':
        return 'primary';
      case 'received':
        return 'info';
      case 'installation_pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Get coverage type badge variant
  const getCoverageBadgeVariant = (coverageType: string | null) => {
    if (!coverageType) return "secondary";    
    switch (coverageType.toLowerCase()) {
      case 'comprehensive':
        return 'success';
      case 'parts_labor':
        return 'primary';
      case 'parts':
        return 'info';
      case 'labor':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Calculate warranty status
  const getWarrantyStatus = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const daysUntilExpiry = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'Expired', variant: 'danger' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'Expiring Soon', variant: 'warning' };
    } else if (daysUntilExpiry <= 90) {
      return { status: 'Expiring', variant: 'info' };
    } else {
      return { status: 'Active', variant: 'success' };
    }
  };

  // Prepare data for GridJS - only plain data, no React components
  const gridData = warranties.map((warranty) => {
    const warrantyStatus = getWarrantyStatus(warranty.endDate);
    
    return [
      warranty.asset.assetName || "-",
      warranty.warrantyType.typeName || "-",
      warranty.warrantyNumber || "-",
      formatDate(warranty.startDate),
      formatDate(warranty.endDate),
      warranty.warrantyPeriod ? `${warranty.warrantyPeriod} months` : "-",
      warrantyStatus.status
    ];
  });

  // Get filter description for display
  const getFilterDescription = (filter: WarrantyFilter | undefined): string => {
    if (!filter || !filter.type || !filter.days) {
      return "";
    }
    
    const typeText = filter.type === FILTER_TYPES.expiring   ? FILTER_TYPES.typeText.expiring : FILTER_TYPES.typeText.expired;
    const daysText = filter.days === 1 ? FILTER_TYPES.daysText.days : `${filter.days} ${FILTER_TYPES.daysText.days}`;
    
    return `${typeText} within ${daysText}`;
  };



  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading warranty data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        <Alert.Heading>Error Loading Warranties</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={() => fetchWarranties(filter)}>
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
                <h4 className="header-title">Warranty List</h4>
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
                  onClick={() => fetchWarranties(filter)}
                  size="sm"
                  className="d-flex align-items-center gap-2"
                >
                  <IconifyIcon icon="ri:refresh-line" />
                  Refresh
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
                <span className="text-muted">
                  Showing {warranties.length} warranties
                  {filter && filter.type && filter.days && (
                    <span className="text-primary ms-2">
                      (filtered by backend)
                    </span>
                  )}
                </span>
              </div>
      {warranties.length === 0 ? (
        <div className="text-center text-muted my-5">
          <IconifyIcon icon="solar:shield-check-bold-duotone" className="mb-3" style={{ fontSize: '3rem' }} />
          {filter && filter.type && filter.days ? (
            <>
              <h5>No warranties found</h5>
              <p>No warranties match the current filter: {getFilterDescription(filter)}</p>
              {onClearFilter && (
                <Button variant="outline-primary" onClick={onClearFilter} className="mt-2">
                  <IconifyIcon icon="solar:close-circle-bold-duotone" className="me-2" />
                  Clear Filter
                </Button>
              )}
            </>
          ) : (
            <>
              <h5>{msg}</h5>
              <p>There are no warranties to display at the moment.</p>
            </>
          )}
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
                width: '15%'
              },
              { 
                name: "Warranty Type", 
                sort: true, 
                search: true,
                width: '12%'
              },
              { 
                name: "Warranty Number", 
                sort: true, 
                search: true,
                width: '12%'
              },
              { 
                name: "Start Date", 
                sort: true, 
                search: true,
                width: '10%'
              },
              { 
                name: "End Date", 
                sort: true, 
                search: true,
                width: '10%'
              },
              { 
                name: "Period", 
                sort: true, 
                search: true,
                width: '8%'
              },

              { 
                name: "Warranty Status", 
                sort: true, 
                search: true,
                width: '10%',
                formatter: (cell: any) => {
                  const status = cell;
                  if (!status || status === '-') return '-';
                  return status;
                }
              },

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

export default WarrantyList;
