import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'
import { ApiResponse } from './ApiResponse'
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
    status: string;
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
    contractDurationMonths: number | null;
    createdAt: string;
  };
}

export interface ServiceContractStatsData {
  totalServiceContracts: number;
  expiringSoon: {
    in5Days: {
      title: string;
      count: number;
      text: string;
    };
    in10days: {
      title: string;
      count: number;
      text: string;
    };
    in30days: {
      title: string;
      count: number;
      text: string;
    };
  };
  recentlyExpired: {
    in5Days: {
      title: string;
      count: number;
      text: string;
    };
    in10Days: {
      title: string;
      count: number;
      text: string;
    };
    in30Days: {
      title: string;
      count: number;
      text: string;
    };
  };
}


class ServiceContractService {
  private baseURL = `${API_URL}/service-contract`

  async getServiceContracts(filter?: { type?: 'expiring' | 'expired'; days?: number }): Promise<ApiResponse<ServiceContract[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filter?.type) {
        params.append('filterType', filter.type);
      }
      
      if (filter?.days) {
        params.append('filterDays', filter.days.toString());
      }

      const queryString = params.toString();
      params.append('groupstatus', 'active-or-pre-active');
      const url = queryString ? `${this.baseURL}?${queryString}` : this.baseURL;      
      const response = await httpClient.get<ApiResponse<ServiceContract[]>>(url)
      if(response.data.success === 1){
        return response.data
      } else {
        throw new Error(response.data.msg || 'Failed to fetch service contracts')
      }      
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
      console.log('Creating service contract at URL:', this.baseURL)
      console.log('Request data:', JSON.stringify(contractData, null, 2))
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

  async getServiceContractsByAssetId(assetId: string): Promise<ServiceContract[]> {
    const response = await httpClient.get<ServiceContract[]>(`${this.baseURL}/asset-contract/${assetId}`)
    return response.data
  }

  // Get service contract statistics
  async getServiceContractStats(): Promise<ApiResponse<ServiceContractStatsData>> {
    try {
      const response = await httpClient.get<ApiResponse<ServiceContractStatsData>>('/service-contract/service-contract-stats');
      if (response.data.success === 1) {
        return response.data;
      } else {
        throw new Error(response.data.msg || 'Failed to fetch service contract statistics');
      }
    } catch (error) {
      console.error('Error fetching service contract statistics:', error);
      throw error;
    }
  }
}

export const serviceContractService = new ServiceContractService()
