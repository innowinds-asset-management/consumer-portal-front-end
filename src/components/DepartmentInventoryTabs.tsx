"use client";

import React, { useState, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row, Badge, Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
import { departmentInventoryService, DepartmentInventory } from '@/services/api/departmentInventory';

interface DepartmentInventoryTabsProps {
  departmentId?: string;
  showCreateButton?: boolean;
  title?: string;
  className?: string;
}

export default function DepartmentInventoryTabs({ 
  departmentId,
  showCreateButton = true, 
  title = "Department Inventory",
  className = ""
}: DepartmentInventoryTabsProps) {
  const router = useRouter();
  const [departmentInventory, setDepartmentInventory] = useState<DepartmentInventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadDepartmentInventory = async () => {
    if (loaded || !departmentId) return;

    try {
      setLoading(true);
      setError("");
      
      const data = await departmentInventoryService.getByDepartment(departmentId);
      setDepartmentInventory(data);
      setLoaded(true);
    } catch (err: any) {
      console.error("Error fetching department inventory:", err);
      setDepartmentInventory([]);
      setLoaded(true);
      setError(err.message || "Failed to load department inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartmentInventory();
  }, [departmentId]);

  const handleCreateInventory = () => {
    // Navigate to inventory creation page
    router.push('/inventory/create');
  };

  const handleInventoryClick = (inventoryId: string) => {
    router.push(`/inventory/detail?invId=${inventoryId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getQuantityBadgeColor = (quantity: number) => {
    if (quantity === 0) return 'danger';
    if (quantity <= 10) return 'warning';
    return 'success';
  };

  return (
    <div className={className}>
      <Row>
        <Col sm="12">
          <Card className="border-0">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-muted mb-0">{title}</h6>
                {showCreateButton && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateInventory}
                  >
                    <IconifyIcon icon="tabler:plus" className="me-1" />
                    Add Inventory
                  </Button>
                )}
              </div>
              
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading department inventory...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-danger">{error}</p>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={loadDepartmentInventory}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>Item Number</th>
                        <th>Item Name</th>
                        <th>Unit Measure</th>
                        <th>Quantity</th>
                        <th>Last Updated</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentInventory.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center text-muted">
                            No inventory items found for this department
                          </td>
                        </tr>
                      ) : (
                        departmentInventory.map((item, index) => (
                          <tr key={item.id || `inventory-${index}-${item.createdAt}`}>
                            <td>
                              <span 
                                style={{ 
                                  color: '#0d6efd', 
                                  textDecoration: 'underline', 
                                  cursor: 'pointer' 
                                }}
                                onClick={() => handleInventoryClick(item.inventory.id)}
                              >
                                {item.inventory.itemNo}
                              </span>
                            </td>
                            <td>{item.inventory.itemName}</td>
                            <td>{item.inventory.unitMeasure}</td>
                            <td>
                              <Badge bg={getQuantityBadgeColor(item.quantity)}>
                                {item.quantity.toLocaleString()}
                              </Badge>
                            </td>
                            <td>{item.updatedAt ? formatDate(item.updatedAt) : 'N/A'}</td>
                            <td>{item.createdAt ? formatDate(item.createdAt) : 'N/A'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Showing {departmentInventory.length} inventory items
                    </small>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
