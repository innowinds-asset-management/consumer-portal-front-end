import { ASSET_API_URL } from '@/config/environment'

export interface InventoryTransferRequest {
  inventoryId: string;
  quantity: number;
  transactionTypeCode: string;
  departmentId?: string;
  supplierId?: string;
  grnItemId?: string;
  poLineItemId?: string;
  expiredAt?: string;
  reason?: string;
}

export interface InventoryTransferResponse {
  success: boolean;
  message: string;
  data: any;
}

class InventoryTransferHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getHeaders(): Record<string, string> {
    return { ...this.defaultHeaders }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

const inventoryTransferHttp = new InventoryTransferHttpClient()

class InventoryTransferService {
  async transferInventory(data: InventoryTransferRequest): Promise<InventoryTransferResponse> {
    try {
      const response = await inventoryTransferHttp.post<InventoryTransferResponse>('/inventory/transfer', data)
      
      if (!response.success) {
        throw new Error(response.message || 'Transfer failed')
      }
      
      return response
    } catch (error) {
      console.error('Error transferring inventory:', error)
      throw error
    }
  }
}

export const inventoryTransferService = new InventoryTransferService()
