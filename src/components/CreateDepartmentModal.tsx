import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { departmentService } from '@/services/api/departments';
import { STORAGE_KEYS } from '@/utils/constants';

interface CreateDepartmentModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  existingDepartments?: Array<{ deptName: string }>;
}

export default function CreateDepartmentModal({ show, onHide, onSuccess, existingDepartments = [] }: CreateDepartmentModalProps) {
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departmentName.trim()) {
      setError('Department name is required');
      return;
    }

    if (departmentName.trim().length < 2) {
      setError('Department name must be at least 2 characters long');
      return;
    }

    // Check for duplicate department names
    const trimmedName = departmentName.trim();
    const isDuplicate = existingDepartments.some(
      dept => dept.deptName.toLowerCase() === trimmedName.toLowerCase()
    );
    
    if (isDuplicate) {
      setError('A department with this name already exists');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const departmentData = {
        deptName: departmentName.trim()
      };

      await departmentService.createDepartment(departmentData);
      
      setSuccess('Department created successfully!');
      setDepartmentName('');
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        onSuccess();
        onHide();
        setSuccess('');
      }, 1500);
      
    } catch (err: any) {
      console.error('Error creating department:', err);
      setError(err.response?.data?.message || 'Failed to create department. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setDepartmentName('');
      setError('');
      setSuccess('');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton={!loading} className="border-bottom">
        <Modal.Title className="fw-bold">
          <i className="ri-building-line me-2"></i>
          Create New Department
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Department Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., IT Department, Finance, Operations"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              disabled={loading}
              required
              className="form-control-lg"
            />
            <Form.Text className="text-muted">
              Enter a unique name for the department (minimum 2 characters)
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
            disabled={loading || !departmentName.trim()}
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
                Create Department
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
