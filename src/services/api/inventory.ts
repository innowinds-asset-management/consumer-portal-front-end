import { ASSET_API_URL } from '@/config/environment'

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

class InventoryHttpClient {
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

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
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

const inventoryHttp = new InventoryHttpClient()

class InventoryService {
  async getInventoryByConsumerId(consumerId: string): Promise<Inventory[]> {
    try {
      const response = await inventoryHttp.get<Inventory[]>(`/inventory?cid=${consumerId}`)
      return response
    } catch (error) {
      console.error('Error fetching inventory by consumer ID:', error)
      throw error
    }
  }

  async getAllInventory(): Promise<Inventory[]> {
    try {
      const response = await inventoryHttp.get<Inventory[]>(`/inventory`)
      return response
    } catch (error) {
      console.error('Error fetching all inventory:', error)
      throw error
    }
  }

  async getInventoryById(inventoryId: string): Promise<Inventory> {
    try {
      const response = await inventoryHttp.get<Inventory>(`/inventory/${inventoryId}`)
      return response
    } catch (error) {
      console.error('Error fetching inventory by ID:', error)
      throw error
    }
  }

  async searchInventoryItems(searchTerm: string, consumerId: string): Promise<InventorySearchResult[]> {
    try {
      const response = await inventoryHttp.get<InventorySearchResult[]>(`/inventory/search?search=${encodeURIComponent(searchTerm)}&cid=${consumerId}`)
      return response
    } catch (error) {
      console.error('Error searching inventory items:', error)
      throw error
    }
  }

  async createOrUpdateInventory(data: {
    itemId?: string;
    itemName: string;
    quantity: number;
    unitMeasure?: 'PIECE' | 'BOX' | 'PACK' | 'LITER' | 'MILLILITER' | 'GRAM' | 'KILOGRAM' | 'TABLET' | 'STRIP' | 'VIAL' | 'AMPULLE';
    consumerId: string;
    grnItemId?: string;
    poLineItemId?: string;
    expiredAt?: string;
    supplierId?: string;
  }): Promise<{ message: string; data: Inventory }> {
    try {
      const response = await inventoryHttp.post<{ message: string; data: Inventory }>('/inventory', data)
      return response
    } catch (error) {
      console.error('Error creating/updating inventory:', error)
      throw error
    }
  }
}

export const inventoryService = new InventoryService()
