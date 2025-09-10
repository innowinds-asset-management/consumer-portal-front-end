import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface Supplier {
  primaryContactName?: string;
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
  primaryContactPhone?:string
  primaryContactEmail?:string
  consumerSuppliers?:any
}

export interface SupplierWithStats extends Supplier {
  assetCount: number;
  openServiceRequestCount: number;
}

export interface SupplierDetails extends Supplier {
  assetCount: number;
  openServiceRequestCount: number;
}

export interface ConsumerSupplierWithStats {
  supplier: Supplier;
  assetCount: number;
  openServiceRequestCount: number;
  registeredFrom: string; // createdAt from consumerSupplier
}

class SupplierService {
  async getSuppliersByConsumerId(consumerId: string): Promise<Supplier[]> {
    try {
      const response = await httpClient.get<Supplier[]>(`/consumer/${consumerId}/suppliers`)
      return response.data
    } catch (error) {
      console.error('Error fetching suppliers by consumer ID:', error)
      throw error
    }
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    try {
      const response = await httpClient.get<Supplier[]>(`/supplier/all`)
      return response.data
    } catch (error) {
      console.error('Error fetching all suppliers:', error)
      throw error
    }
  }

  async getSuppliersOfConsumerWithStats(): Promise<ConsumerSupplierWithStats[]> {
    try {
      const response = await httpClient.get<ConsumerSupplierWithStats[]>(`/supplier/`)
      return response.data
    } catch (error) {
      console.error('Error fetching suppliers of consumer with stats:', error)
      throw error
    }
  }

  async getSupplierDetailsById(supplierId: string): Promise<SupplierDetails> {
    try {
      const response = await httpClient.get<SupplierDetails>(`/supplier/${supplierId}/details`)
      return response.data
    } catch (error) {
      console.error('Error fetching supplier details:', error)
      throw error
    }
  }

  async createSupplier(data: {
    name: string;
    code?: string | null;
    isActive?: boolean;
  }): Promise<Supplier> {
    try {
      const response = await httpClient.post<Supplier>('/supplier', data)
      return response.data
    } catch (error) {
      console.error('Error creating supplier:', error)
      throw error
    }
  }
}

export const supplierService = new SupplierService()
