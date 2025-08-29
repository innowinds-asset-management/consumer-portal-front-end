import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

// Asset Status interface
export interface AssetStatus {
  statusCode: string;
  displayName: string;
  group: string;
}

// Asset Status API service
class AssetStatusService {
  // Get all asset statuses
  async getAssetStatuses(): Promise<{ success: boolean; data: AssetStatus[]; error?: string }> {
    try {
      const response = await httpClient.get<{ success: boolean; data: AssetStatus[]; error?: string }>('/asset-status')
      return response.data
    } catch (error) {
      console.error('Error fetching asset statuses:', error)
      throw error
    }
  }
}

export const assetStatusService = new AssetStatusService()
