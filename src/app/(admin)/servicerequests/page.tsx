"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { serviceRequestService } from "@/services/api/serviceRequest";

interface ServiceRequestListItem {
  srNo: string;
  serviceDate: string;
  assetId: string;
  technicianName: string;
  supplier: string;
  warrantyStatus: string;
  status: string;
  type: string;
  description: string;
  createdAt?: string;
}

export default function ServiceRequestListingPage() {
  const router = useRouter();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchServiceRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const data = (await serviceRequestService.getServiceRequests()) as unknown as any[];
        const mapped: ServiceRequestListItem[] = Array.isArray(data)
          ? data.map((record: any) => ({
              srNo: record.srNo || record.serviceRequestId || String(record.id || ""),
              serviceDate: record.serviceDate || "",
              assetId: record.assetId || "",
              technicianName: record.technicianName || "",
              supplier: record.serviceSupplierName || record.serviceSupplierId || "",
              warrantyStatus: record.warrantyStatus || "",
              status: record.serviceStatus || record.srStatus || "",
              type: record.serviceType || "",
              description: record.serviceDescription || "",
              createdAt: record.createdAt || undefined,
            }))
          : [];
        setServiceRequests(mapped);
      } catch (err) {
        setError("Failed to load service requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  useEffect(() => {
    if (!loading && serviceRequests.length > 0) {
      const addClickHandlers = () => {
        const firstColCells = document.querySelectorAll("td:first-child");
        if (firstColCells.length > 0) {
          firstColCells.forEach((cell, index) => {
            if (index < serviceRequests.length) {
              const item = serviceRequests[index];
              (cell as HTMLElement).style.cursor = "pointer";
              (cell as HTMLElement).style.color = "#0d6efd";
              (cell as HTMLElement).style.textDecoration = "underline";
              cell.addEventListener("click", () => {
                if (item.assetId) {
                  router.push(`/assets/detail?id=${item.assetId}`);
                }
              });
            }
          });
        }
      };
      addClickHandlers();
      const timeoutId = setTimeout(addClickHandlers, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, serviceRequests, router]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const gridData = serviceRequests.map((sr) => [
    sr.srNo || "",
    formatDate(sr.serviceDate),
    sr.assetId,
    sr.technicianName,
    sr.supplier,
    sr.warrantyStatus,
    sr.status,
    sr.type,
    sr.description,
  ]);

  return (
    <>
      <PageTitle title="" />

      <ComponentContainerCard
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>Service Requests</span>
            <Button
              variant="primary"
              onClick={() => router.push("/servicerequests/create")}
              className="d-flex align-items-center gap-2"
              size="sm"
            >
              <i className="ri-add-line"></i>
              Create Service Request
            </Button>
          </div>
        }
        description=""
      >
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && serviceRequests.length === 0 && (
          <div className="text-center text-muted my-4">No service requests found.</div>
        )}

        {!loading && !error && serviceRequests.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "SR No", sort: false, search: true },
                { name: "Service Date", sort: true, search: true },
                { name: "Asset Id", sort: false, search: true },
                { name: "Technician", sort: false, search: true },
                { name: "Supplier", sort: false, search: true },
                {
                  name: "Warranty Status",
                  sort: false,
                  search: true,
                  formatter: (cell: any) => {
                    const status = String(cell || "");
                    let badgeClass = "bg-secondary";
                    if (status.toUpperCase() === "ACTIVE") badgeClass = "bg-success";
                    else if (status.toUpperCase() === "EXPIRED") badgeClass = "bg-danger";
                    else if (status) badgeClass = "bg-warning";
                    return { html: `<span class="badge ${badgeClass}">${status}</span>` };
                  },
                },
                { name: "Status", sort: true, search: true },
                { name: "Type", sort: true, search: true },
                { name: "Description", sort: false, search: true },
              ]}
              pagination={{
                limit: 10,
              }}
              sort={true}
              className={{
                container: "table table-striped table-hover",
                table: "table",
                thead: "table-light",
                th: "border-0",
                td: "border-0",
                search: "form-control",
                pagination: "pagination pagination-sm",
              }}
              style={{
                table: {
                  width: "100%",
                },
              }}
            />
          </div>
        )}
      </ComponentContainerCard>
    </>
  );
}
