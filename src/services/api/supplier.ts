import { ASSET_API_URL } from '@/config/environment'

export interface SupplierSearchResult {
  supplier: {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
  };
}

class SupplierHttpClient {
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

const supplierHttp = new SupplierHttpClient()

class SupplierService {
  async searchSuppliers(searchTerm: string, consumerId: string): Promise<SupplierSearchResult[]> {
    try {
      const response = await supplierHttp.get<SupplierSearchResult[]>(`/supplier/search?name=${encodeURIComponent(searchTerm)}&cid=${consumerId}`)
      return response
    } catch (error) {
      console.error('Error searching suppliers:', error)
      throw error
    }
  }
}

export const supplierService = new SupplierService()
