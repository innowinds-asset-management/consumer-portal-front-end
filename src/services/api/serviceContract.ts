import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface ServiceContract {
  contractId: string;
  contractNumber: string;
  contractTypeId: number;
  serviceSupplierId: string;
  assetId: string;
  contractName: string;
  amount?: number;
  startDate: string;
  endDate: string;
  paymentTerms: string;
  coverageType: string;
  includes: string;
  excludes: string;
  serviceFrequency: string;
  preventiveMaintenanceIncluded: boolean;
  breakdownMaintenanceIncluded: boolean;
  autoRenewal: boolean;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  asset: {
    id: string;
    assetName: string;
  };
  serviceSupplier: {
    id: string;
    name: string;
  };
  status: {
    statusId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  contractType: {
    contractTypeId: number;
    typeName: string;
    typeCode: string;
    description: string;
    contractDurationMonths: number;
    createdAt: string;
  };
}

class ServiceContractService {
  private baseURL = `${API_URL}/service-contract`

  async getServiceContracts(): Promise<ServiceContract[]> {
    try {
      const response = await httpClient.get<ServiceContract[]>(this.baseURL)
      return response.data
    } catch (error) {
      console.error('Error fetching service contracts:', error)
      throw error
    }
  }

  async getServiceContractById(id: string): Promise<ServiceContract> {
    try {
      const response = await httpClient.get<ServiceContract>(`${this.baseURL}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service contract:', error)
      throw error
    }
  }

  async createServiceContract(contractData: Omit<ServiceContract, 'contractId' | 'createdAt' | 'updatedAt'>): Promise<ServiceContract> {
    try {
      console.log('🚀 Creating service contract at URL:', this.baseURL)
      console.log('📦 Request data:', JSON.stringify(contractData, null, 2))
      const response = await httpClient.post<ServiceContract>(this.baseURL, contractData)
      return response.data
    } catch (error) {
      console.error('Error creating service contract:', error)
      throw error
    }
  }

  async updateServiceContract(id: string, contractData: Partial<ServiceContract>): Promise<ServiceContract> {
    try {
      const response = await httpClient.put<ServiceContract>(`${this.baseURL}/${id}`, contractData)
      return response.data
    } catch (error) {
      console.error('Error updating service contract:', error)
      throw error
    }
  }

  async deleteServiceContract(id: string): Promise<void> {
    try {
      await httpClient.delete(`${this.baseURL}/${id}`)
    } catch (error) {
      console.error('Error deleting service contract:', error)
      throw error
    }
  }

  async getServiceContractsBySupplierId(supplierId: string): Promise<ServiceContract[]> {
    try {
      const response = await httpClient.get<ServiceContract[]>(`${this.baseURL}/service-supplier/${supplierId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service contracts by supplier ID:', error)
      throw error
    }
  }
}

export const serviceContractService = new ServiceContractService()
