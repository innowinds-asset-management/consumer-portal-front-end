import { WARRANTY_API_URL } from '@/config/environment'

// Warranty interface
export interface Warranty {
  warrantyId: number;
  assetId: string;
  warrantyTypeId: number;
  warrantySupplierId: string;
  warrantyNumber: string;
  startDate: string;
  endDate: string;
  warrantyPeriod: number;
  coverageType: string;
  coverageDescription: string;
  termsConditions: string;
  cost: string;
  isActive: boolean;
  autoRenewal: boolean;
  createdAt: string;
  updatedAt: string;
  consumerId: number;
  supplierId: number;
  warrantyType: {
    warrantyTypeId: number;
    typeName: string;
    description: string;
    createdAt: string;
  };
  notifications: Array<{
    notificationId: number;
    warrantyId: number;
    notificationType: string;
    message: string;
    recipientEmail: string;
    sentDate: string;
    isSent: boolean;
    createdAt: string;
  }>;
}

// Create a separate HTTP client for warranty API calls
class WarrantyHttpClient {
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

const warrantyHttp = new WarrantyHttpClient()

class WarrantyService {
  async getWarrantiesByAssetId(assetId: string): Promise<Warranty[]> {
    console.log('warrantyHttp Endpoint', warrantyHttp.get<Warranty[]>(`/warranty/asset/${assetId}`))
    return warrantyHttp.get<Warranty[]>(`/warranty/asset/${assetId}`)
  }
}

export const warrantyService = new WarrantyService() 