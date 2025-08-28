import { ASSET_API_URL } from '@/config/environment';

export interface ServiceContract {
  contractId: string;
  contractNumber: string;
  contractTypeId: number;
  serviceSupplierId: string;
  assetId: string;
  contractName: string;
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

// Create a separate HTTP client for service contract API calls
class ServiceContractHttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = ASSET_API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Service Contract API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

const serviceContractHttp = new ServiceContractHttpClient();

class ServiceContractService {
  private httpClient: ServiceContractHttpClient;

  constructor() {
    this.httpClient = serviceContractHttp;
  }

  // Get service contracts by supplier ID
  async getServiceContractsBySupplierId(supplierId: string): Promise<ServiceContract[]> {
    return this.httpClient.get<ServiceContract[]>(`/service-contract/service-supplier/${supplierId}`);
  }

  // Get service contract by asset ID
  async getServiceContractByAssetId(assetId: string): Promise<ServiceContract | null> {
    return this.httpClient.get<ServiceContract | null>(`/service-contract/asset/${assetId}`);
  }

  // Create service contract
  async createServiceContract(contract: Partial<ServiceContract>): Promise<ServiceContract> {
    return this.httpClient.post<ServiceContract>('/service-contract', contract);
  }

  // Update service contract
  async updateServiceContract(contractId: string, contract: Partial<ServiceContract>): Promise<ServiceContract> {
    return this.httpClient.put<ServiceContract>(`/service-contract/${contractId}`, contract);
  }
}

export const serviceContractService = new ServiceContractService();
