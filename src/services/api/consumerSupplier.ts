import { http } from '../http'
import { ASSET_API_URL } from '@/config/environment'

export interface ConsumerSupplier {
  consumerId: string
  supplierId: string
  createdAt: string
  updatedAt: string
  areaOfSupply?: string | null
  registeredAt?: string | null
  supplierCode?: string
  supplier: {
    id: string
    name: string
    code: string
    gstNumber?: string
    email?: string
    phone?: string
    address?: string
    isActive: boolean
    createdAt?: string
    updatedAt?: string
    primaryContactEmail?: string | null
    primaryContactName?: string | null
    primaryContactPhone?: string | null
    supplierCode?: string
  }
}

// Create a separate HTTP client for consumer supplier API calls
class ConsumerSupplierHttpClient {
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
      console.error('Consumer Supplier API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    })
  }
}

const consumerSupplierHttp = new ConsumerSupplierHttpClient()

// Consumer Supplier API service
class ConsumerSupplierService {
  async getSupplierByConsumerId(consumerId: string): Promise<ConsumerSupplier[]> {
    try {
      const url = `/consumer-supplier/supplier/${encodeURIComponent(consumerId)}`;
      const response = await consumerSupplierHttp.get<ConsumerSupplier[]>(url);
      return response
    } catch (error) {
      console.error('Error fetching supplier by consumer ID:', error)
      throw error
    }
  }

  // Get supplier count by consumer ID
  async getSupplierCountByConsumerId(consumerId: string): Promise<number> {
    try {
      const response = await consumerSupplierHttp.get<{
        success: boolean;
        data: {
          supplierCount: number;
        };
      }>(`/consumer-supplier/count/supplier/${consumerId}`)
      return response.data.supplierCount
    } catch (error) {
      console.error('Error fetching supplier count:', error)
      throw error
    }
  }
}

export const consumerSupplierService = new ConsumerSupplierService()
