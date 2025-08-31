"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { serviceContractService } from '@/services/api/serviceContract';
import { contractTypesService, ContractType } from '@/services/api/contractTypes';
import { serviceContractStatusService, ServiceContractStatus } from '@/services/api/serviceContractStatus';
import SearchAsset from '@/components/searchAsset';
import SearchableSupplier from '@/components/searchableSupplier';

interface AmcCmcFormData {
  contractName: string;
  startDate: string;
  endDate: string;
  paymentTerms: string;
  contractType: string; // For contract type dropdown
  coverageType: string; // For coverage type dropdown
  serviceFrequency: string;
  includes: string;
  excludes: string;
  preventiveMaintenanceIncluded: boolean;
  breakdownMaintenanceIncluded: boolean;
  autoRenewal: boolean;
  createdBy: string;
  status: number;
  amount?: number;
  contractTypeId?: number;
  serviceSupplierId?: string;
  assetId?: string;
}

interface AmcCmcFormProps {
  initialData?: Partial<AmcCmcFormData>;
  isEdit?: boolean;
  onSubmit?: (data: AmcCmcFormData) => void;
}

const PAYMENT_TERMS_OPTIONS = [
  { value: 'YEARLY', label: 'Yearly' },
  { value: 'QUARTERLY', label: 'Quarterly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'ONE_TIME', label: 'One Time' }
];

// Status options will be loaded dynamically from API

export default function AmcCmcForm({ initialData, isEdit = false, onSubmit }: AmcCmcFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<AmcCmcFormData>({
    contractName: '',
    // Set contractTypeId to the value from initialData if provided, otherwise undefined.
    contractTypeId: initialData?.contractTypeId ?? undefined,
    startDate: '',
    endDate: '',
    paymentTerms: 'YEARLY',
    contractType: '', // For contract type dropdown
    coverageType: 'COMPREHENSIVE', // For coverage type dropdown
    serviceFrequency: 'QUARTERLY',
    includes: '',
    excludes: '',
    preventiveMaintenanceIncluded: true,
    breakdownMaintenanceIncluded: true,
    autoRenewal: false,
    createdBy: '',
    status: initialData?.status ?? 4, // Default to Draft status (statusId: 4)
    amount: undefined,
    ...initialData
  });

  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Contract types state
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [loadingContractTypes, setLoadingContractTypes] = useState(false);
  const [contractTypesError, setContractTypesError] = useState('');

  // Service contract statuses state
  const [serviceContractStatuses, setServiceContractStatuses] = useState<ServiceContractStatus[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(false);
  const [statusesError, setStatusesError] = useState('');

  // Get supplier ID and asset ID from URL params
  const supplierId = searchParams.get('sid');
  const assetId = searchParams.get('aid');

  useEffect(() => {
    if (supplierId) {
      setFormData(prev => ({ ...prev, serviceSupplierId: supplierId }));
    }
    if (assetId) {
      setFormData(prev => ({ ...prev, assetId: assetId }));
    }
  }, [supplierId, assetId]);

  // Load contract types and service contract statuses on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch contract types
      setLoadingContractTypes(true);
      try {
        console.log('Fetching contract types...'); // Debug
        const contractTypesData = await contractTypesService.getContractTypes();
        console.log('Contract types response:', contractTypesData); // Debug
        setContractTypes(contractTypesData);
      } catch (err) {
        console.error('Error fetching contract types:', err);
        setContractTypesError('Failed to load contract types');
      } finally {
        setLoadingContractTypes(false);
      }

      // Fetch service contract statuses
      setLoadingStatuses(true);
      try {
        console.log('Fetching service contract statuses...'); // Debug
        const statusesData = await serviceContractStatusService.getServiceContractStatuses();
        console.log('Service contract statuses response:', statusesData); // Debug
        setServiceContractStatuses(statusesData);
      } catch (err) {
        console.error('Error fetching service contract statuses:', err);
        setStatusesError('Failed to load service contract statuses');
      } finally {
        setLoadingStatuses(false);
      }
    };

    fetchData();
  }, []);

  // Debug: Log contractTypes when it changes
  useEffect(() => {
    console.log('Contract types state updated:', contractTypes); // Debug
  }, [contractTypes]);

  const handleInputChange = (field: keyof AmcCmcFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'status' ? Number(value) : value
    }));
  };

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset);
    setFormData(prev => ({
      ...prev,
      assetId: asset?.id
    }));
  };

  const handleSupplierSelect = (supplier: any) => {
    setSelectedSupplier(supplier);
    setFormData(prev => ({
      ...prev,
      serviceSupplierId: supplier?.id
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submit behavior
        if (isEdit) {
          // Handle edit - you'll need to pass contractId
          console.log('Edit contract:', formData);
        } else {
          // Handle create - transform form data to match ServiceContract interface
          const { status, contractType, coverageType, serviceFrequency, ...formDataWithoutStatus } = formData;          
          // Find the selected contract type to get its ID
          const selectedContractType = contractTypes.find(type => type.typeName === contractType);          
          const contractData = {
            ...formDataWithoutStatus,
            statusId: status, 
            contractTypeId: selectedContractType?.contractTypeId,
            paymentTerms: formData.paymentTerms as any,
            serviceFrequency: serviceFrequency as any, // Use selected service frequency
            includes: formData.includes || '',
            excludes: formData.excludes || '',
            createdBy: formData.createdBy || '',
            updatedBy: null
          } as any; // Type assertion to bypass interface mismatch
          
          // Log the final request body that will be sent to API
          console.log('🚀 Final Request Body for Service Contract Creation:', JSON.stringify(contractData, null, 2));
          
          await serviceContractService.createServiceContract(contractData);
          setSubmitted(true);
          setSuccess('Contract created successfully!');
          
          // Reset form after successful submission
          setFormData({
            contractName: '',
            contractTypeId: undefined,
            startDate: '',
            endDate: '',
            paymentTerms: 'YEARLY',
            contractType: '',
            coverageType: 'COMPREHENSIVE',
            serviceFrequency: 'QUARTERLY',
            includes: '',
            excludes: '',
            preventiveMaintenanceIncluded: true,
            breakdownMaintenanceIncluded: true,
            autoRenewal: false,
            createdBy: '',
            status: 4,
            amount: undefined,
            serviceSupplierId: formData.serviceSupplierId, // Keep selected supplier
            assetId: formData.assetId, // Keep selected asset
          });
          
          // Reset selected components
          setSelectedAsset(null);
          setSelectedSupplier(null);
          
          // Reset submitted state after 3 seconds
          setTimeout(() => setSubmitted(false), 3000);
        }
      }
    } catch (err) {
      setError('Failed to save contract. Please try again.');
      console.error('Error saving contract:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Card className="border-0">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{isEdit ? 'Edit AMC/CMC Contract' : 'Create New AMC/CMC Contract'}</h5>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {submitted && (
          <Alert variant="success" className="mb-4">
            Contract created successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Supplier Selection */}
            <Col md={12}>
              <SearchableSupplier
                onSupplierSelect={handleSupplierSelect}
                selectedSupplier={selectedSupplier}
                placeholder="Search for suppliers..."
                label="Select Service Supplier"
                required={true}
                error={formData.serviceSupplierId ? '' : 'Please select a service supplier'}
              />
            </Col>

            {/* Asset Selection */}
            <Col md={12}>
              <SearchAsset
                onAssetSelect={handleAssetSelect}
                selectedAsset={selectedAsset}
                placeholder="Search for assets..."
                label="Select Asset"
                required={true}
                error={formData.assetId ? '' : 'Please select an asset'}
              />
            </Col>

            {/* Contract Name */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contract Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.contractName}
                  onChange={(e) => handleInputChange('contractName', e.target.value)}
                  required
                  placeholder="Enter contract name"
                />
              </Form.Group>
            </Col>

            {/* Amount */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.amount || ''}
                  onChange={(e) => handleInputChange('amount', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="Enter contract amount"
                />
              </Form.Group>
            </Col>

            {/* Start Date */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            {/* End Date */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>End Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            {/* Payment Terms */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Terms *</Form.Label>
                <Form.Select
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  required
                >
                  {PAYMENT_TERMS_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Contract Type */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contract Type *</Form.Label>
                <Form.Select
                  value={formData.contractType}
                  onChange={(e) => handleInputChange('contractType', e.target.value)}
                  required
                  disabled={loadingContractTypes}
                >
                  <option value="">
                    {loadingContractTypes ? "Loading contract types..." : "Select contract type"}
                  </option>
                  {contractTypes.length > 0 ? (
                    contractTypes.map((type, index) => (
                      <option key={type.contractTypeId || `contract-type-${index}`} value={type.typeName}>
                        {type.typeName}
                      </option>
                    ))
                  ) : (
                    !loadingContractTypes && (
                      <option value="" disabled>No contract types available</option>
                    )
                  )}
                </Form.Select>
                {loadingContractTypes && (
                  <div className="mt-2">
                    <small className="text-muted">Loading contract types...</small>
                  </div>
                )}
                {contractTypesError && (
                  <div className="mt-2">
                    <small className="text-danger">{contractTypesError}</small>
                  </div>
                )}
                {/* Debug info */}
                <div className="mt-1">
                  <small className="text-muted">
                    Debug: {contractTypes.length} contract types loaded
                  </small>
                </div>
              </Form.Group>
            </Col>

            {/* Coverage Type */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Coverage Type *</Form.Label>
                <Form.Select
                  value={formData.coverageType}
                  onChange={(e) => handleInputChange('coverageType', e.target.value)}
                  required
                >
                  <option value="">Select coverage type</option>
                  <option value="COMPREHENSIVE">Comprehensive</option>
                  <option value="PARTS_ONLY">Parts Only</option>
                  <option value="LABOR_ONLY">Labor Only</option>
                  <option value="PREVENTIVE_ONLY">Preventive Only</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Service Frequency */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Service Frequency *</Form.Label>
                <Form.Select
                  value={formData.serviceFrequency}
                  onChange={(e) => handleInputChange('serviceFrequency', e.target.value)}
                  required
                >
                  <option value="">Select service frequency</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="HALF_YEARLY">Half Yearly</option>
                  <option value="YEARLY">Yearly</option>
                  <option value="AS_REQUIRED">As Required</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Status */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  value={formData.status.toString()}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  required
                  disabled={loadingStatuses}
                >
                  <option value="">
                    {loadingStatuses ? "Loading statuses..." : "Select status"}
                  </option>
                  {serviceContractStatuses.length > 0 ? (
                    serviceContractStatuses.map((status) => (
                      <option key={status.statusId} value={status.statusId}>
                        {status.name}
                      </option>
                    ))
                  ) : (
                    !loadingStatuses && (
                      <option value="" disabled>No statuses available</option>
                    )
                  )}
                </Form.Select>
                {loadingStatuses && (
                  <div className="mt-2">
                    <small className="text-muted">Loading statuses...</small>
                  </div>
                )}
                {statusesError && (
                  <div className="mt-2">
                    <small className="text-danger">{statusesError}</small>
                  </div>
                )}
              </Form.Group>
            </Col>

            {/* Created By */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Created By</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.createdBy}
                  onChange={(e) => handleInputChange('createdBy', e.target.value)}
                  placeholder="Enter creator name"
                />
              </Form.Group>
            </Col>

            {/* Includes */}
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Includes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.includes}
                  onChange={(e) => handleInputChange('includes', e.target.value)}
                  placeholder="Describe what is included in this contract"
                />
              </Form.Group>
            </Col>

            {/* Excludes */}
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Excludes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.excludes}
                  onChange={(e) => handleInputChange('excludes', e.target.value)}
                  placeholder="Describe what is excluded from this contract"
                />
              </Form.Group>
            </Col>

            {/* Checkboxes */}
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Preventive Maintenance Included"
                      checked={formData.preventiveMaintenanceIncluded}
                      onChange={(e) => handleInputChange('preventiveMaintenanceIncluded', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Breakdown Maintenance Included"
                      checked={formData.breakdownMaintenanceIncluded}
                      onChange={(e) => handleInputChange('breakdownMaintenanceIncluded', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Auto Renewal"
                      checked={formData.autoRenewal}
                      onChange={(e) => handleInputChange('autoRenewal', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Update Contract' : 'Create Contract'
              )}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
