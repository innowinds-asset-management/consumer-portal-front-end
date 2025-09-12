"use client";

import React, { useEffect, useMemo, useState } from "react";
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Card, CardBody, Col, Form, Row, Alert, Badge } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import { departmentService, Department } from '@/services/api/departments'
import { assetStatusService } from '@/services/api/assetStatus'
import { assetConditionService, AssetCondition } from '@/services/api/assetCondition'
import { supplierService, Supplier } from '@/services/api/suppliers'
import { consumerSupplierService, ConsumerSupplier } from '@/services/api/consumerSupplier'
import { formatDate } from '@/utils/date'

type FieldType = 'text' | 'textarea' | 'select' | 'date';

export default function EditAssetPage() {
  const isAppProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('aid');

  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Masters
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [assetSubTypes, setAssetSubTypes] = useState<AssetSubType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [conditions, setConditions] = useState<AssetCondition[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [assetStatuses, setAssetStatuses] = useState<any[]>([]);

  // Edit state
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [k: string]: any }>({});

  useEffect(() => {
    const init = async () => {
      if (!assetId) {
        setError('Asset ID is required');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [assetResp, types, depts, conds, consumerSups, statusResp] = await Promise.all([
          assetsService.getAssetById(assetId),
          assetTypesService.getActiveAssetTypes(),
          departmentService.getDepartmentsByConsumerId(),
          assetConditionService.getAllAssetConditions(),
          consumerSupplierService.getSupplierByConsumerId(),
          assetStatusService.getAssetStatuses(),
        ]);
        setAsset(assetResp);
        setAssetTypes(types);
        setDepartments(depts);
        setConditions(conds);
        // Extract supplier objects from ConsumerSupplier response
        const suppliers = consumerSups.map(cs => ({
          ...cs.supplier,
          supplierCode: cs.supplierCode, // Add supplierCode from the relationship
          primaryContactName: cs.supplier.primaryContactName || undefined,
          primaryContactEmail: cs.supplier.primaryContactEmail || undefined,
          primaryContactPhone: cs.supplier.primaryContactPhone || undefined
        })).filter(Boolean);
        setSuppliers(suppliers);
        if (statusResp.success) {
          setAssetStatuses(statusResp.data);
        }
        if (assetResp.assetTypeId) {
          const sub = await assetSubTypesService.getAssetSubTypesByAssetTypeId(assetResp.assetTypeId);
          setAssetSubTypes(sub);
        }
      } catch (e) {
        console.error(e);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [assetId]);

  const beginEdit = (field: string, currentValue: any) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: currentValue ?? '' });
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const saveField = async (field: string) => {
    if (!asset || !assetId) return;
    setSaving(true);
    try {
      const payload: any = {};
      if (field === 'isAmc') {
        const raw = editValues[field];
        payload.isAmc = raw === true || raw === 'true' || raw === 1 || raw === '1';
      } else if (field === 'assetTypeId' || field === 'assetSubTypeId' || field === 'departmentId' || field === 'supplierId' || field === 'status') {
        payload[field] = editValues[field];
      } else if (field === 'installationDate') {
        // Validate installation date
        const dateValue = editValues[field];
        if (dateValue) {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) {
            throw new Error('Invalid installation date format');
          }
          payload[field] = dateValue;
        } else {
          payload[field] = null; // Allow clearing the date
        }
      } else {
        payload[field] = editValues[field];
      }
      
      console.log('Updating asset with payload:', payload);
      const res = await assetsService.updateAsset(assetId, payload);
      console.log('Update response:', res);
      
      if (res?.success === false) {
        throw new Error(res.error || 'Update failed');
      }
      
      const refreshed = await assetsService.getAssetById(assetId);
      setAsset(refreshed);
      setEditingField(null);
      setEditValues({});
      setError(''); // Clear any previous errors on success
    } catch (e) {
      console.error('Error updating field:', e);
      const errorMessage = e instanceof Error ? e.message : 'Failed to update field';
      setError(`Failed to update ${field}: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const onTypeChange = async (newTypeId: string) => {
    setEditValues(prev => ({ ...prev, assetTypeId: newTypeId}));
    if (newTypeId) {
      const subs = await assetSubTypesService.getAssetSubTypesByAssetTypeId(newTypeId);
      console.log('Asset sub types:', subs);
      setAssetSubTypes(subs);
    } else {
      setAssetSubTypes([]);
    }
  };

  const renderField = (key: string, label: string, value: any, type: FieldType = 'text', options?: { value: string; label: string }[]) => {
    const isEditing = editingField === key;
    const currentValue = isEditing ? editValues[key] : value;

    // console.log(key,'===>',value)

    let displayValue: any = value;
    if (key === 'status') {
      const st = assetStatuses.find((s: any) => s.statusCode === value);
      if (assetStatuses.length === 0) {
        displayValue = 'Loading statuses...';
      } else {
        displayValue = st ? st.displayName : (value || 'N/A');
      }
    } else if (key === 'isAmc') {
      const truthy = value === true || value === 'true' || value === 1 || value === '1';
      displayValue = truthy ? 'Yes' : 'No';
    } else if (key === 'departmentId' && value) {
      const d = departments.find(x => x.deptId === value);
      console.log('Department lookup:', { 
        value, 
        found: d, 
        departmentsCount: departments.length,
        departments: departments.map(d => ({ id: d.deptId, name: d.deptName })) 
      });
      if (departments.length === 0) {
        displayValue = 'Loading departments...';
      } else {
        displayValue = d ? d.deptName : (value || 'Not specified');
      }
    } else if (key === 'supplierId' && value) {
      const s = suppliers.find(x => x.id === value);
      if (suppliers.length === 0) {
        displayValue = 'Loading suppliers...';
      } else {
        displayValue = s ? s.name : (value || 'Not specified');
      }
    } else if (key === 'assetTypeId' && value) {
      const t = assetTypes.find(x => x.id === value);
      if (assetTypes.length === 0) {
        displayValue = 'Loading asset types...';
      } else {
        displayValue = t ? t.assetName : (value || 'Not specified');
      }
    } 
    else if (key === 'assetSubTypeId' && value) {
      // console.log('value======>',value)
      // const st = assetSubTypes.find(x => x.id === value);
      // // console.log('st======>',st)
      // if (assetSubTypes.length === 0) {
      //   displayValue = 'Loading sub types...';
      // } else {
      //   // console.log('st====== inside else>',st)
        displayValue = asset?.assetSubType?.name || 'Not specified';
      // }
    } else if (key === 'installationDate' && value) {
      displayValue = formatDate(value) || 'Not specified';
    } 

    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>{label}:</strong>
          {!isEditing && (
            <Button variant="outline-primary" size="sm" onClick={() => beginEdit(key, value)}>
              <IconifyIcon icon="mdi:pencil" className="me-1" /> Edit
            </Button>
          )}
        </div>
        {isEditing ? (
          <div className="d-flex gap-2 align-items-start">
            {type === 'textarea' ? (
              <Form.Control as="textarea" rows={3} value={currentValue || ''} onChange={(e) => setEditValues({ ...editValues, [key]: e.target.value })} className="flex-grow-1" />
            ) : type === 'select' ? (
              <Form.Select
                value={currentValue || ''}
                onChange={async (e) => {
                  const v = e.target.value;
                  if (key === 'assetTypeId') {
                    await onTypeChange(v);
                  } else {
                    setEditValues({ ...editValues, [key]: v });
                  }
                }}
                className="flex-grow-1"
              >
                <option value="">Select {label}</option>
                {options?.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Form.Select>
            ) : type === 'date' ? (
              <Form.Control
                type="date"
                value={((): string => {
                  const v = currentValue || '';
                  if (!v) return '';
                  if (typeof v === 'string') return v.includes('T') ? v.split('T')[0] : v;
                  try { return new Date(v).toISOString().split('T')[0]; } catch { return ''; }
                })()}
                onChange={(e) => setEditValues({ ...editValues, [key]: e.target.value })}
                className="flex-grow-1"
              />
            ) : (
              <Form.Control type="text" value={currentValue || ''} onChange={(e) => setEditValues({ ...editValues, [key]: e.target.value })} className="flex-grow-1" />
            )}
            <div className="d-flex gap-1">
              <Button variant="success" size="sm" onClick={() => saveField(key)} disabled={saving}>
                <IconifyIcon icon="mdi:check" />
              </Button>
              <Button variant="secondary" size="sm" onClick={cancelEdit} disabled={saving}>
                <IconifyIcon icon="mdi:close" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-light rounded">{displayValue || 'Not specified'}</div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <ComponentContainerCard title="Edit Asset">
        <div className="text-center py-4">
          <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
      </ComponentContainerCard>
    );
  }

  if (error || !asset) {
    return (
      <ComponentContainerCard title="Edit Asset">
        <Alert variant="danger">{error || 'Asset not found'}</Alert>
        <Button variant="secondary" onClick={() => router.push(`/assets/detail?aid=${assetId}`)}>
          <IconifyIcon icon="mdi:arrow-left" className="me-1" /> Back
        </Button>
      </ComponentContainerCard>
    );
  }

  return (
    <ComponentContainerCard
      title={
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => router.push(`/assets/detail?aid=${assetId}`)}>
              <IconifyIcon icon="mdi:arrow-left" className="me-1" /> Back
            </Button>
            <span>Edit Asset</span>
          </div>
          <span className="text-muted">{asset.assetName}</span>
        </div>
      }
    >
      <Card className="border-0">
        <CardBody>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            <Col lg={6}>
              {renderField('assetName', 'Asset Name', asset.assetName)}
              {assetTypes.length > 0 ? renderField('assetTypeId', 'Asset Type', asset.assetTypeId, 'select', assetTypes.map(t => ({ value: t.id, label: t.assetName }))) : (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Asset Type:</strong>
                  </div>
                  <div className="p-2 bg-light rounded">Loading asset types...</div>
                </div>
              )}
              {assetSubTypes.length > 0 ? renderField('assetSubTypeId', 'Sub Type', asset.assetSubTypeId, 'select', assetSubTypes.map(st => ({ value: st.id, label: st.name }))) : (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Sub Type:</strong>
                  </div>
                  <div className="p-2 bg-light rounded">Loading sub types...</div>
                </div>
              )}
              {renderField('consumerSerialNo', 'Consumer Serial No', asset.consumerSerialNo)}
              {renderField('brand', 'Brand', asset.brand)}
              {renderField('model', 'Model', asset.model)}
              {asset.subModel ? renderField('subModel', 'Sub Model', asset.subModel) : null}
              {renderField('partNo', 'Part Number', asset.partNo)}
              {renderField('installationDate', 'Installation Date', asset.installationDate, 'date')}
              
             
            </Col>
            <Col lg={6}>
            {assetStatuses.length > 0 ? renderField('status', 'Asset Status', asset.status, 'select', assetStatuses.map(s => ({ value: s.statusCode, label: s.displayName }))) : (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Asset Status:</strong>
                  </div>
                  <div className="p-2 bg-light rounded">Loading statuses...</div>
                </div>
              )}
              {suppliers.length > 0 ? renderField('supplierId', 'Supplier Name', (asset as any).supplierId, 'select', suppliers.map(s => ({ value: s.id, label: s.name }))) : (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Supplier Name:</strong>
                  </div>
                  <div className="p-2 bg-light rounded">Loading suppliers...</div>
                </div>
              )}
              {departments.length > 0 ? renderField('departmentId', 'Department', asset.departmentId, 'select', departments.map(d => ({ value: d.deptId, label: d.deptName }))) : (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Department:</strong>
                  </div>
                  <div className="p-2 bg-light rounded">Loading departments...</div>
                </div>
              )}
              {renderField('building', 'Building', asset.building)}
              {renderField('floorNumber', 'Floor Number', asset.floorNumber)}
              {renderField('roomNumber', 'Room Number', asset.roomNumber)}
              {renderField('assetAssignTo', 'Assigned To', asset.assetAssignTo)}
              {!isAppProduction && (
                <>
                  {conditions.length > 0 ? renderField('assetConditionCode', 'Asset Condition', (asset as any).assetCondition?.displayName || (asset as any).assetCondition, 'select', conditions.map(c => ({ value: c.code, label: c.displayName }))) : (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>Asset Condition:</strong>
                      </div>
                      <div className="p-2 bg-light rounded">Loading conditions...</div>
                    </div>
                  )}
                  {renderField('isAmc', 'AMC', asset.isAmc ? 'true' : 'false', 'select', [
                    { value: 'true', label: 'Yes' },
                    { value: 'false', label: 'No' },
                  ])}
                </>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </ComponentContainerCard>
  );
}


