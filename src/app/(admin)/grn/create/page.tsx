"use client";

import React, { useEffect, useMemo, useState } from 'react'
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap'
import { purchaseOrdersService, PurchaseOrder, PoLineItem } from '@/services/api/purchaseOrders'
import { grnService, Grn, GrnItem } from '@/services/api/grn'

interface LineItemForm extends GrnItem {
  poLineItem?: PoLineItem
}

export default function GrnCreatePage() {
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

  // Derived selected PO
  const selectedPo = useMemo(() => pos.find(p => p.id === poId) || null, [pos, poId])

  // Line items state
  const [items, setItems] = useState<LineItemForm[]>([])

  useEffect(() => {
    const fetchPos = async () => {
      try {
        setLoadingPos(true)
        setPoError('')
        const data = await purchaseOrdersService.getPurchaseOrders()
        setPos(Array.isArray(data) ? data : [])
      } catch (e) {
        setPoError('Failed to load purchase orders')
      } finally {
        setLoadingPos(false)
      }
    }
    fetchPos()
  }, [])

  // When PO changes, populate line items template from PO line items
  useEffect(() => {
    if (!selectedPo) {
      setItems([])
      return
    }
    const nextItems: LineItemForm[] = (selectedPo.poLineItem || []).map(li => ({
      poLineItemId: li.id,
      quantityOrdered: parseInt(li.quantity || '0') || 0,
      quantityReceived: 0,
      quantityAccepted: 0,
      quantityRejected: 0,
      quantityRemaining: parseInt(li.quantity || '0') || 0,
      remarks: '',
      poLineItem: li,
    }))
    setItems(nextItems)
  }, [selectedPo])

  const handleQtyChange = (index: number, field: keyof LineItemForm, value: number) => {
    setItems(prev => {
      const copy = [...prev]
      const row = { ...copy[index] }
      ;(row as any)[field] = Number.isFinite(value) ? value : 0
      const ordered = row.quantityOrdered || 0
      const accepted = row.quantityAccepted || 0
      const rejected = row.quantityRejected || 0
      const received = Math.max(accepted + rejected, 0)
      row.quantityReceived = received
      row.quantityRemaining = Math.max(ordered - received, 0)
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
      const payload: Grn = {
        poId: selectedPo.id,
        challan,
        vehicleNumber,
        driverName,
        grnItem: items.map(({ poLineItem, ...rest }) => rest),
      }
      await grnService.createGrn(payload)
      setChallan('')
      setVehicleNumber('')
      setDriverName('')
      setItems([])
      setPoId('')
    } catch (e: any) {
      setError(e?.message || 'Failed to create GRN')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (s?: string) => (s ? s.split('T')[0] : '')

  return (
    <>
      <PageTitle title="Create GRN" />
      <ComponentContainerCard title="Goods Receipt Note" description="Record received quantities against a Purchase Order">
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>PO</Form.Label>
                <Form.Select value={poId} onChange={e => setPoId(e.target.value)} disabled={loadingPos}>
                  <option value="">{loadingPos ? 'Loading POs...' : 'Select PO'}</option>
                  {pos.map(p => (
                    <option key={p.id} value={p.id}>{p.poNumber || p.id}</option>
                  ))}
                </Form.Select>
                {poError && <small className="text-warning d-block mt-1">{poError}</small>}
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Challan</Form.Label>
                <Form.Control value={challan} onChange={e => setChallan(e.target.value)} placeholder="Enter challan number" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control value={selectedPo?.supplier?.name || ''} readOnly className="bg-light" />
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
                <Form.Label>PO Updated Date</Form.Label>
                <Form.Control value={formatDate(selectedPo?.updatedAt)} readOnly className="bg-light" />
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
                    <th className="text-end">Qty Ordered</th>
                    <th className="text-end">Qty Accepted</th>
                    <th className="text-end">Qty Rejected</th>
                    <th className="text-end">Pending Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr><td colSpan={6} className="text-center text-muted">Select a PO to load items</td></tr>
                  )}
                  {items.map((it, idx) => (
                    <tr key={it.poLineItemId}>
                      <td>{it.poLineItem?.partNo || '-'}</td>
                      <td>{it.poLineItem?.itemName || '-'}</td>
                      <td className="text-end">{it.quantityOrdered}</td>
                      <td className="text-end" style={{ width: 140 }}>
                        <Form.Control type="number" min={0} value={it.quantityAccepted}
                          onChange={e => handleQtyChange(idx, 'quantityAccepted', parseInt(e.target.value) || 0)} />
                      </td>
                      <td className="text-end" style={{ width: 140 }}>
                        <Form.Control type="number" min={0} value={it.quantityRejected}
                          onChange={e => handleQtyChange(idx, 'quantityRejected', parseInt(e.target.value) || 0)} />
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