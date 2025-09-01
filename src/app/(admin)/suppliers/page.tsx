"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { supplierService, ConsumerSupplierWithStats } from "@/services/api/suppliers";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/utils/constants";

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

    // Add click handlers to supplier number, asset count and service request count columns
    useEffect(() => {
        if (!loading && suppliers.length > 0) {
            const addClickHandlers = () => {
                // Add click handlers for Supplier Number column (1st column, index 0)
                const supplierNumberCells = document.querySelectorAll('td:nth-child(1)');
                if (supplierNumberCells.length > 0) {
                    supplierNumberCells.forEach((cell, index) => {
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

                // Add click handlers for Number of Assets column (2nd column, index 1)
                const assetCountCells = document.querySelectorAll('td:nth-child(2)');
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

                // Add click handlers for Number of Open SRs column (3rd column, index 2)
                const srCountCells = document.querySelectorAll('td:nth-child(3)');
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
            };
            // Try immediately
            addClickHandlers();
            // Also try after a delay to ensure GridJS has rendered
            const timeoutId = setTimeout(addClickHandlers, 500);

            // Cleanup timeout
            return () => clearTimeout(timeoutId);
        }
    }, [loading, suppliers, router]);

    // Format date for display
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const gridData = suppliers.map((supplier) => [
        supplier.code,
        supplier.assetCount,
        supplier.openServiceRequestCount,
        formatDate(supplier.registeredFrom),
        supplier.contactName || "",
        supplier.contactPhone || ""
    ]);

    return (
        <>
      

            <ComponentContainerCard title={
                <div className="d-flex justify-content-between align-items-center">
                    <span>Suppliers</span>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/suppliers/create')}
                        className="d-flex align-items-center gap-2"
                        size="sm"
                    >
                        <i className="ri-add-line"></i>
                        Add Supplier
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

                {!loading && !error && suppliers.length === 0 && (
                    <div className="text-center text-muted my-4">No suppliers found.</div>
                )}

                {!loading && !error && suppliers.length > 0 && (
                    <div className="table-responsive">
                        <Grid
                            data={gridData}
                            columns={[
                                { name: "Supplier No", sort: true, search: true, },
                                { name: "Number of Assets", sort: true, search: true },
                                { name: "Number of Open SRs", sort: true, search: true },
                                { name: "Registered From", sort: true, search: true },
                                { name: "Contact Name", sort: true, search: true },
                                { name: "Contact Phone", sort: true, search: true },
                            ]}
                            search={false}
                            pagination={{
                                limit: 10
                            }}
                            sort={true}
                            className={{
                                container: "table table-striped table-hover",
                                table: "table",
                                thead: "table-light",
                                th: "border-0  text-bg-primary bg-gradient",
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
