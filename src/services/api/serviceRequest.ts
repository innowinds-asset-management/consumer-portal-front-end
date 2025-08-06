import { WARRANTY_API_URL } from '@/config/environment'

// Service Request interface
export interface ServiceRequest {
  id?: number;
  assetId: string;
  technicianName: string;
  serviceSupplierName: string;
  warrantyStatus: string;
  serviceStatus: string | null;
  approverName: string | null;
  serviceDate: string;
  serviceType: string | null;
  serviceDescription: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Create Service Request Request interface
export interface CreateServiceRequestRequest {
  assetId: string;
  technicianName: string;
  serviceSupplierName: string;
  warrantyStatus: string;
  serviceStatus: string | null;
  approverName: string | null;
  serviceDate: string;
  serviceType: string | null;
  serviceDescription: string | null;
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
    return serviceRequestHttp.post<ServiceRequest>('/service-request', data)
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return serviceRequestHttp.get<ServiceRequest[]>('/service-request')
  }

  async getServiceRequestById(id: number): Promise<ServiceRequest> {
    return serviceRequestHttp.get<ServiceRequest>(`/service-request/${id}`)
  }
}

export const serviceRequestService = new ServiceRequestService() 