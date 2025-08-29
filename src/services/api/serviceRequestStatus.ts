import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface ServiceRequestStatus {
  code: string;
  name: string;
  displayName: string;
}

class ServiceRequestStatusService {
  async getAllServiceRequestStatuses(): Promise<ServiceRequestStatus[]> {
    try {
      const response = await httpClient.get<ServiceRequestStatus[]>('/service-request-status')
      return response.data
    } catch (error) {
      console.error('Error fetching service request statuses:', error)
      throw error
    }
  }
}

export const serviceRequestStatusService = new ServiceRequestStatusService()
