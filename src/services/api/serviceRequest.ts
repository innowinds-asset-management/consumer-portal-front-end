import { WARRANTY_API_URL } from '@/config/environment'

// Service Request interface based on sample JSON
export interface ServiceRequest {
  serviceRequestId?: string;
  assetId: string;
  technicianName: string;
  serviceSupplierId?: string;
  serviceContractId?: string;
  warrantyStatus: string;
  srStatus: string;
  srNo: string;
  serviceDate: string;
  serviceType: string | null;
  serviceDescription: string | null;
  assetCondition?: string;
  problem?: string;
  createdAt?: string;
  updatedAt?: string;
  approverName: string | null;
  closureNotes?: string;
  closureDate?: string | null;
  closureBy?: string | null;
  closureReason?: string;
  totalCost?: number | null;
  asset?: any;
  serviceSupplier?: any;
  serviceContract?: any;
  serviceRequestItems?: any[];
}

// Create Service Request Request interface
export interface CreateServiceRequestRequest {
  assetId: string;
  technicianName?: string;
  serviceSupplierName?: string;
  warrantyStatus?: string;
  serviceStatus?: string | null;
  approverName?: string | null;
  serviceDate?: string;
  serviceType?: string | null;
  serviceDescription?: string | null;
  problem?: string | null;
  assetCondition?: string | null;
}

// Update Service Request interface
export interface UpdateServiceRequestRequest {
  technicianName?: string;
  srStatus?: string;
  closureNotes?: string;
  closureReason?: string;
  serviceDescription?: string;
}

// Create a separate HTTP client for service request API calls
class ServiceRequestHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = WARRANTY_API_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getHeaders(): Record<string, string> {
    return { ...this.defaultHeaders }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
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

const serviceRequestHttp = new ServiceRequestHttpClient()

class ServiceRequestService {
  async createServiceRequest(data: CreateServiceRequestRequest): Promise<ServiceRequest> {
    console.log('Creating service request:', data)
    return serviceRequestHttp.post<ServiceRequest>('/servicerequest', data)
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return serviceRequestHttp.get<ServiceRequest[]>('/servicerequest')
  }

  async getServiceRequestById(id: string): Promise<ServiceRequest> {
    return serviceRequestHttp.get<ServiceRequest>(`/servicerequest/${id}`)
  }
  async getServiceRequestByAssetId(assetId: string): Promise<ServiceRequest[]> {
    return serviceRequestHttp.get<ServiceRequest[]>(`/servicerequest/asset/${assetId}`)
  }

  async updateServiceRequest(id: string, data: UpdateServiceRequestRequest): Promise<ServiceRequest> {
    return serviceRequestHttp.put<ServiceRequest>(`/servicerequest/${id}`, data)
  }

}

export const serviceRequestService = new ServiceRequestService() 