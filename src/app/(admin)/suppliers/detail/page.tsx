"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ServiceRequestTab from '@/components/ServiceRequestTab'
import AssetListTab from '@/components/AssetListTab'
import AmcCmcTab from '@/components/AmcCmcTab'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button } from 'react-bootstrap'
import { supplierService, SupplierDetails } from '@/services/api/suppliers'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { formatDate } from "@/utils/date";
import { STORAGE_KEYS } from "@/utils/constants";



export default function SupplierDetailPage() {
  const searchParams = useSearchParams();
  const supplierId = searchParams.get('sid');

  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      if (!supplierId) {
        setError("Supplier ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Fetch supplier details from the API
        const supplierData = await supplierService.getSupplierDetailsById(supplierId);
        setSupplier(supplierData);

      } catch (err) {
        console.error('Error fetching supplier details:', err);
        setError("Failed to load supplier details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierDetails();
  }, [supplierId]);


  if (loading) {
    return (
      <>
        <PageTitle title="Supplier Details" />
        <ComponentContainerCard title="Loading Supplier Details">
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading supplier details...</p>
          </div>
        </ComponentContainerCard>
      </>
    );
  }

  if (error || !supplier) {
    return (
      <>
        <PageTitle title="Supplier Details" />
        <ComponentContainerCard title="Error">
          <Alert variant="danger">
            {error || "Supplier not found"}
          </Alert>
        </ComponentContainerCard>
      </>
    );
  }

  return (
    <>
      <PageTitle title="" />

      <ComponentContainerCard
        title={`${supplier.name} (${supplier.code})`}
      >
        {/* Overview Section - Above Tabs */}
        <Row className="mb-4">
          <Col sm="12">
            <Card className="border-0">
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <strong>Supplier Name:</strong> {supplier.name}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier Code:</strong> {supplier.code}
                    </div>
                    <div className="mb-3">
                      <strong>Primary Contact:</strong> {supplier.primaryContactName || ''}
                    </div>
                    <div className="mb-3">
                      <strong>Contact Phone:</strong> {supplier.primaryContactPhone || ''}
                    </div>
                                         <div className="mb-3">
                       <strong>Contact Email:</strong> {supplier.primaryContactEmail || ''}
                     </div>
                  </Col>
                                     <Col lg={6}>
                     <div className="mb-3">
                       <strong>Address:</strong> {supplier.address || ''}
                     </div>
                     <div className="mb-3">
                       <strong>GST Number:</strong> {supplier.gstNumber || ''}
                     </div>
                     <div className="mb-3">
                       <strong>Phone:</strong> {supplier.phone || ''}
                     </div>
                     <div className="mb-3">
                       <strong>Status:</strong>
                       <Badge bg={supplier.isActive ? 'success' : 'danger'} className="ms-2">
                         {supplier.isActive ? 'Active' : 'Inactive'}
                       </Badge>
                     </div>
                     <div className="mb-3">
                       <strong>Registered Date:</strong> {supplier.consumerSuppliers?.length > 0 ?  formatDate(supplier.consumerSuppliers.find((sup:any)=> sup.consumerId === JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "").registeredAt) : ''}
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
                Assets ({supplier.assetCount})
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="serviceRequest">
                <IconifyIcon icon="tabler:history" className="fs-18 me-1" />
                Service Requests ({supplier.openServiceRequestCount})
              </NavLink>
            </NavItem>
            <NavItem as="li" role="presentation">
              <NavLink eventKey="amc">
                <IconifyIcon icon="tabler:shield-check" className="fs-18 me-1" />
                AMC/CMC
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent>
            {/* Assets Tab */}
            <TabPane eventKey="assets" id="assets">
              <AssetListTab 
                supplierId={supplierId!} 
                supplier={supplier}
                showCreateButton={false}
                title="Assets"
              />
            </TabPane>

            {/* Service Request Tab */}
            <TabPane eventKey="serviceRequest" id="serviceRequest">
              <ServiceRequestTab 
                supplierId={supplierId!} 
                supplier={supplier}
                showCreateButton={false}
                title="Service Requests"
              />
            </TabPane>

            {/* AMC/CMC Tab */}
            <TabPane eventKey="amc" id="amc">
              <AmcCmcTab 
                supplierId={supplierId!} 
                supplier={supplier}
                showCreateButton={false}
                title="AMC/CMC Contracts"
              />
            </TabPane>
          </TabContent>
        </TabContainer>
      </ComponentContainerCard>
    </>
  );
}
