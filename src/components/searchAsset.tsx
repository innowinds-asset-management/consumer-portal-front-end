"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, ListGroup, Spinner, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { assetsService, Asset } from '@/services/api/assets';

interface SearchAssetProps {
  onAssetSelect: (asset: Asset) => void;
  selectedAsset?: Asset | null;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  clearable?: boolean;
}

export default function SearchAsset({
  onAssetSelect,
  selectedAsset,
  placeholder = "Search for assets...",
  label = "Asset",
  required = false,
  disabled = false,
  className = "",
  error,
  clearable = true
}: SearchAssetProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load assets on component mount
    const fetchAssets = async () => {
      setLoading(true);
      try {
        console.log('Fetching assets...'); // Debug
        const assetsData = await assetsService.getAssets({ groupstatus: 'active-or-pre-active' });
        console.log('Assets response:', assetsData); // Debug
        setAssets(assetsData);
      } catch (err) {
        console.error('Error fetching assets:', err);
        setSearchError('Failed to load assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    // Filter assets based on search term
    if (searchTerm.trim() === '') {
      setFilteredAssets(assets.slice(0, 10)); // Show all assets when no search term
      return;
    }

    const filtered = assets.filter(asset =>
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.partNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.consumerSerialNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetType?.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetSubType?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredAssets(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, assets]);

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

  const handleAssetSelect = (asset: Asset) => {
    onAssetSelect(asset);
    setSearchTerm(asset.assetName);
    setShowDropdown(false);
    setSearchError('');
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowDropdown(false);
    onAssetSelect(null as any);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const renderAssetItem = (asset: Asset) => (
    <ListGroup.Item
      key={asset.id}
      action
      onClick={() => handleAssetSelect(asset)}
      className="d-flex justify-content-between align-items-start py-2"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex-grow-1">
        <div className="fw-semibold text-primary">{asset.assetName}</div>
        <div className="small text-muted">
          {asset.partNo && <span className="me-2">Part No: {asset.partNo}</span>}
          {asset.brand && <span className="me-2">• Brand: {asset.brand}</span>}
          {asset.model && <span className="me-2">• Model: {asset.model}</span>}
          {asset.consumerSerialNo && <span className="me-2">• Serial No: {asset.consumerSerialNo}</span>}
        </div>
        <div className="small text-muted">
          {asset.assetType?.assetName && <span className="me-2">Type: {asset.assetType.assetName}</span>}
          {asset.assetSubType?.name && <span className="me-2">• Sub: {asset.assetSubType.name}</span>}
          {asset.supplier?.name && <span>• Supplier: {asset.supplier.name}</span>}
        </div>
        {asset.department?.deptName && (
          <div className="small text-muted">
            📍 Department: {asset.department.deptName}
          </div>
        )}
      </div>
      <div className="text-end">
        {asset.status && (
          <span className={`badge bg-${asset.status === 'active' ? 'success' : 'secondary'} ms-2`}>
            {asset.status}
          </span>
        )}
        {asset.isAmc && (
          <span className="badge bg-info ms-1">
            AMC
          </span>
        )}
      </div>
    </ListGroup.Item>
  );

  return (
    <div className={`search-asset-component ${className}`} ref={searchRef}>
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
        
        {clearable && selectedAsset && (
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

      {/* Selected Asset Display */}
      {selectedAsset && !showDropdown && (
        <div className="mt-2 p-2 bg-light rounded border">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
                              <div className="fw-semibold text-primary">{selectedAsset.assetName}</div>
                <div className="small text-muted">
                  {selectedAsset.partNo && <span className="me-2">Part No: {selectedAsset.partNo}</span>}
                  {selectedAsset.brand && <span className="me-2">• Brand: {selectedAsset.brand}</span>}
                  {selectedAsset.model && <span className="me-2">• Model: {selectedAsset.model}</span>}
                </div>
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
            {filteredAssets.length > 0 ? (
              filteredAssets.map(renderAssetItem)
            ) : searchTerm.trim() !== '' ? (
              <ListGroup.Item className="text-center text-muted py-3">
                <IconifyIcon icon="tabler:search-off" className="fs-4 mb-2" />
                <div>No assets found</div>
                <small>Try a different search term</small>
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
