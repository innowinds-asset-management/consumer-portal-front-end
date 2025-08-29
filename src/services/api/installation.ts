import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Installation interface
export interface Installation {
  assetId: string;
  locationId: string;
  departmentId: string;
  installationDate: string;
}

// Create Installation Request interface
export interface CreateInstallationRequest {
  assetId: string;
  locationId: string;
  departmentId: string;
  installationDate: string;
}

class InstallationService {
  async createInstallation(installationData: CreateInstallationRequest): Promise<Installation> {
    try {
      const response = await httpClient.post<Installation>('/installation', installationData)
      return response.data
    } catch (error) {
      console.error('Error creating installation:', error)
      throw error
    }
  }
}

export const installationService = new InstallationService() 