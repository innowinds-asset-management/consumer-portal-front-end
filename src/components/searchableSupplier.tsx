"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, ListGroup, Spinner, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { STORAGE_KEYS } from '@/utils/constants';
import { consumerSupplierService, ConsumerSupplier } from '@/services/api/consumerSupplier';

interface SearchableSupplierProps {
  onSupplierSelect: (supplier: ConsumerSupplier['supplier']) => void;
  selectedSupplier?: ConsumerSupplier['supplier'] | null;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  clearable?: boolean;
}

export default function SearchableSupplier({
  onSupplierSelect,
  selectedSupplier,
  placeholder = "Search for suppliers...",
  label = "Supplier",
  required = false,
  disabled = false,
  className = "",
  error,
  clearable = true
}: SearchableSupplierProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState<ConsumerSupplier['supplier'][]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<ConsumerSupplier['supplier'][]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load suppliers on component mount
    const fetchSuppliers = async () => {
      const consumerId = localStorage.getItem(STORAGE_KEYS.consumerId);
      
      // Handle both string and JSON string formats
      let parsedConsumerId = consumerId;
      if (consumerId && consumerId.startsWith('"') && consumerId.endsWith('"')) {
        try {
          parsedConsumerId = JSON.parse(consumerId);
        } catch (e) {
          console.error('Error parsing consumer ID:', e);
        }
      }
      
      if (!parsedConsumerId) {
        setSearchError('No consumer ID found. Please log in again.');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const consumerSuppliers = await consumerSupplierService.getSupplierByConsumerId(parsedConsumerId);
        
        // Extract supplier objects from the response
        const suppliers = consumerSuppliers.map(cs => ({
          ...cs.supplier,
          supplierCode: cs.supplierCode // Add supplierCode from the relationship
        })).filter(Boolean);
        
        setSuppliers(suppliers);
      } catch (err) {
        setSearchError('Failed to load suppliers');
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []); // Remove consumerId dependency since we get it inside

  useEffect(() => {
    // Filter suppliers based on search term
    if (searchTerm.trim() === '') {
      setFilteredSuppliers([]);
      return;
    }

    const filtered = suppliers.filter(supplier =>
      supplier && (
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.gstNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierCode?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredSuppliers(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, suppliers]);

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
    setSearchError('');
  };

  const handleSupplierSelect = (supplier: ConsumerSupplier['supplier']) => {
    onSupplierSelect(supplier);
    setSearchTerm(supplier.name);
    setShowDropdown(false);
    setSearchError('');
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowDropdown(false);
    onSupplierSelect(null as any);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const renderSupplierItem = (supplier: ConsumerSupplier['supplier']) => (
    <ListGroup.Item
      key={supplier.id}
      action
      onClick={() => handleSupplierSelect(supplier)}
      className="d-flex justify-content-between align-items-start py-2"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex-grow-1">
        <div className="fw-semibold text-primary">{supplier.name}</div>
        <div className="small text-muted">
          {supplier.code && <span className="me-2">#{supplier.code}</span>}
          {supplier.supplierCode && <span className="me-2">• Code: {supplier.supplierCode}</span>}
          {supplier.gstNumber && <span className="me-2">• GST: {supplier.gstNumber}</span>}
          {supplier.email && <span>• {supplier.email}</span>}
        </div>
        {supplier.phone && (
          <div className="small text-muted">
            📞 {supplier.phone}
          </div>
        )}
      </div>
      {supplier.isActive !== undefined && (
        <span className={`badge bg-${supplier.isActive ? 'success' : 'secondary'} ms-2`}>
          {supplier.isActive ? 'Active' : 'Inactive'}
        </span>
      )}
    </ListGroup.Item>
  );

  return (
    <div className={`searchable-supplier-component ${className}`} ref={searchRef}>
      {label && (
        <Form.Label className="mb-2">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      
      <InputGroup>
        <Form.Control
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={error ? 'is-invalid' : ''}
          autoComplete="off"
        />
        
        {clearable && selectedSupplier && (
          <InputGroup.Text
            style={{ cursor: 'pointer' }}
            onClick={handleClear}
            className="bg-transparent border-start-0"
          >
            <IconifyIcon icon="tabler:x" className="text-muted" />
          </InputGroup.Text>
        )}
        
        <InputGroup.Text className="bg-transparent border-start-0">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <IconifyIcon icon="tabler:search" className="text-muted" />
          )}
        </InputGroup.Text>
        {loading && (
          <InputGroup.Text className="bg-transparent border-start-0">
            <small className="text-muted">Loading suppliers...</small>
          </InputGroup.Text>
        )}
      </InputGroup>

      {error && (
        <div className="invalid-feedback d-block mt-1">
          {error}
        </div>
      )}

      {searchError && (
        <Alert variant="danger" className="mt-2 py-2">
          {searchError}
        </Alert>
      )}

      {/* Selected Supplier Display */}
      {selectedSupplier && !showDropdown && (
        <div className="mt-2 p-2 bg-light rounded border">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <div className="fw-semibold text-primary">{selectedSupplier.name}</div>
              <div className="small text-muted">
                {selectedSupplier.code && <span className="me-2">#{selectedSupplier.code}</span>}
                {selectedSupplier.supplierCode && <span className="me-2">• Code: {selectedSupplier.supplierCode}</span>}
              </div>
              {selectedSupplier.phone && (
                <div className="small text-muted">
                  📞 {selectedSupplier.phone}
                </div>
              )}
            </div>
            {clearable && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleClear}
              >
                <IconifyIcon icon="tabler:x" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="position-absolute w-100 mt-1" style={{ zIndex: 1050 }}>
          <ListGroup className="shadow-sm border">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(renderSupplierItem)
            ) : searchTerm.trim() !== '' ? (
              <ListGroup.Item className="text-center text-muted py-3">
                <IconifyIcon icon="tabler:search-off" className="fs-4 mb-2" />
                <div>No suppliers found</div>
                <small>Try a different search term</small>
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        </div>
      )}
    </div>
  );
}