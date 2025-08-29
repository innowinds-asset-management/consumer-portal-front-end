import httpClient from '@/services/http'

export interface ConsumerSupplier {
  consumerId: string
  supplierId: string
  createdAt: string
  updatedAt: string
}

// Consumer Supplier API service
class ConsumerSupplierService {
  async getSupplierByConsumerId(consumerId: string): Promise<ConsumerSupplier[]> {
    try {
      const response = await httpClient.get<ConsumerSupplier[]>(`/consumer-supplier/supplier/${consumerId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching supplier by consumer ID:', error)
      throw error
    }
  }

  // Get supplier count by consumer ID
  async getSupplierCountByConsumerId(): Promise<number> {
    try {
      const response = await httpClient.get<{
        success: boolean;
        data: {
          supplierCount: number;
        };
      }>(`/consumer-supplier/count/supplier`)
      return response.data.data.supplierCount
    } catch (error) {
      console.error('Error fetching supplier count:', error)
      throw error
    }
  }
}

export const consumerSupplierService = new ConsumerSupplierService()
