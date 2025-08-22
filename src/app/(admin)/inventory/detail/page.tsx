"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Card, CardBody, Col, Row, Table, Alert, Button, Badge } from "react-bootstrap";
import { inventoryService, Inventory } from "@/services/api/inventory";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDate } from "@/utils/date";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

export default function InventoryDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inventoryId = searchParams.get("invId");

  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInventory = async () => {
      if (!inventoryId) {
        setError("Inventory ID is required");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await inventoryService.getInventoryById(inventoryId);
        setInventory(data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory data");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [inventoryId]);

  const handleBackNavigation = () => {
    router.back();
  };

  if (loading) {
    return (
      <>
        <PageTitle title="Loading..." />
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !inventory) {
    return (
      <>
        <PageTitle title="Error" />
        <Alert variant="danger">{error || "Inventory not found"}</Alert>
        <Button variant="outline-secondary" onClick={handleBackNavigation}>
          <IconifyIcon icon="tabler:arrow-left" className="me-1" />
          Back
        </Button>
      </>
    );
  }

  return (
    <>
      <PageTitle title={`Inventory - ${inventory.itemName}`} />

      {/* Header Information */}
      <Row>
        <Col md={12}>
          <ComponentContainerCard title="Inventory Information" description="Key details of the inventory item">
            <Card className="border-secondary border">
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Item No:</strong> {inventory.itemNo || ''}
                    </div>
                    <div className="mb-3">
                      <strong>Item Name:</strong> {inventory.itemName}
                    </div>
                    <div className="mb-3">
                      <strong>Quantity:</strong> {inventory.quantity}
                    </div>
                    <div className="mb-3">
                      <strong>Unit Measure:</strong> {inventory.unitMeasure || "PIECE"}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Minimum Stock:</strong> {inventory.minStock || "Not set"}
                    </div>
                    <div className="mb-3">
                      <strong>Created At:</strong> {formatDate(inventory.createdAt)}
                    </div>
                    <div className="mb-3">
                      <strong>Updated At:</strong> {formatDate(inventory.updatedAt)}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ComponentContainerCard>
        </Col>
      </Row>

      {/* Inventory Transactions */}
      {inventory.inventoryTransactions && inventory.inventoryTransactions.length > 0 && (
        <Row className="mt-3">
          <Col md={12}>
            <ComponentContainerCard title="Inventory Transactions" description="Transaction history for this item">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Transaction Type</th>
                    <th>Quantity</th>
                    <th>Supplier</th>
                    <th>Department</th>
                    <th>Created At</th>
                    <th>Expired At</th>
                    <th>GRN Item ID</th>
                    <th>PO Line Item ID</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.inventoryTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <Badge bg="info">
                          {transaction.transactionType?.displayName || transaction.transactionTypeCode}
                        </Badge>
                      </td>
                      <td>{transaction.quantity}</td>
                      <td>
                        {transaction.supplier?.name ? (
                          <span 
                            style={{ 
                              color: '#0d6efd', 
                              textDecoration: 'underline', 
                              cursor: 'pointer' 
                            }}
                                                         onClick={() => {
                               if (transaction.supplier?.id) {
                                 router.push(`/suppliers/detail?sid=${transaction.supplier.id}`);
                               }
                             }}
                          >
                            {transaction.supplier.name}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {transaction.department?.deptName ? (
                          <span 
                            style={{ 
                              color: '#0d6efd', 
                              textDecoration: 'underline', 
                              cursor: 'pointer' 
                            }}
                                                         onClick={() => {
                               if (transaction.department?.deptId) {
                                 router.push(`/departments/detail?did=${transaction.department.deptId}`);
                               }
                             }}
                          >
                            {transaction.department.deptName}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{formatDate(transaction.createdAt)}</td>
                      <td>{transaction.expiredAt ? formatDate(transaction.expiredAt) : ""}</td>
                      <td>{transaction.grnItemId || ""}</td>
                      <td>{transaction.poLineItemId || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ComponentContainerCard>
          </Col>
        </Row>
      )}

      {/* Back Button */}
      <Row className="mt-3">
        <Col md={12}>
          <Button variant="outline-secondary" onClick={handleBackNavigation}>
            <IconifyIcon icon="tabler:arrow-left" className="me-1" />
            Back to Inventory List
          </Button>
        </Col>
      </Row>
    </>
  );
}
