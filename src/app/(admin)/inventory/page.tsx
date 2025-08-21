"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button, Table, Modal, Form, Row, Col } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { inventoryService, Inventory } from "@/services/api/inventory";
import { inventoryTransactionTypeService, InventoryTransactionType } from "@/services/api/inventoryTransactionType";
import { inventoryTransferService, InventoryTransferRequest } from "@/services/api/inventoryTransfer";
import { departmentService, Department } from "@/services/api/departments";
import { formatDate } from "@/utils/date";
import { STORAGE_KEYS } from "@/utils/constants";
import { DEPARTMENT_REQUIRED_TRANSACTION_TYPES, OUTGOING_TRANSACTION_TYPES } from "@/utils/inventoryConstants";
import { MdSwapHoriz } from "react-icons/md";

interface InventoryListItem {
  id: string;
  itemName: string;
  quantity: number;
  unitMeasure?: string;
  minStock?: number;
  consumerId: string;
  createdAt: string;
  updatedAt: string;
  itemNo?: string;
  consumer?: {
    id: string;
    email: string;
    company?: string;
  };
}

export default function InventoryListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inventory, setInventory] = useState<InventoryListItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Transfer modal state
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<InventoryListItem | null>(null);
  const [transactionTypes, setTransactionTypes] = useState<InventoryTransactionType[]>([]);
  const [loadingTransactionTypes, setLoadingTransactionTypes] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState<string>("");
  const [transferSuccess, setTransferSuccess] = useState<string>("");

  // Transfer form state
  const [transferForm, setTransferForm] = useState<InventoryTransferRequest>({
    inventoryId: "",
    quantity: 0,
    transactionTypeCode: "",
    departmentId: "",
    expiredAt: "",
    reason: ""
  });

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError("");
      try {
        let data: InventoryListItem[];
        data = await inventoryService.getInventoryByConsumerId(JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "");
        
        const mapped: InventoryListItem[] = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              itemName: item.itemName,
              quantity: item.quantity,
              unitMeasure: item.unitMeasure,
              minStock: item.minStock,
              consumerId: item.consumerId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              consumer: item.consumer,
              itemNo: item.itemNo,
            }))
          : [];

        setInventory(mapped);
        setFilteredInventory(mapped);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory data");
        setInventory([]);
        setFilteredInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    let aValue: any = a[sortField as keyof InventoryListItem];
    let bValue: any = b[sortField as keyof InventoryListItem];

    if (sortField === "createdAt" || sortField === "updatedAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Fetch transaction types when modal opens
  const handleTransferClick = async (item: InventoryListItem) => {
    setSelectedInventory(item);
    setTransferForm({
      inventoryId: item.id,
      quantity: 0,
      transactionTypeCode: "",
      departmentId: "",
      supplierId: "",
      grnItemId: "",
      poLineItemId: "",
      expiredAt: "",
      reason: ""
    });
    setShowTransferModal(true);
    setTransferError("");
    setTransferSuccess("");

    // Fetch transaction types if not already loaded
    if (transactionTypes.length === 0) {
      setLoadingTransactionTypes(true);
      try {
        const types = await inventoryTransactionTypeService.getAllTransactionTypes();
        setTransactionTypes(types);
      } catch (err: any) {
        console.error("Error fetching transaction types:", err);
        setTransferError("Failed to load transaction types. Please refresh the page and try again.");
      } finally {
        setLoadingTransactionTypes(false);
      }
    }

    // Fetch departments if not already loaded
    if (departments.length === 0) {
      setLoadingDepartments(true);
      try {
        const consumerId = JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "";
        const deptData = await departmentService.getDepartmentsByConsumerId(consumerId);
        setDepartments(deptData);
      } catch (err: any) {
        console.error("Error fetching departments:", err);
        setTransferError("Failed to load departments. Please refresh the page and try again.");
      } finally {
        setLoadingDepartments(false);
      }
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
    if (DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId) {
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

    try {
      const response = await inventoryTransferService.transferInventory(transferForm);
      if (response.success) {
        setTransferSuccess("Inventory transfer completed successfully!");
        setTimeout(() => {
          setShowTransferModal(false);
          // Refresh inventory data
          window.location.reload();
        }, 1500);
      } else {
        setTransferError(response.message || "Transfer failed");
      }
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
      } else {
        setTransferError(err.message || "Transfer failed. Please try again.");
      }
    } finally {
      setTransferLoading(false);
    }
  };

  const handleTransferFormChange = (field: keyof InventoryTransferRequest, value: any) => {
    setTransferForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <PageTitle title="" />

      <ComponentContainerCard
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>Inventory</span>
            <Button
              variant="primary"
              onClick={() => router.push("/inventory/create")}
              className="d-flex align-items-center gap-2"
              size="sm"
            >
              <i className="ri-add-line"></i>
              Add Inventory Item
            </Button>
          </div>
        }
        description=""
      >
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && filteredInventory.length === 0 && (
          <div className="text-center text-muted my-4">No inventory items found.</div>
        )}

        {!loading && !error && filteredInventory.length > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('itemNo')}
                  >
                    Item No
                    {sortField === 'itemNo' && (
                      <span className="ms-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('itemName')}
                  >
                    Item Name
                    {sortField === 'itemName' && (
                      <span className="ms-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('quantity')}
                  >
                    Quantity
                    {sortField === 'quantity' && (
                      <span className="ms-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th>Unit Measure</th>
                  <th 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('createdAt')}
                  >
                    Created At
                    {sortField === 'createdAt' && (
                      <span className="ms-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('updatedAt')}
                  >
                    Updated At
                    {sortField === 'updatedAt' && (
                      <span className="ms-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInventory.map((item) => (
                  <tr key={item.id}>
                    <td 
                      style={{ 
                        color: '#0d6efd', 
                        textDecoration: 'underline', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => router.push(`/inventory/detail?id=${item.id}`)}
                    >
                      {item.itemNo || ""}
                    </td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitMeasure || ""}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{formatDate(item.updatedAt)}</td>
                                         <td>
                       <Button
                         variant="link"
                         size="sm"
                         onClick={() => handleTransferClick(item)}
                         style={{ 
                           padding: '4px 8px',
                           color: '#0d6efd',
                           textDecoration: 'none'
                         }}
                         title="Transfer Inventory"
                       >
                         <MdSwapHoriz size={20} />
                       </Button>
                     </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </ComponentContainerCard>

      {/* Transfer Modal */}
      <Modal show={showTransferModal} onHide={() => setShowTransferModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Transfer Inventory</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleTransferSubmit}>
          <Modal.Body>
            {selectedInventory && (
              <Alert variant="info">
                <strong>Item:</strong> {selectedInventory.itemName} ({selectedInventory.itemNo})<br />
                <strong>Current Quantity:</strong> {selectedInventory.quantity} {selectedInventory.unitMeasure}
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
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={transferForm.quantity === 0 ? "" : transferForm.quantity}
                    onChange={(e) => handleTransferFormChange('quantity', e.target.value === "" ? 0 : parseInt(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Transaction Type *</Form.Label>
                  <Form.Select
                    value={transferForm.transactionTypeCode}
                    onChange={(e) => handleTransferFormChange('transactionTypeCode', e.target.value)}
                    required
                    disabled={loadingTransactionTypes}
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
                    <Form.Label>
                      Department
                      {DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && <span className="text-danger"> *</span>}
                    </Form.Label>
                    <Form.Select
                      value={transferForm.departmentId}
                      onChange={(e) => handleTransferFormChange('departmentId', e.target.value)}
                      disabled={loadingDepartments}
                      className={DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId ? 'border-danger' : ''}
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
                    {DEPARTMENT_REQUIRED_TRANSACTION_TYPES.includes(transferForm.transactionTypeCode as any) && !transferForm.departmentId && (
                      <div className="mt-1">
                        <small className="text-danger">Department is required for this transaction type</small>
                      </div>
                    )}
                  </Form.Group>
                </Col>
               <Col md={6}>
                 <Form.Group className="mb-3">
                   <Form.Label>Expired At</Form.Label>
                   <Form.Control
                     type="datetime-local"
                     value={transferForm.expiredAt}
                     onChange={(e) => handleTransferFormChange('expiredAt', e.target.value)}
                   />
                 </Form.Group>
               </Col>
             </Row>

                         <Row>
               <Col md={12}>
                 <Form.Group className="mb-3">
                   <Form.Label>Reason</Form.Label>
                   <Form.Control
                     as="textarea"
                     rows={3}
                     value={transferForm.reason}
                     onChange={(e) => handleTransferFormChange('reason', e.target.value)}
                   />
                 </Form.Group>
               </Col>
             </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTransferModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={transferLoading}
            >
              {transferLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Transferring...
                </>
              ) : (
                'Transfer Inventory'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
