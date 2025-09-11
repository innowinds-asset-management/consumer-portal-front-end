"use client";

import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { FILTER_TYPES } from "@/utils/constants";   

interface WarrantyFilterFormProps {
  onFilterChange?: (filter: { type: 'expiring' | 'expired' | null; days: number | null }) => void;
  currentFilter?: { type: 'expiring' | 'expired' | null; days: number | null };
}

const WarrantyFilterForm: React.FC<WarrantyFilterFormProps> = ({ 
  onFilterChange, 
  currentFilter 
}) => {
  const [selectedType, setSelectedType] = useState<typeof FILTER_TYPES.expiring | typeof FILTER_TYPES.expired | null>(
    currentFilter?.type || null
  );
  const [selectedDays, setSelectedDays] = useState<number | null>(
    currentFilter?.days || null
  );

  // Handle form submission
  const handleFilter = () => {
    if (onFilterChange) {
      onFilterChange({
        type: selectedType,
        days: selectedDays
      });
    }
  };

  // Handle clear filter
  const handleClear = () => {
    setSelectedType(null);
    setSelectedDays(null);
    if (onFilterChange) {
      onFilterChange({
        type: null,
        days: null
      });
    }
  };

  // Get available days based on selected type
  const getAvailableDays = () => {
    if (selectedType === FILTER_TYPES.expiring) {
      return [
        { value: 1, label: 'With in 1 day' },
        { value: 2, label: 'With in 2 days' },
        { value: 3, label: 'With in 3 days' },
        { value: 4, label: 'With in 4 days' },
        { value: 5, label: 'With in 5 days' },
        { value: 10, label: 'With in 10 days' },
        { value: 30, label: 'With in 30 days' }
      ];
    } else if (selectedType === FILTER_TYPES.expired) {
      return [
        { value: 1, label:  'yesterday'},
        { value: 2, label:  'Last 2 days' },
        { value: 3, label:  'Last 3 days' },
        { value: 4, label:  'Last 4 days' },
        { value: 5, label:  'Last 5 days' },
        { value: 10, label: 'Last 10 days' },
        { value: 30, label: 'Last 30 days' }
      ];
    }
    return [];
  };

  return (
    <div className="p-3">
      <Form>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                <IconifyIcon icon="solar:calendar-bold-duotone" className="me-2" />
                Filter Type
              </Form.Label>
              <Form.Select
                value={selectedType || ''}
                onChange={(e) => {
                  const value = e.target.value as typeof FILTER_TYPES.expiring | typeof FILTER_TYPES.expired | '';
                  setSelectedType(value || null);
                  // Reset days when type changes
                  setSelectedDays(null);
                }}
                className="form-select"
              >
                <option value="">Select filter type</option>
                <option value={FILTER_TYPES.expiring}>Expiring Soon</option>
                <option value={FILTER_TYPES.expired}>Recently Expired</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                <IconifyIcon icon="solar:clock-circle-bold-duotone" className="me-2" />
                Time Period
              </Form.Label>
              <Form.Select
                value={selectedDays || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDays(value ? Number(value) : null);
                }}
                disabled={!selectedType}
                className="form-select"
              >
                <option value="">Select days</option>
                {getAvailableDays().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4} className="d-flex align-items-end">
            <div className="d-flex gap-2 w-100">
              <Button
                variant="primary"
                onClick={handleFilter}
                disabled={!selectedType || !selectedDays}
                className="flex-fill d-flex align-items-center justify-content-center gap-2"
              >
                <IconifyIcon icon="solar:filter-bold-duotone" />
                Apply Filter
              </Button>
              
              <Button
                variant="outline-secondary"
                onClick={handleClear}
                className="d-flex align-items-center justify-content-center"
                title="Clear all filters"
              >
                <IconifyIcon icon="solar:close-circle-bold-duotone" />
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default WarrantyFilterForm;
