"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert, Card, CardBody, Col, Row } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const WarrantyListingPage = () => {
  const router = useRouter();
  const [warranties, setWarranties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Dummy data for demonstration. Replace with API call in production.
  const dummyWarranties = [
    {
      id: 1,
      assetName: "Air Conditioner",
      warrantyType: "Manufacturer",
      warrantySupplierName: "CoolTech Ltd.",
      warrantyNumber: "WTY-AC-2023-001",
      warrantyStartDate: "2023-01-15T00:00:00Z",
      warrantyEndDate: "2026-01-15T00:00:00Z",
      warrantyPeriod: "3 Years",
      coverType: "Full",
      cost: 1200,
      supplierName: "CoolTech Ltd.",
    },
    {
      id: 2,
      assetName: "Generator",
      warrantyType: "Extended",
      warrantySupplierName: "PowerGen Services",
      warrantyNumber: "WTY-GEN-2022-045",
      warrantyStartDate: "2022-06-01T00:00:00Z",
      warrantyEndDate: "2025-06-01T00:00:00Z",
      warrantyPeriod: "3 Years",
      coverType: "Parts Only",
      cost: 800,
      supplierName: "PowerGen Services",
    },
    // Add more dummy data as needed
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWarranties(dummyWarranties);
      setLoading(false);
    }, 500);
  }, []);

  // Add click handlers to first column (Asset Name)
  useEffect(() => {
    if (!loading && warranties.length > 0) {
      const addClickHandlers = () => {
        const assetNameCells = document.querySelectorAll('td:first-child');
        if (assetNameCells.length > 0) {
          assetNameCells.forEach((cell, index) => {
            if (index < warranties.length) {
              const warranty = warranties[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/warranty/detail?id=${warranty.id}`);
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
  }, [loading, warranties, router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Prepare data for GridJS
  const gridData = warranties.map((warranty) => [
    warranty.assetName || "",
    warranty.warrantyType || "",
    warranty.warrantySupplierName || "",
    warranty.warrantyNumber || "",
    formatDate(warranty.warrantyStartDate),
    formatDate(warranty.warrantyEndDate),
    warranty.warrantyPeriod || "",
    warranty.coverType || "",
    warranty.cost !== undefined ? warranty.cost : "",
    warranty.supplierName || "",
  ]);

  return (
    <>
      <PageTitle title="Warranty Listing" />
      
      {/* Six Stat Boxes - Two Rows */}
      <Row className="row-cols-3 row-cols-md-3 row-cols-sm-2 row-cols-1 mb-4">
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Total Warranties">
                    Expiring Soon
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">10</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      12.5%
                    </span>
                    <span className="text-nowrap">In coming 5 days</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-success-subtle text-success rounded fs-28">
                    <IconifyIcon icon="solar:shield-check-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Active Warranties">
                  Expiring Soon
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">12</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      8.3%
                    </span>
                    <span className="text-nowrap">In coming 10 days</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-info-subtle text-info rounded fs-28">
                    <IconifyIcon icon="solar:check-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Expiring Soon">
                    Expiring Soon
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">8</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-warning me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      2.1%
                    </span>
                    <span className="text-nowrap">Next 30 days</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-warning-subtle text-warning rounded fs-28">
                    <IconifyIcon icon="solar:calendar-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Total Cost">
                    Expired 
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">10</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-success me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      15.7%
                    </span>
                    <span className="text-nowrap">Since last 5 days</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-primary-subtle text-primary rounded fs-28">
                    <IconifyIcon icon="solar:wallet-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Expired Warranties">
                    Expired 
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">14</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-danger me-1">
                      <IconifyIcon icon="ri:arrow-down-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      3.2%
                    </span>
                    <span className="text-nowrap">Since last 10 days</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-danger-subtle text-danger rounded fs-28">
                    <IconifyIcon icon="solar:close-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 className="text-muted fs-13 fw-bold text-uppercase" title="Average Duration">
                    Expired 
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">120</h3>
                  <p className="mb-0 text-muted">
                    <span className="text-info me-1">
                      <IconifyIcon icon="ri:arrow-up-line" style={{ marginBottom: '5px', marginRight: '5px' }} />
                      0.3y
                    </span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className="avatar-title bg-secondary-subtle text-secondary rounded fs-28">
                    <IconifyIcon icon="solar:clock-circle-bold-duotone" />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Warranty Management</span>
          <Button 
            variant="primary" 
            onClick={() => router.push('/warranty/create')}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="ri-add-line"></i>
            Add Warranty
          </Button>
        </div>
      } description="View and manage all warranties">
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {!loading && !error && warranties.length === 0 && (
          <div className="text-center text-muted my-4">No warranties found.</div>
        )}
        
        {!loading && !error && warranties.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "Asset Name", sort: true, search: true },
                { name: "Warranty Type", sort: true, search: true },
                { name: "Warranty Supplier", sort: true, search: true },
                { name: "Warranty Number", sort: true, search: true },
                { name: "Start Date", sort: true, search: true },
                { name: "End Date", sort: true, search: true },
                { name: "Period", sort: true, search: true },
                { name: "Cover Type", sort: true, search: true },
                { name: "Cost", sort: true, search: true },
                { name: "Supplier Name", sort: true, search: true },
              ]}
              search={true}
              pagination={{
                limit: 10
              }}
              sort={true}
              className={{
                container: "table table-striped table-hover",
                table: "table",
                thead: "table-light",
                th: "border-0",
                td: "border-0",
                search: "form-control",
                pagination: "pagination pagination-sm"
              }}
              style={{
                table: {
                  width: "100%"
                }
              }}
            />
          </div>
        )}
      </ComponentContainerCard>
    </>
  );
};

export default WarrantyListingPage;


