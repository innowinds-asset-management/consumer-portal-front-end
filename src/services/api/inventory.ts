import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface Inventory {
  id: string;
  itemName: string;
  quantity: number;
  unitMeasure?: 'PIECE' | 'BOX' | 'PACK' | 'LITER' | 'MILLILITER' | 'GRAM' | 'KILOGRAM' | 'TABLET' | 'STRIP' | 'VIAL' | 'AMPULLE';
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
  departmentInventory?: Array<{
    id: string;
    departmentId: string;
    quantity: number;
    inventoryId: string;
    department?: {
      deptId: string;
      deptName: string;
    };
  }>;
  inventoryTransactions?: Array<{
    id: string;
    inventoryId: string;
    departmentId?: string;
    quantity: number;
    transactionTypeCode: string;
    grnItemId?: string;
    poLineItemId?: string;
    transactionType?: {
      code: string;
      displayName: string;
    };
    createdAt: string;
    department?: {
      deptId: string;
      deptName: string;
    };
    supplier?: {
      id: string;
      name: string;
    };
    expiredAt?: string;
  }>;
}

export interface InventorySearchResult {
  id: string;
  itemName: string;
  itemNo: string;
  quantity: number;
  unitMeasure: string;
}

class InventoryService {
  async getInventories(): Promise<Inventory[]> {
    try {
      const response = await httpClient.get<Inventory[]>('/inventory')
      return response.data
    } catch (error) {
      console.error('Error fetching inventories:', error)
      throw error
    }
  }

  async getInventoryById(id: string): Promise<Inventory> {
    try {
      const response = await httpClient.get<Inventory>(`/inventory/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching inventory:', error)
      throw error
    }
  }

  async createInventory(inventoryData: Omit<Inventory, 'id' | 'createdAt' | 'updatedAt'>): Promise<Inventory> {
    try {
      const response = await httpClient.post<Inventory>('/inventory', inventoryData)
      return response.data
    } catch (error) {
      console.error('Error creating inventory:', error)
      throw error
    }
  }

  async updateInventory(id: string, inventoryData: Partial<Inventory>): Promise<Inventory> {
    try {
      const response = await httpClient.put<Inventory>(`/inventory/${id}`, inventoryData)
      return response.data
    } catch (error) {
      console.error('Error updating inventory:', error)
      throw error
    }
  }

  async deleteInventory(id: string): Promise<void> {
    try {
      await httpClient.delete(`/inventory/${id}`)
    } catch (error) {
      console.error('Error deleting inventory:', error)
      throw error
    }
  }

  async searchInventories(searchTerm: string): Promise<InventorySearchResult[]> {
    try {
      const response = await httpClient.get<InventorySearchResult[]>(`/inventory/search?search=${encodeURIComponent(searchTerm)}`)
      return response.data
    } catch (error) {
      console.error('Error searching inventories:', error)
      throw error
    }
  }
}

export const inventoryService = new InventoryService()
