"use client";

import React, { useState, useEffect } from "react";
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Alert, Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { serviceRequestService, CreateServiceRequestRequest } from '@/services/api/serviceRequest'
import { assetConditionService, AssetCondition } from '@/services/api/assetCondition'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import {  CardFooter, CardHeader, CardTitle,  } from 'react-bootstrap'
import SearchAsset from '@/components/searchAsset'

export default function ServiceRequestCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('aid');
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [assetConditionCode, setAssetConditionCode] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assetConditions, setAssetConditions] = useState<AssetCondition[]>([]);
  const [loadingAssetConditions, setLoadingAssetConditions] = useState(false);

  useEffect(() => { 
    const fetchAsset = async () => {
      if (!assetId) {
        // If no asset ID, just set loading to false - SearchAsset component will handle asset loading
        setLoading(false);
        return;
      }
      try {
        const assetData = await assetsService.getAssetById(assetId);
        setAsset(assetData);
        setSelectedAsset(assetData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load asset. Please try again.");
        setLoading(false);
      }
    };
    fetchAsset();
  }, [assetId]);

  // Load asset conditions when component mounts
  useEffect(() => {
    const fetchAssetConditions = async () => {
      setLoadingAssetConditions(true);
      try {
        const conditionsData = await assetConditionService.getAllAssetConditions();
        setAssetConditions(conditionsData);
        // Set default value to first condition if available
        if (conditionsData.length > 0 && !assetConditionCode) {
          setAssetConditionCode(conditionsData[0].code);
        }
      } catch (error) {
        console.error('Error fetching asset conditions:', error);
        setError("Failed to load asset conditions. Please try again.");
      } finally {
        setLoadingAssetConditions(false);
      }
    };
    fetchAssetConditions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problemDescription.trim()) {
      setError("Problem description is required");
      return;
    }

    if (!assetConditionCode) {
      setError("Asset condition is required");
      return;
    }

    if (!selectedAsset) {
      setError("Please select an asset");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const serviceRequestData: CreateServiceRequestRequest = {
        assetId: selectedAsset.id,
        problem: problemDescription,
        assetConditionCode: assetConditionCode,
      };

      const result = await serviceRequestService.createServiceRequest(serviceRequestData);
      console.log('Service request created:', result);
      
      // Redirect to service requests list or show success message
      router.push('/servicerequests');
    } catch (error) {
      console.error('Error creating service request:', error);
      setError("Failed to create service request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssetSelect = (selectedAsset: Asset | null) => {
    console.log('selected asset ===>',selectedAsset);
    setSelectedAsset(selectedAsset);
    setAsset(selectedAsset);
    setError(""); // Clear any previous errors
  };

  console.log('=======>',selectedAsset);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !selectedAsset && !assetId) {
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

  // Show only asset selection when no asset ID is provided
  if (!assetId && !selectedAsset && !asset) {
    return (
      <>
        <Row>
          <Col md={12}>
            <ComponentContainerCard title="Select Asset" description="Choose an asset to create a service request for">
              <Card className="border-secondary border">
                <CardHeader className="bg-light">
                  <CardTitle as="h5" className="mb-0">
                    <IconifyIcon icon="mdi:select" className="me-2" />
                    Asset Selection
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}
                  <SearchAsset
                    onAssetSelect={handleAssetSelect}
                    selectedAsset={selectedAsset}
                    placeholder="Search for assets by name, ID, part number, brand, model, or serial number..."
                    label="Select Asset"
                    required={true}
                    className="mb-3"
                    error={error}
                  />
                  <div className="form-text">
                    Search and select the asset for which you want to create a service request.
                  </div>
                  
                  {/* {selectedAsset && (
                    <div className="mt-3">
                      <Button 
                        variant="primary" 
                        onClick={() => router.push(`/servicerequests/create?aid=${selectedAsset.id}`)}
                        className="me-2"
                      >
                        <IconifyIcon icon="mdi:arrow-right" className="me-2" />
                        Continue with Selected Asset
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => router.back()}
                      >
                        <IconifyIcon icon="mdi:arrow-left" className="me-2" />
                        Go Back
                      </Button>
                    </div>
                  )} */}
                </CardBody>
              </Card>
            </ComponentContainerCard>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      {/* Asset Information - Show when asset is selected or provided via URL */}
      {(asset || selectedAsset) && (
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
                        <strong>Asset Name:</strong> {(asset || selectedAsset)?.assetName}
                      </div>
                      <div className="mb-3">
                        <strong>Asset Type:</strong> {(asset || selectedAsset)?.assetType?.assetName}
                      </div>
                      <div className="mb-3">
                        <strong>Asset Sub Type:</strong> {(asset || selectedAsset)?.assetSubType?.name}
                      </div>
                      <div className="mb-3">
                        <strong>Department:</strong> {(asset || selectedAsset)?.department?.deptName}
                      </div>
                      <div className="mb-3">
                        <strong>Brand:</strong> {(asset || selectedAsset)?.brand}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <strong>Model:</strong> {(asset || selectedAsset)?.model}
                      </div>
                      <div className="mb-3">
                        <strong>Sub Model:</strong> {(asset || selectedAsset)?.subModel}
                      </div>
                      <div className="mb-3">
                        <strong>Installation Date:</strong> {(asset || selectedAsset)?.installationDate}
                      </div>
                      <div className="mb-3">
                        <strong>Warranty Start Date:</strong> {(asset || selectedAsset)?.warrantyStartDate}
                      </div>
                      <div className="mb-3">
                        <strong>Warranty End Date:</strong> {(asset || selectedAsset)?.warrantyEndDate}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </ComponentContainerCard>
          </Col>
        </Row>
      )}

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
                        value={assetConditionCode}
                        onChange={(e) => setAssetConditionCode(e.target.value)}
                        required
                        disabled={loadingAssetConditions}
                      >
                        {loadingAssetConditions ? (
                          <option value="">Loading conditions...</option>
                        ) : (
                          assetConditions.map((condition) => (
                            <option key={condition.code} value={condition.code}>
                              {condition.displayName}
                            </option>
                          ))
                        )}
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
