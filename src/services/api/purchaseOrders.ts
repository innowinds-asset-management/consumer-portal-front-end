import { ASSET_API_URL } from '@/config/environment'

// PoLineItem interface
export interface PoLineItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  grnId: string;
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
}

// Create Purchase Order Request interface
export interface CreatePurchaseOrderRequest {
  consumerId: string;
  supplierId: string;
  status: string;
}

// Create a separate HTTP client for purchase order API calls
class PurchaseOrderHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Purchase Order API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

class PurchaseOrdersService {
  private httpClient: PurchaseOrderHttpClient

  constructor() {
    this.httpClient = new PurchaseOrderHttpClient()
  }

  async createPurchaseOrder(purchaseOrderData: CreatePurchaseOrderRequest): Promise<PurchaseOrder> {
    return this.httpClient.post<PurchaseOrder>('/po', purchaseOrderData)
  }

  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>('/po')
  }

  async getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(`/po/${id}`)
  }

  async updatePurchaseOrder(id: string, purchaseOrderData: Partial<CreatePurchaseOrderRequest>): Promise<PurchaseOrder> {
    return this.httpClient.put<PurchaseOrder>(`/po/${id}`, purchaseOrderData)
  }

  async deletePurchaseOrder(id: string): Promise<void> {
    return this.httpClient.delete<void>(`/po/${id}`)
  }
}

// Export a singleton instance
export const purchaseOrdersService = new PurchaseOrdersService()
