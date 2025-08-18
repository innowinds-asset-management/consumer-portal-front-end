import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Card, CardBody, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import { AssetType, assetTypesService } from '@/services/api/assetTypes'
import { AssetSubType, assetSubTypesService } from '@/services/api/assetSubTypes'
import { warrantyTypeService, WarrantyType } from '@/services/api/warrantyTypes'
import { STORAGE_KEYS } from "@/utils/constants";

// Asset form interface
interface AssetForm {
  assetType: string
  assetSubType: string
  poId: string
  assetName: string
  partNo: string
  grnId: string
  grnItemId: string
  poLineItemId: string
  supplierId: string
  consumerId: string
  serialNumbers: string
  // Warranty fields
  warrantyType: string | number
  warrantyStartDate: string
  warrantyEndDate: string
  warrantyPeriod: number
  coverageType: string
  coverageDescription: string
  termsConditions: string
  included: string
  excluded: string
}

// GRN line item interface
interface GrnLineItem {
  id: string
  poLineItemId: string
  partNo: string
  assetName: string
  qtyAccepted: number
}

// Props interface
interface CreateAssetModalProps {
  show: boolean
  onHide: () => void
  grn: any
  items: GrnLineItem[]
  assetForm: AssetForm
  onAssetFormChange: (field: string, value: string) => void
  onCreateAsset: () => void
}

const CreateAssetModal: React.FC<CreateAssetModalProps> = ({
  show,
  onHide,
  grn,
  items,
  assetForm,
  onAssetFormChange,
  onCreateAsset
}) => {

  //fetch asset type from DB
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([])
  useEffect(() => {
    const fetchAssetTypes = async () => {
        const data = await assetTypesService.getActiveAssetTypes()
        setAssetTypes(data)
    }
    fetchAssetTypes()
  }, [])

  //fetch asset sub type from DB
  const [assetSubTypes, setAssetSubTypes] = useState<AssetSubType[]>([])
  
  useEffect(() => {
    const fetchAssetSubTypes = async () => {
      const data = await assetSubTypesService.getActiveAssetSubTypes()
      setAssetSubTypes(data)
    }
    fetchAssetSubTypes()
  }, [])

  //fetch warranty types from DB
  const [warrantyTypes, setWarrantyTypes] = useState<WarrantyType[]>([])
  const [loadingWarrantyTypes, setLoadingWarrantyTypes] = useState(true)
  
  useEffect(() => {
    const fetchWarrantyTypes = async () => {
      try {
        setLoadingWarrantyTypes(true)
        const storedConsumerId = localStorage.getItem(STORAGE_KEYS.consumerId)
        const consumerId = storedConsumerId ? storedConsumerId : ""
        
        if (!consumerId) {
          console.warn("Consumer ID not found")
          setWarrantyTypes([])
          return
        }
        
        const data = await warrantyTypeService.getWarrantyTypesByConsumerId(consumerId)
        setWarrantyTypes(data)
      } catch (err) {
        console.error('Error fetching warranty types:', err)
        setWarrantyTypes([])
      } finally {
        setLoadingWarrantyTypes(false)
      }
    }
    fetchWarrantyTypes()
  }, [])

  // Calculate warranty end date based on start date and period
  const calculateWarrantyEndDate = (startDate: string, durationMonths: number): string => {
    if (!startDate || durationMonths <= 0) return "";
    const start = new Date(startDate);
    const end = new Date(start.getTime() + (durationMonths * 30 * 24 * 60 * 60 * 1000));
    return end.toISOString().split('T')[0];
  };

  // Calculate warranty period in months based on start and end dates
  const calculateWarrantyPeriod = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in years and months
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    
    // Calculate total months difference
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    
    // Adjust for day of month
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    // If end day is before start day, subtract 1 month
    if (endDay < startDay) {
      return Math.max(0, totalMonths - 1);
    }
    
    return Math.max(0, totalMonths);
  };

  // Validation function for serial numbers
  const getSerialNumberValidation = () => {
    // If no serial numbers entered, it's valid (optional field)
    if (!assetForm.serialNumbers || assetForm.serialNumbers.trim() === '') {
      return { isValid: true, message: 'Serial numbers are optional' }
    }
    
    const serialNumbers = assetForm.serialNumbers
      .split(',')
      .map(sn => sn.trim())
      .filter(sn => sn.length > 0)
    
    const expectedCount = items.length > 0 ? items[0].qtyAccepted : 0
    

    
    // If serial numbers are provided, validate the count
    if (serialNumbers.length > 0) {
      if (serialNumbers.length < expectedCount) {
        return { isValid: false, message: `Please enter ${expectedCount - serialNumbers.length} more serial number(s). Current: ${serialNumbers.length}, Expected: ${expectedCount}` }
      }
      
      if (serialNumbers.length > expectedCount) {
        return { isValid: false, message: `Please remove ${serialNumbers.length - expectedCount} serial number(s). Expected: ${expectedCount}` }
      }
      
      return { isValid: true, message: `✓ Valid: ${serialNumbers.length} serial numbers entered` }
    }
    
    return { isValid: true, message: 'Serial numbers are optional' }
  }

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      size="lg"
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="modal-dialog-centered"
      style={{ 
        maxWidth: '800px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <ModalHeader closeButton>
        <ModalTitle>
          <div>
            <div className="d-flex align-items-center">
              <IconifyIcon icon="tabler:plus" className="me-2" />
              Create Asset from GRN
            </div>
            {items.length > 0 && (
              <div className="mt-2 text-muted fs-14" style={{ marginLeft: '28px' }}>
                <div className="mb-1"><strong>Part No:</strong> {items[0].partNo}</div>
                <div className="mb-1"><strong>Item Name:</strong> {items[0].assetName}</div>
                <div><strong>Qty Accepted:</strong> {items[0].qtyAccepted}</div>
              </div>
            )}
          </div>
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="p-2">
        <Card>
                        <CardBody className="p-2">
                <h6 className="card-title mb-2">Select Item from GRN to Create Asset</h6>
                
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Form.Label>Asset Type *</Form.Label>
                      <Form.Select
                        value={assetForm.assetType}
                        onChange={(e) => onAssetFormChange('assetType', e.target.value)}
                      >
                        <option value="">Select asset type</option>
                        {assetTypes.map((assetType) => (
                          <option key={assetType.id} value={assetType.id}>
                            {assetType.assetName}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Form.Label>Asset Sub Type</Form.Label>
                      <Form.Select
                        value={assetForm.assetSubType}
                        onChange={(e) => onAssetFormChange('assetSubType', e.target.value)}
                        disabled={!assetForm.assetType}
                      >
                        <option value="">Select asset sub type</option>
                        {assetSubTypes
                          .filter(subType => subType.assetTypeId === assetForm.assetType)
                          .map((subType) => (
                            <option key={subType.id} value={subType.id}>
                              {subType.name}   
                            </option>
                          ))}
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                
                <div className="mb-2">
                  <Form.Label>Serial Numbers (Comma separated)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter serial numbers separated by commas (e.g., SR-01, SR-02, SR-03)"
                    value={assetForm.serialNumbers || ''}
                    onChange={(e) => onAssetFormChange('serialNumbers', e.target.value)}
                  />
                  <small className="text-muted">
                    Serial numbers are optional. If provided, enter exactly {items.length > 0 ? items[0].qtyAccepted : 0} serial numbers separated by commas
                  </small>
                  {assetForm.serialNumbers && (
                    <div className="mt-2">
                      <small className={`${getSerialNumberValidation().isValid ? 'text-success' : 'text-danger'}`}>
                        {getSerialNumberValidation().message}
                      </small>
                    </div>
                  )}
                </div>

                {/* Warranty Information Section */}
                <div className="mt-4">
                  <h6 className="card-title mb-3 border-bottom pb-2">
                    <IconifyIcon icon="tabler:shield-check" className="me-2" />
                    Warranty Information
                  </h6>
                  
                  {/* Row 1: Warranty Type, Coverage Type, Warranty Period */}
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Warranty Type</Form.Label>
                        <Form.Select
                          value={assetForm.warrantyType || ''}
                          onChange={(e) => onAssetFormChange('warrantyType', e.target.value)}
                          disabled={loadingWarrantyTypes}
                        >
                          <option value="">
                            {loadingWarrantyTypes ? "Loading warranty types..." : "Select warranty type (optional)"}
                          </option>
                          {warrantyTypes.map((warrantyType) => (
                            <option key={warrantyType.warrantyTypeId} value={warrantyType.warrantyTypeId}>
                              {warrantyType.typeName}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Coverage Type</Form.Label>
                        <Form.Select
                          value={assetForm.coverageType || ''}
                          onChange={(e) => onAssetFormChange('coverageType', e.target.value)}
                        >
                          <option value="">Select coverage type (optional)</option>
                          <option value="parts">Parts Only</option>
                          <option value="labor">Labor Only</option>
                          <option value="parts_labor">Parts & Labor</option>
                          <option value="comprehensive">Comprehensive</option>
                          <option value="premium">Premium</option>
                        </Form.Select>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Warranty Period (months)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter warranty period in months (optional)"
                          min="0"
                          value={assetForm.warrantyPeriod || ''}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            onAssetFormChange('warrantyPeriod', value.toString());
                            // Auto-calculate warranty end date
                            if (assetForm.warrantyStartDate) {
                              const endDate = calculateWarrantyEndDate(assetForm.warrantyStartDate, value);
                              onAssetFormChange('warrantyEndDate', endDate);
                            }
                          }}
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* Row 2: Warranty Start Date, Warranty End Date, Included */}
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Warranty Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={assetForm.warrantyStartDate || ''}
                          onChange={(e) => {
                            onAssetFormChange('warrantyStartDate', e.target.value);
                            // Auto-calculate warranty end date and period
                            if (e.target.value && assetForm.warrantyPeriod) {
                              const endDate = calculateWarrantyEndDate(e.target.value, assetForm.warrantyPeriod);
                              onAssetFormChange('warrantyEndDate', endDate);
                            }
                          }}
                        />
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Warranty End Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={assetForm.warrantyEndDate || ''}
                          onChange={(e) => {
                            onAssetFormChange('warrantyEndDate', e.target.value);
                            // Auto-calculate warranty period
                            if (e.target.value && assetForm.warrantyStartDate) {
                              const period = calculateWarrantyPeriod(assetForm.warrantyStartDate, e.target.value);
                              onAssetFormChange('warrantyPeriod', period.toString());
                            }
                          }}
                        />
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Included</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="What's included in warranty"
                          value={assetForm.included || ''}
                          onChange={(e) => onAssetFormChange('included', e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* Row 3: Excluded */}
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Label>Excluded</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="What's excluded from warranty"
                          value={assetForm.excluded || ''}
                          onChange={(e) => onAssetFormChange('excluded', e.target.value)}
                        />
                      </div>
                    </Col>
                    
                    <Col md={8}>
                      {/* Empty column for balance */}
                    </Col>
                  </Row>


                </div>
              </CardBody>
            </Card>
          </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={onCreateAsset}
          disabled={!assetForm.assetType || !getSerialNumberValidation().isValid}
        >
          <IconifyIcon icon="tabler:plus" className="me-1" />
          Generate serial number with asset
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateAssetModal
