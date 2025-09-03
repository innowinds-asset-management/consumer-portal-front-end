"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { serviceContractService } from '@/services/api/serviceContract';
import { contractTypesService, ContractType } from '@/services/api/contractTypes';
import { serviceContractStatusService, ServiceContractStatus } from '@/services/api/serviceContractStatus';
import { serviceFrequencyService, ServiceFrequency } from '@/services/api/serviceFrequency';
import { paymentTermsService, PaymentTerms } from '@/services/api/paymentTerms';
import { assetsService, Asset } from '@/services/api/assets';
import { supplierService, Supplier } from '@/services/api/suppliers';
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
    paymentTerms: 'ONE_TIME', // Default to One Time payment terms
    contractType: '', // For contract type dropdown
    coverageType: 'COMPREHENSIVE', // For coverage type dropdown
    serviceFrequency: '',
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
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});

  // Contract types state
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [loadingContractTypes, setLoadingContractTypes] = useState(false);
  const [contractTypesError, setContractTypesError] = useState('');

  // Service contract statuses state
  const [serviceContractStatuses, setServiceContractStatuses] = useState<ServiceContractStatus[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(false);
  const [statusesError, setStatusesError] = useState('');

  // Service frequencies state
  const [serviceFrequencies, setServiceFrequencies] = useState<ServiceFrequency[]>([]);
  const [loadingFrequencies, setLoadingFrequencies] = useState(false);
  const [frequenciesError, setFrequenciesError] = useState('');

  // Payment terms state
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms[]>([]);
  const [loadingPaymentTerms, setLoadingPaymentTerms] = useState(false);
  const [paymentTermsError, setPaymentTermsError] = useState('');

  // Get supplier ID and asset ID from URL params
  const supplierId = searchParams.get('sid');
  const assetId = searchParams.get('aid');

  useEffect(() => {
    if (supplierId) {
      setFormData(prev => ({ ...prev, serviceSupplierId: supplierId }));
      // Automatically fetch and select the supplier when supplierId is present in URL
      fetchAndSelectSupplier(supplierId);
    }
    if (assetId) {
      setFormData(prev => ({ ...prev, assetId: assetId }));
      // Automatically fetch and select the asset when assetId is present in URL
      fetchAndSelectAsset(assetId);
    }
  }, [supplierId, assetId]);

  // Function to fetch and select asset by ID
  const fetchAndSelectAsset = async (id: string) => {
    try {
      const assetData = await assetsService.getAssetById(id);
      
      if (assetData) {
        setSelectedAsset(assetData);
        // Auto-populate contract name with asset name and serial number
        const contractName = assetData.consumerSerialNo 
          ? `${assetData.assetName} - ${assetData.consumerSerialNo}`
          : assetData.assetName;
        
        setFormData(prev => ({
          ...prev,
          contractName: contractName
        }));
      }
    } catch (error) {
      console.error('Error fetching asset:', error);
      // Don't show error to user as this is just auto-selection
    }
  };

  // Function to fetch and select supplier by ID
  const fetchAndSelectSupplier = async (id: string) => {
    try {
      const supplierData = await supplierService.getSupplierDetailsById(id);      
      if (supplierData) {
        setSelectedSupplier(supplierData);
      }
    } catch (error) {
      console.error('Error fetching supplier:', error);
      // Don't show error to user as this is just auto-selection
    }
  };

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

      // Fetch service frequencies
      setLoadingFrequencies(true);
      try {
        console.log('Fetching service frequencies...'); // Debug
        const frequenciesData = await serviceFrequencyService.getServiceFrequencies();
        console.log('Service frequencies response:', frequenciesData); // Debug
        setServiceFrequencies(frequenciesData);
      } catch (err) {
        console.error('Error fetching service frequencies:', err);
        setFrequenciesError('Failed to load service frequencies');
      } finally {
        setLoadingFrequencies(false);
      }

      // Fetch payment terms
      setLoadingPaymentTerms(true);
      try {
        console.log('Fetching payment terms...'); // Debug
        const paymentTermsData = await paymentTermsService.getPaymentTerms();
        console.log('Payment terms response:', paymentTermsData); // Debug
        setPaymentTerms(paymentTermsData);
      } catch (err) {
        console.error('Error fetching payment terms:', err);
        setPaymentTermsError('Failed to load payment terms');
      } finally {
        setLoadingPaymentTerms(false);
      }
    };

    fetchData();
  }, []);

  // Debug: Log contractTypes when it changes
  useEffect(() => {
    console.log('Contract types state updated:', contractTypes); // Debug
  }, [contractTypes]);

  // Set default status when statuses are loaded
  useEffect(() => {
    if (serviceContractStatuses.length > 0 && !isEdit) {
      // Find the Draft status (assuming it has statusId: 4 or name contains "Draft")
      const draftStatus = serviceContractStatuses.find(status => 
        status.statusId === 4 || status.name.toLowerCase().includes('draft')
      );
      
      if (draftStatus) {
        setFormData(prev => ({
          ...prev,
          status: draftStatus.statusId
        }));
      }
    }
  }, [serviceContractStatuses, isEdit]);

  // Set default payment terms when payment terms are loaded
  useEffect(() => {
    if (paymentTerms.length > 0 && !isEdit) {
      // Find the One Time payment terms (assuming it has paymentCode: 'ONE_TIME' or displayName contains "One Time")
      const oneTimePayment = paymentTerms.find(term => 
        term.paymentCode === 'ONE_TIME' || term.displayName.toLowerCase().includes('one time')
      );
      
      if (oneTimePayment) {
        setFormData(prev => ({
          ...prev,
          paymentTerms: oneTimePayment.paymentCode
        }));
      }
    }
  }, [paymentTerms, isEdit]);

  // Handle asset selection changes and update contract name accordingly
  useEffect(() => {
    if (selectedAsset) {
      // Asset is selected, contract name is already set in handleAssetSelect
      return;
    } else {
      // Asset is cleared, clear the contract name and asset ID
      setFormData(prev => ({
        ...prev,
        assetId: '',
        contractName: ''
      }));
    }
  }, [selectedAsset]);

  // Debug: Monitor validation errors changes
  useEffect(() => {
    console.log('Validation errors state changed:', validationErrors);
  }, [validationErrors]);

  const handleInputChange = (field: keyof AmcCmcFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'status' ? Number(value) : value
    }));
    
    // Clear validation error for this field when user starts typing/selecting
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset);
    
    // Auto-populate Contract Name with asset name and serial number
    let contractName = '';
    if (asset?.assetName) {
      contractName = asset.assetName;
      if (asset?.consumerSerialNo) {
        contractName += ` - ${asset.consumerSerialNo}`;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      assetId: asset?.id || '',
      contractName: contractName
    }));
    
    // Clear validation error for asset selection
    if (validationErrors.assetId) {
      setValidationErrors(prev => ({
        ...prev,
        assetId: false
      }));
    }
  };

  const handleSupplierSelect = (supplier: any) => {
    setSelectedSupplier(supplier);
    setFormData(prev => ({
      ...prev,
      serviceSupplierId: supplier?.id
    }));
    
    // Clear validation error for supplier selection
    if (validationErrors.serviceSupplierId) {
      setValidationErrors(prev => ({
        ...prev,
        serviceSupplierId: false
      }));
    }
  };

  // Validation function to check mandatory fields
  const validateForm = () => {
    const errors: { [key: string]: boolean } = {};
    
    // Check mandatory fields
    if (!formData.serviceSupplierId) errors.serviceSupplierId = true;
    if (!formData.assetId) errors.assetId = true;
    if (!formData.contractName?.trim()) errors.contractName = true;
    if (!formData.startDate) errors.startDate = true;
    if (!formData.endDate) errors.endDate = true;
    if (!formData.contractType) errors.contractType = true;
    if (!formData.coverageType) errors.coverageType = true;
    if (!formData.serviceFrequency) errors.serviceFrequency = true;
    if (!formData.paymentTerms) errors.paymentTerms = true;
    
    console.log('Validation errors:', errors); // Debug
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to check if a field has validation error
  const hasValidationError = (fieldName: string) => {
    const hasError = validationErrors[fieldName] === true;
    console.log(`Field ${fieldName} has error:`, hasError); // Debug
    return hasError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setError('Please fill in all mandatory fields');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage({ type: null, text: '' });

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
          setMessage({ type: 'success', text: 'Contract created successfully!' });
          
          // Reset form after successful submission - clear all fields to initial state
          setFormData({
            contractName: '',
            contractTypeId: undefined,
            startDate: '',
            endDate: '',
            paymentTerms: 'ONE_TIME', // Reset to default One Time
            contractType: '',
            coverageType: 'COMPREHENSIVE',
            serviceFrequency: '',
            includes: '',
            excludes: '',
            preventiveMaintenanceIncluded: true,
            breakdownMaintenanceIncluded: true,
            autoRenewal: false,
            createdBy: '',
            status: 4,
            amount: undefined,
            serviceSupplierId: '', // Clear selected supplier
            assetId: '', // Clear selected asset
          });
          
          // Reset selected components to clear the UI dropdowns
          setSelectedAsset(null);
          setSelectedSupplier(null);
          
          // Reset submitted state after 3 seconds
          setTimeout(() => setSubmitted(false), 3000);
        }
      }
    } catch (err) {
              setError('Failed to save contract. Please try again.');
        setMessage({ type: 'error', text: 'Failed to save contract. Please try again.' });
      console.error('Error saving contract:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Card className="border-0">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{isEdit ? 'Edit AMC/CMC Contract' : 'Create New AMC/CMC Contract'}</h5>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Supplier Selection */}
            <Col md={12}>
              <div 
                className="position-relative" 
                style={{ 
                  width: '100%',
                  overflow: 'visible'
                }}
              >
                <SearchableSupplier
                  onSupplierSelect={handleSupplierSelect}
                  selectedSupplier={selectedSupplier}
                  placeholder="Search for suppliers..."
                  label="Select Service Supplier"
                  required={true}
                  error={hasValidationError('serviceSupplierId') ? 'Please select a service supplier' : ''}
                />
              </div>
            </Col>

            {/* Asset Selection */}
            <Col md={12}>
              <div 
                className="position-relative" 
                style={{ 
                  width: '100%',
                  overflow: 'visible'
                }}
              >
                <SearchAsset
                  onAssetSelect={handleAssetSelect}
                  selectedAsset={selectedAsset}
                  placeholder="Search for assets..."
                  label="Select Asset"
                  required={true}
                  error={hasValidationError('assetId') ? 'Please select an asset' : ''}
                />
              </div>
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
                  className={validationErrors.contractName ? 'is-invalid' : ''}
                  style={validationErrors.contractName ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                />
                {validationErrors.contractName && (
                  <div className="invalid-feedback">Contract name is required</div>
                )}
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
                  className={validationErrors.startDate ? 'is-invalid' : ''}
                  style={validationErrors.startDate ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                />
                {validationErrors.startDate && (
                  <div className="invalid-feedback">Start date is required</div>
                )}
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
                  className={validationErrors.endDate ? 'is-invalid' : ''}
                  style={validationErrors.endDate ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                />
                {validationErrors.endDate && (
                  <div className="invalid-feedback">End date is required</div>
                )}
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
                  disabled={loadingPaymentTerms}
                  className={validationErrors.paymentTerms ? 'is-invalid' : ''}
                  style={validationErrors.paymentTerms ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                >
                  <option value="">
                    {loadingPaymentTerms ? 'Loading payment terms...' : 'Select payment terms'}
                  </option>
                  {paymentTerms.map((term) => (
                    <option key={term.paymentCode} value={term.paymentCode}>
                      {term.displayName}
                    </option>
                  ))}
                </Form.Select>
                {validationErrors.paymentTerms && (
                  <div className="invalid-feedback">Payment terms are required</div>
                )}
                {paymentTermsError && (
                  <div className="text-danger small mt-1">{paymentTermsError}</div>
                )}
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
                  className={validationErrors.contractType ? 'is-invalid' : ''}
                  style={validationErrors.contractType ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
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
                {validationErrors.contractType && (
                  <div className="invalid-feedback">Contract type is required</div>
                )}
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
                
              </Form.Group>
            </Col>

            {/* Coverage Type */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Coverage *</Form.Label>
                <Form.Select
                  value={formData.coverageType}
                  onChange={(e) => handleInputChange('coverageType', e.target.value)}
                  required
                  className={validationErrors.coverageType ? 'is-invalid' : ''}
                  style={validationErrors.coverageType ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                >
                  <option value="">Select coverage</option>
                  <option value="COMPREHENSIVE">Comprehensive</option>
                  <option value="PARTS_ONLY">Parts Only</option>
                  <option value="LABOR_ONLY">Labor Only</option>
                  <option value="PREVENTIVE_ONLY">Preventive Only</option>
                </Form.Select>
                {validationErrors.coverageType && (
                  <div className="invalid-feedback">Coverage type is required</div>
                )}
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
                  disabled={loadingFrequencies}
                  className={validationErrors.serviceFrequency ? 'is-invalid' : ''}
                  style={validationErrors.serviceFrequency ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
                >
                  <option value="">
                    {loadingFrequencies ? 'Loading frequencies...' : 'Select service frequency'}
                  </option>
                  {serviceFrequencies.map((frequency) => (
                    <option key={frequency.code} value={frequency.code}>
                      {frequency.displayName}
                    </option>
                  ))}
                </Form.Select>
                {validationErrors.serviceFrequency && (
                  <div className="invalid-feedback">Service frequency is required</div>
                )}
                {frequenciesError && (
                  <div className="text-danger small mt-1">{frequenciesError}</div>
                )}
              </Form.Group>
            </Col>

            {/* Status */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  value={formData.status ? formData.status.toString() : ""}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  required
                  disabled={loadingStatuses}
                  className={validationErrors.status ? 'is-invalid' : ''}
                  style={validationErrors.status ? { borderColor: '#dc3545', borderWidth: '2px' } : {}}
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
                {validationErrors.status && (
                  <div className="invalid-feedback">Status is required</div>
                )}
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
                <Form.Label>Included</Form.Label>
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
                <Form.Label>Excluded</Form.Label>
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Preventive Maintenance Included"
                      checked={formData.preventiveMaintenanceIncluded}
                      onChange={(e) => handleInputChange('preventiveMaintenanceIncluded', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Breakdown Maintenance Included"
                      checked={formData.breakdownMaintenanceIncluded}
                      onChange={(e) => handleInputChange('breakdownMaintenanceIncluded', e.target.checked)}
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

      {/* Message Display */}
      {message.type && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`} 
             style={{ top: '20px', right: '20px', zIndex: 9999, minWidth: '300px' }}>
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: null, text: '' })}></button>
        </div>
      )}
    </>
  );
}
