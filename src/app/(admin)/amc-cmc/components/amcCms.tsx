"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { serviceContractService } from '@/services/api/serviceContract';
import SearchAsset from '@/components/searchAsset';
import SearchableSupplier from '@/components/searchableSupplier';

interface AmcCmcFormData {
  contractName: string;
  startDate: string;
  endDate: string;
  paymentTerms: string;
  coverageType: string;
  includes: string;
  excludes: string;
  preventiveMaintenanceIncluded: boolean;
  breakdownMaintenanceIncluded: boolean;
  autoRenewal: boolean;
  createdBy: string;
  status: string;
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

const COVERAGE_TYPE_OPTIONS = [
  { value: 'COMPREHENSIVE', label: 'Comprehensive' },
  { value: 'BASIC', label: 'Basic' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'CUSTOM', label: 'Custom' }
];

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

export default function AmcCmcForm({ initialData, isEdit = false, onSubmit }: AmcCmcFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<AmcCmcFormData>({
    contractName: '',
    startDate: '',
    endDate: '',
    paymentTerms: 'YEARLY',
    coverageType: 'COMPREHENSIVE',
    includes: '',
    excludes: '',
    preventiveMaintenanceIncluded: true,
    breakdownMaintenanceIncluded: true,
    autoRenewal: false,
    createdBy: '',
    status: 'PENDING',
    amount: undefined,
    ...initialData
  });

  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleInputChange = (field: keyof AmcCmcFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
          const { status, ...formDataWithoutStatus } = formData;
          const contractData = {
            ...formDataWithoutStatus,
            statusId: parseInt(status) || 1, // Convert status string to statusId
            paymentTerms: formData.paymentTerms as any,
            coverageType: formData.coverageType as any,
            serviceFrequency: 'QUARTERLY' as any, // Default value
            includes: formData.includes || '',
            excludes: formData.excludes || '',
            createdBy: formData.createdBy || '',
            updatedBy: null
          };
          
          await serviceContractService.createServiceContract(contractData);
          setSuccess('Contract created successfully!');
          setTimeout(() => {
            router.back();
          }, 2000);
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
        {success && <Alert variant="success">{success}</Alert>}

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

            {/* Coverage Type */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Coverage Type *</Form.Label>
                <Form.Select
                  value={formData.coverageType}
                  onChange={(e) => handleInputChange('coverageType', e.target.value)}
                  required
                >
                  {COVERAGE_TYPE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Status */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  required
                >
                  {STATUS_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
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
