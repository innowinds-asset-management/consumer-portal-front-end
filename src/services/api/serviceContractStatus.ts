import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Service Contract Status interface
export interface ServiceContractStatus {
  statusId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Service Contract Status API service
class ServiceContractStatusService {
  private baseURL = `${API_URL}/service-contract-status`;

  // Get all service contract statuses
  async getServiceContractStatuses(): Promise<ServiceContractStatus[]> {
    try {
      console.log('Fetching service contract statuses...')
      const response = await httpClient.get<ServiceContractStatus[]>(this.baseURL)
      return response.data
    } catch (error) {
      console.error('Error fetching service contract statuses:', error)
      throw error
    }
  }

  // Get service contract status by ID
  async getServiceContractStatus(statusId: number): Promise<ServiceContractStatus> {
    try {
      const response = await httpClient.get<ServiceContractStatus>(`${this.baseURL}/${statusId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service contract status:', error)
      throw error
    }
  }
}

export const serviceContractStatusService = new ServiceContractStatusService()
