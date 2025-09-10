import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { supplierService } from '@/services/api/suppliers';

interface CreateSupplierModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  existingSuppliers?: Array<{ name: string; code?: string }>;
}

export default function CreateSupplierModal({ show, onHide, onSuccess, existingSuppliers = [] }: CreateSupplierModalProps) {
  const [supplierName, setSupplierName] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supplierName.trim()) {
      setError('Supplier name is required');
      return;
    }

    if (supplierName.trim().length < 2) {
      setError('Supplier name must be at least 2 characters long');
      return;
    }

    // Check for duplicate supplier names
    const trimmedName = supplierName.trim();
    const isDuplicateName = existingSuppliers.some(
      supplier => supplier.name.toLowerCase() === trimmedName.toLowerCase()
    );
    
    if (isDuplicateName) {
      setError('A supplier with this name already exists');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const supplierData = {
        name: supplierName.trim(),
        isActive: true,
        code: supplierCode ?  supplierCode.trim() : null
      };

      await supplierService.createSupplier(supplierData);
      
      setSuccess('Supplier created successfully!');
      setSupplierName('');
      setSupplierCode('');
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        onSuccess();
        onHide();
        setSuccess('');
      }, 1500);
      
    } catch (err: any) {
      console.error('Error creating supplier:', err);
      setError(err.response?.data?.message || 'Failed to create supplier. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSupplierName('');
      setError('');
      setSuccess('');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton={!loading} className="border-bottom">
        <Modal.Title className="fw-bold">
          <i className="ri-store-line me-2"></i>
          Create New Supplier
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Supplier Name *</Form.Label>
            <Form.Control
              type="text"
            //   placeholder="e.g., ABC Electronics, XYZ Services"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              disabled={loading}
              required
              className="form-control-lg"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Supplier Code</Form.Label>
            <Form.Control
              type="text"
              value={supplierCode}
              onChange={(e) => setSupplierCode(e.target.value)}
              disabled={loading}
              className="form-control-lg"
                            
            />
            <Form.Text className="text-muted">ERP supplier code or Other system code
            </Form.Text>
          </Form.Group>


        </Modal.Body>
        
        <Modal.Footer className="border-top">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            disabled={loading}
            size="lg"
          >
            <i className="ri-close-line me-1"></i>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading || !supplierName.trim()}
            size="lg"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating...
              </>
            ) : (
              <>
                <i className="ri-add-line me-1"></i>
                Create Supplier
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
