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
  serviceRequestId: string;
  createdAt: string;
  assetId: string;
  assetName: string;
  assetCondition: string;
  departmentName: string;
  technicianName: string;
  supplier: string;
  warrantyStatus: string;
  status: string;
  // type: string;
  // description: string;
  // createdAt?: string;
  serviceSupplier?: {
    name: string;
  };
  asset?: {
    assetName: string;
    id: string;
    department?: {
      deptName: string;
    };
  };
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
            serviceRequestId: record.serviceRequestId || record.id || "",
            createdAt: record.createdAt || "",
            assetId: record.assetId || "",
            assetName: record.asset?.assetName || record.assetId || "",
            assetCondition: record.assetCondition || "",
            departmentName: record.asset?.department?.deptName || "",
            technicianName: record.technicianName || "",
            supplier: record.serviceSupplier?.name || "",
            warrantyStatus: record.warranty?.isActive ? 'Active' : (record.warranty ? 'Expired' : 'Not applicable'),
            status: record.serviceStatus || record.srStatus || "",
            //  type: record.serviceType || "",
            description: record.serviceDescription || "",
            //  createdAt: record.createdAt || undefined,
            asset: record.asset,
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
        // Add click handlers for Service Request ID column (1st column, index 0)
        const srIdCells = document.querySelectorAll("td:nth-child(1)");
        if (srIdCells.length > 0) {
          srIdCells.forEach((cell, index) => {
            if (index < serviceRequests.length) {
              const item = serviceRequests[index];
              (cell as HTMLElement).style.cursor = "pointer";
              (cell as HTMLElement).style.color = "#0d6efd";
              (cell as HTMLElement).style.textDecoration = "underline";
              cell.addEventListener("click", () => {
                if (item.serviceRequestId) {
                  router.push(`/servicerequests/detail?srid=${item.serviceRequestId}`);
                }
              });
            }
          });
        }

        // Add click handlers for Asset Name column (4th column, index 3)
        const assetNameCells = document.querySelectorAll("td:nth-child(4)");
        if (assetNameCells.length > 0) {
          assetNameCells.forEach((cell, index) => {
            if (index < serviceRequests.length) {
              const item = serviceRequests[index];
              (cell as HTMLElement).style.cursor = "pointer";
              (cell as HTMLElement).style.color = "#0d6efd";
              (cell as HTMLElement).style.textDecoration = "underline";
              cell.addEventListener("click", () => {
                if (item.assetId) {
                  router.push(`/assets/detail?aid=${item.assetId}`);
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

  const calculateAge = (dateString: string) => {
    if (!dateString) return "";

    const createdAt = new Date(dateString);
    const today = new Date();
    const diffInMs = today.getTime() - createdAt.getTime();

    // If the date is in the future, return "Just created"
    if (diffInMs < 0) {
      return "Just created";
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30.44); // Average days in a month
    const diffInYears = Math.floor(diffInDays / 365.25); // Average days in a year

    if (diffInMinutes < 60) {
      return `${diffInMinutes} Minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} Hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} Day${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} Month${diffInMonths > 1 ? 's' : ''}`;
    } else {
      return `${diffInYears} Year${diffInYears > 1 ? 's' : ''}`;
    }
  };

  const gridData = serviceRequests.map((sr) => [
    sr.srNo || "",
    formatDate(sr.createdAt),
    calculateAge(sr.createdAt),
    sr.assetName,
    sr.assetCondition,
    sr.departmentName,
    sr.technicianName,
    sr.supplier || "",
    sr.warrantyStatus,
    sr.status,
    // sr.type,
    // sr.description,
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
                 {
                   name: "SR No",
                   sort: false,
                   search: true,
                   cell: (cell: any) => {
                     return `<span style="color: #0d6efd; text-decoration: underline; cursor: pointer;">${cell}</span>`;
                   }
                 },
                 { 
                   name: "Created At", 
                   sort: true, 
                   search: true,
                   attributes: {
                     title: "Created At"
                   }
                 },
                 { 
                   name: "Service Request Age", 
                   sort: true, 
                   search: false,
                   attributes: {
                     title: "Service Request Age"
                   }
                 },
                 {
                   name: "Asset Name",
                   sort: false,
                   search: true,
                   cell: (cell: any) => {
                     return `<span style="color: #0d6efd; text-decoration: underline; cursor: pointer;">${cell}</span>`;
                   },
                   attributes: {
                     title: "Asset Name"
                   }
                 },
                 { 
                   name: "Asset Condition", 
                   sort: false, 
                   search: true,
                   attributes: {
                     title: "Asset Condition"
                   }
                 },
                 { 
                   name: "Department", 
                   sort: false, 
                   search: true,
                   attributes: {
                     title: "Department"
                   }
                 },
                 { 
                   name: "Technician", 
                   sort: false, 
                   search: true,
                   attributes: {
                     title: "Technician"
                   }
                 },
                 { 
                   name: "Supplier", 
                   sort: false, 
                   search: true,
                   attributes: {
                     title: "Supplier"
                   }
                 },
                 {
                   name: "Warranty Status",
                   sort: false,
                   search: true,
                   cell: (cell: any) => {
                     const status = String(cell || "");
                     let badgeClass = "bg-secondary";
                     if (status.toUpperCase() === "ACTIVE") badgeClass = "bg-success";
                     else if (status.toUpperCase() === "EXPIRED") badgeClass = "bg-danger";
                     else if (status) badgeClass = "bg-warning";
                     return `<span class="badge ${badgeClass}">${status}</span>`;
                   },
                   attributes: {
                     title: "Warranty Status"
                   }
                 },
                 { 
                   name: "Status", 
                   sort: true, 
                   search: true,
                   attributes: {
                     title: "Status"
                   }
                 },
                 // { name: "Type", sort: true, search: true },
                 // { name: "Description", sort: false, search: true },
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
