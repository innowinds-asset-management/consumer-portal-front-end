"use client";

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap'
import { purchaseOrderService, PurchaseOrder, PoLineItem } from '@/services/api/purchaseOrders'
import { grnService, Grn, GrnItem } from '@/services/api/grn'

interface LineItemForm extends GrnItem {
  poLineItem?: PoLineItem
}

export default function GrnCreatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Enhanced back navigation handler using Next.js routing
  const handleBackNavigation = () => {
    const poId = searchParams.get('poId')
    
    // Try to go back, but with fallback
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback navigation based on available data
      if (poId) {
        router.push(`/purchaseorders/detail?id=${poId}`)
      } else {
        router.push('/purchaseorders')
      }
    }
  }
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Prefetch POs for dropdown
  const [pos, setPos] = useState<PurchaseOrder[]>([])
  const [loadingPos, setLoadingPos] = useState(true)
  const [poError, setPoError] = useState('')

  // Header form
  const [poId, setPoId] = useState('')
  const [challan, setChallan] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [driverName, setDriverName] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Format as YYYY-MM-DD
  })
  const [deliveryNote, setDeliveryNote] = useState('')
  const [supplierName, setSupplierName] = useState('')

  // Derived selected PO
  const selectedPo = useMemo(() => pos.find(p => p.id === poId) || null, [pos, poId])

  // Line items state
  const [items, setItems] = useState<LineItemForm[]>([])



  useEffect(() => {
    const fetchPos = async () => {
      try {
        setLoadingPos(true)
        setPoError('')
        // const data = await purchaseOrderService.getPurchaseOrders()
        const data = await purchaseOrderService.getPurchaseOrderById(poId) //FIXME: not found
        setPos(Array.isArray(data) ? data : [])
        
        // Auto-select PO based on poId query parameter
        const urlPoId = searchParams.get('poId')
        if (urlPoId) {
          setPoId(urlPoId)
        }
      } catch (e) {
        setPoError('Failed to load purchase orders')
      } finally {
        setLoadingPos(false)
      }
    }
    fetchPos()
  }, [searchParams])

  // When PO changes, populate line items template from PO line items and fetch supplier name
  useEffect(() => {
    if (!selectedPo) {
      setItems([])
      setSupplierName('')
      return
    }
    
    // Set supplier name from PO data (if available) or fallback to ID
    setSupplierName(selectedPo.supplier?.name || selectedPo.supplierId || 'N/A')
    
    const nextItems: LineItemForm[] = (selectedPo.poLineItem || []).map(li => {
      const ordered = parseInt(li.quantity || '0') || 0
      const previouslyReceived = parseInt(li.receivedQty || '0') || 0
      const remainingToReceive = Math.max(ordered - previouslyReceived, 0)
      
      return {
        poLineItemId: li.id,
        quantityOrdered: ordered,
        quantityReceived: previouslyReceived, // Show the previously received from DB
        quantityAccepted: 0, // User will enter this
        quantityRejected: 0, // User will enter this
        quantityRemaining: remainingToReceive, // This is what's left to receive
        remarks: '',
        poLineItem: li,
      }
    })
    setItems(nextItems)
  }, [selectedPo])
  
 
  const handleQtyChange = (index: number, field: keyof LineItemForm, value: number) => {
    setItems(prev => {
      const copy = [...prev]
      const row = { ...copy[index] }
      
      // Get previously received quantity from PO
      const previouslyReceived = parseInt(row.poLineItem?.receivedQty || '0') || 0
      const ordered = row.quantityOrdered || 0
      
      // Validation for quantity accepted
      if (field === 'quantityAccepted') {
        const rejected = row.quantityRejected || 0
        const totalRemaining = Math.max(ordered - previouslyReceived, 0)
        
        // Ensure accepted quantity doesn't exceed remaining quantity
        if (value > totalRemaining) {
          value = totalRemaining
        }
        
        // Ensure accepted + rejected doesn't exceed remaining quantity
        if (value + rejected > totalRemaining) {
          value = Math.max(totalRemaining - rejected, 0)
        }
      }
      
      // Validation for quantity rejected
      if (field === 'quantityRejected') {
        const accepted = row.quantityAccepted || 0
        const totalRemaining = Math.max(ordered - previouslyReceived, 0)
        
        // Ensure rejected quantity doesn't exceed remaining quantity
        if (value > totalRemaining) {
          value = totalRemaining
        }
        
        // Ensure accepted + rejected doesn't exceed remaining quantity
        if (accepted + value > totalRemaining) {
          value = Math.max(totalRemaining - accepted, 0)
        }
      }
      
      ;(row as any)[field] = Number.isFinite(value) ? value : 0
      
      const accepted = row.quantityAccepted || 0
      const rejected = row.quantityRejected || 0
      const currentReceived = accepted + rejected
      const totalReceived = previouslyReceived + currentReceived
      const remaining = Math.max(ordered - totalReceived, 0)
      
      // Keep quantityReceived as the display value from DB, only update remaining
      row.quantityRemaining = remaining
      
      copy[index] = row
      return copy
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (!selectedPo) throw new Error('Please select a PO')
      
      // Prepare payload according to the specified structure
      const payload = {
        poId: selectedPo.id,
        challan: challan || null,
        deliveryNote: deliveryNote || null,
        deliveryDate: deliveryDate || null,
        driverName: driverName || null,
        receivedBy: receivedBy || null,
        vehicleNumber: vehicleNumber || null,
        grnItem: items
          .filter(item => (item.quantityAccepted || 0) > 0 || (item.quantityRejected || 0) > 0) // Include items with any quantity entered
          .map(item => {
            // Calculate the correct received quantity for submission
            const previouslyReceived = parseInt(item.poLineItem?.receivedQty || '0') || 0
            const currentAccepted = item.quantityAccepted || 0
            const currentRejected = item.quantityRejected || 0
            const currentReceived = currentAccepted + currentRejected
            const totalReceived = previouslyReceived + currentReceived
            
            return {
              poLineItemId: item.poLineItemId,
              quantityOrdered: item.quantityOrdered || 0,
              quantityReceived: totalReceived, // Total received (previous + current)
              quantityAccepted: currentAccepted,
              quantityRejected: currentRejected,
              quantityRemaining: item.quantityRemaining || 0,
              remarks: item.remarks || null,
            }
          })
      }
      
      await grnService.createGrn(payload)
      
      // Redirect to purchase orders detail page after successful creation
      router.push(`/purchaseorders/detail?id=${selectedPo.id}`)
    } catch (e: any) {
      setError(e?.message || 'Failed to create GRN')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (s?: string) => (s ? s.split('T')[0] : '')

  return (
    <>

      <ComponentContainerCard 
        title={
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span>Goods Receipt Note</span>
              {supplierName && (
                <div className="text-muted fs-14 mt-1">Supplier: {supplierName}</div>
              )}
            </div>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleBackNavigation}
            >
              <IconifyIcon icon="tabler:arrow-left" className="me-1" />
              Back
            </Button>
          </div>
        }
        description="Record received quantities against a Purchase Order"
      >
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        

        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label>PO</Form.Label>
                <div className="d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <Form.Select value={poId} onChange={e => setPoId(e.target.value)} disabled={loadingPos}>
                      <option value="">{loadingPos ? 'Loading POs...' : 'Select PO'}</option>
                      {pos.map(p => (
                        <option key={p.id} value={p.id}>{p.poNumber || p.id}</option>
                      ))}
                    </Form.Select>
                    {poError && <small className="text-warning d-block mt-1">{poError}</small>}
                  </div>
                  {poId && (
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => router.push(`/purchaseorders/detail?id=${poId}`)}
                      className="mb-0"
                    >
                      <IconifyIcon icon="tabler:eye" className="me-1" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Challan Number</Form.Label>
                <Form.Control value={challan} onChange={e => setChallan(e.target.value)} placeholder="Enter challan number" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} placeholder="Enter vehicle number" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Driver Name</Form.Label>
                <Form.Control value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter driver name" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Received By</Form.Label>
                <Form.Control value={receivedBy} onChange={e => setReceivedBy(e.target.value)} placeholder="Enter received by name" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={deliveryDate} 
                  onChange={e => setDeliveryDate(e.target.value)} 
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Form.Label>Delivery Note</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={deliveryNote} 
                  onChange={e => setDeliveryNote(e.target.value)} 
                  placeholder="Enter delivery note details"
                />
              </div>
            </Col>
          </Row>

          <div className="mt-3">
            <h5 className="mb-3">Line Items</h5>
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr className="bg-light bg-opacity-50">
                    <th>Part No</th>
                    <th>Item Name</th>
                    <th className="text-end">Qty Received</th>
                    <th className="text-end">Qty Ordered</th>
                    <th className="text-end">Qty Accepted</th>
                    <th className="text-end">Qty Rejected</th>
                    <th className="text-end">Pending Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr><td colSpan={7} className="text-center text-muted">Select a PO to load items</td></tr>
                  )}
                  {items.map((it, idx) => (
                    <tr key={it.poLineItemId}>
                      <td>{it.poLineItem?.partNo || '-'}</td>
                      <td>{it.poLineItem?.itemName || '-'}</td>
                      <td className="text-end">{it.quantityReceived}</td>
                      <td className="text-end">{it.quantityOrdered}</td>
                      <td className="text-end" style={{ width: 140 }}>
                        <Form.Control 
                          type="number" 
                          min={0} 
                          max={Math.max(it.quantityOrdered - parseInt(it.poLineItem?.receivedQty || '0') - (it.quantityRejected || 0), 0)}
                          value={it.quantityAccepted}
                          onChange={e => handleQtyChange(idx, 'quantityAccepted', parseInt(e.target.value) || 0)}                           
                          className={it.quantityRemaining === 0 ? 'bg-light' : ''}
                        />
                      </td>
                      <td className="text-end" style={{ width: 140 }}>
                        <Form.Control 
                          type="number" 
                          min={0} 
                          max={Math.max(it.quantityOrdered - parseInt(it.poLineItem?.receivedQty || '0') - (it.quantityAccepted || 0), 0)}
                          value={it.quantityRejected}
                          onChange={e => handleQtyChange(idx, 'quantityRejected', parseInt(e.target.value) || 0)}                           
                          className={it.quantityRemaining === 0 ? 'bg-light' : ''}
                        />
                      </td>
                      <td className="text-end">{it.quantityRemaining}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="text-end mt-3">
            <Button type="submit" variant="primary" disabled={loading || !poId}>
              {loading ? 'Saving...' : 'Create GRN'}
            </Button>
          </div>
        </Form>
      </ComponentContainerCard>
    </>
  )
} 