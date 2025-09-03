"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Alert, Button } from "react-bootstrap";

import { assetsService } from "@/services/api/assets";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter, useSearchParams } from "next/navigation";
import { STORAGE_KEYS } from "@/utils/constants";
import { Col, Row } from 'react-bootstrap'
import {  Card, CardBody, CardHeader } from "react-bootstrap";
import ChoicesFormInput from "@/components/form/ChoicesFormInput";
import Select from 'react-select'
import { options } from '@/components/form/data'
// import MultipleSelect from "@/components/form/MultipleSelect";

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
  assetStatus?: { statusCode?: string, displayName?: string };
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
    const fetchAssets = async (retryCount = 0) => {
      setLoading(true);
      setError("");
      try {
        // Build query parameters object
        const queryParams: { supplierId?: string; departmentId?: string ;groupstatus?: string} = {};
      
        if (supplierId) {
          queryParams.supplierId = supplierId;
        }
        if (departmentId) {
          queryParams.departmentId = departmentId;
        }
        if (groupstatus) {
          queryParams.groupstatus = groupstatus;
        }
        
        console.log('Fetching assets with params:', queryParams);
        const data = await assetsService.getAssets(queryParams);
        const allAssets = Array.isArray(data) ? data : []; 
        // console.log('allAssets========>',allAssets);      
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

        // Add click handlers for Department column (4th column, index 3)
        const departmentCells = document.querySelectorAll('td:nth-child(3)');
        if (departmentCells.length > 0) {
          departmentCells.forEach((cell, index) => {
            if (index < filteredAssets.length) {
              const asset = filteredAssets[index];
              const deptId = (asset as any).departmentId || (asset.department as any)?.deptId;
              if (deptId) {
                (cell as HTMLElement).style.cursor = 'pointer';
                (cell as HTMLElement).style.color = '#0d6efd';
                (cell as HTMLElement).style.textDecoration = 'underline';
                cell.addEventListener('click', () => {
                  router.push(`/departments/detail?did=${deptId}`);
                });
              }
            }
          });
        }

        // Add click handlers for Supplier column (5th column, index 4)
        const supplierCells = document.querySelectorAll('td:nth-child(4)');
        if (supplierCells.length > 0) {
          supplierCells.forEach((cell, index) => {
            if (index < filteredAssets.length) {
              const asset = filteredAssets[index];
              const supplierId = (asset as any).supplierId || (asset.supplier as any)?.id;
              if (supplierId) {
                (cell as HTMLElement).style.cursor = 'pointer';
                (cell as HTMLElement).style.color = '#0d6efd';
                (cell as HTMLElement).style.textDecoration = 'underline';
                cell.addEventListener('click', () => {
                  router.push(`/suppliers/detail?sid=${supplierId}`);
                });
              }
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


  // Compute warranty status from warranties array
  const getWarrantyStatus = (warranties: any[]): string => {
    if (!warranties || warranties.length === 0) return "N/A";
    
    // Get current date in YYYY-MM-DD format for comparison
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Format: "2025-01-XX"
    
    // Check each warranty in the array
    for (const warranty of warranties) {
      if (warranty.startDate && warranty.endDate) {
        // Parse warranty dates and convert to YYYY-MM-DD format
        const startDate = warranty.startDate.split('T')[0]; // Format: "2025-09-30"
        const endDate = warranty.endDate.split('T')[0];   // Format: "2026-09-30"
        
        // Simple string comparison (YYYY-MM-DD format allows this)
        if (today >= startDate && today <= endDate) {
          return "Active";
        }
      }
    }
    
    // If no active warranty found, check if any warranty has expired
    for (const warranty of warranties) {
      if (warranty.startDate && warranty.endDate) {
        const endDate = warranty.endDate.split('T')[0];
        if (today > endDate) {
          return "Expired";
        }
      }
    }
    
    // If no warranty has started yet
    for (const warranty of warranties) {
      if (warranty.startDate) {
        const startDate = warranty.startDate.split('T')[0];
        if (today < startDate) {
          return "Not Started";
        }
      }
    }
    
    return "N/A";
  };

 

  // Prepare data for GridJS (in requested column order)
  const gridData = filteredAssets.map((asset) => {
    const warrantyStatus = getWarrantyStatus(asset.warranties || []);
    return [
      asset.assetName || "",
      [asset.brand, asset.model].filter(Boolean).join(" - ") || "",
      // asset.assetType?.assetName || "",
      // asset.assetSubType?.name || "",
      asset.department?.deptName || asset.departmentName || "",
     
      asset.supplier?.name || "",
      asset.assetStatus?.displayName || "", // Asset Status
      warrantyStatus
    ];
  });

  return (
    <>
 <Row>
        <Col xs={12}>
        <Card>
      <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
        <div className="flex-grow-1">
          <h4 className="header-title">Assets</h4>
        </div>
        <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
          {/* <div className="flex-shrink-0 d-flex align-items-center gap-2">
            <div className="position-relative">
              <input type="text" className="form-control ps-4" placeholder="Search Here..." />
              <IconifyIcon icon="ti:search" className="ti position-absolute top-50 translate-middle-y start-0 ms-2" />
            </div>
          </div> */}
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
      </CardHeader>
      </Card>
        </Col>
      </Row>  




      
      <Row>
        <Col lg={12}>
          
        <Card>
        <CardBody>
        {/* Filter Section - Hidden
        <Row>
        <Col xs={12}>
        <CardHeader >
        <Accordion >
          <AccordionItem eventKey="0">
            <AccordionHeader >
              <strong>Filters</strong>
            </AccordionHeader>
            <AccordionBody>
            <Row>
            <Col sm={4}>
            <label htmlFor="example-input-small1" className="form-label">Serial No</label>
          <input type="text" id="example-input-small1" name="example-input-small" className="form-control form-control-sm" placeholder=".input-sm" />
        </Col>
        <Col sm={4}>
            <label htmlFor="example-input-small2" className="form-label">Supplier</label>
          <input type="text" id="example-input-small2" name="example-input-small" className="form-control form-control-sm" placeholder=".input-sm" />
        </Col>
        <Col sm={4}>
            <label htmlFor="example-input-small3" className="form-label ">Department</label>
           
            <ChoicesFormInput
                        options={{ removeItemButton: true, maxItemCount: 3 }}
                        allowInput
                        className="form-control"
                        data-choices
                        data-choices-limit={3}
                        data-choices-removeitem
                        defaultValue="Task-1"
                      />
            
                    
                      </Col>
          </Row>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
        </CardHeader>
        </Col>
        </Row>
        */}
            
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
          
            <Grid
              data={gridData}
              columns={[
                { name: "Asset Name", sort: false, search: true },
                { name: "Model", sort: false, search: true },
                // { name: "Asset Type", sort: false, search: true },
                // { name: "Asset Sub Type", sort: false, search: true },
                { name: "Department", sort: false, search: true },
               
                { name: "Supplier", sort: false, search: true },
                { 
                  name: "Status", 
                  sort: false, 
                  search: true
                },
                { 
                  name: "Warranty Status", 
                  sort: false, 
                  search: true,
                  formatter: (cell: any) => {
                    const status = cell as string;
                    return status || 'N/A';
                  }
                }
              ]}
              search={true}

              pagination={{
                limit: 100
              }}
              sort={true}
              resizable={true}
              

              
            />
         

        )}
      </CardBody>
    </Card>
 
      
      </Col>
      </Row>
    </>
  );
}
