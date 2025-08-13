import { ASSET_API_URL } from '@/config/environment'

export interface ServiceRequestStatus {
  code: string;
  name: string;
  displayName: string;
}

class ServiceRequestStatusHttpClient {
  private baseURL: string

  constructor() {
    this.baseURL = ASSET_API_URL
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }
}

const serviceRequestStatusHttp = new ServiceRequestStatusHttpClient()

class ServiceRequestStatusService {
  async getAllServiceRequestStatuses(): Promise<ServiceRequestStatus[]> {
    try {
      const response = await serviceRequestStatusHttp.get<ServiceRequestStatus[]>('/service-request-status')
      return response
    } catch (error) {
      console.error('Error fetching service request statuses:', error)
      throw error
    }
  }
}

export const serviceRequestStatusService = new ServiceRequestStatusService()
