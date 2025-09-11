"use client";

import React, { useEffect, useState, useRef } from "react";

import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { departmentService, Department } from "@/services/api/departments";
import { CardTitle } from 'react-bootstrap'
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/utils/constants";
import CreateDepartmentModal from "@/components/CreateDepartmentModal";
import { Col, Row } from 'react-bootstrap'
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Link from "next/link";
import { formatDate } from "@/utils/date";
export default function DepartmentListingPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isAppProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

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

        // Add click handlers for Number of Open SRs column
        if (!isAppProduction) {
          // In non-production, Open SRs is the 4th column (index 3)
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
        }
      };

      // Try immediately
      addClickHandlers();
      // Also try after a delay to ensure GridJS has rendered
      const timeoutId = setTimeout(addClickHandlers, 500);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [loading, departments, router, isAppProduction]);

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
  const gridData = departments.map((department) => {
    const baseData = [
      department.deptId || "",
      department.deptName || "",
      department.assetCount || 0,
    ];

    if (!isAppProduction) {
      baseData.push(department.openServiceRequestCount || 0);
    }

    // baseData.push(formatDate(department.createdAt));
    return baseData;
  });

  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
              <div className="flex-grow-1">
                <h4 className="header-title">Departments</h4>
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
                  Add Department
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

              {!loading && !error && departments.length === 0 && (
                <div className="text-center text-muted my-4">No departments found.</div>
              )}
              {/* <CardTitle as={'h4'} className="mb-3 anchor" id="general"></CardTitle> */}
              {!loading && !error && departments.length > 0 && (
                <Grid
                  data={gridData}
                  columns={[
                    { name: "Department ID", sort: false, search: true },
                    { name: "Department Name", sort: false, search: true },
                    { name: "Number of Assets", sort: true, search: true },
                    ...(isAppProduction ? [] : [{ name: "Number of Open SRs", sort: true, search: true }]),
                    // { name: "Created Date", sort: true, search: true }
                  ]}
                  pagination={{
                    limit: 50
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
