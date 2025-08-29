"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, ListGroup, Spinner, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

interface Asset {
  id: string;
  assetName: string;
  assetNumber?: string;
  assetType?: string;
  location?: string;
  status?: string;
}

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

  // Mock assets data - replace with actual API call

  
  const mockAssets: Asset[] = [
    { id: '1', assetName: 'Server Rack A1', assetNumber: 'SR001', assetType: 'IT Equipment', location: 'Data Center 1', status: 'Active' },
    { id: '2', assetName: 'Network Switch B2', assetNumber: 'NS002', assetType: 'Network Equipment', location: 'Server Room', status: 'Active' },
    { id: '3', assetName: 'UPS System C3', assetNumber: 'UPS003', assetType: 'Power Equipment', location: 'Electrical Room', status: 'Active' },
    { id: '4', assetName: 'Air Conditioning Unit D4', assetNumber: 'AC004', assetType: 'HVAC', location: 'HVAC Room', status: 'Active' },
    { id: '5', assetName: 'Security Camera E5', assetNumber: 'SC005', assetType: 'Security Equipment', location: 'Main Entrance', status: 'Active' },
    { id: '6', assetName: 'Fire Alarm System F6', assetNumber: 'FAS006', assetType: 'Safety Equipment', location: 'Building Wide', status: 'Active' },
    { id: '7', assetName: 'Generator G7', assetNumber: 'GEN007', assetType: 'Power Equipment', location: 'Generator Room', status: 'Active' },
    { id: '8', assetName: 'Water Pump H8', assetNumber: 'WP008', assetType: 'Plumbing Equipment', location: 'Basement', status: 'Active' },
  ];

  useEffect(() => {
    // Load assets on component mount
    setAssets(mockAssets);
  }, []);

  useEffect(() => {
    // Filter assets based on search term
    if (searchTerm.trim() === '') {
      setFilteredAssets([]);
      return;
    }

    const filtered = assets.filter(asset =>
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location?.toLowerCase().includes(searchTerm.toLowerCase())
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
          {asset.assetNumber && <span className="me-2">#{asset.assetNumber}</span>}
          {asset.assetType && <span className="me-2">• {asset.assetType}</span>}
          {asset.location && <span>• {asset.location}</span>}
        </div>
      </div>
      {asset.status && (
        <span className={`badge bg-${asset.status === 'Active' ? 'success' : 'secondary'} ms-2`}>
          {asset.status}
        </span>
      )}
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
                {selectedAsset.assetNumber && <span className="me-2">#{selectedAsset.assetNumber}</span>}
                {selectedAsset.assetType && <span className="me-2">• {selectedAsset.assetType}</span>}
                {selectedAsset.location && <span>• {selectedAsset.location}</span>}
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
