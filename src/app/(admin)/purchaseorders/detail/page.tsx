"use client";

import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PageTitle from '@/components/PageTitle'
import PrintButton from './PrintButton'
import { Button, Card, CardBody, Col, Row, Table, Alert } from 'react-bootstrap'
import { useSearchParams } from 'next/navigation'
import { purchaseOrdersService, PurchaseOrder, PoLineItem } from '@/services/api/purchaseOrders'

// Display type for line items
type PurchaseOrderLineItemType = {
  icon: string
  title: string
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
  const searchParams = useSearchParams()
  const poId = searchParams.get('id')
  
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null)
  const [lineItems, setLineItems] = useState<PurchaseOrderLineItemType[]>([])
  const [loading, setLoading] = useState(true)
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
      } catch (err) {
        setError("Failed to load purchase order details. Please try again.")
        setLineItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchPurchaseOrder()
  }, [poId])

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
        <PageTitle title="Purchase Order Details" subTitle="" />
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
        <PageTitle title="Purchase Order Details" subTitle="" />
        <Alert variant="danger">{error}</Alert>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Purchase Order Details" subTitle="" />
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
              </div>
              <Row>
                <Col xs={6}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Supplier : </h5>
                    <h6 className="fs-14 mb-2">{purchaseOrder?.supplierId || 'N/A'}</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      Supplier Information
                    </h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Created Date : </h5>
                    <h6 className="fs-14 text-muted">{formatDate(purchaseOrder?.createdAt || '')}</h6>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Consumer : </h5>
                    <h6 className="fs-14 mb-2">{purchaseOrder?.consumerId || 'N/A'}</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      Consumer Information
                    </h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Updated Date : </h5>
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
                        Received
                      </th>
                      <th className="border-0" scope="col">
                        Remaining
                      </th>
                      <th className="border-0" scope="col">
                        Unit price
                      </th>
                      <th className="text-end border-0" scope="col">
                        Amount
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
                              <span className="fw-medium">{item.title}</span>
                              <p className="text-muted mb-0">({item.description})</p>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
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
                        <td>₹{item.price.toFixed(2)}</td>
                        <td className="text-end">₹{item.amount.toFixed(2)}</td>
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
          <div className="d-print-none mb-5">
            <div className="d-flex justify-content-center gap-2">
              <PrintButton />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default PurchaseOrderDetail
