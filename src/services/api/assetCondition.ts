import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'

export interface AssetCondition {
  code: string;
  name: string;
  displayName: string;
}

class AssetConditionService {
  async getAllAssetConditions(): Promise<AssetCondition[]> {
    try {
      const response = await httpClient.get<AssetCondition[]>('/asset-condition')
      return response.data
    } catch (error) {
      console.error('Error fetching asset conditions:', error)
      throw error
    }
  }
}

export const assetConditionService = new AssetConditionService()
