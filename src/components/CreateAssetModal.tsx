import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Card, CardBody, Col, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Form } from 'react-bootstrap'
import { AssetType, assetTypesService } from '@/services/api/assetTypes'
import { AssetSubType, assetSubTypesService } from '@/services/api/assetSubTypes'
import { consumerSupplierService } from '@/services/api/consumerSupplier'

// Asset form interface
interface AssetForm {
  assetType: string
  assetSubType: string
  poId: string
  itemName: string
  partNo: string
  grnId: string
  grnItemId: string
  poLineItemId: string
  supplierId: string
  consumerId: string
}

// GRN line item interface
interface GrnLineItem {
  id: string
  poLineItemId: string
  icon: string
  partNo: string
  itemName: string
  qtyOrdered: number
  qtyAccepted: number
  qtyRejected: number
  qtyPending: number
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
  const [supplierId, setSupplierId] = useState<string>('')
  const [consumerId, setConsumerId] = useState<string>('')
  
  useEffect(() => {
    const fetchAssetSubTypes = async () => {
      const data = await assetSubTypesService.getActiveAssetSubTypes()
      setAssetSubTypes(data)
    }
    fetchAssetSubTypes()
  }, [])

  
  
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
          <IconifyIcon icon="tabler:plus" className="me-2" />
          Create Asset from GRN
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="p-3">
        <Card>
                        <CardBody className="p-3">
                <h5 className="card-title mb-3">Select Item from GRN to Create Asset</h5>
                
                <Row>
                  <Col md={4}>
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
                  <Col md={4}>
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
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label>Qty Accepted</Form.Label>
                      <Form.Control
                        type="text"
                        value={items.length > 0 ? items[0].qtyAccepted.toString() : '0'}
                        readOnly
                        className="bg-light"
                      />
                    </div>
                  </Col>
                </Row>
                
                <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <Table className="table-nowrap align-middle mb-0 table-sm">
                                          <thead>
                        <tr className="bg-light bg-opacity-50">
                          <th>Part No</th>
                          <th>Item Name</th>
                          <th>PO ID</th>
                          <th>PO Line Item ID</th>
                          <th>GRN ID</th>
                          <th>GRN Item ID</th>
                        </tr>
                      </thead>
                    <tbody>
                                              {items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.partNo}</td>
                            <td>{item.itemName}</td>
                            <td>{grn?.poId || ''}</td>
                            <td>{item.poLineItemId}</td>
                            <td>{grn?.id || ''}</td>
                            <td>{item.id}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
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
            disabled={!assetForm.assetType}
          >
          <IconifyIcon icon="tabler:plus" className="me-1" />
          Create Asset
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateAssetModal
