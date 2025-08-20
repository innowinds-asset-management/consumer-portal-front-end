"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter, useSearchParams } from "next/navigation";
import { inventoryService, Inventory } from "@/services/api/inventory";
import { formatDate } from "@/utils/date";
import { STORAGE_KEYS } from "@/utils/constants";

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

  useEffect(() => {
    if (!loading && filteredInventory.length > 0) {
      const addClickHandlers = () => {
        // Add click handlers for Item ID column (1st column, index 0)
        const itemIdCells = document.querySelectorAll("td:nth-child(1)");
        if (itemIdCells.length > 0) {
          itemIdCells.forEach((cell, index) => {
            if (index < filteredInventory.length) {
              const item = filteredInventory[index];
              (cell as HTMLElement).style.cursor = "pointer";
              (cell as HTMLElement).style.color = "#0d6efd";
              (cell as HTMLElement).style.textDecoration = "underline";
              cell.addEventListener("click", () => {
                if (item.id) {
                  router.push(`/inventory/detail?id=${item.id}`);
                }
              });
            }
          });
        }
      };
      addClickHandlers();
      const timeoutId = setTimeout(addClickHandlers, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, filteredInventory, router]);

  const gridData = filteredInventory.map((item) => [
    item.itemNo || "",
    item.itemName,
    item.quantity,
    item.unitMeasure || "",
    formatDate(item.createdAt),
    formatDate(item.updatedAt),
  ]);

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
            <Grid
              data={gridData}
              columns={[
                {
                  name: "Item No",
                  sort: false,
                  search: true,
                  cell: (cell: any) => {
                    return `<span style="color: #0d6efd; text-decoration: underline; cursor: pointer;">${cell}</span>`;
                  }
                },
                {
                  name: "Item Name",
                  sort: false,
                  search: true,
                },
                {
                  name: "Quantity",
                  sort: true,
                  search: true,
                },
                {
                  name: "Unit Measure",
                  sort: false,
                  search: true,
                },
                {
                  name: "Created At",
                  sort: true,
                  search: true,
                },
                {
                  name: "Updated At",
                  sort: true,
                  search: true,
                },
              ]}
              pagination={{
                limit: 10,
              }}
              sort={true}
              className={{
                container: "table table-striped",
                table: "table",
                thead: "table-light",
                th: "border-0",
                td: "border-0",
                search: "form-control",
                pagination: "pagination pagination-sm",
              }}
              style={{
                table: {
                  width: "100%",
                },
              }}
            />
          </div>
        )}
      </ComponentContainerCard>
    </>
  );
}
