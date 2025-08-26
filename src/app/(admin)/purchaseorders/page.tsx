"use client";

import React, { useEffect, useState, useRef } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Alert, Button } from "react-bootstrap";
import { purchaseOrdersService } from "@/services/api/purchaseOrders";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useRouter } from "next/navigation";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  consumerId: string;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalAmount: string;
  poLineItem: any[];
  supplier?: { name?: string };
}

export default function PurchaseOrdersListingPage() {
  const router = useRouter();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await purchaseOrdersService.getPurchaseOrders();
        setPurchaseOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load purchase orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  // Add click handlers to purchase order IDs after grid is rendered
  useEffect(() => {
    if (!loading && purchaseOrders.length > 0) {
      const addClickHandlers = () => {
        const purchaseOrderIdCells = document.querySelectorAll('td:first-child');
        if (purchaseOrderIdCells.length > 0) {
          purchaseOrderIdCells.forEach((cell, index) => {
            if (index < purchaseOrders.length) {
              const purchaseOrder = purchaseOrders[index];
              (cell as HTMLElement).style.cursor = 'pointer';
              (cell as HTMLElement).style.color = '#0d6efd';
              (cell as HTMLElement).style.textDecoration = 'underline';
              cell.addEventListener('click', () => {
                router.push(`/purchaseorders/detail?id=${purchaseOrder.id}`);
              });
            }
          });
        }
      };
      // Try immediately
      addClickHandlers();
      // Also try after a delay to ensure GridJS has rendered
      const timeoutId = setTimeout(addClickHandlers, 500);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [loading, purchaseOrders, router]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Calculate total items count
  const getTotalItems = (poLineItem: any[]) => {
    if (!poLineItem || !Array.isArray(poLineItem)) return 0;
    return poLineItem.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  };

  // Calculate total received items count
  const getTotalReceivedItems = (poLineItem: any[]) => {
    if (!poLineItem || !Array.isArray(poLineItem)) return 0;
    return poLineItem.reduce((total, item) => total + (parseInt(item.receivedQty) || 0), 0);
  };

  // Prepare data for GridJS (order per request)
  const gridData = purchaseOrders.map((purchaseOrder) => [
    purchaseOrder.poNumber || purchaseOrder.id || "",
    purchaseOrder.supplier?.name || "",
    getTotalItems(purchaseOrder.poLineItem),
    getTotalReceivedItems(purchaseOrder.poLineItem),
    parseFloat(purchaseOrder.totalAmount || "0").toFixed(2),
    purchaseOrder.status || "",
    formatDate(purchaseOrder.updatedAt)
  ]);

  return (
    <>
      <ComponentContainerCard title={
        <div className="d-flex justify-content-between align-items-center">
          <span>Purchase Orders</span>
          <Button 
            variant="primary" 
            onClick={() => router.push('/purchaseorders/create')}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="ri-add-line"></i>
            Add Purchase Order
          </Button>
        </div>
      } description="">
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {!loading && !error && purchaseOrders.length === 0 && (
          <div className="text-center text-muted my-4">No purchase orders found.</div>
        )}
        
        {!loading && !error && purchaseOrders.length > 0 && (
          <div className="table-responsive">
            <Grid
              data={gridData}
              columns={[
                { name: "PO Number", sort: false, search: true },
                { name: "Supplier", sort: false, search: true },
                { name: "Total Items", sort: false, search: true },
                { name: "Total Received Items", sort: false, search: true },
                { name: "Total Amount (₹)", sort: false, search: true },
                { 
                  name: "Status", 
                  sort: true, 
                  search: true,
                  
                },
                { name: "Update Date", sort: true, search: false },
              ]}
              // search={true}
              pagination={{
                limit: 100
              }}
              sort={true}
              className={{
                container: "table table-striped table-hover",
                table: "table",
                thead: "table-light",
                th: "border-0",
                td: "border-0",
                search: "form-control",
                pagination: "pagination pagination-sm"
              }}

              style={{
                table: {
                  width: "100%"
                }
              }}
            />
          </div>
        )}
      </ComponentContainerCard>
    </>
  );
}
