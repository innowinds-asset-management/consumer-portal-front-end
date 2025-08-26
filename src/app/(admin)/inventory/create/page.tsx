"use client";

import React, { useState, useEffect, useRef } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Button, Col, Form, Row, Alert, ListGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { inventoryService, InventorySearchResult } from "@/services/api/inventory";
import { supplierService, SupplierSearchResult } from "@/services/api/supplier";
import { unitMeasureService, UnitMeasure } from "@/services/api/unitMeasure";
import { STORAGE_KEYS } from "@/utils/constants";

interface InventoryForm {
  itemName: string;
  quantity: number;
  unitMeasure: string;
  grnItemId?: string;
  poLineItemId?: string;
  expiredAt?: string;
  supplierId?: string;
  supplierName?: string; // Add supplier name for display
  itemId?: string; // Add itemId for existing items
}

interface FormErrors {
  itemName?: string;
  quantity?: string;
  unitMeasure?: string;
  grnItemId?: string;
  poLineItemId?: string;
  expiredAt?: string;
  supplierId?: string;
  supplierName?: string;
  itemId?: string;
}

export default function CreateInventoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<InventoryForm>({
    itemName: "",
    quantity: 0,
    unitMeasure: "PIECE",
    grnItemId: "",
    poLineItemId: "",
    expiredAt: "",
    supplierId: "",
    supplierName: "",
    itemId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unitMeasureOptions, setUnitMeasureOptions] = useState<UnitMeasure[]>([]);
  const [loadingUnitMeasures, setLoadingUnitMeasures] = useState(true);
  
  // Search functionality for items
  const [searchResults, setSearchResults] = useState<InventorySearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search functionality for suppliers
  const [supplierSearchResults, setSupplierSearchResults] = useState<SupplierSearchResult[]>([]);
  const [showSupplierSearchResults, setShowSupplierSearchResults] = useState(false);
  const [searchingSuppliers, setSearchingSuppliers] = useState(false);
  const supplierSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const supplierSearchInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field: keyof InventoryForm, value: any) => {
    console.log('field===>',field, 'value===>',value),
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleItemNameChange = async (value: string) => {
    setFormData(prev => ({ ...prev, itemName: value,itemId:'' }));
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Clear error for this field
    if (errors.itemName) {
      setErrors(prev => ({ ...prev, itemName: undefined }));
    }

    // Don't search if value is empty or too short
    if (!value.trim() || value.trim().length < 1) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setSearching(true);
        const consumerId = JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "";
        if (consumerId) {
          const results = await inventoryService.searchInventoryItems(value.trim(), consumerId);
          setSearchResults(results);
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error('Error searching inventory:', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  };

  const handleSupplierChange = async (value: string) => {
    setFormData(prev => ({ ...prev, supplierName: value,supplierId:'' }));
    
    // Clear previous timeout
    if (supplierSearchTimeoutRef.current) {
      clearTimeout(supplierSearchTimeoutRef.current);
    }

    // Clear error for this field
    if (errors.supplierName) {
      setErrors(prev => ({ ...prev, supplierName: undefined }));
    }

    // Don't search if value is empty or too short
    if (!value.trim() || value.trim().length < 1) {
      setSupplierSearchResults([]);
      setShowSupplierSearchResults(false);
      return;
    }

    // Debounce search
    supplierSearchTimeoutRef.current = setTimeout(async () => {
      try {
        setSearchingSuppliers(true);
        const consumerId = JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "";
        if (consumerId) {
          const results = await supplierService.searchSuppliers(value.trim(), consumerId);
          setSupplierSearchResults(results);
          setShowSupplierSearchResults(true);
        }
      } catch (error) {
        console.error('Error searching suppliers:', error);
        setSupplierSearchResults([]);
      } finally {
        setSearchingSuppliers(false);
      }
    }, 300);
  };

  const handleSelectItemNameSearchResult = (result: InventorySearchResult) => {
    console.log('result===>',result),
    setFormData(prev => {
      const newData = {
        ...prev,
        itemName: result.itemName,
        itemId: result.id // Store the itemId
      };
      return newData;
    });
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleSelectSupplierResult = (result: SupplierSearchResult) => {
    setFormData(prev => ({
      ...prev,
      supplierId: result.supplier.id,
      supplierName: result.supplier.name
    }));
    setShowSupplierSearchResults(false);
    setSupplierSearchResults([]);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.unitMeasure) {
      newErrors.unitMeasure = "Unit measure is required";
    }

    // Validate supplier - must be selected from list
    if (formData.supplierName && !formData.supplierId) {
      newErrors.supplierName = "Please select a supplier from the list";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const consumerId = JSON.parse(localStorage.getItem(STORAGE_KEYS.consumerId) || "{}") || "";

      console.log('form data=======>',formData)
      
        await inventoryService.createOrUpdateInventory({
        itemName: formData.itemName,
        quantity: formData.quantity,
        unitMeasure: formData.unitMeasure as any,
        consumerId: consumerId,
        grnItemId: formData.grnItemId || undefined,
        poLineItemId: formData.poLineItemId || undefined,
        expiredAt: formData.expiredAt || undefined,
        supplierId: formData.supplierId || undefined,
        itemId: formData.itemId || undefined
      });
      
      router.push("/inventory");
    } catch (err) {
      console.error("Error creating inventory:", err);
      setError("Failed to create inventory item");
    } finally {
      setLoading(false);
    }
  };

  // Fetch unit measures on component mount
  useEffect(() => {
    const fetchUnitMeasures = async () => {
      try {
        const measures = await unitMeasureService.getAllUnitMeasures();
        setUnitMeasureOptions(measures);
      } catch (error) {
        console.error('Error fetching unit measures:', error);
        setError('Failed to load unit measures');
      } finally {
        setLoadingUnitMeasures(false);
      }
    };

    fetchUnitMeasures();
  }, []);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is on search results dropdown
      const searchResultsContainer = document.querySelector('[data-search-results="true"]');
      if (searchResultsContainer && searchResultsContainer.contains(target)) {
        return; // Don't close if clicking on search results
      }
      
      if (searchInputRef.current && !searchInputRef.current.contains(target)) {
        setShowSearchResults(false);
      }
      
      // Check if click is on supplier search results dropdown
      const supplierSearchResultsContainer = document.querySelector('[data-supplier-search-results="true"]');
      if (supplierSearchResultsContainer && supplierSearchResultsContainer.contains(target)) {
        return; // Don't close if clicking on supplier search results
      }
      
      if (supplierSearchInputRef.current && !supplierSearchInputRef.current.contains(target)) {
        setShowSupplierSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBackNavigation = () => {
    router.back();
  };

  return (
    <>
      <ComponentContainerCard 
        title={
          <div className="d-flex align-items-center gap-2">
                        <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleBackNavigation}
            >
              <IconifyIcon icon="tabler:arrow-left" className="me-1" />
              Back
            </Button>

            <span>Create New Inventory Item</span>
          </div>
        }
        description="Add a new inventory item to the system"
      >
        {error && (
          <Alert variant="danger" className="mb-3">{error}</Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
                      <Row>
              <Col md={6}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Item Name *</Form.Label>
                  <Form.Control
                    ref={searchInputRef}
                    type="text"
                    value={formData.itemName}
                    onChange={e => handleItemNameChange(e.target.value)}
                    isInvalid={!!errors.itemName}
                    placeholder="Enter item name or search existing items"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">{errors.itemName}</Form.Control.Feedback>
                  
                                     {/* Search Results Dropdown */}
                   {showSearchResults && (
                     <div className="position-absolute w-100" style={{ zIndex: 1000, top: '100%' }} data-search-results="true">
                      <ListGroup>
                        {searching ? (
                          <ListGroup.Item className="text-muted">
                            <div className="d-flex align-items-center">
                              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                              Searching...
                            </div>
                          </ListGroup.Item>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((result) => (
                            <button 
                              key={result.id}
                              type="button"
                                onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 handleSelectItemNameSearchResult(result);
                               }}
                              className="list-group-item list-group-item-action text-start w-100 border-0"
                              style={{ 
                                cursor: 'pointer', 
                                border: '1px solid #dee2e6', 
                                padding: '0.75rem 1.25rem',
                                backgroundColor: '#fff',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fff';
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>{result.itemName}</strong>
                                  {result.itemNo && (
                                    <small className="text-muted d-block">Item No: {result.itemNo}</small>
                                  )}
                                </div>
                                <div className="text-end">
                                  <small className="text-muted">
                                    Qty: {result.quantity} {result.unitMeasure}
                                  </small>
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <ListGroup.Item className="text-muted">
                            No matching items found
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Supplier</Form.Label>
                  <Form.Control
                    ref={supplierSearchInputRef}
                    type="text"
                    value={formData.supplierName}
                    onChange={e => handleSupplierChange(e.target.value)}
                    isInvalid={!!errors.supplierName}
                    placeholder="Search and select supplier"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">{errors.supplierName}</Form.Control.Feedback>
                  
                                     {/* Supplier Search Results Dropdown */}
                   {showSupplierSearchResults && (
                     <div className="position-absolute w-100" style={{ zIndex: 1000, top: '100%' }} data-supplier-search-results="true">
                      <ListGroup>
                        {searchingSuppliers ? (
                          <ListGroup.Item className="text-muted">
                            <div className="d-flex align-items-center">
                              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                              Searching suppliers...
                            </div>
                          </ListGroup.Item>
                        ) : supplierSearchResults.length > 0 ? (
                          supplierSearchResults.map((result) => (
                            <ListGroup.Item 
                              key={result.supplier.id}
                              action
                              onClick={() => handleSelectSupplierResult(result)}
                              className="cursor-pointer"
                            >
                              <div>
                                <strong>{result.supplier.name}</strong>
                                <small className="text-muted d-block">Code: {result.supplier.code}</small>
                                {result.supplier.email && (
                                  <small className="text-muted d-block">Email: {result.supplier.email}</small>
                                )}
                              </div>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <ListGroup.Item className="text-muted">
                            No matching suppliers found
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

                      <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.quantity === 0 ? "" : formData.quantity} 
                    onChange={e => handleFieldChange('quantity', e.target.value === "" ? 0 : parseInt(e.target.value))}
                    isInvalid={!!errors.quantity}
                    min="0"
                    placeholder="0"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Unit Measure *</Form.Label>
                  <Form.Select
                    value={formData.unitMeasure}
                    onChange={e => handleFieldChange('unitMeasure', e.target.value)}
                    isInvalid={!!errors.unitMeasure}
                    disabled={loadingUnitMeasures || loading}
                  >
                    {loadingUnitMeasures ? (
                      <option>Loading unit measures...</option>
                    ) : (
                      unitMeasureOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))
                    )}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.unitMeasure}</Form.Control.Feedback>
                </Form.Group>
              </Col>

            </Row>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>GRN Item ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.grnItemId}
                    onChange={e => handleFieldChange('grnItemId', e.target.value)}
                    placeholder="Enter GRN item ID (optional)"
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>PO Line Item ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.poLineItemId}
                    onChange={e => handleFieldChange('poLineItemId', e.target.value)}
                    placeholder="Enter PO line item ID (optional)"
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.expiredAt}
                    onChange={e => handleFieldChange('expiredAt', e.target.value)}
                    placeholder="Select expiration date (optional)"
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>&nbsp;</Form.Label>
                </Form.Group>
              </Col>
            </Row>

           <Row>
             <Col md={12}>
               <div className="d-flex gap-2">
                 <Button 
                   type="submit" 
                   variant="primary" 
                   disabled={loading}
                 >
                   {loading ? (
                     <>
                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                       Creating...
                     </>
                   ) : (
                     <>
                       <IconifyIcon icon="ri:save-line" className="me-1" />
                       Create Inventory Item
                     </>
                   )}
                 </Button>
                 <Button 
                   type="button" 
                   variant="outline-secondary" 
                   onClick={handleBackNavigation}
                   disabled={loading}
                 >
                   Cancel
                 </Button>
               </div>
             </Col>
           </Row>
        </Form>
      </ComponentContainerCard>
    </>
  );
}
