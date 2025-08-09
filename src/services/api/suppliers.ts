import { ASSET_API_URL } from '@/config/environment'

export interface Supplier {
  id: string;
  name: string;
  //consumerId?: string;
  createdAt?: string;
  updatedAt?: string;
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
  async getSuppliersByConsumerId(consumerId: string): Promise<Supplier[]> {
    return supplierHttp.get<Supplier[]>(`/consumer/${consumerId}/suppliers`)
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return supplierHttp.get<Supplier[]>(`/supplier`)
  }
}

export const supplierService = new SupplierService()
