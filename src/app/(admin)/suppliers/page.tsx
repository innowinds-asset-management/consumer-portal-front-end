"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { supplierService, ConsumerSupplierWithStats } from "@/services/api/suppliers";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/utils/constants";
import CreateSupplierModal from "@/components/CreateSupplierModal";
import { Col, Row } from 'react-bootstrap'
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Link from "next/link";
import { formatDate } from "@/utils/date";

interface SupplierListItem {
    id: string;
    code: string;
    name: string;
    contactName?: string;
    contactPhone?: string;
    assetCount: number;
    openServiceRequestCount: number;
    registeredFrom: string;
}

export default function SupplierListingPage() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<SupplierListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const isAppProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await supplierService.getSuppliersOfConsumerWithStats();
                const mapped: SupplierListItem[] = Array.isArray(data)
                    ? data.map((record: ConsumerSupplierWithStats) => ({
                        id: record.supplier.id,
                        code: record.supplier.code,
                        name: record.supplier.name,
                        contactName: record.supplier.primaryContactName || '', // Using name as contact name for demo
                        contactPhone: record.supplier.primaryContactPhone || '',
                        assetCount: record.assetCount,
                        openServiceRequestCount: record.openServiceRequestCount,
                        registeredFrom: record.registeredFrom,
                    }))
                    : [];
                setSuppliers(mapped);
            } catch (err) {
                setError("Failed to load suppliers. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    // Add click handlers to supplier names after grid is rendered
    useEffect(() => {
        if (!loading && suppliers.length > 0) {
            const addClickHandlers = () => {
                const supplierNameCells = document.querySelectorAll('td:nth-child(1)');
                if (supplierNameCells.length > 0) {
                    supplierNameCells.forEach((cell, index) => {
                        if (index < suppliers.length) {
                            const supplier = suppliers[index];
                            (cell as HTMLElement).style.cursor = 'pointer';
                            (cell as HTMLElement).style.color = '#0d6efd';
                            (cell as HTMLElement).style.textDecoration = 'underline';
                            cell.addEventListener('click', () => {
                                router.push(`/suppliers/detail?sid=${supplier.id}`);
                            });
                        }
                    });
                }

                // Add click handlers for Number of Assets column (3rd column, index 2)
                const assetCountCells = document.querySelectorAll('td:nth-child(3)');
                if (assetCountCells.length > 0) {
                    assetCountCells.forEach((cell, index) => {
                        if (index < suppliers.length) {
                            const supplier = suppliers[index];
                            (cell as HTMLElement).style.cursor = 'pointer';
                            (cell as HTMLElement).style.color = '#0d6efd';
                            (cell as HTMLElement).style.textDecoration = 'underline';
                            cell.addEventListener('click', () => {
                                router.push(`/assets?sid=${supplier.id}`);
                            });
                        }
                    });
                }

                // Add click handlers for Number of Open SRs column
                if (!isAppProduction) {
                    // In non-production, Open SRs is the 4th column (index 3)
                    const srCountCells = document.querySelectorAll('td:nth-child(4)');
                    if (srCountCells.length > 0) {
                        srCountCells.forEach((cell, index) => {
                            if (index < suppliers.length) {
                                const supplier = suppliers[index];
                                (cell as HTMLElement).style.cursor = 'pointer';
                                (cell as HTMLElement).style.color = '#0d6efd';
                                (cell as HTMLElement).style.textDecoration = 'underline';
                                cell.addEventListener('click', () => {
                                    router.push(`/servicerequests?status=OP&sid=${supplier.id}`);
                                });
                            }
                        });
                    }
                }
            };
            
            // Try immediately
            addClickHandlers();
            // Also try after a delay to ensure GridJS has rendered
            const timeoutId = setTimeout(addClickHandlers, 500);

            // Cleanup timeout
            return () => clearTimeout(timeoutId);
        }
    }, [loading, suppliers, router, isAppProduction]);


    // Function to refresh suppliers list
    const refreshSuppliers = () => {
        const fetchSuppliers = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await supplierService.getSuppliersOfConsumerWithStats();
                const mapped: SupplierListItem[] = Array.isArray(data)
                    ? data.map((record: ConsumerSupplierWithStats) => ({
                        id: record.supplier.id,
                        code: record.supplier.code,
                        name: record.supplier.name,
                        contactName: record.supplier.primaryContactName || '', // Using name as contact name for demo
                        contactPhone: record.supplier.primaryContactPhone || '',
                        assetCount: record.assetCount,
                        openServiceRequestCount: record.openServiceRequestCount,
                        registeredFrom: record.registeredFrom,
                    }))
                    : [];
                setSuppliers(mapped);
            } catch (err) {
                setError("Failed to load suppliers. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    };

    // Prepare data for GridJS
    const gridData = suppliers.map((supplier) => {
        const baseData = [
            supplier.id || "",
            supplier.name || "",
            supplier.assetCount || 0,
        ];
        
        if (!isAppProduction) {
            baseData.push(supplier.openServiceRequestCount || 0);
        }
        
        // baseData.push(formatDate(supplier.registeredFrom));
        return baseData;
    });

    return (
        <>
        <Row>
            <Col xs={12}>
            <Card>
          <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
            <div className="flex-grow-1">
              <h4 className="header-title">Suppliers</h4>
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
                onClick={() => setShowCreateModal(true)}
                className="d-flex align-items-center gap-2"
                size="sm"
              >
                    <IconifyIcon icon="tabler:plus" className="fs-16" />
                    Add Supplier
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
            {loading && (
                  <div className="text-center my-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
            
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {!loading && !error && suppliers.length === 0 && (
                  <div className="text-center text-muted my-4">No suppliers found.</div>
                )}
            {/* <CardTitle as={'h4'} className="mb-3 anchor" id="general"></CardTitle> */}
            {!loading && !error && suppliers.length > 0 && (
            <Grid
                          data={gridData}
                          columns={[
                            { name: "Supplier ID", sort: false, search: true },
                            { name: "Supplier Name", sort: false, search: true },
                            { name: "Number of Assets", sort: true, search: true },
                            ...(isAppProduction ? [] : [{ name: "Number of Open SRs", sort: true, search: true }]),
                            // { name: "Created Date", sort: true, search: true }
                          ]}
                          pagination={{
                            limit: 100
                          }}
                          sort={true}
                          search={true}
                          resizable={true}
                          // height ="300px"
                        />
            
                      )}
            </CardBody>
          </Card>
       
            
            </Col>
            </Row>
            {/* Create Supplier Modal */}
            <CreateSupplierModal
              show={showCreateModal}
              onHide={() => setShowCreateModal(false)}
              onSuccess={refreshSuppliers}
              existingSuppliers={suppliers.map(s => ({ name: s.name }))}
            />
          </>
    );
}
