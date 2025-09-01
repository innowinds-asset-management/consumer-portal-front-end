import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Service Frequency interface
export interface ServiceFrequency {
  code: string;
  displayName: string;
}

// Service Frequency API service
class ServiceFrequencyService {
  private baseURL = `${API_URL}/service-frequency`;

  // Get all service frequencies
  async getServiceFrequencies(): Promise<ServiceFrequency[]> {
    try {
      console.log('Fetching service frequencies...')
      const response = await httpClient.get<ServiceFrequency[]>(this.baseURL)
      return response.data
    } catch (error) {
      console.error('Error fetching service frequencies:', error)
      throw error
    }
  }
}

export const serviceFrequencyService = new ServiceFrequencyService()
