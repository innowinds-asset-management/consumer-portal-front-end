"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Alert } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";

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


