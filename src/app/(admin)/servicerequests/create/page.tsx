"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import {departmentService, Department } from '@/services/api/departments'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { serviceRequestService, ServiceRequest, CreateServiceRequestRequest } from '@/services/api/serviceRequest'
import { Location } from '@/services/api/assets'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import {  CardFooter, CardHeader, CardTitle,  } from 'react-bootstrap'

export default function ServiceRequestCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('aid');
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [assetCondition, setAssetCondition] = useState("Working");

  useEffect(() => { 
    const fetchAsset = async () => {
      if (!assetId) {
        setError("Asset ID is required");
        setLoading(false);
        return;
      }
      try {
        const assetData = await assetsService.getAssetById(assetId);
        setAsset(assetData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load asset. Please try again.");
        setLoading(false);
      }
    };
    fetchAsset();
  }, [assetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problemDescription.trim()) {
      setError("Problem description is required");
      return;
    }

    if (!assetCondition) {
      setError("Asset condition is required");
      return;
    }

    if (!assetId) {
      setError("Asset ID is required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
             const serviceRequestData: CreateServiceRequestRequest = {
         assetId: assetId,
         //technicianName: "", // Will be filled by backend or can be added as form field
        // serviceSupplierName: "", // Will be filled by backend or can be added as form field
        //warrantyStatus: "ACTIVE", // Default value, can be determined based on asset warranty
        //serviceStatus: "PENDING", // Default status for new requests
        // approverName: null, // Will be filled by backend
        // serviceDate: new Date().toISOString().split('T')[0], // Current date
        // serviceType: "REPAIR", // Default type, can be made selectable
         //serviceDescription: `${assetCondition}: ${problemDescription}`
         problem: problemDescription,
         assetCondition: assetCondition,
       };

      const result = await serviceRequestService.createServiceRequest(serviceRequestData);
      console.log('Service request created:', result);
      
      // Redirect to service requests list or show success message
      router.push('/admin/servicerequests');
    } catch (error) {
      console.error('Error creating service request:', error);
      setError("Failed to create service request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !asset) {
    return (
      <div className="container-fluid">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Create Service Request" />
      
      <Row>
        <Col md={12}>
          <ComponentContainerCard title="Asset Information" description="Details of the asset for service request">
            <Card className="border-secondary border">
              <CardHeader className="bg-light">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:information-outline" className="me-2" />
                  Asset Details
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {asset?.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Type:</strong> {asset?.assetType?.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Sub Type:</strong> {asset?.assetSubType?.name}
                    </div>
                    <div className="mb-3">
                      <strong>Department:</strong> {asset?.department?.deptName}
                    </div>
                    <div className="mb-3">
                      <strong>Brand:</strong> {asset?.brand}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Model:</strong> {asset?.model}
                    </div>
                    <div className="mb-3">
                      <strong>Sub Model:</strong> {asset?.subModel}
                    </div>
                    <div className="mb-3">
                      <strong>Installation Date:</strong> {asset?.installationDate}
                    </div>
                    <div className="mb-3">
                      <strong>Warranty Start Date:</strong> {asset?.warrantyStartDate}
                    </div>
                    <div className="mb-3">
                      <strong>Warranty End Date:</strong> {asset?.warrantyEndDate}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <ComponentContainerCard title="Service Request Form" description="Describe the problem with the asset">
            <Card className="border-secondary border">
              <CardHeader className="bg-light">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:clipboard-text-outline" className="me-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardBody>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}
                
                                 <Form onSubmit={handleSubmit}>
                   <FormGroup className="mb-3">
                     <FormLabel htmlFor="assetCondition">
                       <strong>Asset Condition *</strong>
                     </FormLabel>
                     <FormControl
                       as="select"
                       id="assetCondition"
                       value={assetCondition}
                       onChange={(e) => setAssetCondition(e.target.value)}
                       required
                     >
                       <option value="Working">Working</option>
                       <option value="Not Working">Not Working</option>
                       <option value="Working with Conditions">Working with Conditions</option>
                       <option value="Partially Working">Partially Working</option>
                       <option value="Under Maintenance">Under Maintenance</option>
                       <option value="Out of Service">Out of Service</option>
                     </FormControl>
                     <div className="form-text">
                       Select the current condition of the asset.
                     </div>
                   </FormGroup>

                   <FormGroup className="mb-3">
                     <FormLabel htmlFor="problemDescription">
                       <strong>Problem Description *</strong>
                     </FormLabel>
                     <FormControl
                       as="textarea"
                       id="problemDescription"
                       rows={5}
                       value={problemDescription}
                       onChange={(e) => setProblemDescription(e.target.value)}
                       placeholder="Please describe the problem with the asset in detail..."
                       required
                     />
                     <div className="form-text">
                       Provide a detailed description of the issue you're experiencing with this asset.
                     </div>
                   </FormGroup>

                  <div className="d-flex gap-2">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <IconifyIcon icon="mdi:content-save" className="me-2" />
                          Create Service Request
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => router.back()}
                      disabled={submitting}
                    >
                      <IconifyIcon icon="mdi:arrow-left" className="me-2" />
                      Cancel
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
}
