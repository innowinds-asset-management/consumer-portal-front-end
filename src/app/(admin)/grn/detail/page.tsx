"use client";

import React, { useEffect, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PageTitle from '@/components/PageTitle'
import { Card, CardBody, Col, Row, Table, Alert } from 'react-bootstrap'
import { useSearchParams } from 'next/navigation'
import { grnService, Grn } from '@/services/api/grn'

// Line item display type
type GrnLineItemDisplay = {
  icon: string
  partNo: string
  itemName: string
  qtyOrdered: number
  qtyAccepted: number
  qtyRejected: number
  qtyPending: number
}

const GrnDetailPage = () => {
  const searchParams = useSearchParams()
  const grnId = searchParams.get('id')

  const [grn, setGrn] = useState<Grn | null>(null)
  const [items, setItems] = useState<GrnLineItemDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

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
          icon: 'tabler:package',
          partNo: it.poLineItem?.partNo || '-',
          itemName: it.poLineItem?.itemName || '-',
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

  if (loading) {
    return (
      <>
        <PageTitle title="GRN Details" subTitle="" />
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
        <PageTitle title="GRN Details" subTitle="" />
        <Alert variant="danger">{error}</Alert>
      </>
    )
  }

  return (
    <>
      <PageTitle title="GRN Details" subTitle="" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <span className="badge bg-info-subtle text-info px-1 fs-12 mb-3">{grn?.po?.status || '—'}</span>
                  <h3 className="m-0 fw-bolder fs-20">GRN: #{grn?.grnNo || grn?.id || 'N/A'}</h3>
                </div>
                <div className="text-end">
                  <h6 className="m-0">PO: {grn?.po?.poNumber || grn?.poId}</h6>
                </div>
              </div>
              <Row>
                <Col xs={4}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Challan </h5>
                    <h6 className="fs-14 text-muted">{grn?.challan || '—'}</h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Created Date </h5>
                    <h6 className="fs-14 text-muted">{formatDate(grn?.createdAt)}</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Vehicle Number </h5>
                    <h6 className="fs-14 text-muted">{grn?.vehicleNumber || '—'}</h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Updated Date </h5>
                    <h6 className="fs-14 text-muted">{formatDate(grn?.updatedAt)}</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-14"> Driver Name </h5>
                    <h6 className="fs-14 text-muted">{grn?.driverName || '—'}</h6>
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
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.partNo}</td>
                        <td className="text-start">
                          <div className="d-flex align-items-center gap-2">
                            <IconifyIcon icon={it.icon} className="fs-22" />
                            <span className="fw-medium">{it.itemName}</span>
                          </div>
                        </td>
                        <td>{it.qtyOrdered}</td>
                        <td>{it.qtyAccepted}</td>
                        <td>{it.qtyRejected}</td>
                        <td>{it.qtyPending}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default GrnDetailPage
