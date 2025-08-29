import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

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

class WarrantyService {
  async getWarrantiesByAssetId(assetId: string): Promise<Warranty[]> {
    try {
      const response = await httpClient.get<Warranty[]>(`/warranty/asset/${assetId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching warranties by asset ID:', error)
      throw error
    }
  }
}

export const warrantyService = new WarrantyService() 