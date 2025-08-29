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
  async getServiceContracts(): Promise<ServiceContract[]> {
    try {
      const response = await httpClient.get<ServiceContract[]>('/service-contract')
      return response.data
    } catch (error) {
      console.error('Error fetching service contracts:', error)
      throw error
    }
  }

  async getServiceContractById(id: string): Promise<ServiceContract> {
    try {
      const response = await httpClient.get<ServiceContract>(`/service-contract/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service contract:', error)
      throw error
    }
  }

  async createServiceContract(contractData: Omit<ServiceContract, 'contractId' | 'createdAt' | 'updatedAt'>): Promise<ServiceContract> {
    try {
      const response = await httpClient.post<ServiceContract>('/service-contract', contractData)
      return response.data
    } catch (error) {
      console.error('Error creating service contract:', error)
      throw error
    }
  }

  async updateServiceContract(id: string, contractData: Partial<ServiceContract>): Promise<ServiceContract> {
    try {
      const response = await httpClient.put<ServiceContract>(`/service-contract/${id}`, contractData)
      return response.data
    } catch (error) {
      console.error('Error updating service contract:', error)
      throw error
    }
  }

  async deleteServiceContract(id: string): Promise<void> {
    try {
      await httpClient.delete(`/service-contract/${id}`)
    } catch (error) {
      console.error('Error deleting service contract:', error)
      throw error
    }
  }

  async getServiceContractsBySupplierId(supplierId: string): Promise<ServiceContract[]> {
    try {
      const response = await httpClient.get<ServiceContract[]>(`/service-contract/service-supplier/${supplierId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching service contracts by supplier ID:', error)
      throw error
    }
  }
}

export const serviceContractService = new ServiceContractService()
