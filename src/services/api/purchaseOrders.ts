import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// PoLineItem interface
export interface PoLineItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  grnId: string;
  itemName?: string;
  partNo: string;
  poId: string;
  price: string;
  quantity: string;
  totalAmount: string;
  receivedQty: string;
  remainingQty: string;
}

// Purchase Order interface
export interface PurchaseOrder {
  id: string;
  poNumber: string;
  consumerId: string;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalAmount: string;
  poLineItem: PoLineItem[];
  supplier?: {
    id: string;
    name: string;
    code: string;
    gstNumber: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  consumer?: {
    id: string;
    name: string;
    code: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Create Purchase Order Request interface
export interface CreatePurchaseOrderRequest {
  consumerId: string;
  supplierId: string;
  status: string;
}

class PurchaseOrderService {
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    try {
      const response = await httpClient.get<PurchaseOrder[]>('/po')
      return response.data
    } catch (error) {
      console.error('Error fetching purchase orders:', error)
      throw error
    }
  }

  async getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
    try {
      const response = await httpClient.get<PurchaseOrder>(`/po/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching purchase order:', error)
      throw error
    }
  }

  async createPurchaseOrder(data: CreatePurchaseOrderRequest): Promise<PurchaseOrder> {
    try {
      const response = await httpClient.post<PurchaseOrder>('/po', data)
      return response.data
    } catch (error) {
      console.error('Error creating purchase order:', error)
      throw error
    }
  }

  async updatePurchaseOrder(id: string, data: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    try {
      const response = await httpClient.put<PurchaseOrder>(`/po/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating purchase order:', error)
      throw error
    }
  }

  async deletePurchaseOrder(id: string): Promise<void> {
    try {
      await httpClient.delete(`/po/${id}`)
    } catch (error) {
      console.error('Error deleting purchase order:', error)
      throw error
    }
  }
}

export const purchaseOrderService = new PurchaseOrderService()
