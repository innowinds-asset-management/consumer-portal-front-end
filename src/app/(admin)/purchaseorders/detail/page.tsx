"use client";

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PrintButton from '@/components/PrintButton'  
import { Button, Card, CardBody, Col, Row, Table, Alert } from 'react-bootstrap'
import { purchaseOrdersService, PurchaseOrder, PoLineItem } from '@/services/api/purchaseOrders'
import { grnService, Grn } from '@/services/api/grn'

// Display type for line items
type PurchaseOrderLineItemType = {
  icon: string
  title: string
  itemName: string
  description: string
  quantity: number
  price: number
  amount: number
  receivedQty: number
  remainingQty: number
}

// Convert PoLineItem to display format
const convertPoLineItemToDisplay = (lineItem: PoLineItem): PurchaseOrderLineItemType => {
  return {
    title: lineItem.partNo,
    itemName: lineItem.itemName || '',
    description: `Part Number: ${lineItem.partNo}`,
    icon: 'tabler:package',
    quantity: parseInt(lineItem.quantity) || 0,
    price: parseFloat(lineItem.price) || 0,
    amount: parseFloat(lineItem.totalAmount) || 0,
    receivedQty: parseInt(lineItem.receivedQty) || 0,
    remainingQty: parseInt(lineItem.remainingQty) || 0,
  }
}

const PurchaseOrderDetail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const poId = searchParams.get('id')
  
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null)
  const [lineItems, setLineItems] = useState<PurchaseOrderLineItemType[]>([])
  const [grnData, setGrnData] = useState<Grn[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingGrn, setLoadingGrn] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      if (!poId) {
        setError("Purchase Order ID is required")
        setLoading(false)
        return
      }

      setLoading(true)
      setError("")
      
      try {
        const data = await purchaseOrdersService.getPurchaseOrderById(poId)
        setPurchaseOrder(data)
        
        // Convert poLineItem to display format
        if (data.poLineItem && data.poLineItem.length > 0) {
          const convertedItems = data.poLineItem.map(convertPoLineItemToDisplay)
          setLineItems(convertedItems)
        } else {
          setLineItems([])
        }

        // Fetch GRN data for this purchase order
        await fetchGrnData(poId)
      } catch (err) {
        setError("Failed to load purchase order details. Please try again.")
        setLineItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchPurchaseOrder()
  }, [poId])

  // Fetch GRN data for the purchase order
  const fetchGrnData = async (poId: string) => {
    try {
      setLoadingGrn(true)
      const grnList = await grnService.getGrnsByPoId(poId)
      setGrnData(grnList)
    } catch (err) {
      console.error('Error fetching GRN data:', err)
      setGrnData([])
    } finally {
      setLoadingGrn(false)
    }
  }

  // Calculate totals
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0)

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString()
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success-subtle text-success'
      case 'Pending':
        return 'bg-warning-subtle text-warning'
      case 'Rejected':
        return 'bg-danger-subtle text-danger'
      default:
        return 'bg-secondary-subtle text-secondary'
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
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <span className={`badge ${getStatusBadgeClass(purchaseOrder?.status || '')} px-1 fs-12 mb-3`}>
                    {purchaseOrder?.status || 'Unknown'}
                  </span>
                  <h3 className="m-0 fw-bolder fs-20">Purchase Order: #{purchaseOrder?.poNumber || purchaseOrder?.id || 'N/A'}</h3>
                </div>
                {/* Disable the Add GRN button if lineItems is empty */}
                <div className="d-flex align-items-center gap-2">                  
                    <Button 
                      variant="primary" 
                      size="sm"
                      disabled={!lineItems || lineItems.length === 0}
                      onClick={() => {
                        // Navigate to GRN creation page with PO ID using Next.js routing
                        router.push(`/grn/create?poId=${poId}`);
                      }}
                    >
                      <IconifyIcon icon="tabler:plus" className="me-1" />
                      Add GRN
                    </Button>                  
                </div>                
              </div>
              <Row>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Supplier : </h5>
                    <h6 className="fs-14 mb-2">{purchaseOrder?.supplier?.name || purchaseOrder?.supplierId || 'N/A'}</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Created Date : </h5>
                    <h6 className="fs-14 text-muted">{formatDate(purchaseOrder?.createdAt || '')}</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Updated Date : </h5>
                    <h6 className="fs-14 text-muted">{formatDate(purchaseOrder?.updatedAt || '')}</h6>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <div className="mt-4">
              <div className="table-responsive">
                <Table className="text-center table-nowrap align-middle mb-0">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="border-0" scope="col" style={{ width: 50 }}>
                        #
                      </th>
                      <th className="text-start border-0" scope="col">
                        Product Details
                      </th>
                      <th className="border-0" scope="col">
                        Quantity
                      </th>
                      <th className="border-0" scope="col">
                        Unit price
                      </th>
                      <th className="text-end border-0" scope="col">
                        Amount
                      </th>
                      <th className="border-0" scope="col">
                        Received
                      </th>
                      <th className="border-0" scope="col">
                        Remaining
                      </th>
                    </tr>
                  </thead>
                  <tbody id="products-list">
                    {lineItems.map((item, idx) => (
                      <tr key={idx}>
                        <th scope="row">0{idx + 1}</th>
                        <td className="text-start">
                          <div className="d-flex align-items-center gap-2">
                            <IconifyIcon icon={item.icon} className="fs-22" />
                            <div>
                              <span className="fw-medium">{item.itemName}</span>
                              <p className="text-muted mb-0">({item.description})</p>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td className="text-end">₹{item.amount.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${item.receivedQty > 0 ? 'bg-success' : 'bg-secondary'}`}>
                            {item.receivedQty}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${item.remainingQty > 0 ? 'bg-warning' : 'bg-success'}`}>
                            {item.remainingQty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <Table className="table-nowrap align-middle mb-0 ms-auto" style={{ width: 335 }}>
                  <tbody>
                    <tr className="border-top border-top-dashed fs-16">
                      <td className="fw-bold">Total Amount</td>
                      <td className="fw-bold text-end">₹{total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>

          </Card>
           

          {/* GRN Data Section */}
          {grnData.length > 0 && (
            <Card className="mt-4">
              <CardBody>
                <h5 className="card-title mb-3">
                  <IconifyIcon icon="tabler:package" className="me-2" />
                  Goods Received Notes (GRN)
                </h5>
                <div className="table-responsive">
                  <Table className="table-nowrap align-middle mb-0">
                    <thead>
                      <tr className="bg-light bg-opacity-50">
                        <th className="border-0" scope="col">#</th>
                        <th className="text-start border-0" scope="col">GRN Number</th>
                        <th className="border-0" scope="col">Date</th>
                        <th className="border-0" scope="col">Delivery Note</th>
                        <th className="border-0" scope="col">Vehicle Number</th>
                        <th className="border-0" scope="col">Driver Name</th>
                        <th className="border-0" scope="col">Received By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grnData.map((grn, idx) => (
                        <tr key={grn.id || idx}>
                          <th scope="row">{idx + 1}</th>
                          <td className="text-start">
                            <span 
                              className="fw-medium text-primary" 
                              style={{ cursor: 'pointer', textDecoration: 'underline' }}
                              onClick={() => router.push(`/grn/detail?id=${grn.id}`)}
                            >
                              {grn.grnNo || 'N/A'}
                            </span>
                          </td>
                          <td>{formatDate(grn.createdAt || '')}</td>
                          <td>{grn.deliveryNote || 'N/A'}</td>
                          <td>{grn.vehicleNumber || 'N/A'}</td>
                          <td>{grn.driverName || 'N/A'}</td>
                          <td>{grn.receivedBy || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Show message when no GRN data */}
          {!loadingGrn && grnData.length === 0 && (
            <Card className="mt-4">
              <CardBody>
                <div className="text-center py-3">
                  <IconifyIcon icon="tabler:package-off" className="fs-48 text-muted mb-2" />
                  <h6 className="text-muted">No Goods Received Notes found</h6>
                  <p className="text-muted mb-0">GRN data will appear here once goods are received for this purchase order.</p>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Loading state for GRN */}
          {loadingGrn && (
            <Card className="mt-4">
              <CardBody>
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading GRN data...</span>
                  </div>
                  <p className="mt-2 mb-0">Loading GRN data...</p>
                </div>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </>
  )
}

export default PurchaseOrderDetail
