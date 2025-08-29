import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

class InventoryTransferService {
  async transferInventory(data: InventoryTransferRequest): Promise<InventoryTransferResponse> {
    try {
      const response = await httpClient.post<InventoryTransferResponse>('/inventory/transfer', data)
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Transfer failed')
      }
      
      return response.data
    } catch (error) {
      console.error('Error transferring inventory:', error)
      throw error
    }
  }
}

export const inventoryTransferService = new InventoryTransferService()
