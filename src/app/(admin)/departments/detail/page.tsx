"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ServiceRequestTab from '@/components/ServiceRequestTab'
import AssetListTab from '@/components/AssetListTab'
import DepartmentInventoryTabs from '@/components/DepartmentInventoryTabs'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Alert } from 'react-bootstrap'
import { departmentService, Department } from '@/services/api/departments'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { formatDate } from "@/utils/date";

export default function DepartmentDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const departmentId = searchParams.get('did');

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      if (!departmentId) {
        setError("Department ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Fetch department details
        const departmentData = await departmentService.getDepartmentById(departmentId);
        setDepartment(departmentData);

      } catch (err) {
        console.error('Error fetching department details:', err);
        setError("Failed to load department details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentDetails();
  }, [departmentId]);

  
  if (loading) {
    return (
      <>
        <PageTitle title="Department Details" />
        <ComponentContainerCard title="Loading Department Details">
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading department details...</p>
          </div>
        </ComponentContainerCard>
      </>
    );
  }

  if (error || !department) {
    return (
      <>
        <PageTitle title="Department Details" />
        <ComponentContainerCard title="Error">
          <Alert variant="danger">
            {error || "Department not found"}
          </Alert>
        </ComponentContainerCard>
      </>
    );
  }

  return (
    <>
      <PageTitle title="" />

      <ComponentContainerCard
        title={`${department.deptName} (${department.deptId})`}
      >
        {/* Overview Section - Above Tabs */}
        <Row className="mb-4">
          <Col sm="12">
            <Card className="border-0">
              <CardBody>
                                 <Row>
                   <Col lg={6}>
                     <div className="mb-3">
                       <strong>Department Name:</strong> {department.deptName}
                     </div>
                     <div className="mb-3">
                       <strong>Created Date:</strong> {formatDate(department.createdAt)}
                     </div>
                   </Col>
                   <Col lg={6}>
                     <div className="mb-3">
                       <strong>Total Assets:</strong> {department.assetCount || 0}
                     </div>
                     <div className="mb-3">
                       <strong>Open Service Requests:</strong> {department.openServiceRequestCount || 0}
                     </div>
                   </Col>
                 </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <TabContainer defaultActiveKey="assets">
          <Nav role="tablist" className="nav-tabs nav-bordered mb-3">
            <NavItem as="li" role="presentation">
              <NavLink eventKey="assets">
                <IconifyIcon icon="tabler:building" className="fs-18 me-1" />
                Assets
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="serviceRequest">
                <IconifyIcon icon="tabler:history" className="fs-18 me-1" />
                Service Request
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="inventory">
                <IconifyIcon icon="tabler:box" className="fs-18 me-1" />
                Inventory
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent>
            {/* Assets Tab */}
            <TabPane eventKey="assets" id="assets">
              <AssetListTab 
                supplierId={undefined}
                assetId={undefined}
                departmentId={departmentId!}
                supplier={undefined}
                asset={undefined}
                showCreateButton={true}
                title="Department Assets"
                className=""
              />
            </TabPane>

            {/* Service Request Tab */}
            <TabPane eventKey="serviceRequest" id="serviceRequest">
              <ServiceRequestTab 
                assetId={undefined}
                departmentId={departmentId!}
                asset={undefined}
                showCreateButton={true}
                title="Department Service Requests"
              />
            </TabPane>

            {/* Inventory Tab */}
            <TabPane eventKey="inventory" id="inventory">
              <DepartmentInventoryTabs 
                departmentId={departmentId!}
                showCreateButton={true}
                title="Department Inventory"
              />
            </TabPane>
          </TabContent>
        </TabContainer>
      </ComponentContainerCard>
    </>
  );
}
