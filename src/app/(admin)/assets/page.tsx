"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { assetsService } from "@/services/api/assets";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter, useSearchParams } from "next/navigation";

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
  status?: string;
  // Nested data as per API payload
  supplier?: { name?: string };
  assetType?: { assetName?: string };
  assetSubType?: { name?: string };
  department?: { deptName?: string };
  [key: string]: any;
}

export default function AssetListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Get filter parameters from URL
  const consumerId = searchParams.get('cid');
  const supplierId = searchParams.get('sid');
  const departmentId = searchParams.get('did');
  const groupstatus = searchParams.get('groupstatus');
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError("");
      try {
        // Build query parameters object
        const queryParams: { consumerId?: string; supplierId?: string; departmentId?: string ;groupstatus?: string} = {};
        if (consumerId) {
          queryParams.consumerId = consumerId;
        }else{
          queryParams.consumerId = localStorage.getItem('consumer_id') || '';
        }
        if (supplierId) {
          queryParams.supplierId = supplierId;
        }
        if (departmentId) {
          queryParams.departmentId = departmentId;
        }
        if (groupstatus) {
          queryParams.groupstatus = groupstatus;
        }
        const data = await assetsService.getAssets(queryParams);
        const allAssets = Array.isArray(data) ? data : [];       
        setAssets(allAssets);
        setFilteredAssets(allAssets); // API already returns filtered results
      } catch (err) {
        setError("Failed to load assets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [consumerId, supplierId, departmentId, groupstatus]);

  // Add click handlers to asset names after grid is rendered
  useEffect(() => {
    if (!loading && filteredAssets.length > 0) {
      const addClickHandlers = () => {
        const assetNameCells = document.querySelectorAll('td:first-child');
        if (assetNameCells.length > 0) {
          assetNameCells.forEach((cell, index) => {
            if (index < filteredAssets.length) {
              const asset = filteredAssets[index];
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
  }, [loading, filteredAssets, router]);

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

  // Get asset status display name based on status code
  const getAssetStatusDisplay = (statusCode: string): string => {
    if (!statusCode) return "N/A";    
    switch (statusCode) {
      case 'active':
        return 'Active';
      case 'installation_pending':
        return 'Installation Pending';
      case 'installed':
        return 'Installed';
      case 'received':        
        return 'Received';
      case 'retired':
        return 'Retired';
      default:
        return statusCode.charAt(0).toUpperCase() + statusCode.slice(1).replace('_', ' ');
    }
  };

  // Get asset status badge class
  const getAssetStatusBadgeClass = (statusCode: string): string => {
    if (!statusCode || statusCode === 'null') return 'bg-warning';
    
    switch (statusCode) {
      case 'active':
        return 'bg-success';
      case 'installation_pending':
      case 'installed':
      case 'received':
        return 'bg-primary';
      case 'retired':
        return 'bg-secondary';
      default:
        return 'bg-warning';
    }
  };

  // Prepare data for GridJS (in requested column order)
  const gridData = filteredAssets.map((asset) => {
    console.log('Asset status for grid:', asset.assetName, '->', asset.status); // Debug: Check each asset status
    return [
      asset.assetName || "",
      asset.assetType?.assetName || "",
      asset.assetSubType?.name || "",
      asset.department?.deptName || asset.departmentName || "",
      [asset.brand, asset.model].filter(Boolean).join(" - ") || "",
      asset.supplier?.name || "",
      asset.status || "", // Asset Status
      getWarrantyStatus(asset.warrantyStartDate, asset.warrantyEndDate)
    ];
  });

  return (
    <>

      
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
        
        {!loading && !error && filteredAssets.length === 0 && (
          <div className="text-center text-muted my-4">No assets found.</div>
        )}
        
        {!loading && !error && filteredAssets.length > 0 && (
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
                  name: "Status", 
                  sort: false, 
                  search: true,
                  formatter: (cell: any) => {                   
                    const statusCode = cell;   
                    if (!statusCode || statusCode === 'null' || statusCode === '') {
                      return 'N/A';
                    }
                    const displayName = getAssetStatusDisplay(statusCode);
                    return displayName;
                  }
                },
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
