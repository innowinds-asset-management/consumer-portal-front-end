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
                router.push(`/assets/detail?id=${asset.id}`);
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

  // Prepare data for GridJS
  const gridData = assets.map((asset) => [
    asset.assetName || "",
    asset.brand || "",
    asset.model || "",
    asset.subModel || "",
    formatDate(asset.installationDate),
    asset.warrantyPeriod || 0,
    formatDate(asset.warrantyStartDate),
    formatDate(asset.warrantyEndDate),
    asset.buildingNumber || "",
    asset.departmentName || "",
    asset.floorNumber || "",
    asset.roomNumber || "",
    asset.isActive // Pass boolean value instead of HTML string
  ]);

  return (
    <>
      <PageTitle title="Asset Listing" />
      
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Asset Management</span>
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
      } description="View and manage all assets">
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
                { name: "Asset Name", sort: true, search: true },
                { name: "Brand", sort: true, search: true },
                { name: "Model", sort: true, search: true },
                { name: "Sub-Model", sort: true, search: true },
                { name: "Installation Date", sort: true, search: true },
                { name: "Warranty Period", sort: true, search: true },
                { name: "Warranty Start", sort: true, search: true },
                { name: "Warranty End", sort: true, search: true },
                { name: "Building", sort: true, search: true },
                { name: "Department", sort: true, search: true },
                { name: "Floor", sort: true, search: true },
                { name: "Room", sort: true, search: true },
                { 
                  name: "Status", 
                  sort: true, 
                  search: true,
                  formatter: (cell: any) => {
                    const isActive = cell;
                    return {
                      html: isActive ? 
                        '<span class="badge bg-success">Active</span>' : 
                        '<span class="badge bg-secondary">Inactive</span>'
                    };
                  }
                }
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
}
