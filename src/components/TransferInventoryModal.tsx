import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { inventoryTransactionTypeService, InventoryTransactionType } from '@/services/api/inventoryTransactionType';
import { inventoryTransferService, InventoryTransferRequest } from '@/services/api/inventoryTransfer';
import { departmentService, Department } from '@/services/api/departments';
import { departmentInventoryService, DepartmentInventory } from '@/services/api/departmentInventory';
import { STORAGE_KEYS } from '@/utils/constants';
import { DEPARTMENT_REQUIRED_TRANSACTION_TYPES, OUTGOING_TRANSACTION_TYPES, INVENTORY_TRANSACTION_TYPES } from '@/utils/inventoryConstants';

interface InventoryListItem {
  id: string;
  itemName: string;
  quantity: number;
  unitMeasure?: string;
  minStock?: number;
  // consumerId: string;
  createdAt: string;
  updatedAt: string;
  itemNo?: string;
  consumer?: {
    id: string;
    email: string;
    company?: string;
  };
}

interface TransferInventoryModalProps {
  show: boolean;
  onHide: () => void;
  selectedInventory: InventoryListItem | null;
  onSuccess: () => void;
  isDepartmentInventory?: boolean;
  fixedDepartmentId?: string;
}

export default function TransferInventoryModal({ 
  show, 
  onHide, 
  selectedInventory, 
  onSuccess,
  isDepartmentInventory = false,
  fixedDepartmentId
}: TransferInventoryModalProps) {
  const [transactionTypes, setTransactionTypes] = useState<InventoryTransactionType[]>([]);
  const [loadingTransactionTypes, setLoadingTransactionTypes] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState<string>("");
  const [transferSuccess, setTransferSuccess] = useState<string>("");
  const [departmentInventory, setDepartmentInventory] = useState<DepartmentInventory | null>(null);
  const [loadingDepartmentInventory, setLoadingDepartmentInventory] = useState(false);
  const [currentDepartmentName, setCurrentDepartmentName] = useState<string>("");

  // Transfer form state
  const [transferForm, setTransferForm] = useState<InventoryTransferRequest>({
    inventoryId: "",
    quantity: 0,
    transactionTypeCode: "",
    departmentId: "",
    expiredAt: "",
    reason: ""
  });

  // Reset form when modal opens/closes or selected inventory changes
  useEffect(() => {
    if (show && selectedInventory) {
      setTransferForm({
        inventoryId: selectedInventory.id,
        quantity: 0,
        transactionTypeCode: "",
        departmentId: isDepartmentInventory && fixedDepartmentId ? fixedDepartmentId : "",
        supplierId: "",
        grnItemId: "",
        poLineItemId: "",
        expiredAt: "",
        reason: ""
      });
      setTransferError("");
      setTransferSuccess("");
      setDepartmentInventory(null);

      // Fetch transaction types if not already loaded
      if (transactionTypes.length === 0) {
        fetchTransactionTypes();
      }

      // Fetch departments if not already loaded (needed for both modes to display department names)
      if (departments.length === 0) {
        fetchDepartments();
      }
    }
  }, [show, selectedInventory, isDepartmentInventory, fixedDepartmentId]);

  // Fetch department inventory when department or transaction type changes
  useEffect(() => {
    if (transferForm.departmentId && transferForm.transactionTypeCode && 
        (transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_EXPIRED_RETURN || transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_GENERAL_RETURN)) {
      fetchDepartmentInventory();
    } else {
      setDepartmentInventory(null);
    }
  }, [transferForm.departmentId, transferForm.transactionTypeCode]);

  // Update current department name when departments are loaded or department ID changes
  useEffect(() => {
    if (transferForm.departmentId && departments.length > 0) {
      const department = departments.find(dept => dept.deptId === transferForm.departmentId);
      setCurrentDepartmentName(department?.deptName || "");
    } else {
      setCurrentDepartmentName("");
    }
  }, [transferForm.departmentId, departments]);

  const fetchTransactionTypes = async () => {
    setLoadingTransactionTypes(true);
    try {
      const types = await inventoryTransactionTypeService.getAllTransactionTypes();
      
      // Filter transaction types for department inventory mode
      if (isDepartmentInventory) {
        const filteredTypes = types.filter(type => 
          type.code === INVENTORY_TRANSACTION_TYPES.DEPT_EXPIRED_RETURN || 
          type.code === INVENTORY_TRANSACTION_TYPES.DEPT_GENERAL_RETURN
        );
        setTransactionTypes(filteredTypes);
      } else {
        setTransactionTypes(types);
      }
    } catch (err: any) {
      console.error("Error fetching transaction types:", err);
      setTransferError("Failed to load transaction types. Please refresh the page and try again.");
    } finally {
      setLoadingTransactionTypes(false);
    }
  };

  const fetchDepartments = async () => {
    setLoadingDepartments(true);
    try {
      const deptData = await departmentService.getDepartmentsByConsumerId();
      setDepartments(deptData);
    } catch (err: any) {
      console.error("Error fetching departments:", err);
      setTransferError("Failed to load departments. Please refresh the page and try again.");
    } finally {
      setLoadingDepartments(false);
    }
  };

  const fetchDepartmentInventory = async () => {
    if (!transferForm.departmentId || !selectedInventory) return;
    
    setLoadingDepartmentInventory(true);
    try {
      const deptInventory = await departmentInventoryService.getByDepartmentAndInventory(
        transferForm.departmentId, 
        selectedInventory.id
      );
      setDepartmentInventory(deptInventory);
    } catch (err: any) {
      console.error("Error fetching department inventory:", err);
      setTransferError(err.message || "Failed to load department inventory information.");
    } finally {
      setLoadingDepartmentInventory(false);
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferLoading(true);
    setTransferError("");
    setTransferSuccess("");

    // Validate form before submission
    if (!transferForm.quantity || transferForm.quantity <= 0) {
      setTransferError("Quantity must be greater than 0");
      setTransferLoading(false);
      return;
    }

    if (!transferForm.transactionTypeCode) {
      setTransferError("Please select a transaction type");
      setTransferLoading(false);
      return;
    }

    // Check if department is required for specific transaction types
    if (DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId && transferForm.transactionTypeCode !== INVENTORY_TRANSACTION_TYPES.IN) {
      setTransferError("Department selection is required for this transaction type");
      setTransferLoading(false);
      return;
    }

    // Check if quantity exceeds available stock for outgoing transactions
    if (OUTGOING_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && selectedInventory) {
      if (transferForm.quantity > selectedInventory.quantity) {
        setTransferError(`Insufficient stock. Available quantity: ${selectedInventory.quantity} ${selectedInventory.unitMeasure}`);
        setTransferLoading(false);
        return;
      }
    }

    // Check department inventory for return transactions
    if ((transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_EXPIRED_RETURN || transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_GENERAL_RETURN) && 
        transferForm.departmentId) {
      if (!departmentInventory) {
        setTransferError("This department has no inventory for this item.");
        setTransferLoading(false);
        return;
      }
      if (transferForm.quantity > departmentInventory.quantity) {
        setTransferError(`Insufficient quantity in department inventory. Available: ${departmentInventory.quantity} ${selectedInventory?.unitMeasure || 'units'}`);
        setTransferLoading(false);
        return;
      }
    }

    try {
      const response = await inventoryTransferService.transferInventory(transferForm);
      setTransferSuccess("Inventory transfer completed successfully!");
      setTimeout(() => {
        onSuccess();
        onHide();
        setTransferSuccess("");
      }, 1500);
    } catch (err: any) {
      console.error("Error transferring inventory:", err);
      
      // Handle different types of errors
      if (err.message?.includes('400')) {
        setTransferError("Invalid request. Please check your input and try again.");
      } else if (err.message?.includes('404')) {
        setTransferError("Inventory item not found. Please refresh the page and try again.");
      } else if (err.message?.includes('500')) {
        setTransferError("Server error. Please try again later.");
      } else if (err.message?.includes('Insufficient inventory quantity')) {
        setTransferError("Insufficient stock for this transfer. Please reduce the quantity.");
      } else if (err.message?.includes('Insufficient quantity in department inventory')) {
        setTransferError(err.message);
      } else if (err.message?.includes('No department inventory entry found')) {
        setTransferError("No inventory found in the selected department for this item.");
      } else {
        setTransferError(err.message || "Transfer failed. Please try again.");
      }
    } finally {
      setTransferLoading(false);
    }
  };

  const handleTransferFormChange = (field: keyof InventoryTransferRequest, value: any) => {
    setTransferForm(prev => {
      const updatedForm = {
        ...prev,
        [field]: value
      };
      
      // If transaction type is IN, clear department selection
      if (field === 'transactionTypeCode' && value === INVENTORY_TRANSACTION_TYPES.IN) {
        updatedForm.departmentId = "";
        setDepartmentInventory(null);
      }
      
      return updatedForm;
    });
  };

  const handleClose = () => {
    if (!transferLoading) {
      setTransferForm({
        inventoryId: "",
        quantity: 0,
        transactionTypeCode: "",
        departmentId: "",
        expiredAt: "",
        reason: ""
      });
      setTransferError("");
      setTransferSuccess("");
      setDepartmentInventory(null);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
      <Modal.Header 
        closeButton={!transferLoading}
        style={{ 
          background: 'linear-gradient(135deg, #0932c1, #1286ae, #082a71)',
          color: 'white'
        }}
      >
        <Modal.Title>
          <i className="ri-exchange-line me-2"></i>
          Transfer Inventory
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleTransferSubmit}>
        <Modal.Body>
          {selectedInventory && (
            <Alert variant="info">
              <div className="d-flex align-items-start">
                <i className="ri-information-line me-2 mt-1"></i>
                <div>
                  <strong>Item:</strong> {selectedInventory.itemName} ({selectedInventory.itemNo})<br />
                  <strong>Current Stock:</strong> {selectedInventory.quantity} {selectedInventory.unitMeasure}
                </div>
              </div>
            </Alert>
          )}

          {/* Department Inventory Info for Return Transactions */}
          {departmentInventory && (transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_EXPIRED_RETURN || transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_GENERAL_RETURN) && (
            <Alert variant="warning">
              <div className="d-flex align-items-start">
                <i className="ri-alert-line me-2 mt-1"></i>
                <div>
                  <strong>Department Inventory:</strong><br />
                  <strong>Department:</strong> {departmentInventory.department.deptName}<br />
                  <strong>Current Stock:</strong> {departmentInventory.quantity} {selectedInventory?.unitMeasure || 'units'}
                </div>
              </div>
            </Alert>
          )}

          {/* No Department Inventory Message for Return Transactions */}
          {!departmentInventory && transferForm.departmentId && (transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_EXPIRED_RETURN || transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.DEPT_GENERAL_RETURN) && !loadingDepartmentInventory && (
            <Alert variant="info">
              <div className="d-flex align-items-start">
                <i className="ri-information-line me-2 mt-1"></i>
                <div>
                  <strong>No Department Inventory:</strong><br />
                  This department has no inventory for this item. First add inventory to this department using <strong>{transactionTypes.find(type => type.code === INVENTORY_TRANSACTION_TYPES.DEPT_OUT)?.displayName}</strong> transaction.
                </div>
              </div>
            </Alert>
          )}

          {transferError && (
            <Alert variant="danger" className="mb-3">
              <div className="d-flex align-items-start">
                <i className="ri-error-warning-line me-2 mt-1"></i>
                <div>
                  <strong>Transfer Error:</strong>
                  <br />
                  {transferError}
                </div>
              </div>
            </Alert>
          )}

          {transferSuccess && (
            <Alert variant="success" className="mb-3">
              <div className="d-flex align-items-start">
                <i className="ri-check-line me-2 mt-1"></i>
                <div>
                  <strong>Success:</strong>
                  <br />
                  {transferSuccess}
                </div>
              </div>
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={transferForm.quantity === 0 ? "" : transferForm.quantity}
                  onChange={(e) => handleTransferFormChange('quantity', e.target.value === "" ? 0 : parseInt(e.target.value))}
                  required
                  disabled={transferLoading}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Transaction Type *</Form.Label>
                <Form.Select
                  value={transferForm.transactionTypeCode}
                  onChange={(e) => handleTransferFormChange('transactionTypeCode', e.target.value)}
                  required
                  disabled={loadingTransactionTypes || transferLoading}
                >
                  <option value="">Select Transaction Type</option>
                  {transactionTypes.map((type) => (
                    <option key={type.code} value={type.code}>
                      {type.displayName}
                    </option>
                  ))}
                </Form.Select>
                {loadingTransactionTypes && (
                  <div className="mt-1">
                    <small className="text-muted">Loading transaction types...</small>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Department
                  {DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && transferForm.transactionTypeCode !== INVENTORY_TRANSACTION_TYPES.IN && <span className="text-danger"> *</span>}
                </Form.Label>
                <Form.Select
                  value={transferForm.departmentId}
                  onChange={(e) => handleTransferFormChange('departmentId', e.target.value)}
                  disabled={loadingDepartments || transferLoading || transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.IN || isDepartmentInventory}
                  className={DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId && transferForm.transactionTypeCode !== INVENTORY_TRANSACTION_TYPES.IN ? 'border-danger' : ''}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.deptId} value={dept.deptId}>
                      {dept.deptName}
                    </option>
                  ))}
                </Form.Select>
                {loadingDepartments && (
                  <div className="mt-1">
                    <small className="text-muted">Loading departments...</small>
                  </div>
                )}
                {isDepartmentInventory && currentDepartmentName && (
                  <div className="mt-1">
                    <small className="text-muted">Current Department: {currentDepartmentName}</small>
                  </div>
                )}
                {DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId && transferForm.transactionTypeCode !== INVENTORY_TRANSACTION_TYPES.IN && !isDepartmentInventory && (
                  <div className="mt-1">
                    <small className="text-danger">Department is required for this transaction type</small>
                  </div>
                )}
                {transferForm.transactionTypeCode === INVENTORY_TRANSACTION_TYPES.IN && (
                  <div className="mt-1">
                    <small className="text-muted">Department selection is not required for purchase-in transactions</small>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Expired At</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={transferForm.expiredAt}
                  onChange={(e) => handleTransferFormChange('expiredAt', e.target.value)}
                  disabled={transferLoading}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={transferForm.reason}
                  onChange={(e) => handleTransferFormChange('reason', e.target.value)}
                  disabled={transferLoading}
                  placeholder="Enter reason for transfer (optional)"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer className="border-top">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            disabled={transferLoading}
            size="lg"
          >
            <i className="ri-close-line me-1"></i>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={transferLoading}
            size="lg"
          >
            {transferLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Transferring...
              </>
            ) : (
              <>
                <i className="ri-exchange-line me-1"></i>
                Transfer Inventory
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
