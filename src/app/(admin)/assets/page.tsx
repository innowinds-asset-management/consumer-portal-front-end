"use client";

import React, { useEffect, useState, useRef } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { assetsService } from "@/services/api/assets";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";

interface Asset {
  id: string;
  assetName: string;
  assetTypeId: string;
  assetSubTypeId: string;
  brand: string;
  model: string;
  subModel: string;
  installationDate: string;
  warrantyPeriod: number;
  warrantyStartDate: string;
  warrantyEndDate: string;
  buildingNumber?: string;
  departmentName?: string;
  floorNumber?: string;
  roomNumber?: string;
  isActive: boolean;
  // Nested data as per API payload
  supplier?: { name?: string };
  assetType?: { assetName?: string };
  assetSubType?: { name?: string };
  department?: { deptName?: string };
  [key: string]: any;
}

export default function AssetListingPage() {
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await assetsService.getAssets();
        setAssets(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load assets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Add click handlers to asset names after grid is rendered
  useEffect(() => {
    if (!loading && assets.length > 0) {
      const addClickHandlers = () => {
        const assetNameCells = document.querySelectorAll('td:first-child');
        if (assetNameCells.length > 0) {
          assetNameCells.forEach((cell, index) => {
            if (index < assets.length) {
              const asset = assets[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/assets/detail?aid=${asset.id}`);
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
  }, [loading, assets, router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Compute warranty status from dates
  const getWarrantyStatus = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate) return "";
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return "Not Started";
    if (now > end) return "Expired";
    return "Active";
  };

  // Prepare data for GridJS (in requested column order)
  const gridData = assets.map((asset) => [
    asset.assetName || "",
    asset.assetType?.assetName || "",
    asset.assetSubType?.name || "",
    asset.department?.deptName || asset.departmentName || "",
    [asset.brand, asset.model].filter(Boolean).join(" - ") || "",
    asset.supplier?.name || "",
    getWarrantyStatus(asset.warrantyStartDate, asset.warrantyEndDate)
  ]);

  return (
    <>
      <PageTitle title="" />
      
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Assets</span>
          <Button 
            variant="primary" 
            onClick={() => router.push('/assets/create')}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="ri-add-line"></i>
            Add Asset
          </Button>
        </div>
      } description="">
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {!loading && !error && assets.length === 0 && (
          <div className="text-center text-muted my-4">No assets found.</div>
        )}
        
        {!loading && !error && assets.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "Asset Name", sort: false, search: true },
                { name: "Asset Type", sort: false, search: true },
                { name: "Asset Sub Type", sort: false, search: true },
                { name: "Department", sort: false, search: true },
                { name: "Model", sort: false, search: true },
                { name: "Supplier", sort: false, search: true },
                { 
                  name: "Warranty Status", 
                  sort: false, 
                  search: true,
                  formatter: (cell: any) => {
                    const status = cell as string;
                    let badgeClass = 'bg-secondary';
                    if (status === 'Active') badgeClass = 'bg-success';
                    else if (status === 'Expired') badgeClass = 'bg-danger';
                    else if (status === 'Not Started') badgeClass = 'bg-warning';
                    return { html: `<span class="badge ${badgeClass}">${status || ''}</span>` };
                  }
                }
              ]}
              // search={true}
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
}
