"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Col, Form, Row, Alert } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { serviceRequestService, CreateServiceRequestRequest } from '@/services/api/serviceRequest'

const serviceTypeList = [
  { value: 'preventive', label: 'Preventive' },
  { value: 'corrective', label: 'Corrective' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'installation', label: 'Installation' },
  { value: 'other', label: 'Other' },
];
const serviceStatusList = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const warrantyStatusList = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'VOID', label: 'Void' },
  { value: 'CLAIMED', label: 'Claimed' },
  { value: 'PENDING_CLAIM', label: 'Pending Claim' },
  { value: 'TRANSFERRED', label: 'Transferred' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
];

interface ServiceRequestForm {
  assetId: string;
  technicianId: string;
  supplierId: string;
  warrantyNumber: string;
  warrantyStatus: string;
  serviceDate: string;
  serviceType: string;
  serviceStatus: string;
  serviceDescription: string;
}

interface FormErrors {
  assetId?: string;
  technicianId?: string;
  supplierId?: string;
  warrantyNumber?: string;
  warrantyStatus?: string;
  serviceDate?: string;
  serviceType?: string;
  serviceStatus?: string;
  serviceDescription?: string;
}

export default function ServiceRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [assetsError, setAssetsError] = useState("");
  const [formData, setFormData] = useState<ServiceRequestForm>({
    assetId: "",
    technicianId: "",
    supplierId: "",
    warrantyNumber: "",
    warrantyStatus: "",
    serviceDate: "",
    serviceType: "",
    serviceStatus: "",
    serviceDescription: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoadingAssets(true);
        setAssetsError("");
        const assetId = searchParams.get('id');
        if (!assetId) {
          setAssetsError("Asset ID is required");
          return;
        }
        const data = await assetsService.getAssetById(assetId);
        setAssets([data]);
        
        // Fetch warranty data for the asset
        try {
          const warrantyData = await warrantyService.getWarrantiesByAssetId(assetId);
          setWarranties(warrantyData);
        } catch (warrantyErr) {
          console.error('Error fetching warranty data:', warrantyErr);
          // Don't fail the entire request if warranty fetch fails
        }
      } catch (err) {
        setAssetsError("Failed to load assets. Please refresh the page.");
      } finally {
        setLoadingAssets(false);
      }
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    if (assets.length === 1 && !formData.assetId) {
      setFormData(prev => ({ ...prev, assetId: assets[0].id }));
    }
  }, [assets, formData.assetId]);

  // Auto-select warranty number based on warranty data
  useEffect(() => {
    if (warranties.length > 0 && !formData.warrantyNumber) {
      const activeWarranty = warranties.find(w => w.isActive);
      if (activeWarranty) {
        setFormData(prev => ({ 
          ...prev, 
          warrantyNumber: activeWarranty.warrantyNumber
        }));
      } else {
        // Default to first warranty number if no active warranty
        setFormData(prev => ({ 
          ...prev, 
          warrantyNumber: warranties[0].warrantyNumber
        }));
      }
    }
  }, [warranties, formData.warrantyNumber]);  

  const handleFieldChange = (field: keyof ServiceRequestForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.assetId) newErrors.assetId = "Asset is required";
    if (!formData.technicianId) newErrors.technicianId = "Technician is required";
    if (!formData.supplierId) newErrors.supplierId = "Supplier is required";
    if (!formData.warrantyStatus) newErrors.warrantyStatus = "Warranty status is required";
    if (!formData.serviceDate) newErrors.serviceDate = "Service date is required";
    if (!formData.serviceType) newErrors.serviceType = "Service type is required";
    if (!formData.serviceStatus) newErrors.serviceStatus = "Service status is required";
    if (!formData.serviceDescription.trim()) newErrors.serviceDescription = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      setError("");
      
      // Prepare data for API call
      const serviceRequestData: CreateServiceRequestRequest = {
        assetId: formData.assetId,
        technicianName: formData.technicianId,
        serviceSupplierName: formData.supplierId,
        warrantyStatus: formData.warrantyStatus,
        serviceStatus: formData.serviceStatus,
        approverName: null, // Will be set by backend or admin
        serviceDate: formData.serviceDate,
        serviceType: formData.serviceType,
        serviceDescription: formData.serviceDescription,
      };

      // Call the API to create service request
      await serviceRequestService.createServiceRequest(serviceRequestData);
      
      setSubmitted(true);
      setFormData({
        assetId: "",
        technicianId: "",
        supplierId: "",
        warrantyNumber: "",
        warrantyStatus: "",
        serviceDate: "",
        serviceType: "",
        serviceStatus: "",
        serviceDescription: "",
      });
      setErrors({});
    } catch (err) {
      console.error('Error creating service request:', err);
      setError("Failed to submit service request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      assetId: "",
      technicianId: "",
      supplierId: "", 
      warrantyNumber: "",
      warrantyStatus: "",
      serviceDate: "",
      serviceType: "",
      serviceStatus: "",
      serviceDescription: "",
    });
    setErrors({});
    setSubmitted(false);
    setError("");
  };

  if (loadingAssets) {
    return (
      <>
        <PageTitle title="Create Service Request" />
        <ComponentContainerCard title="Loading">
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading assets...</p>
          </div>
        </ComponentContainerCard>
      </>
    );
  }

  if (assetsError) {
    return (
      <>
        <PageTitle title="Create Service Request" />
        <ComponentContainerCard title="Error">
          <Alert variant="danger">{assetsError}</Alert>
        </ComponentContainerCard>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <PageTitle title="Create Service Request" />
        <ComponentContainerCard title="Service Request Created Successfully">
          <Alert variant="success">
            <h4 className="alert-heading">Service Request Submitted!</h4>
            <p>Your service request has been successfully created and submitted for processing.</p>
            <hr />
            <p className="mb-0">
              <Button variant="primary" onClick={resetForm}>
                Create Another Service Request
              </Button>
            </p>
          </Alert>
        </ComponentContainerCard>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Create Service Request" />
      <ComponentContainerCard 
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>Service Request Form</span>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => router.back()}
            >
              <IconifyIcon icon="tabler:arrow-left" className="me-1" />
              Back
            </Button>
          </div>
        }
        description={"Asset Type: " + assets[0]?.assetType?.assetName +  "  Consumer Serial Number: " + assets[0]?.consumerSerialNo}
      >
        {error && (
          <Alert variant="danger" className="mb-3">{error}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Asset Name *</Form.Label>
                <Form.Select
                  value={formData.assetId}
                  onChange={e => handleFieldChange('assetId', e.target.value)}
                  isInvalid={!!errors.assetId}
                >
                  <option value="">Select Asset</option>
                  {assets.map(asset => (
                    <option key={asset.id} value={asset.id}>{asset.assetName}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.assetId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Warranty Number</Form.Label>
                <Form.Control
                  type="text"
                  value={warranties[0]?.warrantyNumber}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Warranty Status *</Form.Label>
                <Form.Select
                  value={formData.warrantyStatus}
                  onChange={e => handleFieldChange('warrantyStatus', e.target.value)}
                  isInvalid={!!errors.warrantyStatus}
                >
                  <option value="">Select Status</option>
                  {warrantyStatusList.map(ws => (
                    <option key={ws.value} value={ws.value}>{ws.label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.warrantyStatus}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Technician Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter technician name"
                  value={formData.technicianId}
                  onChange={e => handleFieldChange('technicianId', e.target.value)}
                  isInvalid={!!errors.technicianId}
                />
                <Form.Control.Feedback type="invalid">{errors.technicianId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Service Supplier Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter supplier name"
                  value={formData.supplierId}
                  onChange={e => handleFieldChange('supplierId', e.target.value)}
                  isInvalid={!!errors.supplierId}
                />
                <Form.Control.Feedback type="invalid">{errors.supplierId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Service Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.serviceDate ? formData.serviceDate.split('T')[0] : ''}
                  onChange={e => {
                    const dateValue = e.target.value;
                    if (dateValue) {
                      // Convert to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
                      const isoDate = new Date(dateValue + 'T00:00:00.000Z').toISOString();
                      handleFieldChange('serviceDate', isoDate);
                    } else {
                      handleFieldChange('serviceDate', '');
                    }
                  }}
                  isInvalid={!!errors.serviceDate}
                />
                <Form.Control.Feedback type="invalid">{errors.serviceDate}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Service Type *</Form.Label>
                <Form.Select
                  value={formData.serviceType}
                  onChange={e => handleFieldChange('serviceType', e.target.value)}
                  isInvalid={!!errors.serviceType}
                >
                  <option value="">Select Type</option>
                  {serviceTypeList.map(st => (
                    <option key={st.value} value={st.value}>{st.label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.serviceType}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Service Status *</Form.Label>
                <Form.Select
                  value={formData.serviceStatus}
                  onChange={e => handleFieldChange('serviceStatus', e.target.value)}
                  isInvalid={!!errors.serviceStatus}
                >
                  <option value="">Select Status</option>
                  {serviceStatusList.map(ss => (
                    <option key={ss.value} value={ss.value}>{ss.label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.serviceStatus}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>


          <Form.Group className="mb-3">
            <Form.Label>Service Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Provide detailed description of the service..."
              value={formData.serviceDescription}
              onChange={e => handleFieldChange('serviceDescription', e.target.value)}
              isInvalid={!!errors.serviceDescription}
            />
            <Form.Control.Feedback type="invalid">{errors.serviceDescription}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="secondary" 
              onClick={resetForm}
              disabled={loading}
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Service Request'}
            </Button>
    </div>
        </Form>
      </ComponentContainerCard>
    </>
  );
}