import { ASSET_API_URL } from '@/config/environment'

export interface Supplier {
  id: string;
  name: string;
  code: string;
  gstNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierWithStats extends Supplier {
  assetCount: number;
  openServiceRequestCount: number;
}

export interface ConsumerSupplierWithStats {
  supplier: Supplier;
  assetCount: number;
  openServiceRequestCount: number;
  registeredFrom: string; // createdAt from consumerSupplier
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

  async getSuppliersOfConsumerWithStats(consumerId: string): Promise<ConsumerSupplierWithStats[]> {
    try {
      const response = await supplierHttp.get<ConsumerSupplierWithStats[]>(`/supplier/?cid=${consumerId}`)
      return response
    } catch (error) {
      console.error('Error fetching suppliers of consumer with stats:', error)
      throw error
    }
  }
}

export const supplierService = new SupplierService()
