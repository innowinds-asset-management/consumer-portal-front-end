import { ASSET_API_URL } from '@/config/environment'

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

// Create a separate HTTP client for installation API calls
class InstallationHttpClient {
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
}

const installationHttp = new InstallationHttpClient()

class InstallationService {
  async createInstallation(installationData: CreateInstallationRequest): Promise<Installation> {
    return installationHttp.post<Installation>('/installation', installationData)
  }
}

export const installationService = new InstallationService() 