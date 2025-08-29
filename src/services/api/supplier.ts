import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface SupplierSearchResult {
  supplier: {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
  };
}

class SupplierService {
  async searchSuppliers(searchTerm: string): Promise<SupplierSearchResult[]> {
    try {
      const response = await httpClient.get<SupplierSearchResult[]>(`/supplier/search?name=${encodeURIComponent(searchTerm)}`)
      return response.data
    } catch (error) {
      console.error('Error searching suppliers:', error)
      throw error
    }
  }
}

export const supplierService = new SupplierService()
