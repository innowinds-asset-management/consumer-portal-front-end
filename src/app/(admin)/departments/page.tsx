"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { departmentService, Department } from "@/services/api/departments";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/utils/constants";
import CreateDepartmentModal from "@/components/CreateDepartmentModal";

export default function DepartmentListingPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await departmentService.getDepartmentsByConsumerId();
        const allDepartments = Array.isArray(data) ? data : [];
        setDepartments(allDepartments);
      } catch (err) {
        setError("Failed to load departments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Add click handlers to department names after grid is rendered
  useEffect(() => {
    if (!loading && departments.length > 0) {
      const addClickHandlers = () => {
        const departmentNameCells = document.querySelectorAll('td:first-child');
        if (departmentNameCells.length > 0) {
          departmentNameCells.forEach((cell, index) => {
            if (index < departments.length) {
              const department = departments[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/departments/detail?did=${department.deptId}`);
              });
            }
          });
        }

        // Add click handlers for Number of Assets column (3rd column, index 2)
        const assetCountCells = document.querySelectorAll('td:nth-child(3)');
        if (assetCountCells.length > 0) {
          assetCountCells.forEach((cell, index) => {
            if (index < departments.length) {
              const department = departments[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/assets?did=${department.deptId}`);
              });
            }
          });
        }

        // Add click handlers for Number of Open SRs column (4th column, index 3)
        const srCountCells = document.querySelectorAll('td:nth-child(4)');
        if (srCountCells.length > 0) {
          srCountCells.forEach((cell, index) => {
            if (index < departments.length) {
              const department = departments[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/servicerequests?status=OP&did=${department.deptId}`);
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
  }, [loading, departments, router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Function to refresh departments list
  const refreshDepartments = () => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await departmentService.getDepartmentsByConsumerId();
        const allDepartments = Array.isArray(data) ? data : [];
        setDepartments(allDepartments);
      } catch (err) {
        setError("Failed to load departments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  };

  // Prepare data for GridJS
  const gridData = departments.map((department) => [
    department.deptId || "",
    department.deptName || "",
    department.assetCount || 0,
    department.openServiceRequestCount || 0,
    formatDate(department.createdAt)
  ]);

  return (
    <>

      
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Departments</span>
          <Button 
            variant="primary" 
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="ri-add-line"></i>
            Add Department
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
        
        {!loading && !error && departments.length === 0 && (
          <div className="text-center text-muted my-4">No departments found.</div>
        )}
        
        {!loading && !error && departments.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "Department ID", sort: false, search: true },
                { name: "Department Name", sort: false, search: true },
                { name: "Number of Assets", sort: true, search: true },
                { name: "Number of Open SRs", sort: true, search: true },
                { name: "Created Date", sort: true, search: true }
              ]}
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

      {/* Create Department Modal */}
      <CreateDepartmentModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={refreshDepartments}
        existingDepartments={departments}
      />
    </>
  );
}
