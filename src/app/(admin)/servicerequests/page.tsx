"use client";

import React, { useEffect, useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter, useSearchParams } from "next/navigation";
import { serviceRequestService } from "@/services/api/serviceRequest";
import { formatDate, timeSince } from "@/utils/date";
import ServiceRequestStats from "@/app/(admin)/dashboard/components/serviceRequestStats";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

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
  departmentId: string;
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
  const searchParams = useSearchParams();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestListItem[]>([]);
  const [filteredServiceRequests, setFilteredServiceRequests] = useState<ServiceRequestListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Get filter parameters from URL
  const status = searchParams.get('status');
  const supplierId = searchParams.get('sid');
  const departmentId = searchParams.get('did');

  useEffect(() => {
    const fetchServiceRequests = async () => {
      setLoading(true);
      setError("");
      try {
        // Build query parameters object
        const queryParams: { status?: string; supplierId?: string; departmentId?: string } = {};
        if (status) {
          queryParams.status = status;
        }
        if (supplierId) {
          queryParams.supplierId = supplierId;
        }
        if (departmentId) {
          queryParams.departmentId = departmentId;
        }
        
        const data = (await serviceRequestService.getServiceRequests(queryParams)) as unknown as any[];
        const mapped: ServiceRequestListItem[] = Array.isArray(data)
          ? data.map((record: any) => ({
            srNo: record.srNo || record.serviceRequestId || String(record.id || ""),
            serviceRequestId: record.serviceRequestId || record.id || "",
            createdAt: record.createdAt || "",
            assetId: record.assetId || "",
            assetName: record.asset?.assetName || record.assetId || "",
            assetCondition: record.assetCondition?.displayName || "",
            departmentName: record.asset?.department?.deptName || "",
            technicianName: record.technicianName || "",
            supplier: record.serviceSupplier?.name || "",
            warrantyStatus: record.warranty?.isActive ? 'Active' : (record.warranty ? 'Expired' : 'Not Available'),
            status: record.serviceRequestStatus?.displayName || record.srStatus || "",
            //  type: record.serviceType || "",
            description: record.serviceDescription || "",
            //  createdAt: record.createdAt || undefined,
            asset: record.asset,
            departmentId: record.asset?.department?.deptId || "",
          }))
          : [];
        setServiceRequests(mapped);
        setFilteredServiceRequests(mapped); // API already returns filtered results
      } catch (err) {
        setError("Failed to load service requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, [status, supplierId, departmentId]);


  useEffect(() => {
    if (!loading && filteredServiceRequests.length > 0) {
      const addClickHandlers = () => {
        // Add click handlers for Service Request ID column (1st column, index 0)
        const srIdCells = document.querySelectorAll("td:nth-child(1)");
        if (srIdCells.length > 0) {
          srIdCells.forEach((cell, index) => {
            if (index < filteredServiceRequests.length) {
              const item = filteredServiceRequests[index];
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
            if (index < filteredServiceRequests.length) {
              const item = filteredServiceRequests[index];
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

               
                // Add click handlers for Department column (6th column, index 5)
                const departmentCells = document.querySelectorAll("td:nth-child(6)");
                if (departmentCells.length > 0) {
                  departmentCells.forEach((cell, index) => {
                    if (index < filteredServiceRequests.length) {
                      const item = filteredServiceRequests[index];
                      (cell as HTMLElement).style.cursor = "pointer";
                      (cell as HTMLElement).style.color = "#0d6efd";
                      (cell as HTMLElement).style.textDecoration = "underline";
                      cell.addEventListener("click", () => {
                        if (item.departmentId) {
                          router.push(`/departments/detail?did=${item.departmentId}`);
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
  }, [loading, filteredServiceRequests, router]);


  const gridData = filteredServiceRequests.map((sr) => [
    sr.srNo || "",
    formatDate(sr.createdAt),
    timeSince(new Date(sr.createdAt)).replace(/ ago$/, ''),
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
                    <IconifyIcon icon="tabler:plus" className="fs-16" />
                    Create Service Request
            </Button>
          </div>
        }
        description=""
      >
        <div className="mb-4">
          <ServiceRequestStats />
        </div>
        
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && filteredServiceRequests.length === 0 && (
          <div className="text-center text-muted my-4">No service requests found.</div>
        )}

        {!loading && !error && filteredServiceRequests.length > 0 && (
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
                },
                {
                  name: "Age",
                  sort: true,
                  search: false,
                  cell: (cell: any) => {
                    return `<span style="width=100px;">${cell}</span>`;
                  },
                },
                {
                  name: "Asset Name",
                  sort: false,
                  search: true,
                  cell: (cell: any) => {
                    return `<span style="color: #0d6efd; text-decoration: underline; cursor: pointer;">${cell}</span>`;
                  },
                },
                {
                  name: "Asset Condition",
                  sort: false,
                  search: true,
                },
                {
                  name: "Department",
                  sort: false,
                  search: true,
                },
                {
                  name: "Technician",
                  sort: false,
                  search: true,
                },
                {
                  name: "Supplier",
                  sort: false,
                  search: true,
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
                },
                {
                  name: "Status",
                  sort: true,
                  search: true,
                },
                // { name: "Type", sort: true, search: true },
                // { name: "Description", sort: false, search: true },
              ]}
              pagination={{
                limit: 100,
              }}
              sort={true}
             
              className={{
                container: "table table-striped",
                table: "table",
                thead: "table-light",
                // th: "",
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
