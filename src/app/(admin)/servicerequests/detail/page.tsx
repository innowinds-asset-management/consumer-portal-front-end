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
import { serviceRequestService, ServiceRequest, UpdateServiceRequestRequest } from '@/services/api/serviceRequest'
import { Location } from '@/services/api/assets'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import {  CardFooter, CardHeader, CardTitle,  } from 'react-bootstrap'

export default function ServiceRequestDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceRequestId = searchParams.get('srid');
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { 
    const fetchServiceRequest = async () => {
      if (!serviceRequestId) {
        setError("Service Request ID is required");
        setLoading(false);
        return;
      }
      try {
        console.log(serviceRequestId);
        const serviceRequestData = await serviceRequestService.getServiceRequestById(serviceRequestId);
        setServiceRequest(serviceRequestData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load service request. Please try again.");
        setLoading(false);
      }
    };
    fetchServiceRequest();
  }, [serviceRequestId]);

  const handleEditField = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setEditValues({ ...editValues, [fieldName]: currentValue });
  };

  const handleSaveField = async (fieldName: string) => {
    if (!serviceRequest || !serviceRequestId) return;

    setSaving(true);
    try {
      const updateData: UpdateServiceRequestRequest = {
        [fieldName]: editValues[fieldName]
      };

      const updatedServiceRequest = await serviceRequestService.updateServiceRequest(serviceRequestId, updateData);
      setServiceRequest(updatedServiceRequest);
      setEditingField(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating field:', error);
      setError("Failed to update field. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const renderEditableField = (fieldName: string, label: string, value: string, type: 'text' | 'textarea' | 'select' = 'text', options?: string[]) => {
    const isEditing = editingField === fieldName;
    const currentValue = isEditing ? editValues[fieldName] : value;

    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>{label}:</strong>
          {!isEditing && (
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => handleEditField(fieldName, value)}
            >
              <IconifyIcon icon="mdi:pencil" className="me-1" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditing ? (
          <div className="d-flex gap-2 align-items-start">
            {type === 'textarea' ? (
              <FormControl
                as="textarea"
                rows={3}
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              />
            ) : type === 'select' ? (
              <FormControl
                as="select"
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              >
                {options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </FormControl>
            ) : (
              <FormControl
                type="text"
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              />
            )}
            <div className="d-flex gap-1">
              <Button 
                variant="success" 
                size="sm"
                onClick={() => handleSaveField(fieldName)}
                disabled={saving}
              >
                <IconifyIcon icon="mdi:check" />
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                <IconifyIcon icon="mdi:close" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-light rounded">
            {value || 'Not specified'}
          </div>
        )}
      </div>
    );
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

  if (error && !serviceRequest) {
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

  if (!serviceRequest) {
    return (
      <div className="container-fluid">
        <Alert variant="warning">
          <Alert.Heading>Service Request Not Found</Alert.Heading>
          <p>The requested service request could not be found.</p>
          <Button variant="outline-warning" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <PageTitle title={`Service Request - ${serviceRequest.srNo}`} />
      
      {/* Header Information */}
      <Row>
        <Col md={12}>
          <ComponentContainerCard title="Service Request Information" description="Key details of the service request">
            <Card className="border-secondary border">
              <CardHeader className="bg-primary text-white">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:file-document-outline" className="me-2" />
                  Service Request Details
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>SR Number:</strong> {serviceRequest.srNo}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {serviceRequest.asset?.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Brand:</strong> {serviceRequest.asset?.brand}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {serviceRequest.asset?.model}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Installation Date:</strong> {serviceRequest.asset?.installationDate}
                    </div>
                    <div className="mb-3">
                      <strong>Service Supplier:</strong> {serviceRequest.serviceSupplier?.name}
                    </div>
                    <div className="mb-3">
                      <strong>Contract Name:</strong> {serviceRequest.serviceContract?.contractName}
                    </div>
                    <div className="mb-3">
                      <strong>Coverage Type:</strong> {serviceRequest.serviceContract?.coverageType}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Editable Fields */}
      <Row className="mt-4">
        <Col md={12}>
          <ComponentContainerCard title="Editable Information" description="Fields that can be updated">
            <Card className="border-secondary border">
              <CardHeader className="bg-light">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:pencil-outline" className="me-2" />
                  Updateable Fields
                </CardTitle>
              </CardHeader>
              <CardBody>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Row>
                  <Col md={6}>
                    {renderEditableField('technicianName', 'Technician Name', serviceRequest.technicianName || '')}
                    {renderEditableField('srStatus', 'SR Status', serviceRequest.srStatus, 'select', [
                      'OPEN', 'IN_PROGRESS', 'PENDING', 'COMPLETED', 'CLOSED', 'CANCELLED'
                    ])}
                  </Col>
                  <Col md={6}>
                    {renderEditableField('closureReason', 'Closure Reason', serviceRequest.closureReason || '')}
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    {renderEditableField('serviceDescription', 'Service Description', serviceRequest.serviceDescription || '', 'textarea')}
                    {renderEditableField('closureNotes', 'Closure Notes', serviceRequest.closureNotes || '', 'textarea')}
                  </Col>
                </Row>

                <div className="d-flex gap-2 mt-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.back()}
                  >
                    <IconifyIcon icon="mdi:arrow-left" className="me-2" />
                    Back
                  </Button>
                </div>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
}
