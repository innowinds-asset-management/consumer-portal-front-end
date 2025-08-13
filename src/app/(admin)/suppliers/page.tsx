"use client";

import React, { useEffect, useState, useRef } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { supplierService, ConsumerSupplierWithStats } from "@/services/api/suppliers";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";

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

    // Get consumerId from localStorage
    const [consumerId, setConsumerId] = useState<string>("");

    useEffect(() => {
        const storedConsumerId = localStorage.getItem('consumer_id');
        if (storedConsumerId) {
            try {
                // Decode URL-encoded string and parse JSON if needed
                const decodedConsumerId = decodeURIComponent(storedConsumerId);
                // Remove quotes if it's a JSON string
                const cleanConsumerId = decodedConsumerId.replace(/^"|"$/g, '');
                setConsumerId(cleanConsumerId);
            } catch (error) {
                console.error('Error parsing consumer ID:', error);
                setError("Invalid Consumer ID format. Please log in again.");
            }
        } else {
            setError("Consumer ID not found. Please log in again.");
        }
    }, []);

    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!consumerId) return; // Don't fetch if consumerId is not available

            setLoading(true);
            setError("");
            try {
                const data = await supplierService.getSuppliersOfConsumerWithStats(consumerId);
                const mapped: SupplierListItem[] = Array.isArray(data)
                    ? data.map((record: ConsumerSupplierWithStats) => ({
                        id: record.supplier.id,
                        code: record.supplier.code,
                        name: record.supplier.name,
                        contactName: record.supplier.name, // Using name as contact name for demo
                        contactPhone: record.supplier.phone || "N/A",
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
    }, [consumerId]);

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
        supplier.contactName || "N/A",
        supplier.contactPhone || "N/A"
    ]);

    return (
        <>
            <PageTitle title="" />

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
                                { name: "Supplier No", sort: true, search: true },
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
