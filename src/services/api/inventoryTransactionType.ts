import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface InventoryTransactionType {
  code: string;
  displayName: string;
}

class InventoryTransactionTypeService {
  async getAllTransactionTypes(): Promise<InventoryTransactionType[]> {
    try {
      const response = await httpClient.get<InventoryTransactionType[]>(`/inventory/transaction-types`)
      return response.data
    } catch (error) {
      console.error('Error fetching inventory transaction types:', error)
      throw error
    }
  }
}

export const inventoryTransactionTypeService = new InventoryTransactionTypeService()
