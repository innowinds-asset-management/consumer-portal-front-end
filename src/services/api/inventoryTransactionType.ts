import { ASSET_API_URL } from '@/config/environment'

export interface InventoryTransactionType {
  code: string;
  displayName: string;
}

class InventoryTransactionTypeHttpClient {
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
}

const inventoryTransactionTypeHttp = new InventoryTransactionTypeHttpClient()

class InventoryTransactionTypeService {
  async getAllTransactionTypes(): Promise<InventoryTransactionType[]> {
    try {
      const response = await inventoryTransactionTypeHttp.get<InventoryTransactionType[]>(`/inventory/transaction-types`)
      return response
    } catch (error) {
      console.error('Error fetching inventory transaction types:', error)
      throw error
    }
  }
}

export const inventoryTransactionTypeService = new InventoryTransactionTypeService()
