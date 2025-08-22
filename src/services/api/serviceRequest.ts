import { ASSET_API_URL } from '@/config/environment'

// Service Request interface based on sample JSON
export interface ServiceRequest {
  serviceRequestStatus?: any;
  serviceRequestId?: string;
  assetId: string;
  technicianName: string;
  serviceSupplierId?: string;
  serviceContractId?: string;
  warrantyStatus: string;
  srStatus: string;
  srStatusCode:string
  srNo: string;
  serviceType: string | null;
  serviceDescription: string | null;
  assetCondition?: string;
  assetConditionCode?:string
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
  serviceRequestItems?: ServiceRequestItem[];
}

// Service Request Item interface
export interface ServiceRequestItem {
  serviceRequestItemId?: number;
  serviceRequestId?: string;
  partName: string;
  partCost: number;
  labourCost: number;
  quantity: number;
  totalCost: number;
  defectDescription: string;
  createdAt?: string;
  updatedAt?: string | null;
}

// Create Service Request Item interface
export interface CreateServiceRequestItemRequest {
  serviceRequestId: string;
  partName: string;
  partCost: number;
  labourCost: number;
  quantity: number;
  totalCost: number;
  defectDescription: string;
}

// Update Service Request Item interface
export interface UpdateServiceRequestItemRequest {
  partName?: string;
  partCost?: number;
  labourCost?: number;
  quantity?: number;
  totalCost?: number;
  defectDescription?: string;
}

// Create Service Request Request interface
export interface CreateServiceRequestRequest {
  assetId: string;
  technicianName?: string;
  serviceSupplierName?: string;
  warrantyStatus?: string;
  serviceStatus?: string | null;
  approverName?: string | null;
  serviceType?: string | null;
  serviceDescription?: string | null;
  problem?: string | null;
  assetCondition?: string | null;
  assetConditionCode?: string | null;
}

// Update Service Request interface
export interface UpdateServiceRequestRequest {
  technicianName?: string;
  srStatus?: string;
  closureNotes?: string;
  closureReason?: string;
  serviceDescription?: string;
  assetCondition?: string;
  problem?: string;
}

// Create a separate HTTP client for service request API calls
class ServiceRequestHttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = ASSET_API_URL
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

  async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      method: 'DELETE',
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

  async getServiceRequests(params?: { status?: string; supplierId?: string; departmentId?: string }): Promise<ServiceRequest[]> {
    let endpoint = '/servicerequest'
    const queryParams = new URLSearchParams()
    
    if (params?.status) {
      queryParams.append('status', params.status)
    }
    
    if (params?.supplierId) {
      queryParams.append('sid', params.supplierId)
    }
    
    if (params?.departmentId) {
      queryParams.append('did', params.departmentId)
    }
    
    if (queryParams.toString()) {
      endpoint += `?${queryParams.toString()}`
    }
    
    return serviceRequestHttp.get<ServiceRequest[]>(endpoint)
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

  async createServiceRequestItem(data: CreateServiceRequestItemRequest): Promise<ServiceRequestItem> {
    return serviceRequestHttp.post<ServiceRequestItem>(`/servicerequest/${data.serviceRequestId}/item`, data)
  }

  async updateServiceRequestItem(id: number, data: UpdateServiceRequestItemRequest): Promise<ServiceRequestItem> {
    return serviceRequestHttp.put<ServiceRequestItem>(`/servicerequest/item/${id}`, data)
  }

  async deleteServiceRequestItem(id: number): Promise<void> {
    return serviceRequestHttp.delete<void>(`/servicerequest/item/${id}`)
  }

  // Get service request counts by status
  async getServiceRequestCountByStatus(): Promise<{
    cancelled: number;
    closed: number;
    completed: number;
    open: number;
    inProgress: number;
    pending: number;
  }> {
    try {
      const response = await serviceRequestHttp.get<{
        success: boolean;
        data: {
          cancelled: number;
          closed: number;
          completed: number;
          open: number;
          inProgress: number;
          pending: number;
        };
      }>('/servicerequest/count/status')
      return response.data
    } catch (error) {
      console.error('Error fetching service request counts by status:', error)
      throw error
    }
  }

}

export const serviceRequestService = new ServiceRequestService() 