"use client";

import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import { Button, Card, CardBody, Col, Row, Table, Alert } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import { grnService, Grn } from '@/services/api/grn'
import { assetsService } from '@/services/api/assets'
import CreateAssetModal from '@/components/CreateAssetModal'
import PrintButton from '@/components/PrintButton';

// Line item display type
type GrnLineItemDisplay = {
  id: string
  poLineItemId: string
  icon: string
  partNo: string
  assetName: string
  qtyOrdered: number
  qtyAccepted: number
  qtyRejected: number
  qtyPending: number
}

const GrnDetailPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const grnId = searchParams.get('id')

  // Enhanced back navigation handler
  const handleBackNavigation = () => {
    // Try to go back, but with fallback
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to GRN listing page
      router.push('/grn')
    }
  }

  const [grn, setGrn] = useState<Grn | null>(null)
  const [items, setItems] = useState<GrnLineItemDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  
  // Modal state
  const [showCreateAssetModal, setShowCreateAssetModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GrnLineItemDisplay | null>(null)
  
  // Asset form state
  const [assetForm, setAssetForm] = useState({
    assetType: '',
    assetSubType: '',
    poId: '',
    assetName: '',
    partNo: '',
    grnId: '',
    grnItemId: '',
    poLineItemId: '',
    supplierId: '',
    consumerId: '',
    serialNumbers: '',
    // Warranty fields
    warrantyType: '',
    warrantyStartDate: new Date().toISOString().split('T')[0],
    warrantyEndDate: new Date().toISOString().split('T')[0],
    warrantyPeriod: 0,
    coverageType: '',
    coverageDescription: '',
    termsConditions: '',
    included: '',
    excluded: ''
  })

  useEffect(() => {
    const fetchGrn = async () => {
      if (!grnId) {
        setError('GRN ID is required')
        setLoading(false)
        return
      }
      setLoading(true)
      setError('')
      try {
        const data = await grnService.getGrnById(grnId)
        setGrn(data)
        const mapped = (data.grnItem || []).map(it => ({
          id: it.id || '',
          poLineItemId: it.poLineItemId || '',
          icon: 'tabler:package',
          partNo: it.poLineItem?.partNo || '-',
          assetName: it.poLineItem?.itemName || '-',
          qtyOrdered: parseInt(String(it.quantityOrdered || 0)) || 0,
          qtyAccepted: parseInt(String(it.quantityAccepted || 0)) || 0,
          qtyRejected: parseInt(String(it.quantityRejected || 0)) || 0,
          qtyPending: parseInt(String(it.quantityRemaining || 0)) || 0,
        }))
        setItems(mapped)
      } catch (e) {
        setError('Failed to load GRN details. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchGrn()
  }, [grnId])

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString()
  }

  // Modal handlers
  const handleShowCreateAssetModal = (item: GrnLineItemDisplay) => {
    setSelectedItem(item)
    setShowCreateAssetModal(true)
    
    // Auto-populate form with selected item data
    setAssetForm({
      assetType: '',
      assetSubType: '',
      poId: grn?.poId || '',
      assetName: item.assetName,
      partNo: item.partNo,
      grnId: grn?.id || '',
      grnItemId: item.id,
      poLineItemId: item.poLineItemId,
      supplierId: '',
      consumerId: '',
      serialNumbers: '',
      // Warranty fields
      warrantyType: '',
      warrantyStartDate: new Date().toISOString().split('T')[0],
      warrantyEndDate: new Date().toISOString().split('T')[0],
      warrantyPeriod: 0,
      coverageType: '',
      coverageDescription: '',
      termsConditions: '',
      included: '',
      excluded: ''
    })
  }

  const handleCloseCreateAssetModal = () => {
    setShowCreateAssetModal(false)
    setSelectedItem(null)
    // Reset form
    setAssetForm({
      assetType: '',
      assetSubType: '',
      poId: '',
      assetName: '',
      partNo: '',
      grnId: '',
      grnItemId: '',
      poLineItemId: '',
      supplierId: '',
      consumerId: '',
      serialNumbers: '',
      // Warranty fields
      warrantyType: '',
      warrantyStartDate: new Date().toISOString().split('T')[0],
      warrantyEndDate: new Date().toISOString().split('T')[0],
      warrantyPeriod: 0,
      coverageType: '',
      coverageDescription: '',
      termsConditions: '',
      included: '',
      excluded: ''
    })
  }

  // Form handlers
  const handleAssetFormChange = (field: string, value: string) => {
    console.log('handleAssetFormChange called with:', field, value)
    setAssetForm(prev => {
      const updatedForm = { ...prev, [field]: value }
      console.log('Updated asset form:', updatedForm)
      
      // If assetType is being changed, reset assetSubType
      if (field === 'assetType') {
        updatedForm.assetSubType = ''
      }
      
      // If poLineItemId is being set, populate other fields from the selected item
      if (field === 'poLineItemId' && value) {
        const selectedItem = items.find(item => item.poLineItemId === value)
        if (selectedItem) {
          updatedForm.assetName = selectedItem.assetName
          updatedForm.partNo = selectedItem.partNo
          updatedForm.poId = grn?.poId || ''
          updatedForm.grnId = grn?.id || ''
          updatedForm.grnItemId = selectedItem.id
        }
      }
      
      return updatedForm
    })
  }

  const handleCreateAsset = async () => {
    try {
      // Get consumer ID from storage and fetch supplier ID
      const storedConsumerId = localStorage.getItem('consumerId') || sessionStorage.getItem('consumerId') || 'A123'
      console.log('Stored Consumer ID:', storedConsumerId)
      
      let finalSupplierId = 'SP123' // fallback
      
      if (storedConsumerId) {
        try {
          // Import the service dynamically to avoid circular dependencies
          const { consumerSupplierService } = await import('@/services/api/consumerSupplier')
          const data = await consumerSupplierService.getSupplierByConsumerId(storedConsumerId)
          console.log('Supplier data received:', data)
          
          if (data && data.length > 0) {
            finalSupplierId = data[0].supplierId
            console.log('Using supplier ID from API:', finalSupplierId)
          } else {
            console.log('No supplier data found, using fallback:', finalSupplierId)
          }
        } catch (error) {
          console.error('Error fetching supplier, using fallback:', error)
        }
      }
      
      // Parse serial numbers from textarea (optional)
      const serialNumbers = assetForm.serialNumbers
        ? assetForm.serialNumbers
            .split(',')
            .map(sn => sn.trim())
            .filter(sn => sn.length > 0)
        : []
      
      // If serial numbers are provided, validate the count
      if (serialNumbers.length > 0) {
        const expectedCount = selectedItem?.qtyAccepted || 0
        if (serialNumbers.length !== expectedCount) {
          setError(`Please enter exactly ${expectedCount} serial numbers. You entered ${serialNumbers.length}.`)
          return
        }
      }
      
      // Generate single asset object with nested warranty data
      const assetData = {
        assetSubType: assetForm.assetSubType,
        assetType: assetForm.assetType,
        consumerId: storedConsumerId,
        grnId: assetForm.grnId,
        grnItemId: assetForm.grnItemId,
        assetName: assetForm.assetName,
        partNo: assetForm.partNo,
        poId: assetForm.poId,
        poLineItemId: assetForm.poLineItemId,
        qtyAccepted: selectedItem?.qtyAccepted || 0,
        supplierId: finalSupplierId,
        consumerSerialNo: serialNumbers.length > 0 ? serialNumbers[0] : "", // Use first serial number if provided, otherwise empty string
        consumerSerialNoArray: serialNumbers, // Array of all serial numbers from textarea
        warranty: {
          warrantyTypeId: assetForm.warrantyType ? parseInt(String(assetForm.warrantyType)) : 1,
          startDate: assetForm.warrantyStartDate || new Date().toISOString().split('T')[0],
          endDate: assetForm.warrantyEndDate || new Date().toISOString().split('T')[0],
          warrantyPeriod: assetForm.warrantyPeriod || 0,
          coverageType: assetForm.coverageType || "parts",
          included: assetForm.included || "",
          excluded: assetForm.excluded || "",
          isActive: true,
          autoRenewal: false,
          consumerId: storedConsumerId,
          supplierId: finalSupplierId
        }
      }
      
      console.log('Generated asset data:', assetData)
      
      // Call the asset creation API endpoint with single asset object
      await assetsService.createAssetFromGrnPoLineItem(assetData)
      
      console.log('Asset created successfully')
      
      handleCloseCreateAssetModal()
      // Show success message
      setError('') // Clear any existing errors
      setSuccessMessage('Asset created successfully!')
      console.log('Assets created successfully!')
    } catch (error) {
      console.error('Error creating assets:', error)
      setError('Failed to create assets. Please try again.')
    }
  }

  if (loading) {
    return (
      <>
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Alert variant="danger">{error}</Alert>
      </>
    )
  }

  return (
    <>
      {successMessage && (
        <Alert variant="success" className="mb-3">
          {successMessage}
        </Alert>
      )}
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <span className="badge bg-info-subtle text-info px-1 fs-12 mb-3">GRN</span>
                  <h3 className="m-0 fw-bolder fs-20">GRN Number: #{grn?.grnNo || grn?.id || 'N/A'}</h3>
                  <p className="m-0 text-muted fs-14 mt-1">
                    PO: <span 
                      style={{ 
                        color: '#0d6efd', 
                        textDecoration: 'underline', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => {
                        if (grn?.poId) {
                          router.push(`/purchaseorders/detail?id=${grn.poId}`);
                        }
                      }}
                    >
                      {grn?.poId || 'N/A'}
                    </span>
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={handleBackNavigation}
                  >
                    <IconifyIcon icon="tabler:arrow-left" className="me-1" />
                    Back
                  </Button>
                </div>
              </div>
              <Row>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Challan Number </h5>
                    <h6 className="fs-14 text-muted">{grn?.challan || '—'}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Vehicle Number </h5>
                    <h6 className="fs-14 text-muted">{grn?.vehicleNumber || '—'}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Received By </h5>
                    <h6 className="fs-14 text-muted">{grn?.receivedBy || '—'}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Driver Name </h5>
                    <h6 className="fs-14 text-muted">{grn?.driverName || '—'}</h6>
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Delivery Note </h5>
                    <h6 className="fs-14 text-muted">{grn?.deliveryNote || '—'}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Delivery Date </h5>
                    <h6 className="fs-14 text-muted">{formatDate(grn?.deliveryDate)}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Created Date </h5>
                    <h6 className="fs-14 text-muted">{formatDate(grn?.createdAt)}</h6>
                  </div>
                </Col>
                <Col xs={3}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Updated Date </h5>
                    <h6 className="fs-14 text-muted">{formatDate(grn?.updatedAt)}</h6>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <div className="mt-4">
              <div className="table-responsive">
                <Table className="text-center table-nowrap align-middle mb-0">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="border-0">Part No</th>
                      <th className="border-0">Item Name</th>
                      <th className="border-0">Qty Ordered</th>
                      <th className="border-0">Qty Accepted</th>
                      <th className="border-0">Qty Rejected</th>
                      <th className="border-0">Pending Qty</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.partNo}</td>
                        <td className="text-start">
                          <div className="d-flex align-items-center gap-2">
                            <IconifyIcon icon={it.icon} className="fs-22" />
                            <span className="fw-medium">{it.assetName}</span>
                          </div>
                        </td>
                        <td>{it.qtyOrdered}</td>
                        <td>{it.qtyAccepted}</td>
                        <td>{it.qtyRejected}</td>
                        <td>{it.qtyPending}</td>
                        <td>
                          <div 
                            className={`d-inline-block ${it.qtyPending === 0 ? 'text-muted' : 'text-primary'}`}
                            style={{ cursor: it.qtyPending === 0 ? 'not-allowed' : 'pointer' }}
                            onClick={() => it.qtyPending > 0 && handleShowCreateAssetModal(it)}
                            title={it.qtyPending === 0 ? 'No pending quantity' : 'Create Asset'}
                          >
                            <IconifyIcon 
                              icon="tabler:device-desktop" 
                              className="fs-20"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
           <div className="d-print-none mb-5">
              <div className="d-flex justify-content-center gap-2">
                <PrintButton />
              </div>
            </div>
        </Col>
      </Row>

      {/* Create Asset Modal Component */}
      <CreateAssetModal
        show={showCreateAssetModal}
        onHide={handleCloseCreateAssetModal}
        grn={grn}
        items={selectedItem ? [selectedItem] : []}
        assetForm={assetForm}
        onAssetFormChange={handleAssetFormChange}
        onCreateAsset={handleCreateAsset}
      />
    </>
  )
}

export default GrnDetailPage
