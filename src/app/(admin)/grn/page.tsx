"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { grnService, Grn } from "@/services/api/grn";

export default function GrnListingPage() {
  const router = useRouter();
  const [grns, setGrns] = useState<Grn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGrns = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await grnService.getGrns();
        setGrns(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load GRNs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrns();
  }, []);

  // Add click handlers to first column after grid is rendered
  useEffect(() => {
    if (!loading && grns.length > 0) {
      const addClickHandlers = () => {
        const firstColCells = document.querySelectorAll('td:first-child');
        if (firstColCells.length > 0) {
          firstColCells.forEach((cell, index) => {
            if (index < grns.length) {
              const row = grns[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              // Placeholder for potential detail route
              // cell.addEventListener('click', () => router.push(`/grn/detail?id=${row.id}`));
            }
          });
        }
      };
      addClickHandlers();
      const timeoutId = setTimeout(addClickHandlers, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, grns, router]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const gridData = grns.map((g) => [
    g.grnNo || g.id || "",
    g.po?.poNumber || g.poId || "",
    g.challan || "",
    g.po?.status || "",
    g.po?.totalAmount || "",
    formatDate(g.createdAt),
  ]);

  return (
    <>
      <PageTitle title="" />
      
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Goods Receipt Notes</span>
          <Button 
            variant="primary" 
            onClick={() => router.push('/grn/create')}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="ri-add-line"></i>
            Create GRN
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
        
        {!loading && !error && grns.length === 0 && (
          <div className="text-center text-muted my-4">No GRNs found.</div>
        )}
        
        {!loading && !error && grns.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "GRN Number", sort: false, search: true },
                { name: "PO Number", sort: false, search: true },
                { name: "Challan", sort: false, search: true },
                { name: "PO Status", sort: true, search: true },
                { name: "PO Total Amount (₹)", sort: true, search: true },
                { name: "Created Date", sort: true, search: true },
              ]}
              pagination={{ limit: 10 }}
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
              style={{ table: { width: "100%" } }}
            />
          </div>
        )}
      </ComponentContainerCard>
    </>
  );
}
