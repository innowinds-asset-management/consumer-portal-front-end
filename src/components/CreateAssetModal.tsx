import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Card, CardBody, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import { AssetType, assetTypesService } from '@/services/api/assetTypes'
import { AssetSubType, assetSubTypesService } from '@/services/api/assetSubTypes'

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
      size="xl"
      centered
      backdrop="static"
      keyboard={false}
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
      <ModalBody className="p-3">
        <Card>
                        <CardBody className="p-3">
                <h5 className="card-title mb-3">Select Item from GRN to Create Asset</h5>
                
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
                
                <div className="mb-3">
                  <Form.Label>Serial Numbers (Comma separated)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
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
          Create Asset
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateAssetModal
