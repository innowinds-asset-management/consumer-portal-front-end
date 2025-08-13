import { ASSET_API_URL } from '@/config/environment'

export interface AssetCondition {
  code: string;
  name: string;
  displayName: string;
}

class AssetConditionHttpClient {
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

const assetConditionHttp = new AssetConditionHttpClient()

class AssetConditionService {
  async getAllAssetConditions(): Promise<AssetCondition[]> {
    try {
      const response = await assetConditionHttp.get<AssetCondition[]>('/asset-condition')
      return response
    } catch (error) {
      console.error('Error fetching asset conditions:', error)
      throw error
    }
  }
}

export const assetConditionService = new AssetConditionService()
