"use client";

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner, Table } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { assetTypesService, AssetType } from '@/services/api/assetTypes';
import { assetSubTypesService, AssetSubType, AssetSubTypeSearchResult } from '@/services/api/assetSubTypes';

interface AssetTypeSubTypeSearchModalProps {
  show: boolean;
  onHide: () => void;
  onSelect: (assetType: string, assetSubType: string) => void;
}

const AssetTypeSubTypeSearchModal: React.FC<AssetTypeSubTypeSearchModalProps> = ({
  show,
  onHide,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AssetSubTypeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState<AssetType | null>(null);
  const [selectedAssetSubType, setSelectedAssetSubType] = useState<AssetSubTypeSearchResult | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setSearchTerm('');
      setSearchResults([]);
      setError('');
      setSelectedAssetType(null);
      setSelectedAssetSubType(null);
    }
  }, [show]);

  // Search asset sub types using the new API
  const handleSearch = async (searchValue: string) => {
    if (!searchValue.trim() || searchValue.length < 2) {
      setSearchResults([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await assetSubTypesService.searchAllAssetSubTypes(searchValue);
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No asset sub types found matching your search');
      }
    } catch (err) {
      console.error('Error searching asset sub types:', err);
      setError('Failed to search asset sub types. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 2) {
        handleSearch(searchTerm);
      } else {
        setSearchResults([]);
        setError('');
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle sub type selection
  const handleSubTypeSelect = (result: AssetSubTypeSearchResult) => {
    setSelectedAssetType(result.assetType);
    setSelectedAssetSubType(result);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedAssetType && selectedAssetSubType) {
      onSelect(selectedAssetType.id, selectedAssetSubType.id);
      onHide();
    }
  };


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon="tabler:search" className="me-2" />
          Search Asset Sub Types
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Search Input */}
        <Row className="mb-4">
          <Col>
            <Form.Label>Search Asset Sub Types</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type at least 2 characters to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
            {loading && (
              <div className="mt-2">
                <Spinner animation="border" size="sm" className="me-2" />
                <small className="text-muted">Searching...</small>
              </div>
            )}
          </Col>
        </Row>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mb-3">
            <IconifyIcon icon="tabler:alert-circle" className="me-2" />
            {error}
          </Alert>
        )}

        {/* Search Results Grid Table */}
        {searchResults.length > 0 && (
          <div className="mb-4">
            <h6 className="mb-3">Search Results ({searchResults.length} found)</h6>
            <div className="border rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table hover responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Asset Sub Type</th>
                    <th>Asset Type</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    // console.log('result',result),
                    <tr
                      key={result.id}
                      className={selectedAssetSubType?.id === result.id ? 'table-primary' : ''}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSubTypeSelect(result)}
                    >
                      <td>
                        <div className="fw-semibold">{result.name}</div>
                      </td>
                      <td>
                        <div className="fw-medium">{result.assetType.assetName}</div>
                      </td>
                      <td>
                        {selectedAssetSubType?.id === result.id ? (
                          <IconifyIcon icon="tabler:check" className="text-primary fs-5" />
                        ) : (
                          <IconifyIcon icon="tabler:circle" className="text-muted fs-5" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {/* Selected Items Display */}
        {(selectedAssetType || selectedAssetSubType) && (
          <div className="mb-3">
            <h6>Selected Items</h6>
            <div className="bg-light p-3 rounded">
              {selectedAssetType && (
                <div className="mb-2">
                  <strong>Asset Type:</strong> {selectedAssetType.assetName}
                </div>
              )}
              {selectedAssetSubType && (
                <div>
                  <strong>Asset Sub Type:</strong> {selectedAssetSubType.name}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!selectedAssetType || !selectedAssetSubType}
        >
          <IconifyIcon icon="tabler:check" className="me-1" />
          Select & Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssetTypeSubTypeSearchModal;
