"use client";

import React, { useState, useEffect } from "react";
import PageTitle from '@/components/PageTitle'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane, Badge, Table, Alert, Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import { assetsService, Asset } from '@/services/api/assets'
import { assetTypesService, AssetType } from '@/services/api/assetTypes'
import { assetSubTypesService, AssetSubType } from '@/services/api/assetSubTypes'
import {departmentService, Department } from '@/services/api/departments'
import { warrantyService, Warranty } from '@/services/api/warranty'
import { serviceRequestService, ServiceRequest, UpdateServiceRequestRequest, ServiceRequestItem, CreateServiceRequestItemRequest, UpdateServiceRequestItemRequest } from '@/services/api/serviceRequest'
import { Location } from '@/services/api/assets'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import {  CardFooter, CardHeader, CardTitle,  } from 'react-bootstrap'

// Service Request Item Modal Component
interface ServiceRequestItemModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CreateServiceRequestItemRequest | UpdateServiceRequestItemRequest) => void;
  item?: ServiceRequestItem | null;
  serviceRequestId: string;
  loading: boolean;
}

function ServiceRequestItemModal({ show, onHide, onSubmit, item, serviceRequestId, loading }: ServiceRequestItemModalProps) {
  const [formData, setFormData] = useState({
    partName: '',
    partCost: undefined as number | undefined,
    labourCost: undefined as number | undefined,
    quantity: undefined as number | undefined,
    defectDescription: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        partName: item.partName,
        partCost: item.partCost,
        labourCost: item.labourCost,
        quantity: item.quantity,
        defectDescription: item.defectDescription
      });
    } else {
      setFormData({
        partName: '',
        partCost: undefined,
        labourCost: undefined,
        quantity: undefined,
        defectDescription: ''
      });
    }
  }, [item, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Apply minimum values if fields are empty/undefined
    const finalPartCost = formData.partCost ?? 0;
    const finalLabourCost = formData.labourCost ?? 0;
    const finalQuantity = formData.quantity ?? 1;
    
    const calculatedTotalCost = (finalPartCost * finalQuantity) + finalLabourCost;
    
    if (item) {
      // Update existing item
      onSubmit({
        ...formData,
        partCost: finalPartCost,
        labourCost: finalLabourCost,
        quantity: finalQuantity,
        totalCost: calculatedTotalCost
      } as UpdateServiceRequestItemRequest);
    } else {
      // Create new item
      onSubmit({
        ...formData,
        partCost: finalPartCost,
        labourCost: finalLabourCost,
        quantity: finalQuantity,
        totalCost: calculatedTotalCost,
        serviceRequestId
      } as CreateServiceRequestItemRequest);
    }
  };

  const totalCost = ((formData.partCost ?? 0) * (formData.quantity ?? 1)) + (formData.labourCost ?? 0);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <ModalHeader closeButton>
        <h5 className="modal-title">
          <IconifyIcon icon="mdi:plus-circle" className="me-2" />
          {item ? 'Edit Service Request Item' : 'Add Service Request Item'}
        </h5>
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup className="mb-3">
                <FormLabel>Part Name *</FormLabel>
                <FormControl
                  type="text"
                  value={formData.partName}
                  onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="mb-3">
                <FormLabel>Quantity *</FormLabel>
                <FormControl
                  type="number"
                  min="1"
                  value={formData.quantity ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      quantity: value === '' ? undefined : parseInt(value) || 1 
                    });
                  }}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup className="mb-3">
                <FormLabel>Part Cost *</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.partCost ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      partCost: value === '' ? undefined : parseFloat(value) || 0 
                    });
                  }}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="mb-3">
                <FormLabel>Labour Cost *</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.labourCost ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      labourCost: value === '' ? undefined : parseFloat(value) || 0 
                    });
                  }}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="mb-3">
            <FormLabel>Defect Description *</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              value={formData.defectDescription}
              onChange={(e) => setFormData({ ...formData, defectDescription: e.target.value })}
              required
            />
          </FormGroup>
                     <Alert variant="info">
             <strong>Total Cost: ₹{totalCost.toFixed(2)}</strong>
             <br />
             (Part Cost: ₹{((formData.partCost ?? 0) * (formData.quantity ?? 1)).toFixed(2)} + Labour Cost: ₹{(formData.labourCost ?? 0).toFixed(2)})
           </Alert>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {item ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <IconifyIcon icon="mdi:content-save" className="me-2" />
                {item ? 'Update Item' : 'Add Item'}
              </>
            )}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default function ServiceRequestDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceRequestId = searchParams.get('srid');
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);
  
  // Service Request Items state
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceRequestItem | null>(null);
  const [itemLoading, setItemLoading] = useState(false);
  
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ServiceRequestItem | null>(null);

  useEffect(() => { 
    const fetchServiceRequest = async () => {
      if (!serviceRequestId) {
        setError("Service Request ID is required");
        setLoading(false);
        return;
      }
      try {
        console.log(serviceRequestId);
        const serviceRequestData = await serviceRequestService.getServiceRequestById(serviceRequestId);
        setServiceRequest(serviceRequestData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load service request. Please try again.");
        setLoading(false);
      }
    };
    fetchServiceRequest();
  }, [serviceRequestId]);

  const handleEditField = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setEditValues({ ...editValues, [fieldName]: currentValue });
  };

  const handleSaveField = async (fieldName: string) => {
    if (!serviceRequest || !serviceRequestId) return;

    setSaving(true);
    setError(""); // Clear any previous errors
    try {
      const updateData: UpdateServiceRequestRequest = {
        [fieldName]: editValues[fieldName]
      };

      await serviceRequestService.updateServiceRequest(serviceRequestId, updateData);
      
      // Refresh the service request to get the complete updated data
      const refreshedServiceRequest = await serviceRequestService.getServiceRequestById(serviceRequestId);
      setServiceRequest(refreshedServiceRequest);
      setEditingField(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating field:', error);
      setError("Failed to update field. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  // Service Request Items handlers
  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item: ServiceRequestItem) => {
    setEditingItem(item);
    setShowItemModal(true);
  };

  const handleDeleteItem = (item: ServiceRequestItem) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDeleteItem = async () => {
    if (!itemToDelete || !serviceRequestId) return;

    setItemLoading(true);
    try {
      await serviceRequestService.deleteServiceRequestItem(itemToDelete.serviceRequestItemId!);
      // Refresh the service request to get updated items
      const updatedServiceRequest = await serviceRequestService.getServiceRequestById(serviceRequestId);
      setServiceRequest(updatedServiceRequest);
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError("Failed to delete item. Please try again.");
    } finally {
      setItemLoading(false);
    }
  };

  const cancelDeleteItem = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleSubmitItem = async (data: CreateServiceRequestItemRequest | UpdateServiceRequestItemRequest) => {
    setItemLoading(true);
    try {
      if (editingItem) {
        // Update existing item
        await serviceRequestService.updateServiceRequestItem(editingItem.serviceRequestItemId!, data as UpdateServiceRequestItemRequest);
      } else {
        // Create new item
        await serviceRequestService.createServiceRequestItem(data as CreateServiceRequestItemRequest);
      }
      
      // Refresh the service request to get updated items
      const updatedServiceRequest = await serviceRequestService.getServiceRequestById(serviceRequestId!);
      setServiceRequest(updatedServiceRequest);
      setShowItemModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      setError("Failed to save item. Please try again.");
    } finally {
      setItemLoading(false);
    }
  };

  const renderEditableField = (fieldName: string, label: string, value: string, type: 'text' | 'textarea' | 'select' = 'text', options?: string[]) => {
    const isEditing = editingField === fieldName;
    const currentValue = isEditing ? editValues[fieldName] : value;

    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <strong>{label}:</strong>
          {!isEditing && (
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => handleEditField(fieldName, value)}
            >
              <IconifyIcon icon="mdi:pencil" className="me-1" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditing ? (
          <div className="d-flex gap-2 align-items-start">
            {type === 'textarea' ? (
              <FormControl
                as="textarea"
                rows={3}
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              />
            ) : type === 'select' ? (
              <FormControl
                as="select"
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              >
                {options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </FormControl>
            ) : (
              <FormControl
                type="text"
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                className="flex-grow-1"
              />
            )}
            <div className="d-flex gap-1">
              <Button 
                variant="success" 
                size="sm"
                onClick={() => handleSaveField(fieldName)}
                disabled={saving}
              >
                <IconifyIcon icon="mdi:check" />
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                <IconifyIcon icon="mdi:close" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-light rounded">
            {value || 'Not specified'}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !serviceRequest) {
    return (
      <div className="container-fluid">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </div>
    );
  }

  if (!serviceRequest) {
    return (
      <div className="container-fluid">
        <Alert variant="warning">
          <Alert.Heading>Service Request Not Found</Alert.Heading>
          <p>The requested service request could not be found.</p>
          <Button variant="outline-warning" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </div>
    );
  }

  const totalItemsCost = serviceRequest.serviceRequestItems?.reduce((sum, item) => sum + item.totalCost, 0) || 0;

  return (
    <>
      <PageTitle title={`Service Request - ${serviceRequest.srNo}`} />
      
      {/* Header Information */}
      <Row>
        <Col md={12}>
          <ComponentContainerCard title="Service Request Information" description="Key details of the service request">
            <Card className="border-secondary border">
              <CardHeader className="bg-primary text-white">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:file-document-outline" className="me-2" />
                  Service Request Details
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>SR Number:</strong> {serviceRequest.srNo}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {serviceRequest.asset?.assetName}
                    </div>
                    <div className="mb-3">
                      <strong>Brand:</strong> {serviceRequest.asset?.brand}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {serviceRequest.asset?.model}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Condition:</strong> {serviceRequest.assetCondition || 'Not specified'}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Installation Date:</strong> {serviceRequest.asset?.installationDate}
                    </div>
                    <div className="mb-3">
                      <strong>Service Supplier:</strong> {serviceRequest.serviceSupplier?.name}
                    </div>
                    <div className="mb-3">
                      <strong>Contract Name:</strong> {serviceRequest.serviceContract?.contractName}
                    </div>
                    <div className="mb-3">
                      <strong>Coverage Type:</strong> {serviceRequest.serviceContract?.coverageType}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <strong>Problem:</strong> {serviceRequest.problem || 'Not specified'}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Service Request Items */}
      <Row className="mt-4">
        <Col md={12}>
          <ComponentContainerCard title="Service Request Items" description="Parts and services used for this request">
            <Card className="border-secondary border">
              <CardHeader className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <CardTitle as="h5" className="mb-0">
                    <IconifyIcon icon="mdi:clipboard-list-outline" className="me-2" />
                    Items & Parts
                  </CardTitle>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleAddItem}
                    disabled={itemLoading}
                  >
                    <IconifyIcon icon="mdi:plus" className="me-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {serviceRequest.serviceRequestItems && serviceRequest.serviceRequestItems.length > 0 ? (
                  <>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th>Part Name</th>
                          <th>Quantity</th>
                          <th>Part Cost</th>
                          <th>Labour Cost</th>
                          <th>Total Cost</th>
                          <th>Defect Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceRequest.serviceRequestItems.map((item) => (
                          <tr key={item.serviceRequestItemId}>
                            <td>{item.partName}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.partCost.toFixed(2)}</td>
                            <td>₹{item.labourCost.toFixed(2)}</td>
                            <td>₹{item.totalCost.toFixed(2)}</td>
                            <td>{item.defectDescription}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => handleEditItem(item)}
                                  disabled={itemLoading}
                                >
                                  <IconifyIcon icon="mdi:pencil" />
                                </Button>
                                                                 <Button 
                                   variant="outline-danger" 
                                   size="sm"
                                   onClick={() => handleDeleteItem(item)}
                                   disabled={itemLoading}
                                 >
                                   <IconifyIcon icon="mdi:delete" />
                                 </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Alert variant="info" className="mt-3">
                      <strong>Total Items Cost: ₹{totalItemsCost.toFixed(2)}</strong>
                    </Alert>
                  </>
                ) : (
                  <Alert variant="info">
                    <IconifyIcon icon="mdi:information-outline" className="me-2" />
                    No items have been added to this service request yet.
                  </Alert>
                )}
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Editable Fields */}
      <Row className="mt-4">
        <Col md={12}>
          <ComponentContainerCard title="Editable Information" description="Fields that can be updated">
            <Card className="border-secondary border">
              <CardHeader className="bg-light">
                <CardTitle as="h5" className="mb-0">
                  <IconifyIcon icon="mdi:pencil-outline" className="me-2" />
                  Updateable Fields
                </CardTitle>
              </CardHeader>
              <CardBody>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Row>
                  <Col md={6}>
                    {renderEditableField('technicianName', 'Technician Name', serviceRequest.technicianName || '')}
                    {renderEditableField('srStatus', 'SR Status', serviceRequest.srStatus, 'select', [
                      'OPEN', 'IN_PROGRESS', 'PENDING', 'COMPLETED', 'CLOSED', 'CANCELLED'
                    ])}
                    {renderEditableField('assetCondition', 'Asset Condition', serviceRequest.assetCondition || '')}
                  </Col>
                  <Col md={6}>
                    {renderEditableField('closureReason', 'Closure Reason', serviceRequest.closureReason || '')}
                    {renderEditableField('problem', 'Problem', serviceRequest.problem || '', 'textarea')}
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    {renderEditableField('serviceDescription', 'Service Description', serviceRequest.serviceDescription || '', 'textarea')}
                    {renderEditableField('closureNotes', 'Closure Notes', serviceRequest.closureNotes || '', 'textarea')}
                  </Col>
                </Row>

                <div className="d-flex gap-2 mt-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => router.back()}
                  >
                    <IconifyIcon icon="mdi:arrow-left" className="me-2" />
                    Back
                  </Button>
                </div>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

             {/* Service Request Item Modal */}
       <ServiceRequestItemModal
         show={showItemModal}
         onHide={() => setShowItemModal(false)}
         onSubmit={handleSubmitItem}
         item={editingItem}
         serviceRequestId={serviceRequestId!}
         loading={itemLoading}
       />

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteModal} onHide={cancelDeleteItem} centered>
         <ModalHeader closeButton>
           <ModalTitle>
             <IconifyIcon icon="mdi:delete-alert" className="me-2 text-danger" />
             Confirm Delete
           </ModalTitle>
         </ModalHeader>
         <ModalBody>
           <p>Are you sure you want to delete this service request item?</p>
           {itemToDelete && (
             <div className="bg-light p-3 rounded">
               <strong>Item Details:</strong>
               <br />
               <strong>Part Name:</strong> {itemToDelete.partName}
               <br />
               <strong>Quantity:</strong> {itemToDelete.quantity}
               <br />
               <strong>Total Cost:</strong> ₹{itemToDelete.totalCost.toFixed(2)}
             </div>
           )}
           <p className="text-danger mt-3">
             <strong>Warning:</strong> This action cannot be undone.
           </p>
         </ModalBody>
         <ModalFooter>
           <Button variant="secondary" onClick={cancelDeleteItem} disabled={itemLoading}>
             Cancel
           </Button>
           <Button 
             variant="danger" 
             onClick={confirmDeleteItem} 
             disabled={itemLoading}
           >
             {itemLoading ? (
               <>
                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                 Deleting...
               </>
             ) : (
               <>
                 <IconifyIcon icon="mdi:delete" className="me-2" />
                 Delete Item
               </>
             )}
           </Button>
         </ModalFooter>
       </Modal>
     </>
   );
 }
