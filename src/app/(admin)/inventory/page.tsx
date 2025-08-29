"use client";

import React, { useEffect, useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button, Table } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { inventoryService, Inventory } from "@/services/api/inventory";
import { formatDate } from "@/utils/date";
import { STORAGE_KEYS } from "@/utils/constants";
import { ImExit } from "react-icons/im";
import TransferInventoryModal from "@/components/TransferInventoryModal";

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

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError("");
      try {
        let data: InventoryListItem[];
        data = await inventoryService.getInventories();
        
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

  // Handle transfer button click
  const handleTransferClick = (item: InventoryListItem) => {
    setSelectedInventory(item);
    setShowTransferModal(true);
  };

  // Handle transfer success
  const handleTransferSuccess = () => {
          // Refresh inventory data
          window.location.reload();
  };

  return (
    <>
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
                      onClick={() => router.push(`/inventory/detail?invId=${item.id}`)}
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
                         <ImExit size={20} />
                       </Button>
                     </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </ComponentContainerCard>

      {/* Transfer Inventory Modal */}
      <TransferInventoryModal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        selectedInventory={selectedInventory}
        onSuccess={handleTransferSuccess}
      />
    </>
  );
}
